import CredentialsProvider from "next-auth/providers/credentials";

import GoogleProvider from "next-auth/providers/google";

import User  from "@/model/user";

import bcrypt from "bcrypt";

import dbConnect from "./dbConnect";


export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await dbConnect();
        const { email, password } = credentials;

        const user = await User.findOne({ email });

        if (!user?.password) {
          throw new Error("Pleasse login via the method used  to sign up");
        }

        const isPasswordValid =
          user && (await bcrypt.compare(password, user?.password));

        if (!isPasswordValid) {
          throw new Error("invalid email  or password");
        }
        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      await dbConnect();

      const { email } = user;
      let dbUser = await User.findOne({ email: email });

      if (!dbUser) {
        dbUser = await User.create({
          email,
          name: user?.name,
          image: user?.image,
        });
      }

      return true;
    },

    jwt: async ({ token }) => {
      const userByEmail = await User.findOne({ email: token.email });
      if (userByEmail) {
        userByEmail.password = undefined;

        token.user = {
          ...userByEmail.toObject(),

          role: userByEmail.role || "user",
        };
      }

      return token;
    },

    session: async ({ session, token }) => {
      session.user = {
        ...token.user,

        role: token.user.role || "user",
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};