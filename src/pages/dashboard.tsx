import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";


function Dashboard() {

  const [user, setUser] = useState({
    email: "",
    username: "",
  })

  const router = useRouter()

  interface Profile {
    email: string,
    username: string
  }

  const getProfile = async () => {
    const response = await axios.get<Profile>('/api/profile')
    setUser(response.data)
  }

  const logout = async () => {
    try {
      await axios.post<Profile>('/api/auth/logout')
      router.push("/login")
    } catch (error) {
      console.log(error);
      router.push("/login")
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
      <button onClick={() => getProfile()}>Obtener perfil</button>
      <button onClick={() => logout()}>Cerrar sesion</button>
    </div>
  )
}

export default Dashboard