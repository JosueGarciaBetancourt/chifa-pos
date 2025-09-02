import { MovimientoCaja } from '../../../electron/database/models/MovimientoCaja.js';

export const movimientosCajaController = {
  getMovimientosCaja: async (req, res) => {
    try {
      const movimientos = await MovimientoCaja.selectAll();
      res.status(200).json(movimientos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener movimientos de caja', details: error.message });
    }
  },

  getMovimientoCajaById: async (req, res) => {
    try {
      const movimiento = await MovimientoCaja.findById(req.params.id);
      if (!movimiento) {
        return res.status(404).json({ error: 'Movimiento de caja no encontrado' });
      }
      res.status(200).json(movimiento);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener movimiento de caja', details: error.message });
    }
  },

  getMovimientosCajaByJornada: async (req, res) => {
    try {
      const { jornadaId } = req.params;
      const movimientos = await MovimientoCaja.findByJornada(jornadaId);
      res.status(200).json(movimientos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener movimientos por jornada', details: error.message });
    }
  },

  getMovimientosCajaByUsuario: async (req, res) => {
    try {
      const { usuarioId } = req.params;
      const movimientos = await MovimientoCaja.findByUsuario(usuarioId);
      res.status(200).json(movimientos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener movimientos por usuario', details: error.message });
    }
  },

  updateMovimientoCaja: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await MovimientoCaja.update(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Movimiento de caja no encontrado' });
      }
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar movimiento', details: error.message });
    }
  },

  abrirCaja: async (req, res) => {
    try {
      const { usuario_id, monto_inicial } = req.body;
      console.log(usuario_id)
      if (!usuario_id || monto_inicial == null) {
        return res.status(400).json({ error: 'usuarioId y montoInicial son requeridos' });
      }
      const apertura = await MovimientoCaja.abrir(req.body);
      res.status(201).json(apertura);
    } catch (error) {
      res.status(400).json({ error: 'Error al abrir caja', details: error.message });
    }
  },

  cerrarCaja: async (req, res) => {
    try {
      const { usuarioId, montoFinal } = req.body;
      if (!usuarioId || montoFinal == null) {
        return res.status(400).json({ error: 'usuarioId y montoFinal son requeridos' });
      }
      const cierre = await MovimientoCaja.cerrar(req.body);
      res.status(200).json(cierre);
    } catch (error) {
      res.status(400).json({ error: 'Error al cerrar caja', details: error.message });
    }
  },

  ventaCaja: async (req, res) => {
    try {
      const { usuarioId, monto, ventaId } = req.body;
      if (!usuarioId || !monto || !ventaId) {
        return res.status(400).json({ error: 'usuarioId, monto y ventaId son requeridos' });
      }
      const venta = await MovimientoCaja.registrarVenta(req.body);
      res.status(201).json(venta);
    } catch (error) {
      res.status(400).json({ error: 'Error al registrar venta en caja', details: error.message });
    }
  },

  gastoCaja: async (req, res) => {
    try {
      const { usuarioId, monto, descripcion } = req.body;
      if (!usuarioId || !monto || !descripcion) {
        return res.status(400).json({ error: 'usuarioId, monto y descripcion son requeridos' });
      }
      const gasto = await MovimientoCaja.registrarGasto(req.body);
      res.status(201).json(gasto);
    } catch (error) {
      res.status(400).json({ error: 'Error al registrar gasto en caja', details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await MovimientoCaja.delete(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Movimiento de caja no encontrado' });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar movimiento de caja', details: error.message });
    }
  }
};