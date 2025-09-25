import { connection } from '../database/connection.js';
const db = connection();

export class InventarioService {
    static async getInventarioDetallado() {
        const query = `
            SELECT 
                -- Información básica del insumo
                i.id as insumo_id,
                i.nombre as insumo_nombre,
                i.tipo_id,
                ti.nombre as tipo_nombre,
                i.unidad_medida,
                i.stock_minimo as stock_minimo_general,
                
                -- Stock específico por proveedor
                ip.stock_por_proveedor as stock_actual,
                
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
                ip.stock_por_proveedor * COALESCE(
                    (SELECT cip.costo_unitario_real 
                     FROM compras_insumos_proveedores cip 
                     WHERE cip.insumo_proveedor_id = ip.id
                     ORDER BY cip.fecha DESC 
                     LIMIT 1), 
                    ip.costo_unitario_pactado
                ) as valor_stock_proveedor,
                
                -- Estado del stock (basado en stock mínimo general)
                CASE 
                    WHEN ip.stock_por_proveedor <= (i.stock_minimo * 0.5) THEN 'Stock Crítico'
                    WHEN ip.stock_por_proveedor <= i.stock_minimo THEN 'Stock Bajo' 
                    WHEN ip.stock_por_proveedor <= (i.stock_minimo * 1.5) THEN 'Stock Medio'
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
                    WHEN ip.stock_por_proveedor > 0 
                    THEN ROUND(
                        COALESCE(
                            (SELECT SUM(cip.cantidad) 
                             FROM compras_insumos_proveedores cip 
                             WHERE cip.insumo_proveedor_id = ip.id), 0
                        ) / ip.stock_por_proveedor, 2
                    )
                    ELSE 0
                END as rotacion_stock
                
            FROM insumos i
            LEFT JOIN tipos_insumos ti ON i.tipo_id = ti.id
            LEFT JOIN insumos_proveedores ip ON i.id = ip.insumo_id
            LEFT JOIN proveedores p ON ip.proveedor_id = p.id
            WHERE ip.id IS NOT NULL
            ORDER BY i.nombre, p.nombre
        `;
        
        return db.prepare(query).all();
    }
    
    // Método para obtener estadísticas generales del inventario
    static async getEstadisticasInventario() {
        const inventario = await this.getInventarioDetallado();
        
        return {
            total_productos_proveedor: inventario.length,
            stock_critico: inventario.filter(i => i.estado_stock === 'Stock Crítico').length,
            stock_bajo: inventario.filter(i => i.estado_stock === 'Stock Bajo').length,
            stock_medio: inventario.filter(i => i.estado_stock === 'Stock Medio').length,
            stock_ok: inventario.filter(i => i.estado_stock === 'Stock OK').length,
            valor_total_inventario: inventario.reduce((sum, item) => 
                sum + (item.valor_stock_proveedor || 0), 0
            ),
            proveedores_activos: [...new Set(inventario.map(i => i.proveedor_id))].length,
            tipos_insumos: [...new Set(inventario.map(i => i.tipo_nombre))].length
        };
    }
    
    // Método para obtener inventario filtrado por tipo
    static async getInventarioPorTipo(tipoNombre = null) {
        const inventario = await this.getInventarioDetallado();
        
        if (tipoNombre && tipoNombre !== 'Todos') {
            return inventario.filter(item => 
                item.tipo_nombre.toLowerCase().trim() === tipoNombre.toLowerCase().trim()
            );
        }
        
        return inventario;
    }
    
    // Método para obtener items con stock crítico o bajo
    static async getStockBajo() {
        const inventario = await this.getInventarioDetallado();
        return inventario.filter(item => 
            item.estado_stock === 'Stock Crítico' || item.estado_stock === 'Stock Bajo'
        );
    }
}