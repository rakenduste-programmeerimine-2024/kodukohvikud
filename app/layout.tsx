
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col items-center min-h-screen bg-blue-100">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-blue-100">
  <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
    {/* Logo */}
    <div className="flex gap-5 items-center font-semibold">
      <Link href={"/"}>
        <img src="/logo.png" alt="Home" className="w-25 h-20" />
      </Link>
    </div>

    {/* Nupud */}
    <div className="flex space-x-6 justify-center flex-1">
      <Link
        href="/"
        className="bg-white text-black hover:bg-red-400 hover:text-white py-2 px-4 rounded-md"
      >
        Kodukohvikud
      </Link>
      <Link
        href="/about"
        className="bg-white text-black hover:bg-red-400 hover:text-white py-2 px-4 rounded-md"
      >
        Lisa oma kohvik
      </Link>
      <Link
        href="/services"
        className="bg-white text-black hover:bg-red-400 hover:text-white py-2 px-4 rounded-md"
      >
        Kontakt
      </Link>
    </div>

    {/* Sign-in / HeaderAuth */}
    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
  </div>
</nav>


            <main className="flex-1 w-full max-w-5xl p-5">
              {children}
            </main>

            <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
              <p>
                Powered by{" "}
                <a
                  href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  Supabase
                </a>
              </p>
              <ThemeSwitcher />
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
