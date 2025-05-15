const { pool } = require('../db');

exports.getUsers = async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  if (result.rows.length === 0) return res.status(404).send('Usuário não encontrado');
  res.json(result.rows[0]);
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  const result = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  res.status(201).json(result.rows[0]);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id]
  );
  if (result.rows.length === 0) return res.status(404).send('Usuário não encontrado');
  res.json(result.rows[0]);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  if (result.rows.length === 0) return res.status(404).send('Usuário não encontrado');
  res.sendStatus(204);
};
