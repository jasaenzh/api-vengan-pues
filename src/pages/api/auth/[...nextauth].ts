import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github';

interface IProvider {
  clientId: string,
  clientSecret: string
}

const providers: IProvider[] = [
  {
    clientId: process.env.AUTH_CLIENT_ID_GITHUB ?? '',
    clientSecret: process.env.AUTH_CLIENT_SECRET_GITHUB ?? '',
  }
]

export default NextAuth({

  providers: [
    GithubProvider({
      clientId: providers[0].clientId,
      clientSecret: providers[0].clientSecret
    })
  ]

})
