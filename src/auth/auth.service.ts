import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.usersService.createUser({
            ...registerDto,
            password: hashedPassword,
            roles: 'client' as any, // Force client role for public registration
        });
        const { password, ...result } = user;
        return result;
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.roles };
    return {
        access_token: this.jwtService.sign(payload),
        user: { id: user.id, email: user.email, name: user.name, role: user.roles},
    };
    }

    async validateUser(userId: number) {
        return this.usersService.findById(userId);
    }
}
