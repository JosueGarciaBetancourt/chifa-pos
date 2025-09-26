import { connection } from '../database/connection.js';
const db = connection();

export class InventarioService {
    static async getInventarioDetallado() {
        const query = `SELECT * FROM inventario_detallado`;
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