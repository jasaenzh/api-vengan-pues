import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);

  const { method } = req;

  switch (method) {
    case "GET":
      return res.status(200).json("Obteniendo un unico apartamento");

    case "PUT":
      return res.status(200).json("actualizando un unico apartamento");

    case "DELETE":
      return res.status(200).json("eliminando un unico apartamento");

    default:
      return res.status(400).json("Metodo incorrecto");
  }
};
