import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//const uri = 'mongodb://localhost:27017';
const uri = 'mongodb+srv://lsantacru:RgjSVAf3MXPv604y@cluster0.4jypsnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
//const uri = 'mongodb://lsantacru:RgjSVAf3MXPv604@ac-lblif0i-shard-00-00.4jypsnv.mongodb.net:27017,ac-lblif0i-shard-00-01.4jypsnv.mongodb.net:27017,ac-lblif0i-shard-00-02.4jypsnv.mongodb.net:27017/?replicaSet=atlas-yl31js-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
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

    // Endpoint para insertar un nuevo documento en la colección Hogueras
    app.post('/hogueras/insert', async (req, res) => {
        try {
            const document = req.body;
            if (!document || Object.keys(document).length === 0) {
                return res.status(400).send('Se requieren datos para la inserción.');
            }
            const result = await db.collection('Hogueras').insertOne(document);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).send('Error al insertar el documento.');
        }
    });

    // Endpoint para editar un dato en la colección Hogueras
    app.put('/hogueras/edit/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            if (!updatedData || Object.keys(updatedData).length === 0) {
                return res.status(400).send('Se requieren datos para la actualización.');
            }
            const result = await db.collection('Hogueras').updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedData }
            );
            if (result.matchedCount === 0) {
                return res.status(404).send('Documento no encontrado.');
            }
            res.json(result);
        } catch (err) {
            res.status(500).send('Error al editar el documento. ' + err);
        }
    });

    // Endpoint para eliminar un dato en la colección Hogueras
    app.delete('/hogueras/delete/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const result = await db.collection('Hogueras').deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                return res.status(404).send('Documento no encontrado.');
            }
            res.json(result);
        } catch (err) {
            res.status(500).send('Error al eliminar el documento. ' + err);
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

    app.post('/participantes/insert', async (req, res) => {
        try {
            const document = req.body;
            if (!document || Object.keys(document).length === 0) {
                return res.status(400).send('Se requieren datos para la inserción.');
            }
            const result = await db.collection('Participantes').insertOne(document);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).send('Error al insertar el documento.');
        }
    });
    
    app.put('/participantes/edit/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            if (!updatedData || Object.keys(updatedData).length === 0) {
                return res.status(400).send('Se requieren datos para la actualización.');
            }
            const result = await db.collection('Participantes').updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedData }
            );
            if (result.matchedCount === 0) {
                return res.status(404).send('Documento no encontrado.');
            }
            res.json(result);
        } catch (err) {
            res.status(500).send('Error al editar el documento. ' + err);
        }
    });
    
    app.delete('/participantes/delete/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const result = await db.collection('Participantes').deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                return res.status(404).send('Documento no encontrado.');
            }
            res.json(result);
        } catch (err) {
            res.status(500).send('Error al eliminar el documento. ' + err);
        }
    });

    // Iniciar el servidor Express
    app.listen(port, () => {
        console.log(`Servidor Express corriendo en el puerto ${port}`);
    });
});