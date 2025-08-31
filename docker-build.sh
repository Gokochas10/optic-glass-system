#!/bin/bash

echo "🏗️  Construyendo imagen de Docker para Glass Store..."

# Verificar que existe el archivo .env
if [ ! -f .env ]; then
    echo "❌ Error: No se encontró el archivo .env"
    echo "   Por favor, crea un archivo .env con las variables de entorno necesarias"
    exit 1
fi

# Verificar que existe el directorio prisma
if [ ! -d prisma ]; then
    echo "❌ Error: No se encontró el directorio prisma"
    echo "   Asegúrate de que el archivo prisma/schema.prisma existe"
    exit 1
fi

# Construir la imagen
echo "📦 Construyendo imagen Docker..."
docker build -t glass-store-app .

echo "✅ Imagen construida exitosamente!"

# Preguntar si quiere ejecutar el contenedor
read -p "¿Deseas ejecutar el contenedor ahora? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Iniciando contenedor..."
    
    # Detener y eliminar contenedor existente si existe
    docker stop glass-store-container 2>/dev/null || true
    docker rm glass-store-container 2>/dev/null || true
    
    # Ejecutar el contenedor
    docker run -d \
      --name glass-store-container \
      -p 3000:3000 \
      --env-file .env \
      glass-store-app

    echo "✅ Contenedor iniciado en http://localhost:3000"
    
    echo ""
    echo "📊 Comandos útiles:"
    echo "   Ver logs: docker logs -f glass-store-container"
    echo "   Detener: docker stop glass-store-container"
    echo "   Eliminar: docker rm glass-store-container"
    echo "   Reiniciar: docker restart glass-store-container"
else
    echo "📋 Para ejecutar el contenedor manualmente:"
    echo "   docker run -d --name glass-store-container -p 3000:3000 --env-file .env glass-store-app"
fi 