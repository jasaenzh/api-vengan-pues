import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/utils/mongoose"
import Apartamento from "@/models/Apartamento";
import getPagination from "@/libs/getPagination";

dbConnect();

interface QueryParams {
  size?: string | string[];
  page?: string | string[];
  numeroApartamento?: string | string[];
}

type Condicion = { numeroApartamento?: string } | { numeroApartamento: { $regex: RegExp; $options: string } };

interface PaginationOptions {
  page?: number;
  limit?: number;
  query?: Condicion;
}


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  const { size, page, numeroApartamento } = req.query as QueryParams;

  switch (method) {
    // Metodo GET
    case "GET":
      try {

        const condicion: Condicion = numeroApartamento
          ? {
            numeroApartamento: {
              $regex: new RegExp(numeroApartamento as string),
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

        const getApartamentos = await Apartamento.paginate(paginationOptions);

        return res.status(200).json(getApartamentos)

      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).json({ message: error.message });
        } else {
          return res.status(500).json({ message: "Error desconocido" });
        }
      }

    // Metodo POST
    case "POST":

      try {
        const newApartamento = new Apartamento(body)
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
