import getPagination from "@/libs/getPagination";
import Apartamento from "@/models/Apartamento";
import { NextApiRequest, NextApiResponse } from "next";
import { Error } from "mongoose";

interface QueryParams {
  size?: string | string[];
  page?: string | string[];
  numeroApartamento?: string | string[];
}

// Obtener Apartamentos
export const getApartamentos = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { size, page, numeroApartamento } = req.query as QueryParams;

  try {
    const condicion = numeroApartamento
      ? {
          numeroApartamento: {
            $regex: new RegExp(numeroApartamento as string),
            $options: "i",
          },
        }
      : {};

    const pageAsNumber =
      typeof page === "string" ? parseInt(page, 10) : undefined;
    const sizeAsNumber =
      typeof size === "string" ? parseInt(size, 10) : undefined;

    const { limit, offset } = getPagination(pageAsNumber, sizeAsNumber);

    const obtenerApartamentos = await Apartamento.paginate(condicion, {
      offset: offset,
      limit: limit,
    });
    res.status(200).json(obtenerApartamentos);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error desconocido" });
    }
  }
};

// // Crear Apartamento
// const createApartamento = async (req, res) => {
//   const {
//     numeroApartamento,
//     ubicacion,
//     areaMts,
//     precio,
//     duplex,
//     habitaciones,
//     camasDobles,
//     camasSencillas,
//     camaNido,
//     banos,
//     aguaCaliente,
//     secadorCabello,
//     salaEstar,
//     comedor,
//     sofaCama,
//     televisor,
//     internet,
//     cocina,
//     nevera,
//     lavadora,
//     microondas,
//     cafetera,
//     licuadora,
//     tostadoraPan,
//     ollaPresion,
//     ollaArrocera,
//     sanduchera,
//     camaraSeguridad,
//     terrazaVista,
//   } = req.body;

//   if (!numeroApartamento) {
//     return res
//       .status(500)
//       .json({ message: "Falta el campo Numero de Apartamento" });
//   }

//   if (typeof areaMts === "boolean") {
//     return res
//       .status(500)
//       .json({ message: "El campo area mts no acepta datos booleanos" });
//   }

//   if (typeof precio === "boolean") {
//     return res
//       .status(500)
//       .json({ message: "El campo precio no acepta datos booleanos" });
//   }

//   if (typeof habitaciones === "boolean") {
//     return res
//       .status(500)
//       .json({ message: "El campo habitaciones no acepta datos booleanos" });
//   }

//   if (typeof camasDobles === "boolean") {
//     return res
//       .status(500)
//       .json({ message: "El campo camas dobles no acepta datos booleanos" });
//   }

//   if (typeof camasSencillas === "boolean") {
//     return res
//       .status(500)
//       .json({ message: "El campo camas sencillas no acepta datos booleanos" });
//   }

//   if (typeof camaNido === "boolean") {
//     return res
//       .status(500)
//       .json({ message: "El campo camas nido no acepta datos booleanos" });
//   }

//   if (typeof banos === "boolean") {
//     return res
//       .status(500)
//       .json({ message: "El campo baños no acepta datos booleanos" });
//   }

//   if (typeof secadorCabello === "boolean") {
//     return res.status(500).json({
//       message: "El campo secador de cabello no acepta datos booleanos",
//     });
//   }

//   if (typeof comedor === "boolean") {
//     return res
//       .status(500)
//       .json({ message: "El campo comedor no acepta datos booleanos" });
//   }

//   if (typeof sofaCama === "boolean") {
//     return res
//       .status(500)
//       .json({ message: "El campo sofa cama no acepta datos booleanos" });
//   }

//   if (typeof televisor === "boolean") {
//     return res
//       .status(500)
//       .json({ message: "El campo televisor no acepta datos booleanos" });
//   }

//   try {
//     const newApartamento = new Apartamento({
//       numeroApartamento: numeroApartamento,
//       ubicacion: ubicacion,
//       areaMts: areaMts,
//       precio: precio,
//       duplex: duplex,
//       habitaciones: habitaciones,
//       camasDobles: camasDobles,
//       camasSencillas: camasSencillas,
//       camaNido: camaNido,
//       banos: banos,
//       aguaCaliente: aguaCaliente,
//       secadorCabello: secadorCabello,
//       salaEstar: salaEstar,
//       comedor: comedor,
//       sofaCama: sofaCama,
//       televisor: televisor,
//       internet: internet,
//       cocina: cocina,
//       nevera: nevera,
//       lavadora: lavadora,
//       microondas: microondas,
//       cafetera: cafetera,
//       licuadora: licuadora,
//       tostadoraPan: tostadoraPan,
//       ollaPresion: ollaPresion,
//       ollaArrocera: ollaArrocera,
//       sanduchera: sanduchera,
//       camaraSeguridad: camaraSeguridad,
//       terrazaVista: terrazaVista,
//     });

//     const nuevoApartamento = await newApartamento.save();

//     res.status(200).json({ message: "Apartamento Creado", nuevoApartamento });
//   } catch (error) {
//     res.status(500).json({
//       message:
//         error.message || `Algo salio mal mientras se creaba el apartamento`,
//     });
//   }
// };

// // Obtener apartamentos por Id
// const getApartamentoById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const apartamento = await Apartamento.findById(id);

//     if (!apartamento) {
//       return res.status(404).json({ message: "Apartamento no encontrado" });
//     }

//     res.status(200).json(apartamento);
//   } catch (error) {
//     res.status(500).json({
//       message:
//         `El apartamento con id ${id} no pudo ser obtenido` || error.message,
//     });
//   }
// };

// // Eliminar apartmamento
// const deleteApartamento = async (req, res) => {
//   const { id } = req.params;
//   let EliminarApartamento;
//   try {
//     EliminarApartamento = await Apartamento.findByIdAndDelete(id);
//     res.status(200).json({
//       message: `Apartamento ${EliminarApartamento.numeroApartamento} ha sido eliminado`,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: `El apartamento con id ${id} no existe` || error.message,
//     });
//   }
// };

// // Actualizar apartamento
// const updateApartamento = async (req, res) => {
//   const { id } = req.params;

//   let ActualizarApartamento;
//   try {
//     ActualizarApartamento = await Apartamento.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     if (!ActualizarApartamento) {
//       return res
//         .status(404)
//         .json({ message: `No se encontró el apartamento con id ${id}` });
//     }
//     res.status(200).json({ message: "Apartmanto actualizado" });
//   } catch (error) {
//     res.status(500).json({
//       message: `El apartamento con id ${id} no existe` || error.message,
//     });
//   }
// };
