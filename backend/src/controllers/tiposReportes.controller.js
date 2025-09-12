import { TipoReporte } from '../../../electron/database/models/TipoReporte.js';

export const tiposReportesController = {
  getTiposReportes: async (req, res) => {
    try {
      const tipos = await TipoReporte.selectAll();
      res.json(tipos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTipoReporteById: async (req, res) => {
    try {
      const tipo = await TipoReporte.findById(req.params.id);
      if (!tipo) return res.status(404).json({ error: 'Tipo de reporte no encontrado' });
      res.json(tipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};