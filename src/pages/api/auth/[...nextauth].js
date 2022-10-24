import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../utils/mongoDb";

// create a cookie-session auth
// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   // A database is optional, but required to persist accounts in a database
//   database: process.env.DATABASE_URL,
//   debug: true,
//   secret: process.env.SECRET,
//   session: {
//     jwt: true,
//   },
//   jwt: {
//     secret: process.env.JWT_SECRET,
//   },
//   callbacks: {
//     async jwt(token, user, account, profile, isNewUser) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session(session, token) {
//       session.user.id = token.id;
//       return session;

//     },
//   },
// });

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //   authorizationUrl:
      //     "https://accounts.google.com/o/oauth2/auth?response_type=code&hd=smail.iitm.ac.in", // hosted domain is domain.com
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  // A database is optional, but required to persist accounts in a database
  // database: process.env.MONGODB_URI,
  // adapter: MongoDBAdapter(clientPromise),

  // debug: true,
  // session: {
  //   jwt: true,
  // },
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // },
  // callbacks: {
  //   signIn: async (user, account, profile) => {
  //     console.log(profile, user);
  //     if (
  //       account.provider === "google" &&
  //       profile.email.endsWith("@smail.iitm.ac.in")
  //     ) {
  //       return Promise.resolve(true);
  //     } else {
  //       return Promise.resolve(false);
  //     }
  //   },
  // },

  //   // async jwt(token, user, account, profile, isNewUser) {
  //   //   if (user) {
  //   //     token.id = user.id;
  //   //   }
  //   //   return token;
  //   // },
  //   // async session(session, token) {
  //   //   session.user.id = token.id;
  //   //   return session;
  //   // },
  // },
};

export default NextAuth(authOptions);
