const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('students.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

const sql_create = `CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    gender TEXT NOT NULL,
    age TEXT
);`;

db.run(sql_create, (err) => {
    if (err) {
        console.error('Error al crear la tabla:', err.message);
    } else {
        console.log('Tabla "students" creada o ya existe.');
    }
});

module.exports = db;
