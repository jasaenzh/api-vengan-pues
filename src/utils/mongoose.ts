import mongoose from 'mongoose';

interface Connection {
  isConnected: boolean;
}

const conn: Connection = {
  isConnected: false,
};

export async function dbConnect() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('La variable de entorno MONGODB_URI no está definida');
    }

    if (conn.isConnected) return;

    await mongoose.connect(process.env.MONGODB_URI);
    conn.isConnected = true;
    console.log(`Conectado a la base de datos: ${mongoose.connection.db.databaseName}`);

  } catch (error) {
    console.log(error);
  }
}

mongoose.connection.on('connected', () => {
  console.log('Estás conectado a MongoDB');
});

mongoose.connection.on('disconnected', () => {
  console.log('Estás desconectado de MongoBD');
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});
