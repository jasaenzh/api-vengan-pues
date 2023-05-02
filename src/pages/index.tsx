import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from "next/router";

interface IUser {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

function IndexPage() {
  const { data: session, status } = useSession();
  const user: IUser = session?.user ?? {};

  const router = useRouter();

  console.log("session:", session, "status:", status);

  // Cargando aplicacion
  if (status === 'loading') {
    return (
      <div>
        <p>...cargando</p>
      </div>
    )
  }

  // Si no esta logueado lo envio a login
  if (status === 'unauthenticated') {
    router.push('/login')
  }

  // Renderizado
  return (
    <div>
      {
        // Valido si vienen datos
        session ?
          // Si vienen datos muestro lo siguiente
          (
            <div>
              <h1>Bienvenido, {user?.name}</h1>
              {user?.image && (
                <Image src={user.image} alt={user.name || ''} width={40} height={40} />
              )}

            </div>
          )
          : (
            // Si no hay datos muestro esto pero lo redirigue a Login
            <div>

              <h1>redireccionando a login</h1>

            </div>
          )
      }

    </div>
  );
}

export default IndexPage;
