import { getSession } from 'next-auth/react'
import { useEffect } from 'react';

function IndexPage() {
  useEffect(() => {
    // Creo una funcion que se invoca sola
    (async () => {
      const session = await getSession()
      console.log(session);
    })()
    console.log("Cargo");
  }, [])
  return (
    <div>
      <h1>Estoy en el Index</h1>
    </div>
  );
}

export default IndexPage;
