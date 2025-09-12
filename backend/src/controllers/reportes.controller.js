import { Reporte } from '../../../electron/database/models/Reporte.js';

export const reportesController = {
  // Obtener todos los reportes
  getReportes: async (req, res) => {
    try {
      const reportes = await Reporte.selectAll();
      res.json(reportes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener un reporte por id
  getReporteById: async (req, res) => {
    try {
      const reporte = await Reporte.findById(req.params.id);
      if (!reporte) {
        return res.status(404).json({ error: 'Reporte no encontrado' });
      }
      res.json(reporte);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo reporte
  createReporte: async (req, res) => {
    try {
      const {
        tipo_id,
        usuario_id,
        sede_id,
        titulo,
        descripcion,
        parametros_json,
        ruta_archivo,
        formato_archivo
      } = req.body;

      // Validaciones mínimas
      if (!tipo_id || !usuario_id || !sede_id || !titulo) {
        return res.status(400).json({ error: 'tipo_id, usuario_id, sede_id y titulo son requeridos' });
      }

      const nuevoReporte = await Reporte.create({
        tipo_id,
        usuario_id,
        sede_id,
        titulo,
        descripcion,
        parametros_json,
        ruta_archivo,
        formato_archivo
      });

      res.status(201).json(nuevoReporte);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Actualizar un reporte por id
  updateReporte: async (req, res) => {
    try {
      const updated = await Reporte.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Reporte no encontrado' });
      }
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar un reporte por id
  deleteReporte: async (req, res) => {
    try {
      const deleted = await Reporte.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Reporte no encontrado' });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
