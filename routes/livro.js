const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM livro', (err, rows) => {
    if (err) return res.status(500).json({ erro: 'Erro ao consultar o banco' });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM livro WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ erro: 'Erro ao consultar o banco' });
    if (rows.length === 0) return res.status(404).json({ erro: 'Livro nao encontrado' });
    res.json(rows[0]);
  });
});

router.post('/', (req, res) => {
  const { titulo, autor, isbn } = req.body;
  if (!titulo || !autor || !isbn) {
    return res.status(400).json({ erro: 'Informe titulo, autor e isbn' });
  }
  db.query('INSERT INTO livro (titulo, autor, isbn) VALUES (?, ?, ?)',
    [titulo, autor, isbn], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao inserir livro' });
      res.status(201).json({ id: result.insertId, titulo, autor, isbn });
    });
});

router.put('/:id', (req, res) => {
  const { titulo, autor, isbn } = req.body;
  if (!titulo || !autor || !isbn) {
    return res.status(400).json({ erro: 'Informe titulo, autor e isbn' });
  }
  db.query('UPDATE livro SET titulo = ?, autor = ?, isbn = ? WHERE id = ?',
    [titulo, autor, isbn, req.params.id], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao atualizar livro' });
      if (result.affectedRows === 0) return res.status(404).json({ erro: 'Livro nao encontrado' });
      res.json({ id: Number(req.params.id), titulo, autor, isbn });
    });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM livro WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao excluir livro' });
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Livro nao encontrado' });
    res.json({ mensagem: 'Livro excluido com sucesso' });
  });
});

module.exports = router;
