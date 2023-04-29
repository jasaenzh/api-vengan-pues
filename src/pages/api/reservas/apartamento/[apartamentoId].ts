import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/utils/mongoose";
import Reserva from "@/models/Reserva";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { size, page, apartamentoId } = req.query

  switch (method) {

    // Metodo GET (Obtener Reserva)
    case "GET":

      try {
        const getReserva = await Reserva.find({ apartamento: apartamentoId });
        return res.status(200).json(getReserva)

      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).json({ message: error.message });
        } else {
          return res.status(500).json({ message: "Error desconocido" });
        }
      }

    default:
      return res.status(400).json({ msg: "Metodo incorrecto" });
  }
};
