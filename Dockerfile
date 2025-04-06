FROM node:22-bullseye as deps
WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package.json .
COPY package-lock.json .

# Instalar dependencias necesarias para Node.js y bcrypt
RUN apt-get update && apt-get install -y python3 make g++
RUN npm install

FROM deps as builder
WORKDIR /app

# Copiar el resto del código fuente
COPY . .

# Generar el cliente de Prisma y construir la aplicación
RUN npx prisma generate
RUN npm run build

FROM builder as develop
WORKDIR /app
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]