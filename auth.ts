import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "@/lib/db";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) throw new CredentialsSignin("Email and password required");
        await db();
        const match = await User.findOne({ email }).select("+password +role");
        if (!match) throw new CredentialsSignin("Incorrect email");
        const matchPass = bcrypt.compareSync(password, match.password);
        if (!matchPass) throw new CredentialsSignin("Incorrect password");
        const userData = {
          id: match._id,
          name: match.name,
          email: match.email,
          role: match.role,
        };
        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          await db();
          const match = await User.findOne({ email });
          if (!match) {
            await User.create({ email, name, image, authProviderId: id });
            return true;
          }
          return true;
        } catch (error) {
          throw new Error("error while creating user");
        }
      }

      if (account?.provider === "github") {
        try {
          console.log(user);
          const { email, name, image, id } = user;
          await db();
          const alreadyUser = await User.findOne({ email });

          if (!alreadyUser) {
            await User.create({ email, name, image, authProviderId: id });
          }
          return true;
        } catch (error) {
          throw new Error("Error while creating user");
        }
      }
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});
