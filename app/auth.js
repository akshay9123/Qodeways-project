import connectDB from "@/lib/db";
import UserSchema from "@/schema/user.schema";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Please provide all the details like email and password.");
        }

        await connectDB();
        const user = await UserSchema.findOne({ email });

        if (!user) {
          throw new Error("Invalid Email and Password");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Password does not match");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
