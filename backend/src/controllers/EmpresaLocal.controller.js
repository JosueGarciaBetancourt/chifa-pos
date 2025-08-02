import { EmpresaLocal } from '../../../electron/database/models/empresaLocal.js';

export const empresaLocalController = {
  getEmpresaLocalAll: async (req, res) => {
    try {
      const empresas = await EmpresaLocal.selectAll();
      res.json(empresas || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getEmpresaLocalActive: async (req, res) => {
    try {
      const empresas = await EmpresaLocal.selectActive();
      res.json(empresas || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getEmpresaLocalInactive: async (req, res) => {
    try {
      const empresas = await EmpresaLocal.selectInactive();
      res.json(empresas || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getEmpresaLocalPrincipal: async (req, res) => {
    try {
      const empresa = await EmpresaLocal.selectPrincipal();
      console.log(empresa || []);
      res.json(empresa || []);
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
      res.json(empresaActualizada || []);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  disableEmpresaLocal: async (req, res) => {
    try {
      await EmpresaLocal.disable(req.params.id);
      res.status(200).json({ disabled: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  enableEmpresaLocal: async (req, res) => {
    try {
      const empresaEnabled = await EmpresaLocal.enable(req.params.id);
      res.status(200).json(empresaEnabled);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};