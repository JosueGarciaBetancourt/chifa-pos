import { InventarioService } from '../../../electron/services/InventarioService.js';

export const inventarioController = {
  getInventarioDetallado: async (req, res) => {
    try {
      const inventario = await InventarioService.getInventarioDetallado();
      res.json(inventario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
