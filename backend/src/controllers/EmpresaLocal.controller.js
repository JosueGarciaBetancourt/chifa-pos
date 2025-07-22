import { EmpresaLocal } from '../../../electron/database/models/empresaLocal.js';

export const empresaLocalController = {
  getAll: async (req, res) => {
    try {
      const empresas = await EmpresaLocal.selectAll();
      res.json(empresas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const empresa = await EmpresaLocal.findById(req.params.id);
      if (!empresa) return res.status(404).json({ error: 'Empresa no encontrada' });
      res.json(empresa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaEmpresa = await EmpresaLocal.create(req.body);
      res.status(201).json(nuevaEmpresa);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const empresaActualizada = await EmpresaLocal.update(
        req.params.id, 
        req.body
      );
      res.json(empresaActualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await EmpresaLocal.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};