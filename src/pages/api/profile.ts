import { NextApiRequest, NextApiResponse } from "next";
import { verify, JwtPayload } from 'jsonwebtoken'

export default function profileHandler(req: NextApiRequest, res: NextApiResponse) {
  const { myTokenName } = req.cookies;

  if (!myTokenName) {
    return res.status(401).json({ error: "no token" })
  }

  try {
    if (typeof myTokenName !== 'string') {
      // En este caso, la cookie no está definida o no es una cadena
      return res.status(400).json({ message: 'Cookie no válida' });
    }
    const user: string | JwtPayload = verify(myTokenName, 'secret');

    if (typeof user === 'string') {
      // user es una cadena
      return res.status(401).json({ error: 'token invalido' })
    }

    // user es un objeto con propiedades, incluyendo email
    return res.status(200).json({ email: user.email, username: user.username });
  } catch (error) {
    return res.status(401).json({ error: 'token invalido' })
  }

}
