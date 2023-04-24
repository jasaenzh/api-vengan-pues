import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/utils/mongose";
import Apartamento from "@/models/Apartamento";
import getPagination from "@/libs/getPagination";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      return res.status(200).json("Obteniendo apartamentos");

    case "POST":
      return res.status(200).json("Creando apartamento");

    default:
      return res.status(400).json("Metodo incorrecto");
  }
};
