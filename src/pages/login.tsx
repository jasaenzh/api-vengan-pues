import React, { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';


function LoginPage() {

  // Estado que guarda las credenciales emial y contraseña
  const [credenciales, setCredenciales] = useState({
    email: '',
    password: ''
  })

  const router = useRouter()

  // Funcion que captura los valores del input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {

    // El evento target.value es el valor que se va tipeando en el input
    // El evento target.name es atributo name del input
    setCredenciales({
      ...credenciales,
      [event.target.name]: event.target.value
    })
  }

  interface Login {
    email: string,
    password: string
  }

  // Funcion para enviar los datos a la BD (prevent default detiene el comportamiento del form)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axios.post<Login>('/api/auth/login', credenciales)

    if (response.status === 200) {
      router.push('/dashboard')
    }

  }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" id="email" placeholder='email' onChange={handleChange} />
        <input type="password" name="password" id="password" placeholder='password' onChange={handleChange} />
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginPage