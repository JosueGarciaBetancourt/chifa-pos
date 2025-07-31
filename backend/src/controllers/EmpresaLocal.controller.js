import { EmpresaLocal } from '../../../electron/database/models/empresaLocal.js';

export const empresaLocalController = {
  getEmpresaLocal: async (req, res) => {
    try {
      const empresas = await EmpresaLocal.selectPrincipal();
      res.json(empresas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getEmpresaLocalById: async (req, res) => {
    try {
      const empresa = await EmpresaLocal.findById(req.params.id);
      if (!empresa) return res.status(404).json({ error: 'Empresa no encontrada' });
      res.json(empresa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateEmpresaLocal: async (req, res) => {
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

  deleteEmpresaLocal: async (req, res) => {
    try {
      await EmpresaLocal.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};