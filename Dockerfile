# Usar una imagen de Node.js basada en Debian, versión 20
FROM node:20-bullseye

# Instalar dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    openssl \
    libc6 \
    libssl-dev \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Crear un directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración y lock
COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY next.config.mjs ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./

# Copiar el esquema de Prisma ANTES de instalar dependencias
COPY prisma ./prisma/

# Instalar TODAS las dependencias (incluyendo devDependencies para el build)
RUN npm ci --ignore-scripts

# Generar el cliente de Prisma manualmente
RUN npx prisma generate

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Crear usuario no root para seguridad
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Cambiar propietario de la aplicación
RUN chown -R nextjs:nodejs /app

# Cambiar al usuario no root
USER nextjs

# Exponer el puerto de la aplicación
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]
