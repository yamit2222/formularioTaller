import express from 'express';
import cors from 'cors';
import { sequelize, connectDB } from './config/Configdb.js';
import { PORT } from './config/confidenv.js';
import apiRoutes from './routes/index.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api', apiRoutes);

// Ruta básica de bienvenida
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenido al API de Lubricentro',
    documentation: '/api',
    health: '/api/health'
  });
});

const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Iniciar el servidor
    const port = PORT || 3000;
    app.listen(port, '0.0.0.0', () => {
      console.log(`🚀 Servidor corriendo en el puerto ${port}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejo de señales de terminación
process.on('SIGTERM', async () => {
  console.log('Recibida señal SIGTERM - Cerrando servidor gracefully...');
  try {
    await sequelize.close();
    console.log('✅ Conexión a la base de datos cerrada.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al cerrar la conexión:', error);
    process.exit(1);
  }
});

startServer();