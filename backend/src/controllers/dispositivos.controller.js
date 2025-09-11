import { Dispositivo } from '../../../electron/database/models/Dispositivo.js';

export const dispositivosController = {
  getDispositivos: async (req, res) => {
    try {
      const dispositivos = await Dispositivo.selectAll();
      res.json(dispositivos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getDispositivoById: async (req, res) =>{
    try {
      const dispositivo = await Dispositivo.findById(req.params.id);
      if (!dispositivo) return res.status(404).json({ error: 'Dispositivo no encontrado' });
      res.json(dispositivo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getDispositivoByMac: async (req, res) => {
    try {
      const dispositivo = await Dispositivo.findByMac(req.params.mac);
      if (!dispositivo) return res.status(404).json({ error: 'Dispositivo no encontrado' });
      res.json(dispositivo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getDispositivosActive: async (req, res) => {
    try {
      const dispositivos = await Dispositivo.selectActive();
      res.json(dispositivos || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getDispositivosInactive: async (req, res) => {
    try {
      const dispositivos = await Dispositivo.selectInactive();
      res.json(dispositivos || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  createDispositivo: async (req, res) => {
    try {
      const nuevoDispositivo = await Dispositivo.create(req.body);
      res.status(201).json(nuevoDispositivo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateDispositivo: async (req, res) => {
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

  disableDispositivo: async (req, res) => {
    try {
      await Dispositivo.disable(req.params.mac);
      res.status(200).json({ disabled: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  enableDispositivo: async (req, res) => {
    try {
      const dispositivoEnabled = await Dispositivo.enable(req.params.mac);
      res.status(200).json(dispositivoEnabled);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteDispositivo: async (req, res) => {
    try {
      await Dispositivo.delete(req.params.mac);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};