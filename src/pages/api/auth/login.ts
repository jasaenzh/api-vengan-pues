import { NextApiRequest, NextApiResponse } from "next";
// JSONWebToken se utiliza para obtener un token
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';


export default function loginHandler(req: NextApiRequest, res: NextApiResponse) {

  const { email, password } = req.body

  // Valido credenciales (email y contraseña)
  if (email === 'admin@local.local' && password === 'admin') {
    // Generamos un token (vamos a necesitar de la biblioteca )
    // el metodo sing recibe varios:
    // 1 Parametros = configuracion => exp: cuando expira, email:, username:
    // 2 Parametro = secret (string unico) => se puede reemplazar por una variable de entorno
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      email: 'admin@local.local',
      username: 'jash'
    }, 'secret')

    // Utilizando Cookie configuraciones
    // httpOnly => Solo se puede usar desde http
    // secure debe de usar https, con esta configuracion valida si esta en produccion o no
    // sameSite => desde donde puede acceder (como estoy en un entorno Next (Back/Front) no hay problema)
    // maxAge => Cuando expira
    // path => Desde donde va a acceder 
    const serialized = serialize('myTokenName', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/'
    })
    // Enviamos la respuesta del tokem a una cabecera Header, se debe de tener instalado cookie
    res.setHeader('Set-Cookie', serialized)
    return res.status(200).json("Inicio de sesión exitoso")
  }

  return res.status(401).json({ error: 'email o contraseña invalida' })

}