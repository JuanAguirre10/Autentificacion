import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 3;
const LOCK_TIME = 30 * 1000;

function getUsersPath() {
  // Vercel filesystem is read-only; /tmp is writable but ephemeral
  return process.env.NODE_ENV === "production"
    ? "/tmp/users.json"
    : path.join(process.cwd(), "data", "users.json");
}

function getUsers() {
  const usersPath = getUsersPath();
  if (!fs.existsSync(usersPath)) return [];
  return JSON.parse(fs.readFileSync(usersPath, "utf-8"));
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const now = Date.now();

        const attempts = loginAttempts.get(email);
        if (attempts && attempts.count >= MAX_ATTEMPTS) {
          if (now - attempts.lastAttempt < LOCK_TIME) {
            throw new Error("AccountLocked");
          }
          loginAttempts.delete(email);
        }

        const users = getUsers();
        const user = users.find((u: { email: string }) => u.email === email);

        if (!user || !(await bcrypt.compare(credentials.password as string, user.password))) {
          const current = loginAttempts.get(email) || { count: 0, lastAttempt: 0 };
          loginAttempts.set(email, { count: current.count + 1, lastAttempt: now });
          return null;
        }

        loginAttempts.delete(email);
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/signIn",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
