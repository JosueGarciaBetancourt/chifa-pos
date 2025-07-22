import { JornadasLaborales } from '../../../electron/database/models/jornadaLaboral.js';

export const jornadasLaboralesController = {
  getAll: async (req, res) => {
    try {
      const jornadas = await JornadasLaborales.selectAll();
      res.json(jornadas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const jornada = await JornadasLaborales.findById(req.params.id);
      if (!jornada) return res.status(404).json({ error: 'Jornada no encontrada' });
      res.json(jornada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaJornada = await JornadasLaborales.create(req.body);
      res.status(201).json(nuevaJornada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  finalizar: async (req, res) => {
    try {
      const jornadaFinalizada = await JornadasLaborales.finalizar(req.params.id);
      res.json(jornadaFinalizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  findIniciadaPorUsuario: async (req, res) => {
    try {
      const jornada = await JornadasLaborales.findIniciadaPorUsuario(req.params.usuarioId);
      if (!jornada) return res.status(404).json({ error: 'Jornada no encontrada' });
      res.json(jornada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await JornadasLaborales.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};