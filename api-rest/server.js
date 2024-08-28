const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'examen3P'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

// Rutas para Proyectos
app.get('/proyectos', (req, res) => {
  db.query('SELECT * FROM Proyectos', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/proyectos', (req, res) => {
  const { Nombre, Descripcion } = req.body;
  db.query('INSERT INTO Proyectos (Nombre, Descripcion) VALUES (?, ?)', [Nombre, Descripcion], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId });
  });
});

app.put('/proyectos/:id', (req, res) => {
  const { id } = req.params;
  const { Nombre, Descripcion } = req.body;
  db.query('UPDATE Proyectos SET Nombre = ?, Descripcion = ? WHERE ProyectoID = ?', [Nombre, Descripcion, id], (err, results) => {
    if (err) throw err;
    res.json({ affectedRows: results.affectedRows });
  });
});

app.delete('/proyectos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Proyectos WHERE ProyectoID = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ affectedRows: results.affectedRows });
  });
});

// Rutas para Empleados
app.get('/empleados', (req, res) => {
  db.query('SELECT * FROM Empleados', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/empleados', (req, res) => {
  const { Nombre, Correo } = req.body;
  db.query('INSERT INTO Empleados (Nombre, Correo) VALUES (?, ?)', [Nombre, Correo], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId });
  });
});

app.put('/empleados/:id', (req, res) => {
  const { id } = req.params;
  const { Nombre, Correo } = req.body;
  db.query('UPDATE Empleados SET Nombre = ?, Correo = ? WHERE EmpleadoID = ?', [Nombre, Correo, id], (err, results) => {
    if (err) throw err;
    res.json({ affectedRows: results.affectedRows });
  });
});

app.delete('/empleados/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Empleados WHERE EmpleadoID = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ affectedRows: results.affectedRows });
  });
});

// Rutas para Tareas
app.get('/tareas', (req, res) => {
  db.query('SELECT * FROM Tareas', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/tareas', (req, res) => {
    const { Nombre, Descripcion, FechaInicio, FechaFin, ProyectoID } = req.body;
    db.query('INSERT INTO Tareas (Nombre, Descripcion, FechaInicio, FechaFin, ProyectoID) VALUES (?, ?, ?, ?, ?)', [Nombre, Descripcion, FechaInicio, FechaFin, ProyectoID], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId });
    });
});

app.put('/tareas/:id', (req, res) => {
  const { id } = req.params;
  const { Nombre, Descripcion, FechaInicio, FechaFin, ProyectoID } = req.body;
  db.query('UPDATE Tareas SET Nombre = ?, Descripcion = ?, FechaInicio = ?, FechaFin = ?, ProyectoID = ? WHERE TareaID = ?', [Nombre, Descripcion, FechaInicio, FechaFin, ProyectoID, id], (err, results) => {
    if (err) throw err;
    res.json({ affectedRows: results.affectedRows });
  });
});

app.delete('/tareas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Tareas WHERE TareaID = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ affectedRows: results.affectedRows });
  });
});

// Rutas para TareaEmpleado
app.get('/tareaEmpleado', (req, res) => {
  db.query('SELECT * FROM TareaEmpleado', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/tareaEmpleado', (req, res) => {
  const { TareaID, EmpleadoID } = req.body;
  db.query('INSERT INTO TareaEmpleado (TareaID, EmpleadoID) VALUES (?, ?)', [TareaID, EmpleadoID], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId });
  });
});

app.delete('/tareaEmpleado', (req, res) => {
  const { TareaID, EmpleadoID } = req.body;
  db.query('DELETE FROM TareaEmpleado WHERE TareaID = ? AND EmpleadoID = ?', [TareaID, EmpleadoID], (err, results) => {
    if (err) throw err;
    res.json({ affectedRows: results.affectedRows });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
