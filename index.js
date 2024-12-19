const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// Simulando productos con stock
let productos = [
    { id: 1, nombre: "Producto 1", stock: 10, imagen: "url_imagen_1" },
    { id: 2, nombre: "Producto 2", stock: 20, imagen: "url_imagen_2" }
];

// Endpoint para obtener productos
app.get('/api/productos', (req, res) => {
    res.json(productos);
});

// Endpoint para actualizar el stock (solo accesible para el administrador)
app.post('/api/productos/actualizar', (req, res) => {
    const { id, nuevoStock } = req.body;
    
    // Verificar si el usuario es administrador (por ejemplo, usando un token)
    if (/* lógica para verificar que el usuario es admin */) {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            producto.stock = nuevoStock;
            res.json({ producto });
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    } else {
        res.status(403).json({ mensaje: 'No autorizado' });
    }
});

// Puerto de escucha
app.listen(3000, () => {
    console.log('Servidor en funcionamiento');
});
