///Aqui va el servidor de express
/// La conexion a las bases
/// de datos y la configuracion de las rutas (endpoints)



// test

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

// URI de conexión a MongoDB
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Conectar a la base de datos
let db;
client.connect()
    .then(() => {
        console.log('Conexión exitosa a la base de datos MongoDB');
        db = client.db('IslaDB'); // Obtener referencia a la base de datos
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Detiene la app si hay error crítico
    });

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de prueba para obtener datos de una colección (por ejemplo, "users")
app.get('/users', async (req, res) => {
    try {
        const usersCollection = db.collection('users'); // Acceder a la colección
        const users = await usersCollection.find({}).toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});


// app.get('/coches', async (req, res) => {
//   try {
//     await client.connect();
//     const database = client.db('IslaDB');
//     const collection = database.collection('co');
//     const data = await collection.find({}).toArray();
//     res.json(data);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Error al obtener datos de coches' });
//   } finally {
//     await client.close();
//   }
// });

// app.post('/coches', async (req, res) => {
//   try {
//     await client.connect();
//     const database = client.db('IslaDB');
//     const collection = database.collection('co');
//     const newCocheData = req.body;
//     const result = await collection.insertOne(newCocheData);
//     res.json(result.ops[0]);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Error al agregar el coche' });
//   } finally {
//     await client.close();
//   }
// });

// app.delete('/coches/:id', async (req, res) => {
//   try {
//     await client.connect();
//     const database = client.db('coches');
//     const collection = database.collection('co');
//     const cocheId = req.params.id;
//     const result = await collection.deleteOne({ _id: new ObjectId(cocheId) });

//     if (result.deletedCount === 1) {
//       res.status(200).json({ message: 'Coche eliminado con éxito' });
//     } else {
//       res.status(404).json({ error: 'Coche no encontrado' });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Error al eliminar el coche' });
//   } finally {
//     await client.close();
//   }
// });

// app.listen(port, () => {
//   console.log(`Servidor en funcionamiento en http://localhost:${port}/coches`);
// });

// fi test