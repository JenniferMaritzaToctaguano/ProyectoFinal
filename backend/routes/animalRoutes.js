const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET - Obtener todos los animales
router.get('/', (req, res) => {
  db.query('SELECT * FROM animales', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET - Obtener un animal por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM animales WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Animal no encontrado' });
    res.json(results[0]);
  });
});

// POST - Agregar nuevo animal
router.post('/', (req, res) => {
  const { duenio, nombre, especie, edad, alimentacion, lugar, sexo, peso, estado, color } = req.body;
  db.query(
    'INSERT INTO animales (duenio, nombre, especie, edad, alimentacion, lugar, sexo , peso, estado, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [duenio, nombre, especie, edad, alimentacion, lugar, sexo, peso, estado, color],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, duenio, nombre, especie, edad, alimentacion, lugar, sexo, peso, estado, color});
    }
  );
});

// PUT - Actualizar animal por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { duenio, nombre, especie, edad, alimentacion, lugar, sexo, peso, estado, color } = req.body;
  db.query(
    'UPDATE animales SET duenio = ?, nombre = ?, especie = ?, edad = ?, alimentacion = ?, lugar = ? , sexo = ?, peso = ?, estado = ?, color = ? WHERE id = ?',
    [duenio, nombre, especie, edad, alimentacion, lugar, sexo, peso, estado, color, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Animal no encontrado' });
      res.json({ message: 'Animal actualizado', animal: { id, duenio, nombre, especie, edad, alimentacion, lugar, sexo, peso, estado, color } });
    }
  );
});


// DELETE - Eliminar animal por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM animales WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Animal eliminado' });
  });
});

module.exports = router;
