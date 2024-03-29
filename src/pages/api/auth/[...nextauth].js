import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/signin",
    // newUser: "/auth/new-user",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user.email.endsWith("@smail.iitm.ac.in")) {
        await dbConnect();

        const userExists = await User.findOne({ email: user.email });

        if (userExists) {
          if (userExists.status === "BANNED") {
            return "/unauthorized";
          }
          return true;
        } else {
          try {
            await User.create({
              email: user.email,
              name: user.name,
              image: user.image,
              status: "ACTIVE",
            });
            return true;
          } catch (err) {
            console.log(err);
            return false;
          }
        }
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
