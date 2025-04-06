# 🏔️ Prueba Técnica – Avila Tek

### ¡Bienvenido a la **Prueba Técnica de Avila Tek**!

#### Este proyecto es una API desarrollada con **Node.js**, **Express** y **PostgreSQL**, enfocada en buenas prácticas de arquitectura, seguridad y escalabilidad.

---

## 🚀 Requisitos

Antes de comenzar, asegúrate de tener instalado:

- 🐳 **Docker** y **Docker Compose** – Para ejecutar los contenedores.
- 🔧 **Node.js** `v22+` (opcional si usas Docker).
- 📦 **npm** – Para manejar las dependencias del proyecto.

---

## 🛠️ Configuración del Proyecto

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd prueba-avilatek
```

### 2. Configurar Variables de Entorno

Copia el archivo `.template.env` y renómbralo como `.env`. Luego edita las variables necesarias:

```bash
cp .template.env .env
```

---

## 🐳 Levantar la Aplicación con Docker

### 1. Construir y Ejecutar los Contenedores

```bash
docker-compose up --build
```

Esto iniciará la aplicación y la base de datos en sus respectivos contenedores.

---

## ▶️ Iniciar la Aplicación

Una vez la aplicación esté corriendo, puedes acceder a la documentación de la API en Postman:

🔗 [**Documentación en Postman**](https://documenter.getpostman.com/view/30131537/2sB2cUC3sF)

> 👉 Abre la colección en Postman Web o Desktop desde el botón en la esquina superior derecha.

---

## 🌱 Ejecutar el Seed

> Para poblar la base de datos con datos iniciales, dirigete al postman y ejecuta la petición al endpoint del seed

> 
---

## ✅ ¡Todo Listo!

Con la base de datos inicializada, ya puedes comenzar a probar la API desde Postman o cualquier cliente HTTP.

---

## 🧱 Arquitectura y Patrones

Esta API está construida utilizando:

- **Arquitectura Hexagonal**
- **Domain-Driven Design (DDD)**
- **CQRS (Command Query Responsibility Segregation)**

### 🔄 Hexagonal Architecture

Organizada en 3 capas: Infraestructura, Aplicación y Dominio, lo que nos permite tener un dominio mucho más limpio al depender de abtracciones y no de dependencias concretas

### 🧠 DDD + CQRS

- **Comandos** → ejecutan casos de uso y modifican el estado.
- **Consultas** → acceden a un _read model_ optimizado.
- **Agregados** → encapsulan lógica de negocio y reglas del dominio.

### 📣 Eventos de Dominio

Se disparan desde el dominio tras operaciones que modifican el estado de los agregados y actualizan los modelos de lectura por medio de event handlers para mantener **consistencia eventual** entre escritura y lectura.

---

> Desarrollado con ❤️ para demostrar buenas prácticas de backend en entornos reales.
