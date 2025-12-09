--
-- PostgreSQL database dump
--

\restrict pKnsNRqBic2JXxSfPGZCes0oWaHrsrtcemTMHsat04ZJcW6bn93efU1N2KtU9Of

-- Dumped from database version 15.15 (Debian 15.15-1.pgdg13+1)
-- Dumped by pg_dump version 15.15 (Debian 15.15-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: tickets_priority_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tickets_priority_enum AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL'
);


ALTER TYPE public.tickets_priority_enum OWNER TO postgres;

--
-- Name: tickets_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tickets_status_enum AS ENUM (
    'OPEN',
    'IN_PROGRESS',
    'RESOLVED',
    'CLOSED'
);


ALTER TYPE public.tickets_status_enum OWNER TO postgres;

--
-- Name: users_roles_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.users_roles_enum AS ENUM (
    'admin',
    'client',
    'technical'
);


ALTER TYPE public.users_roles_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    name character varying NOT NULL,
    company character varying NOT NULL,
    "contactEmail" character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clients_id_seq OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: technicians; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.technicians (
    id integer NOT NULL,
    name character varying NOT NULL,
    specialty character varying NOT NULL,
    availability boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.technicians OWNER TO postgres;

--
-- Name: technicians_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.technicians_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.technicians_id_seq OWNER TO postgres;

--
-- Name: technicians_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.technicians_id_seq OWNED BY public.technicians.id;


--
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id integer NOT NULL,
    title character varying NOT NULL,
    description text NOT NULL,
    status public.tickets_status_enum DEFAULT 'OPEN'::public.tickets_status_enum NOT NULL,
    priority public.tickets_priority_enum DEFAULT 'MEDIUM'::public.tickets_priority_enum NOT NULL,
    client_id integer NOT NULL,
    technician_id integer,
    category_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- Name: tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tickets_id_seq OWNER TO postgres;

--
-- Name: tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tickets_id_seq OWNED BY public.tickets.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    roles public.users_roles_enum DEFAULT 'client'::public.users_roles_enum NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: technicians id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.technicians ALTER COLUMN id SET DEFAULT nextval('public.technicians_id_seq'::regclass);


--
-- Name: tickets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets ALTER COLUMN id SET DEFAULT nextval('public.tickets_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, description, created_at, updated_at) FROM stdin;
1	Solicitud	General service requests	2025-12-09 14:34:56.976683	2025-12-09 14:34:56.976683
2	Incidente de Hardware	Hardware related issues	2025-12-09 14:34:56.976683	2025-12-09 14:34:56.976683
3	Incidente de Software	Software related issues	2025-12-09 14:34:56.976683	2025-12-09 14:34:56.976683
4	Solicitud	General service requests	2025-12-09 14:36:45.569096	2025-12-09 14:36:45.569096
5	Incidente de Hardware	Hardware related issues	2025-12-09 14:36:45.569096	2025-12-09 14:36:45.569096
6	Incidente de Software	Software related issues	2025-12-09 14:36:45.569096	2025-12-09 14:36:45.569096
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients (id, name, company, "contactEmail", created_at, updated_at) FROM stdin;
1	John Doe	Acme Corp	john.doe@acme.com	2025-12-09 14:36:45.57018	2025-12-09 14:36:45.57018
2	Jane Smith	Tech Solutions	jane.smith@techsol.com	2025-12-09 14:36:45.57018	2025-12-09 14:36:45.57018
3	Bob Johnson	Global Industries	bob.j@global.com	2025-12-09 14:36:45.57018	2025-12-09 14:36:45.57018
4	Carlos Perez	Claro Corp	carlosclaro123@mail.com	2025-12-09 16:16:51.91492	2025-12-09 16:16:51.91492
5	Maria Peña	Tigo Corp	mariatigo123@mail.com	2025-12-09 16:17:40.264362	2025-12-09 16:17:40.264362
6	Client User 1	My Company	client1@company.com	2025-12-09 16:31:58.251135	2025-12-09 16:31:58.251135
\.


--
-- Data for Name: technicians; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.technicians (id, name, specialty, availability, created_at, updated_at) FROM stdin;
1	Carlos Martinez	Hardware Specialist	t	2025-12-09 14:36:45.571463	2025-12-09 14:36:45.571463
2	Maria Garcia	Software Engineer	t	2025-12-09 14:36:45.571463	2025-12-09 14:36:45.571463
3	Luis Rodriguez	Network Administrator	t	2025-12-09 14:36:45.571463	2025-12-09 14:36:45.571463
4	Alex Duran	Database Enginner	t	2025-12-09 16:23:11.203051	2025-12-09 16:23:11.203051
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (id, title, description, status, priority, client_id, technician_id, category_id, created_at, updated_at) FROM stdin;
1	Laptop no enciende	La laptop no responde despues de haber actualizado el sistema	IN_PROGRESS	HIGH	1	1	2	2025-12-09 14:45:33.344643	2025-12-09 16:08:29.185956
2	Problema de red	No hay conexión a internet	IN_PROGRESS	MEDIUM	2	3	3	2025-12-09 16:25:23.98041	2025-12-09 16:27:07.406234
3	Mi computadora lenta	La computadora va muy lenta	OPEN	LOW	6	\N	3	2025-12-09 16:32:06.199876	2025-12-09 16:32:06.199876
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, roles, created_at, updated_at) FROM stdin;
1	Admin User	admin@techhelp.com	$2b$10$eh2oztCVi1pCylwB0X0aBeUz6QCTNib3zYYbMfz7dJsVekYpD572a	admin	2025-12-09 14:34:56.974538	2025-12-09 14:34:56.974538
2	Tech Support 1	tech1@techhelp.com	$2b$10$4cdgZYp3YDUKy1Bes4g3KOTXKojDbscrW8qkjzZ84u1Zhk5xleLz6	technical	2025-12-09 14:34:56.974538	2025-12-09 14:34:56.974538
3	Tech Support 2	tech2@techhelp.com	$2b$10$z6EDiXwbmR1sNeNrdwlKWe4BhdB2Khx8uWO7frPsoXfCF96df5HOy	technical	2025-12-09 14:34:56.974538	2025-12-09 14:34:56.974538
4	Client User 1	client1@company.com	$2b$10$wgj.SwyG3CFkaf.7O/eYTuO81Mv.Mxkf8O6k0yh445PhE9XUCDmva	client	2025-12-09 14:34:56.974538	2025-12-09 14:34:56.974538
5	Client User 2	client2@company.com	$2b$10$ctc0SeRcmAGRz9TkXhAMNeTVuUfpyt.wyR5wng9x6T5EwvTHVNK3u	client	2025-12-09 14:34:56.974538	2025-12-09 14:34:56.974538
6	Admin User	admin@techhelp.com	$2b$10$wNg2nW38Bn3pCr0YeyErRuqYkz0h8/BbY6R76BA7lTFVtBWc2OYN.	admin	2025-12-09 14:36:45.567015	2025-12-09 14:36:45.567015
7	Tech Support 1	tech1@techhelp.com	$2b$10$IpCcuTRVrtKb3/82PinPVeb5CFnnVeJtJWi73nr9/1k01d8qyREvu	technical	2025-12-09 14:36:45.567015	2025-12-09 14:36:45.567015
8	Tech Support 2	tech2@techhelp.com	$2b$10$C3cQLEFHZuQlDqQgk4stjucHjwpZzIVlPX51KPmF6jrcXPHlKGtw2	technical	2025-12-09 14:36:45.567015	2025-12-09 14:36:45.567015
9	Client User 1	client1@company.com	$2b$10$7mpyeCsGmw5zQO3gEIC17ufRD.kLR51lqDrOXj4ASoF2UhDy9ExTC	client	2025-12-09 14:36:45.567015	2025-12-09 14:36:45.567015
10	Client User 2	client2@company.com	$2b$10$/oVOkSosY9aFkYxyTgGpAeO459KjH2JvyMuY0eXCdXrkXExf6vDIe	client	2025-12-09 14:36:45.567015	2025-12-09 14:36:45.567015
11	David Martinez	davidriwi123@mail.com	$2b$10$tf.k5RwAK9L.iHzY0IXBP.prTK7676NKFL7zeIUWc4KZO8YjfdGAO	admin	2025-12-09 15:17:03.276252	2025-12-09 15:17:03.276252
12	Walter Gomez	walter123@mail.com	$2b$10$RAofsGTN7P6uDUZ7NgrYO.dkUD.KOELUVn/09/vyYdUKOY5h6gWWu	client	2025-12-09 15:31:58.94257	2025-12-09 15:31:58.94257
13	Kelmin Miranda	kelmin123@mail.com	kelmin123	technical	2025-12-09 15:44:21.015548	2025-12-09 15:44:21.015548
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 7, true);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_id_seq', 6, true);


--
-- Name: technicians_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.technicians_id_seq', 4, true);


--
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tickets_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: categories PK_24dbc6126a28ff948da33e97d3b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY (id);


--
-- Name: tickets PK_343bc942ae261cf7a1377f48fd0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: technicians PK_b14514b23605f79475be53065b3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.technicians
    ADD CONSTRAINT "PK_b14514b23605f79475be53065b3" PRIMARY KEY (id);


--
-- Name: clients PK_f1ab7cf3a5714dbc6bb4e1c28a4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY (id);


--
-- Name: clients UQ_5f9321f889ea6e1c5ed4f567909; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "UQ_5f9321f889ea6e1c5ed4f567909" UNIQUE ("contactEmail");


--
-- Name: tickets FK_32a7f0e4e32a46a094b55f7c25c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "FK_32a7f0e4e32a46a094b55f7c25c" FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: tickets FK_5c234be1dae50d536259a7dc8c3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "FK_5c234be1dae50d536259a7dc8c3" FOREIGN KEY (technician_id) REFERENCES public.technicians(id);


--
-- Name: tickets FK_ab0f4c7161f0a5c178d229e3541; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "FK_ab0f4c7161f0a5c178d229e3541" FOREIGN KEY (client_id) REFERENCES public.clients(id);


--
-- PostgreSQL database dump complete
--

\unrestrict pKnsNRqBic2JXxSfPGZCes0oWaHrsrtcemTMHsat04ZJcW6bn93efU1N2KtU9Of

