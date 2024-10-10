import CredentialProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import { cookies } from "next/headers";
import axios from "@/configs/axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        mobileNumber: { label: "Mobile number", type: "text " },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { mobileNumber, password } = credentials ?? {};

        if (!mobileNumber || !password) {
          throw new Error("Missing username or password");
        }

        const { data } = await axios.post("login", {
          mobileNumber,
          password,
        });

        if (!data) {
          return null;
        }
        const { user } = data;
        cookies().set("jwtToken", user.token);
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
  pages: {
    signIn: "/login",
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      return { ...session, user: token };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
