import { NextApiRequest, NextApiResponse } from "next";
import Apartamento from "@/models/Apartamento";
import { dbConnect } from "@/utils/mongoose";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query: { id } } = req;

  switch (method) {
    // Metodo GET por Id
    case "GET":
      try {
        const getApartamentoById = await Apartamento.findById(id);
        const msgApartamentoNoEncontrado = `Apartamento ${getApartamentoById?.numeroApartamento} no encontrado`
        if (!getApartamentoById) return res.status(404).json({ msg: msgApartamentoNoEncontrado })
        return res.status(200).json(getApartamentoById)
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).json({ msg: error.message });
        } else {
          return res.status(500).json({ msg: "Error desconocido" });
        }
      }

    // Metodo PUT para actualizar 
    case "PUT":
      try {
        const updateApartamento = await Apartamento.findByIdAndUpdate(id, body, { new: true });
        const msgApartamentoNoEncontrado = `Apartamento ${updateApartamento?.numeroApartamento} no encontrado`
        if (!updateApartamento) return res.status(404).json({ msg: msgApartamentoNoEncontrado })
        const msgApartamentoUpdate = `Apartamento ${updateApartamento?.numeroApartamento} actualizado correctamente`
        res.status(200).json({ msg: msgApartamentoUpdate });
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).json({ msg: error.message });
        } else {
          return res.status(500).json({ msg: "Error desconocido" });
        }
      }
      return res.status(200).json("actualizando un unico apartamento");

    case "DELETE":
      try {
        const deleteApartamento = await Apartamento.findByIdAndDelete(id);
        if (!deleteApartamento) return res.status(404).json({ msg: "Apartamento no encontrado" })
        const mensajeEliminado = `Apartamento ${deleteApartamento.numeroApartamento} ha sido borrado de la base de datos`
        return res.status(200).json({ msg: mensajeEliminado })
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
