import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/utils/mongoose"
import Reserva from "@/models/Reserva";
import getPagination from "@/libs/getPagination";
import shortid from 'shortid'
import Apartamento from "@/models/Apartamento";


dbConnect();

interface QueryParams {
  size?: string | string[];
  page?: string | string[];
  codigo_reserva?: string | string[];
}

type Condicion = { codigo_reserva?: string } | { codigo_reserva: { $regex: RegExp; $options: string } };

interface PaginationOptions {
  page?: number;
  limit?: number;
  query?: Condicion;
}



// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  const { size, page, codigo_reserva } = req.query as QueryParams;

  switch (method) {
    // Metodo GET
    case "GET":
      try {
        const condicion: Condicion = codigo_reserva
          ? {
            codigo_reserva: {
              $regex: new RegExp(codigo_reserva as string),
              $options: "i",
            },
          }
          : {};

        const pageAsNumber = typeof page === "string" ? parseInt(page, 10) : undefined;
        const sizeAsNumber = typeof size === "string" ? parseInt(size, 10) : undefined;


        getPagination(pageAsNumber, sizeAsNumber);

        const paginationOptions: PaginationOptions = {
          page: pageAsNumber,
          limit: sizeAsNumber,
          query: condicion
        }

        const getReservas = await Reserva.paginate(paginationOptions);
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

        const newReserva = new Reserva({
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
