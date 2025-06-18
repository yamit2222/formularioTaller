const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './config/.env' });

// Configuración de Sequelize para MySQL
const sequelize = new Sequelize(
  process.env.DATABASE || 'ysoto_bd',
  process.env.DB_USERNAME || 'ysoto',
  process.env.PASSWORD || 'ysoto2025',
  {
    host: process.env.HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    retry: {
      max: 10,
      match: [
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/,
        /SequelizeConnectionAcquireTimeoutError/
      ]
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  }
);

// Función para conectar a la base de datos con reintentos
const connectWithRetry = async () => {
  let retries = 5;
  
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('✅ Conexión exitosa a la base de datos MySQL!');
      return sequelize;
    } catch (error) {
      retries -= 1;
      console.log(`❌ Error al conectar. Reintentos restantes: ${retries}`);
      console.error('Error:', error.message);
      
      if (retries === 0) {
        throw new Error('No se pudo conectar a la base de datos después de múltiples intentos');
      }
      
      // Esperar 5 segundos antes del siguiente intento
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

module.exports = { sequelize, connectWithRetry };
