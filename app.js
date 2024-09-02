const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json());


app.get('/students', (req, res) => {
    const sql = 'SELECT * FROM students';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.get('/student/:id', (req, res) => {
    const sql = 'SELECT * FROM students WHERE id = ?';
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

app.post('/students', (req, res) => {
    const { firstname, lastname, gender, age } = req.body;
    const sql = 'INSERT INTO students (firstname, lastname, gender, age) VALUES (?, ?, ?, ?)';
    const params = [firstname, lastname, gender, age];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, firstname, lastname, gender, age }
        });
    });
});


app.put('/student/:id', (req, res) => {
    const { firstname, lastname, gender, age } = req.body;
    const sql = 'UPDATE students SET firstname = ?, lastname = ?, gender = ?, age = ? WHERE id = ?';
    const params = [firstname, lastname, gender, age, req.params.id];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": { id: req.params.id, firstname, lastname, gender, age }
        });
    });
});


app.delete('/student/:id', (req, res) => {
    const sql = 'DELETE FROM students WHERE id = ?';
    const params = [req.params.id];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "success", "deleted_id": req.params.id });
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
