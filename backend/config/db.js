const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // pon tu contraseña si tienes
  database: 'zoologico'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Conectado a la base de datos');
});

module.exports = db;

