const express = require('express');
const cors = require('cors');
const { sequelize, connectWithRetry } = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);

// Ruta básica
app.get('/', (req, res) => {
  res.json({ message: 'API de Lubricentro funcionando correctamente' });
});

const startServer = async () => {
  try {
    // Intentar conectar a la base de datos con reintentos
    await connectWithRetry();

    // Sincronizar los modelos con la base de datos
    await sequelize.sync();
    console.log('Base de datos sincronizada');

    // Iniciar el servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejo de señales de terminación
process.on('SIGTERM', async () => {
  console.log('Recibida señal SIGTERM - Cerrando servidor gracefully...');
  try {
    await sequelize.close();
    console.log('Conexión a la base de datos cerrada.');
    process.exit(0);
  } catch (error) {
    console.error('Error al cerrar la conexión:', error);
    process.exit(1);
  }
});

startServer();