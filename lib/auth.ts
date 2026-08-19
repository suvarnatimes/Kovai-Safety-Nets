import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/db";
import Admin from "@/lib/models/Admin";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }

        await connectToDatabase();

        const inputEmail = credentials.email.toLowerCase().trim();
        let admin = await Admin.findOne({ email: inputEmail });

        // Auto-seed initial admin if admins collection is empty or if logging in as admin@kovaisafetynets.com for the first time
        if (!admin) {
          const totalAdmins = await Admin.countDocuments();
          if (totalAdmins === 0 || inputEmail === "admin@kovaisafetynets.com") {
            const defaultPassword = "Admin@Kovai2026";
            const passwordHash = await bcrypt.hash(defaultPassword, 10);
            admin = await Admin.create({
              email: "admin@kovaisafetynets.com",
              passwordHash,
              createdAt: new Date(),
            });
            console.log("Auto-seeded initial admin user in MongoDB Atlas.");
          }
        }

        if (!admin) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, admin.passwordHash);

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: admin._id.toString(),
          email: admin.email,
          name: "Admin",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as { id?: string; email?: string }).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "default_secret_for_kovai_safety_nets_2026",
};
