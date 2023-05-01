import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // importa JwtPayload de jose para definir el tipo de payload

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const jwt = request.cookies.get('myTokenName');

  if (request.nextUrl.pathname.includes('/dashboard')) {
    if (typeof jwt === 'undefined') { // utiliza 'typeof' para verificar si jwt es undefined
      return NextResponse.redirect(new URL('/login', request.url));
    }

    console.log(jwt);

    try {
      if (typeof jwt === 'undefined') {
        const { payload } = await jwtVerify(jwt, new TextEncoder().encode('secret'));
        console.log(payload);
        console.log("Pasa por aca");
        return NextResponse.next();
      }

    } catch (error) {
      console.error('JWT verification failed:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }