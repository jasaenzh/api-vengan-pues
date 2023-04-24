import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/utils/mongoose"
import { getApartamentos } from "@/controllers/apartamentos";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      getApartamentos(req, res);
      break;

    case "POST":
      return res.status(200).json("Creando apartamento");

    default:
      return res.status(400).json("Metodo incorrecto");
  }
};
