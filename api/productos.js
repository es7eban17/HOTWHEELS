let productos = [
    { id: 1, nombre: 'Vehículo A', stock: 50, imagen: 'https://example.com/imageA.jpg' },
    { id: 2, nombre: 'Vehículo B', stock: 30, imagen: 'https://example.com/imageB.jpg' },
    { id: 3, nombre: 'Vehículo C', stock: 20, imagen: 'https://example.com/imageC.jpg' }
];

export async function handler(req, res) {
    if (req.method === 'GET') {
        // Devolver todos los productos
        return res.status(200).json(productos);
    } else if (req.method === 'POST') {
        const { id, nuevoStock } = req.body;

        // Buscar el producto y actualizar el stock
        const productoIndex = productos.findIndex(p => p.id === id);

        if (productoIndex !== -1) {
            productos[productoIndex].stock = nuevoStock;
            return res.status(200).json({ producto: productos[productoIndex] });
        } else {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    } else {
        return res.status(405).json({ mensaje: 'Método no permitido' });
    }
}
