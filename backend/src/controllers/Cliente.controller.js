import { Cliente } from '../../../electron/database/models/cliente.js';

export const clienteController = {
  getAll: async (req, res) => {
    try {
      const clientes = await Cliente.selectAll();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const cliente = await Cliente.findById(req.params.id);
      if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByDni: async (req, res) => {
    try {
      const cliente = await Cliente.findByDni(req.params.dni);
      if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoCliente = await Cliente.create(req.body);
      res.status(201).json(nuevoCliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const clienteActualizado = await Cliente.update(req.params.id, req.body);
      res.json(clienteActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Cliente.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};