# Usar la imagen oficial de Node.js como base
FROM node:20-alpine AS base

# Instalar dependencias solo cuando sea necesario
FROM base AS deps
# Verificar https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine para entender por qué libc6-compat es necesario.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json ./
COPY prisma ./prisma/

# Instalar dependencias (usar npm install en lugar de npm ci)
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generar el cliente de Prisma
ENV DATABASE_URL=postgresql://opticasInnova:opticasInnova123@192.168.1.163:5480/db_opticasInnova?schema=glass_store
ENV DIRECT_URL=postgresql://opticasInnova:opticasInnova123@192.168.1.163:5480/db_opticasInnova?schema=glass_store

RUN npx prisma generate

# Construir la aplicación Next.js
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar el cliente de Prisma generado
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copiar archivos de la aplicación
COPY --from=builder /app/public ./public

# Establecer el propietario correcto de los archivos
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copiar la aplicación construida
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
# set hostname to localhost
ENV HOSTNAME="0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
