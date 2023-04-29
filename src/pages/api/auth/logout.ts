import { NextApiRequest, NextApiResponse } from "next";

export default function logoutHandler(req: NextApiRequest, res: NextApiResponse) {

  const { myTokenName } = req.cookies

  if (!myTokenName) {
    return res.status(401).json({ error: "no token" })
  }

}