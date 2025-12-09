import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/categorie.entity';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

    // Method to create a new category
    async createCategory(name: string, description?: string): Promise<Category> {
        const newCategory = this.categoryRepository.create({ name, description });
        return this.categoryRepository.save(newCategory);
    }

    // Method to get all categories
    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    // Method to find a category by ID
    async findById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }

    // Method to update a category
    async updateCategory(id: number, name: string, description?: string): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        category.name = name;
        category.description = description ?? category.description;
        return this.categoryRepository.save(category);
    }

    // Method to delete a category
    async deleteCategory(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}
