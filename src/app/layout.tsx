import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import Provider from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Auth App",
  description: "My Next Auth App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}>
        <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold text-indigo-600 tracking-tight">
              MyAuthApp
            </Link>

            <nav className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="text-sm text-gray-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Dashboard
              </Link>

              {session?.user && (
                <Link
                  href="/profile"
                  className="text-sm text-gray-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Perfil
                </Link>
              )}

              {session?.user?.image && (
                <Image
                  height={32}
                  width={32}
                  src={session.user.image}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full ring-2 ring-indigo-100 ml-1"
                />
              )}

              {session?.user && <LogoutButton />}

              {!session?.user && (
                <Link
                  href="/signIn"
                  className="text-sm bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Iniciar Sesión
                </Link>
              )}
            </nav>
          </div>
        </header>

        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
