import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../utils/mongoDb";

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
    // newUser: '/auth/new-user',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user.email.endsWith("@smail.iitm.ac.in")) {
        const client = await clientPromise;
        const db = client.db();
        const users = db.collection("users");
        const userExists = await users.findOne({ email: user.email });

        if (userExists) {
          if (userExists.status === "BANNED") {
            return "/unauthorized";
          }
          return true;
        } else {
          try {
            const result = await users.insertOne({
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

  // A database is optional, but required to persist accounts in a database
  // database: process.env.MONGODB_URI,
  // adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);
