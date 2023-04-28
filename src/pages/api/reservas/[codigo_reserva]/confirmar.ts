import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/utils/mongoose"
import Reserva from "@/models/Reserva";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { codigo_reserva } = req.query;

  switch (method) {

    // Metodo PUT (Confirmar Reserva)
    case "PUT":
      try {
        const findReserva = await Reserva.findOne({ codigo_reserva })
        if (!findReserva) {
          return res.status(404).json({ msg: "Reserva no encontrada" })
        }
        if (findReserva.estado === "confirmada") return res.status(200).json({ msg: "Reserva ya estaba confirmada" });
        findReserva.estado = "confirmada";
        await findReserva.save();
        return res.status(200).json({ msg: "Reserva confirmada con exito" });

      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).json({ msg: error.message });
        } else {
          return res.status(500).json({ msg: "Error desconocido" });
        }
      }
    default:
      return res.status(400).json({ msg: "Metodo incorrecto" });
  }
};