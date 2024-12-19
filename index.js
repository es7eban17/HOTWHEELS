const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'tu_secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Datos iniciales del catálogo
let productos = [
  { id: 1, nombre: "Producto 1", stock: 15, imagen: "https://via.placeholder.com/200?text=Producto+1" },
  { id: 2, nombre: "Producto 2", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 3, nombre: "Producto 3", stock: 20, imagen: "https://via.placeholder.com/200?text=Producto+3" },
  { id: 3, nombre: "Producto 4", stock: 20, imagen: "https://via.placeholder.com/200?text=Producto+3" },
  { id: 3, nombre: "Producto 5", stock: 20, imagen: "https://via.placeholder.com/200?text=Producto+3" },
  { id: 3, nombre: "Producto 6", stock: 20, imagen: "https://via.placeholder.com/200?text=Producto+3" },
  { id: 3, nombre: "Producto 7", stock: 20, imagen: "https://via.placeholder.com/200?text=Producto+3" },
  { id: 3, nombre: "Producto 8", stock: 20, imagen: "https://via.placeholder.com/200?text=Producto+3" },
  { id: 3, nombre: "Producto 9", stock: 20, imagen: "https://via.placeholder.com/200?text=Producto+3" },
  { id: 3, nombre: "Producto 10", stock: 20, imagen: "https://via.placeholder.com/200?text=Producto+3" },
  { id: 3, nombre: "Producto 11", stock: 20, imagen: "https://via.placeholder.com/200?text=Producto+3" },
  { id: 2, nombre: "Producto 12", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 13", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 14", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 15", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 16", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 17", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 18", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 19", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 20", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 21", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 22", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 23", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 24", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 25", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 26", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 27", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 28", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 29", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 30", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 31", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 32", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 33", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 34", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 35", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 36", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 37", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 38", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 39", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 40", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 41", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 2", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 42", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 43", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 44", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 45", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 46", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 47", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 48", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 49", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 50", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 51", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 52", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 53", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 2, nombre: "Producto 54", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" }
];

// Usuario y contraseña (en un entorno real, esto debería estar en una base de datos)
const plainPassword = '1918'; // Cambia esto por la contraseña que desees
let user = { username: 'admin', password: '' };

// Encripta la contraseña al iniciar el servidor
bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) {
    console.error('Error al encriptar la contraseña:', err);
  } else {
    user.password = hash;
    console.log('Contraseña encriptada:', hash);
  }
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && await bcrypt.compare(password, user.password)) {
    req.session.user = username;
    res.json({ mensaje: "Inicio de sesión exitoso" });
  } else {
    res.status(401).json({ mensaje: "Credenciales incorrectas" });
  }
});

// Middleware para verificar si el usuario está autenticado
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    res.status(401).json({ mensaje: "No autorizado" });
  }
}

// Ruta para obtener los productos (sin autenticación)
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// Ruta para actualizar el stock de un producto (protegida)
app.post('/api/productos/actualizar', isAuthenticated, (req, res) => {
  const { id, nuevoStock } = req.body;
  const producto = productos.find(p => p.id === id);

  if (producto) {
    producto.stock = nuevoStock;
    res.json({ mensaje: "Stock actualizado correctamente", producto });
  } else {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  }
});

// Ruta secreta para mostrar el formulario de inicio de sesión
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Ruta protegida para el panel de administración
app.get('/admin-dashboard', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
