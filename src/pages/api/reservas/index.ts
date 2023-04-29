import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/utils/mongoose"
import Reserva, { IReserva } from "@/models/Reserva";
import shortid from 'shortid'
import Apartamento from "@/models/Apartamento";
import { HydratedDocument } from 'mongoose';

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    // Metodo GET
    case "GET":
      try {
        const getReservas = await Reserva.find();
        return res.status(200).json(getReservas);
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).json({ message: error.message });
        } else {
          return res.status(500).json({ message: "Error desconocido" });
        }
      }

    // Metodo POST
    case "POST":
      const { apartamento, fecha_inicio, fecha_fin } = body

      if (!apartamento) {
        return res.status(500).json({ msg: "Falta ingresar el campo apartamento" })
      }

      try {

        // Buscamos primero el apartamento si existe o no
        const findApartamento = await Apartamento.findById(apartamento);

        // Condicional para que no cree la reserva si no encuentra el apartamento
        const msgfindApartamento = `Apartamento ${apartamento} no se encuentra en la base de datos`
        if (!findApartamento) {
          return res.status(404).json({ msg: msgfindApartamento })
        }

        // Aca se crea el codigo de reserva aleatorio (shortid)
        const codigo_reserva = shortid.generate();

        const newReserva: HydratedDocument<IReserva> = new Reserva({
          apartamento: apartamento,
          codigo_reserva: codigo_reserva,
          fecha_inicio: fecha_inicio,
          fecha_fin: fecha_fin,
        })
        const saveApartamento = await newReserva.save();
        return res.status(201).json(saveApartamento)
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).json({ message: error.message });
        } else {
          return res.status(500).json({ message: "Error desconocido" });
        }
      }

    default:
      return res.status(400).json("Metodo incorrecto");
  }
};
