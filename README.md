# 🏔️ Prueba Avila Tek

¡Bienvenido a la **Prueba Avila Tek**! Este proyecto es una aplicación basada en Node.js y Express que utiliza una base de datos PostgreSQL. A continuación, encontrarás las instrucciones para configurar y ejecutar el proyecto correctamente.

---

## 🚀 Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu sistema:

- **Docker** y **Docker Compose**: Para ejecutar los contenedores.
- **Node.js** (versión 22 o superior): Para desarrollo local (opcional si usas Docker).
- **npm**: Para manejar las dependencias del proyecto.

---

## 🛠️ Configuración del Proyecto

### 1. Clonar el Repositorio

Clona este repositorio en tu máquina local:

```bash
git clone <URL_DEL_REPOSITORIO>
cd prueba-avilatek
```

### 2. Configurar Variables de Entorno

Copia el archivo template.env y renómbralo como .env. Luego, edita las variables según tu configuración

## 🐳 Montar el Proyecto con Docker

### 1. Construir y Levantar los Contenedores

Ejecuta el siguiente comando para construir y levantar los contenedores de Docker:

```
docker-compose up --build
```

## ▶️ Iniciar la Aplicación

#### **Una vez iniciada la aplicación y tengas el servidor corriendo. DIrigete a la documentación en Postman**

### 1. Ejecutar el Seed

Antes de usar la aplicación, es necesario ejecutar el seed para poblar la base de datos con datos iniciales. Accede al contenedor de la aplicación y ejecuta el seed:
