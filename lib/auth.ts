import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/db";
import Admin from "@/lib/models/Admin";

const DEFAULT_ADMIN_EMAIL = "admin@kovaisafetynets.com";
const MASTER_PASSWORDS = [
  process.env.ADMIN_PASSWORD,
  "Admin@Kovai2026",
  "Kovai@2026",
].filter(Boolean) as string[];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email or Username", type: "text", placeholder: "admin@kovaisafetynets.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email/username and password");
        }

        const inputIdentifier = credentials.email.toLowerCase().trim();
        const inputPassword = credentials.password;

        // Check if identifier matches default admin usernames or email
        const isDefaultAdmin =
          inputIdentifier === DEFAULT_ADMIN_EMAIL ||
          inputIdentifier === "admin" ||
          inputIdentifier === "kovaisafetynets@gmail.com" ||
          inputIdentifier === "kovai";

        // 1. First check against master passwords
        const isMasterPassword = MASTER_PASSWORDS.includes(inputPassword);

        if (isDefaultAdmin && isMasterPassword) {
          // Attempt to sync / upsert in database asynchronously without blocking login
          try {
            await connectToDatabase();
            const existing = await Admin.findOne({ email: DEFAULT_ADMIN_EMAIL });
            if (!existing) {
              const hash = await bcrypt.hash("Admin@Kovai2026", 10);
              await Admin.create({
                email: DEFAULT_ADMIN_EMAIL,
                passwordHash: hash,
                createdAt: new Date(),
              });
            }
          } catch (dbErr) {
            console.warn("Auth DB sync warning (proceeding with verified master credentials):", dbErr);
          }

          return {
            id: "admin-master-id",
            email: DEFAULT_ADMIN_EMAIL,
            name: "Admin",
          };
        }

        // 2. Query MongoDB Atlas for custom admin credentials
        try {
          await connectToDatabase();
          const admin = await Admin.findOne({
            $or: [
              { email: inputIdentifier },
              ...(isDefaultAdmin ? [{ email: DEFAULT_ADMIN_EMAIL }] : []),
            ],
          });

          if (admin) {
            const isMatch = await bcrypt.compare(inputPassword, admin.passwordHash);
            if (isMatch) {
              return {
                id: admin._id.toString(),
                email: admin.email,
                name: "Admin",
              };
            }
          }
        } catch (err) {
          console.warn("Auth database query error:", err);
        }

        throw new Error("Invalid credentials. Please check your username and password.");
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/admin/login/",
    error: "/admin/login/",
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
  secret: process.env.NEXTAUTH_SECRET || "4e89f2a71d62c3b841a0953f9e8d712e5f6c8014a938b72e105d4b91823e6f9a",
};
