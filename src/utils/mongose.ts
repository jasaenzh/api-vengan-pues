import { connect, connection, disconnect } from "mongoose";

interface Connection {
  isConnected: boolean;
}

const conn: Connection = {
  isConnected: false,
};

export async function dbConnect() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("La variable de entorno MONGODB_URI no está definida");
    }

    /**
     * Con este condicional evito que se vuelva a crear la base de datos
     */
    if (conn.isConnected) return;
    const db = await connect(process.env.MONGODB_URI);
    conn.isConnected = db.connection.readyState === 1;
    console.log("Conectado DB:", db.connection.db.databaseName);
  } catch (error) {
    console.log(error);
  }
}

connection.on("connected", () => {
  console.log("Estas conectado a MongoDB");
});

connection.on("disconnected", () => {
  console.log("Estas desconectado de MongoBD");
});

connection.on("error", (err) => {
  console.log(err);
});
