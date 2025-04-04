const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

//const uri = 'mongodb://localhost:27017';
const uri = 'mongodb+srv://lsantacru:RgjSVAf3MXPv604y@cluster0.4jypsnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        // Seleccionar la base de datos IslaDB
        const db = client.db('IslaDB');
        return db;
    } catch (err) {
        console.error('Error al conectar a MongoDB', err);
    }
}

connectDB().then(db => {
    if (!db) {
        console.error('No se pudo establecer la conexión');
        return;
    }

    // Endpoint para obtener la colección Hogueras
    app.get('/hogueras', async (req, res) => {
        try {
            const collection = db.collection('Hogueras');
            const data = await collection.find({}).toArray();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener Hogueras' });
        }
    });

    // Endpoint para obtener la colección participantes
    app.get('/participantes', async (req, res) => {
        try {
            const collection = db.collection('Participantes');
            const data = await collection.find({}).toArray();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener participantes' });
        }
    });

    // Iniciar el servidor Express
    app.listen(port, () => {
        console.log(`Servidor Express corriendo en el puerto ${port}`);
    });
});