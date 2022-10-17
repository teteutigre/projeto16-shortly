--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.links (
    id integer NOT NULL,
    url character varying(250) NOT NULL,
    "shortUrl" character varying(250) NOT NULL,
    "userId" integer,
    "visitCount" integer DEFAULT 0 NOT NULL
);


--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.links VALUES (2, 'https://static.mundoeducacao.uol.com.br/mundoeducacao/conteudo_legenda/cb208be7dd3f15c6831d98c1a36b441c.jpg', 'NLfWYXxf', 6, 0);
INSERT INTO public.links VALUES (1, 'https://static.mundoeducacao.uol.com.br/mundoeducacao/conteudo_legenda/cb208be7dd3f15c6831d98c1a36b441c.jpg', 'cmy_3xpu', 5, 2);
INSERT INTO public.links VALUES (5, 'https://static.mundoeducacao.uol.com.br/mundoeducacao/conteudo_legenda/cb208be7dd3f15c6831d98c1a36b441c.jpg', 's4x0-pS4', 6, 3);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'teste', 'teste@gmail.com', '123', '2022-10-15 17:01:35.252773');
INSERT INTO public.users VALUES (2, 'teste', 'teste2@gmail.com', '$2b$10$8K/1Ml6kLGBiAukgZa8U1Oi7lfJwMYO8N./gb.MCQWuT6SeJ50lSK', '2022-10-15 19:31:21.756045');
INSERT INTO public.users VALUES (3, 'teste', 'teste3@gmail.com', '$2b$10$qxTS.JCO5ubKmQUaiv0JpOqA7zLI15jSu2Fy3cRvYm48bPDZyaJe2', '2022-10-15 19:32:45.54803');
INSERT INTO public.users VALUES (4, 'teste', 'teste4@gmail.com', '$2b$10$6cOtC0gZk2FBD9nrmkfbBeOFkq6nHuh94DEyxkFr0riqkfR5UWkpe', '2022-10-15 20:07:46.388259');
INSERT INTO public.users VALUES (5, 'teste', 'testee@gmail.com', '$2b$10$.zztouE52HdCIkLiqlccg.QhzYdtW4/xeI9DkPLUUOaT5PnhwQ8HC', '2022-10-16 15:30:42.813694');
INSERT INTO public.users VALUES (6, 'teteu', 'teteu@gmail.com', '$2b$10$caIH9QZtz4t8uLOa3GYy1ucXMXyB6e3zznSpmqqhKAo6jlVEOYq2W', '2022-10-16 17:15:01.349901');
INSERT INTO public.users VALUES (7, 'roger', 'roger@gmail.com', '$2b$10$SqxHv4rxV8IEC1kL54kpHuqcEBtxWtgjKByT0BC7nJ1tNr9xgxRpi', '2022-10-16 23:20:53.318189');


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.links_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: links links_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT "links_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

