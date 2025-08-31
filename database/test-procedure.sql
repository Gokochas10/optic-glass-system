-- Script de prueba para verificar el procedimiento almacenado
-- Ejecuta esto en tu base de datos para probar

-- 1. Verificar que la vista existe
SELECT * FROM glass_store.client_view LIMIT 5;

-- 2. Verificar que el procedimiento existe
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'glass_store' 
AND routine_name = 'sp_update_client_extra_data';

-- 3. Probar el procedimiento con un cliente existente
-- Reemplaza 'ID_DEL_CLIENTE' con un ID real de tu tabla public.Client
SELECT glass_store.sp_update_client_extra_data(
    'ID_DEL_CLIENTE',  -- Reemplaza con un ID real
    25,                -- Nueva edad
    'Ingeniero'        -- Nueva ocupación
);

-- 4. Verificar que se actualizó correctamente
SELECT * FROM glass_store.client_view WHERE id = 'ID_DEL_CLIENTE';

-- 5. Verificar la estructura de las tablas
-- Tabla public.Client
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'Client'
ORDER BY ordinal_position;

-- Tabla glass_store.Client
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_schema = 'glass_store' 
AND table_name = 'Client'
ORDER BY ordinal_position; 