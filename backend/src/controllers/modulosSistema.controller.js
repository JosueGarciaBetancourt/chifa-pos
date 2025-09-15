import { ModuloSistema } from '../../../electron/database/models/ModuloSistema.js';

export const modulosSistemaController = {
  getModulosSistema: async (req, res) => {
    try {
      const modulosSistema = await ModuloSistema.selectAll();
      res.json(modulosSistema || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getModuloSistemaById: async (req, res) => {
    try {
      const moduloSistema = await ModuloSistema.findById(req.params.id);
      if (!moduloSistema) return res.status(404).json({ error: 'Módulo del Sistema no encontrado' });
      res.json(moduloSistema);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getModulosSistemaActive: async (req, res) => {
    try {
      const modulosSistema = await ModuloSistema.selectActive();
      res.json(modulosSistema || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getModulosSistemaInactive: async (req, res) => {
    try {
      const modulosSistema = await ModuloSistema.selectInactive();
      res.json(modulosSistema || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  disableModuloSistema: async (req, res) => {
    try {
      await ModuloSistema.disable(req.params.id);
      res.status(200).json({ disabled: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  enableModuloSistema: async (req, res) => {
    try {
      const moduloSistemaEnabled = await ModuloSistema.enable(req.params.id);
      res.status(200).json(moduloSistemaEnabled);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};