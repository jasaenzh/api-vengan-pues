import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/utils/mongoose"
import Apartamento, { IApartamento } from "@/models/Apartamento";
import { HydratedDocument } from 'mongoose';


dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {

    // Metodo GET - Trae todos los apartamentos
    case "GET":
      try {
        const getApartamentos = await Apartamento.find();
        return res.status(200).json(getApartamentos)
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).json({ message: error.message });
        } else {
          return res.status(500).json({ message: "Error desconocido" });
        }
      }

    // Metodo POST - Crea el apartamento
    case "POST":
      try {
        const newApartamento: HydratedDocument<IApartamento> = new Apartamento(body)
        const saveApartamento = await newApartamento.save();
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
