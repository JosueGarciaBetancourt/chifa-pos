import { Dispositivo } from '../../../electron/database/models/dispositivo.js';

export const dispositivoController = {
  getAll: async (req, res) => {
    try {
      const dispositivos = await Dispositivo.selectAll();
      res.json(dispositivos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) =>{
    try {
      const dispositivo = await Dispositivo.findById(req.params.id);
      if (!dispositivo) return res.status(404).json({ error: 'Dispositivo no encontrado' });
      res.json(dispositivo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByMac: async (req, res) => {
    try {
      const dispositivo = await Dispositivo.findByMac(req.params.mac);
      if (!dispositivo) return res.status(404).json({ error: 'Dispositivo no encontrado' });
      res.json(dispositivo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoDispositivo = await Dispositivo.create(req.body);
      res.status(201).json(nuevoDispositivo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const dispositivoActualizado = await Dispositivo.update(
        req.params.mac, 
        req.body
      );
      res.json(dispositivoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  actualizarConexion: async (req, res) => {
    try {
      const dispositivo = await Dispositivo.actualizarConexion(
        req.params.mac, 
        req.body.ip_address
      );
      res.json(dispositivo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Dispositivo.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};