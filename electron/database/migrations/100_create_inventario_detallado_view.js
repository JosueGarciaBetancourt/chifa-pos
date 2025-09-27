// migrations/xxxx_create_inventario_detallado_view.js
export function up(db) {
  db.exec(`
    CREATE VIEW IF NOT EXISTS inventario_detallado AS
    SELECT 
        -- Información básica del insumo
        i.id as insumo_id,
        i.nombre as insumo_nombre,
        i.tipo_id,
        ti.nombre as tipo_nombre,
        i.unidad_medida,
        i.stock_minimo as stock_minimo_general,
        
        -- Stock actual calculado en base a compras (ajusta si tienes tabla de movimientos)
        COALESCE((
          SELECT SUM(cip.cantidad)
          FROM compras_insumos_proveedores cip
          WHERE cip.insumo_proveedor_id = ip.id
        ), 0) as stock_actual,
        
        -- Información del insumo-proveedor
        ip.id as insumo_proveedor_id,
        ip.descripcion,
        ip.costo_unitario_pactado,
        ip.observaciones,
        
        -- Información del proveedor
        p.id as proveedor_id,
        p.nombre as proveedor_nombre,
        p.ruc as proveedor_ruc,
        p.correo as proveedor_correo,
        p.telefono as proveedor_telefono,
        
        -- Último costo real de compra
        (SELECT cip.costo_unitario_real 
         FROM compras_insumos_proveedores cip 
         WHERE cip.insumo_proveedor_id = ip.id
         ORDER BY cip.fecha DESC 
         LIMIT 1) as costo_unitario_real,
        
        -- Información de la última compra
        (SELECT cip.cantidad 
         FROM compras_insumos_proveedores cip 
         WHERE cip.insumo_proveedor_id = ip.id
         ORDER BY cip.fecha DESC 
         LIMIT 1) as ultima_cantidad_comprada,
        
        (SELECT cip.fecha 
         FROM compras_insumos_proveedores cip 
         WHERE cip.insumo_proveedor_id = ip.id
         ORDER BY cip.fecha DESC 
         LIMIT 1) as fecha_ultima_compra,
        
        (SELECT u.nombre || ' ' || COALESCE(u.apellido, '')
         FROM compras_insumos_proveedores cip 
         LEFT JOIN usuarios u ON cip.usuario_id = u.id
         WHERE cip.insumo_proveedor_id = ip.id
         ORDER BY cip.fecha DESC 
         LIMIT 1) as ultimo_usuario_compra,
        
        -- Estadísticas de compras
        (SELECT COUNT(*) 
         FROM compras_insumos_proveedores cip 
         WHERE cip.insumo_proveedor_id = ip.id) as total_compras_realizadas,
        
        (SELECT COALESCE(SUM(cip.cantidad), 0)
         FROM compras_insumos_proveedores cip 
         WHERE cip.insumo_proveedor_id = ip.id) as total_cantidad_comprada,
        
        -- Valor del stock de este proveedor específico
        COALESCE((
          SELECT SUM(cip.cantidad)
          FROM compras_insumos_proveedores cip 
          WHERE cip.insumo_proveedor_id = ip.id
        ), 0) * COALESCE(
            (SELECT cip.costo_unitario_real 
             FROM compras_insumos_proveedores cip 
             WHERE cip.insumo_proveedor_id = ip.id
             ORDER BY cip.fecha DESC 
             LIMIT 1), 
            ip.costo_unitario_pactado
        ) as valor_stock_proveedor,
        
        -- Estado del stock (basado en stock mínimo general)
        CASE 
            WHEN COALESCE((
              SELECT SUM(cip.cantidad)
              FROM compras_insumos_proveedores cip 
              WHERE cip.insumo_proveedor_id = ip.id
            ), 0) <= (i.stock_minimo * 0.5) THEN 'Stock Crítico'
            WHEN COALESCE((
              SELECT SUM(cip.cantidad)
              FROM compras_insumos_proveedores cip 
              WHERE cip.insumo_proveedor_id = ip.id
            ), 0) <= i.stock_minimo THEN 'Stock Bajo' 
            WHEN COALESCE((
              SELECT SUM(cip.cantidad)
              FROM compras_insumos_proveedores cip 
              WHERE cip.insumo_proveedor_id = ip.id
            ), 0) <= (i.stock_minimo * 1.5) THEN 'Stock Medio'
            ELSE 'Stock OK'
        END as estado_stock,
        
        -- Diferencia entre costo pactado y real
        ip.costo_unitario_pactado - COALESCE(
            (SELECT cip.costo_unitario_real 
             FROM compras_insumos_proveedores cip 
             WHERE cip.insumo_proveedor_id = ip.id
             ORDER BY cip.fecha DESC 
             LIMIT 1), 
            ip.costo_unitario_pactado
        ) as diferencia_costo,
        
        -- Días desde última compra
        CASE 
            WHEN (SELECT cip.fecha 
                  FROM compras_insumos_proveedores cip 
                  WHERE cip.insumo_proveedor_id = ip.id
                  ORDER BY cip.fecha DESC 
                  LIMIT 1) IS NOT NULL
            THEN CAST(JULIANDAY('now') - JULIANDAY(( 
                SELECT cip.fecha 
                FROM compras_insumos_proveedores cip 
                WHERE cip.insumo_proveedor_id = ip.id
                ORDER BY cip.fecha DESC 
                LIMIT 1
            )) AS INTEGER)
            ELSE NULL
        END as dias_desde_ultima_compra,
        
        -- Rotación (cuántas veces se ha comprado vs stock actual)
        CASE 
            WHEN COALESCE((
              SELECT SUM(cip.cantidad)
              FROM compras_insumos_proveedores cip 
              WHERE cip.insumo_proveedor_id = ip.id
            ), 0) > 0
            THEN ROUND(
                COALESCE(
                    (SELECT SUM(cip.cantidad) 
                     FROM compras_insumos_proveedores cip 
                     WHERE cip.insumo_proveedor_id = ip.id), 0
                ) / COALESCE((
                  SELECT SUM(cip.cantidad)
                  FROM compras_insumos_proveedores cip 
                  WHERE cip.insumo_proveedor_id = ip.id
                ), 1), 2
            )
            ELSE 0
        END as rotacion_stock
        
    FROM insumos i
    LEFT JOIN tipos_insumos ti ON i.tipo_id = ti.id
    LEFT JOIN insumos_proveedores ip ON i.id = ip.insumo_id
    LEFT JOIN proveedores p ON ip.proveedor_id = p.id
    WHERE ip.id IS NOT NULL
    ORDER BY i.nombre, p.nombre;
  `);
}

export function down(db) {
  db.exec(`DROP VIEW IF EXISTS inventario_detallado;`);
}
