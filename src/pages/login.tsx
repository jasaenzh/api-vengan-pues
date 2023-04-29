import React, { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { error } from 'console';

function LoginPage() {

  // Estado que guarda las credenciales emial y contraseña
  const [credenciales, setCredenciales] = useState({
    email: '',
    password: ''
  })



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
    console.log(credenciales);
    await axios.post<Login>('/api/auth/login', credenciales)
      .then((response: AxiosResponse<Login>) => {
        const res = response.data
        console.log(res);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      })

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