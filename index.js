const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());

// Datos iniciales del catálogo
let productos = [
  { id: 1, nombre: "Producto 1", stock: 15, imagen: "https://via.placeholder.com/200?text=Producto+1" },
  { id: 2, nombre: "Producto 2", stock: 8, imagen: "https://via.placeholder.com/200?text=Producto+2" },
  { id: 3, nombre: "Producto 3", stock: 20, imagen: "https://via.placeholder.com/200?text=Producto+3" }
];

// Ruta para obtener los productos
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// Ruta para actualizar el stock de un producto
app.post('/api/productos/actualizar', (req, res) => {
  const { id, nuevoStock } = req.body;
  const producto = productos.find(p => p.id === id);

  if (producto) {
    producto.stock = nuevoStock;
    res.json({ mensaje: "Stock actualizado correctamente", producto });
  } else {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  }
});

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
