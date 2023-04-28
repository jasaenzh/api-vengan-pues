import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/utils/mongoose";
import Reserva from "@/models/Reserva";
import getPagination from "@/libs/getPagination";

dbConnect();

interface QueryParams {
  size?: string | string[];
  page?: string | string[];
  apartamentoId?: string | string[];
}

type Condicion = { apartamentoId?: string } | { apartamentoId: { $regex: RegExp; $options: string } };

interface PaginationOptions {
  page?: number;
  limit?: number;
  query?: Condicion;
  apartamento?: string | string[] | undefined;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { size, page, apartamentoId } = req.query as QueryParams;

  switch (method) {

    // Metodo GET (Obtener Reserva)
    case "GET":

      console.log(apartamentoId);

      try {

        const condicion: Condicion = apartamentoId
          ? {
            apartamentoId: {
              $regex: new RegExp(apartamentoId as string),
              $options: "i",
            },
          }
          : {};

        console.log(condicion);

        const pageAsNumber = typeof page === "string" ? parseInt(page, 10) : undefined;
        const sizeAsNumber = typeof size === "string" ? parseInt(size, 10) : undefined;

        const paginationOptions: PaginationOptions = {
          page: pageAsNumber,
          limit: sizeAsNumber,
          query: condicion,
          apartamento: apartamentoId
        }

        const getReservasApartamento = await Reserva.paginate(paginationOptions);

        console.log(getReservasApartamento);

        return res.status(200).json(getReservasApartamento)

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



// import { NextApiRequest, NextApiResponse } from "next";
// import { dbConnect } from "@/utils/mongoose";
// import Reserva from "@/models/Reserva";

// dbConnect();

// // eslint-disable-next-line import/no-anonymous-default-export
// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const { method } = req;
//   const { apartamentoId, page, limit } = req.query;

//   switch (method) {
//     // Metodo GET (Obtener Reserva)
//     case "GET":
//       try {
//         const currentPage = parseInt(page as string) || 1;
//         const currentLimit = parseInt(limit as string) || 5;
//         const skip = (currentPage - 1) * currentLimit;

//         const count = await Reserva.countDocuments({ apartamento: apartamentoId as string });
//         const totalPages = Math.ceil(count / currentLimit);

//         const getReservasApartamento = await Reserva.find({ apartamento: apartamentoId as string })
//           .skip(skip)
//           .limit(currentLimit);

//         return res.status(200).json({
//           totalDocs: count,
//           totalPages: totalPages,
//           currentPage: currentPage,
//           limit: currentLimit,
//           docs: getReservasApartamento,
//         });
//       } catch (error) {
//         if (error instanceof Error) {
//           return res.status(500).json({ message: error.message });
//         } else {
//           return res.status(500).json({ message: "Error desconocido" });
//         }
//       }

//     default:
//       return res.status(400).json({ msg: "Metodo incorrecto" });
//   }
// };
