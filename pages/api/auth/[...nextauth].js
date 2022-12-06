import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt"

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: "Connection Failed...!";
        });

        // check User existent
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("No user found with Email please Sign Up !");
        }

        // check Password
        if (
          credentials.password !== result.password ||
          result.email !== credentials.email
        ) {
          throw new Error("User name or password does't match");
        }
        return result;
      },

    }),

  ],
  // secret: "u2Tefj65uWCKJyYrDlCbKJsah2c5YcnqYr6UmTsgLOc=",
  callbacks: {
    // async session({ session, token, user }) {
      // session.user.role = user.role; // Add role value to user object so it is passed along with session
      // return session;
    // }
  },

});
