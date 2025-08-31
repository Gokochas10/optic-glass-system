-- Procedimiento para actualizar solo age y occupation en glass_store.Client
-- Este procedimiento:
-- 1. Obtiene el fullName del cliente desde public.Client usando el ID
-- 2. Inserta o actualiza en glass_store.Client con el mismo ID
-- 3. Actualiza solo los campos age y job (occupation)

CREATE OR REPLACE FUNCTION glass_store.sp_update_client_extra_data(
    p_id TEXT,
    p_age INTEGER DEFAULT 0,
    p_occupation TEXT DEFAULT ''
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Actualizar o insertar en glass_store.Client solo age y occupation
    -- El procedimiento obtiene automáticamente el fullName desde public.Client
    INSERT INTO glass_store."Client" (id, "fullName", age, job)
    VALUES (p_id, (SELECT "fullName" FROM public."Client" WHERE id = p_id), p_age, p_occupation)
    ON CONFLICT (id) DO UPDATE SET
        age = EXCLUDED.age,
        job = EXCLUDED.job;
    
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error en sp_update_client_extra_data: %', SQLERRM;
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Vista que combina datos de ambos esquemas
-- Esta vista permite leer los datos de public.Client y glass_store.Client
CREATE OR REPLACE VIEW glass_store.client_view AS
SELECT 
    p.id,
    p."RUC" as ruc,
    p."fullName" as full_name,
    p.email,
    p.phone,
    p.address,
    p."createdAt" as created_at,
    p."updatedAt" as updated_at,
    p."clientTypeId" as client_type_id,
    p."enterpriseId" as enterprise_id,
    -- Campos del esquema glass_store (si existen)
    COALESCE(gs.age, 0) as age,
    COALESCE(gs.job, '') as occupation
FROM public."Client" p
LEFT JOIN glass_store."Client" gs ON p.id = gs.id
WHERE p."enterpriseId" = '2'; 