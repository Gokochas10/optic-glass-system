# Usar Node.js 20 basado en Debian para compatibilidad con Prisma
FROM node:20-bullseye

# Instalar dependencias necesarias (OpenSSL, librerías comunes)
RUN apt-get update && apt-get install -y \
    openssl \
    libc6 \
    libssl-dev \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y lock
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar resto del código
COPY . .

# No generamos Prisma en build; lo haremos en runtime
# RUN npx prisma generate  <-- eliminado

# Construir la app Next.js
RUN npm run build

# Establecer variables de entorno de producción
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Crear usuario no root
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Cambiar propietario de la app
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

# Comando para ejecutar Next.js y generar Prisma en runtime
CMD ["node", "server.js"]
