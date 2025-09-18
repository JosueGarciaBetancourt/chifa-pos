import { JornadaLaboral } from '../../../electron/database/models/JornadaLaboral.js';

export const jornadasLaboralesController = {
  getJornadasLaborales: async (req, res) => {
    try {
      const jornadas = await JornadaLaboral.selectAll();
      res.json(jornadas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getJornadaLaboralById: async (req, res) => {
    try {
      const jornada = await JornadaLaboral.findById(req.params.id);
      if (!jornada) return res.status(404).json({ error: 'Jornada laboral no encontrada' });
      res.json(jornada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getJornadaLaboralIniciadaPorUsuarioId: async (req, res) => {
    try {
      const jornada = await JornadaLaboral.findIniciadaPorUsuario(req.params.usuarioId);
      res.json(jornada || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createJornadaLaboral: async (req, res) => {
    try {
      const nuevaJornada = await JornadaLaboral.create(req.body);
      res.status(201).json(nuevaJornada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  finalizarJornadaLaboral: async (req, res) => {
    try {
      const jornada = await JornadaLaboral.findById(req.params.id);
      if (jornada.estado === "finalizada") {
        return res.status(409).json({ error: 'La jornada laboral ya fue finalizada' });
      }
      const jornadaFinalizada = await JornadaLaboral.finalizar(req.params.id);
      res.json(jornadaFinalizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteJornadaLaboral: async (req, res) => {
    try {
      await JornadaLaboral.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};