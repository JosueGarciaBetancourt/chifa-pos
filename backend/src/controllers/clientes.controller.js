import { Cliente } from '../../../electron/database/models/Cliente.js';

export const clientesController = {
  getClientes: async (req, res) => {
    try {
      const clientes = await Cliente.selectAll();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getClienteById: async (req, res) => {
    try {
      const cliente = await Cliente.findById(req.params.id);
      if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getClienteByDni: async (req, res) => {
    try {
      const cliente = await Cliente.findByDni(req.params.dni);
      if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getClientesActive: async (req, res) => {
    try {
      const clientes = await Cliente.selectActive();
      res.json(clientes || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getClientesInactive: async (req, res) => {
    try {
      const clientes = await Cliente.selectInactive();
      res.json(clientes || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCliente: async (req, res) => {
    try {
      const nuevoCliente = await Cliente.create(req.body);
      res.status(201).json(nuevoCliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateCliente: async (req, res) => {
    try {
      const clienteActualizado = await Cliente.update(req.params.id, req.body);
      res.json(clienteActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  disableCliente: async (req, res) => {
    try {
      await Cliente.disable(req.params.id);
      res.status(200).json({ disabled: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  enableCliente: async (req, res) => {
    try {
      const clienteEnabled = await Cliente.enable(req.params.id);
      res.status(200).json(clienteEnabled);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCliente: async (req, res) => {
    try {
      await Cliente.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};