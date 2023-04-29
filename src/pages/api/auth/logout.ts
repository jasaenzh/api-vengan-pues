import { NextApiRequest, NextApiResponse } from "next";
import { verify } from 'jsonwebtoken'
import { serialize } from 'cookie'

export default function logoutHandler(req: NextApiRequest, res: NextApiResponse) {

  const { myTokenName } = req.cookies

  if (!myTokenName) {
    return res.status(401).json({ error: "no token" })
  }

  try {
    verify(myTokenName, 'secret')
    const serialized = serialize('myTokenName', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      maxAge: 0,
      path: '/'
    })
    res.setHeader('Set-Cookie', serialized)
    res.status(200).json("Hasta luego!")
  } catch (error) {
    res.status(401).json('Token invalido')
  }

}