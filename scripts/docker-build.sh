#!/bin/bash

# Script para construir y ejecutar la aplicación Glass Store con Docker

set -e

echo "🏗️  Construyendo imagen de Docker para Glass Store..."

# Construir la imagen
docker build -t glass-store-app .

echo "✅ Imagen construida exitosamente!"

echo "🚀 Iniciando contenedor..."

# Ejecutar el contenedor
docker run -d \
  --name glass-store-container \
  -p 3000:3000 \
  --env-file .env \
  glass-store-app

echo "✅ Contenedor iniciado en http://localhost:3000"

echo "📊 Para ver los logs:"
echo "   docker logs -f glass-store-container"

echo "🛑 Para detener el contenedor:"
echo "   docker stop glass-store-container"

echo "🗑️  Para eliminar el contenedor:"
echo "   docker rm glass-store-container" 