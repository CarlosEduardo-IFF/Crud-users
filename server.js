const express = require('express');
const { initDB } = require('./db');
const path = require('path');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

initDB().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});
