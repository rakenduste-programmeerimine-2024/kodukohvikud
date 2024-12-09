import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
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
      <body className="text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col items-center min-h-screen" style={{ backgroundImage: "url('/backroundpic.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-brown-600">
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                  <Link href={"/"}>
                    <img src="/logo.png" alt="Home" className="w-25 h-20" />
                  </Link>
                </div>

                <div className="flex space-x-6 justify-center flex-1">
                  <Link
                    href="/KoduKohvikud"
                    className="bg-brown-500 text-white hover:bg-brown-100 hover:text-white py-2 px-4 rounded-md shadow-md"
                  >
                    Kodukohvikud
                  </Link>
                  <Link
                    href="/Lisamine"
                    className="bg-brown-500 text-white hover:bg-brown-100 hover:text-white py-2 px-4 rounded-md shadow-md"
                  >
                    Lisa oma kohvik
                  </Link>
                  <Link
                    href="/Kontakt"
                    className="bg-brown-500 text-white hover:bg-brown-100 hover:text-white py-2 px-4 rounded-md shadow-md"
                  >
                    Kontakt
                  </Link>
                </div>

                {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
              </div>
            </nav>

            <main className="flex-1 w-full max-w-5xl p-5">
              {children}
            </main>

            <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center text-m gap-8 py-2 bg-brown-600">
              <div className="text-sm text-white">
                <h3 className="font-bold">Kontakt</h3>
                <p>Email: info@kodukohvikud.com</p>
                <p>Phone: +372 420 6969</p>
                <p>Aadress: Top floor, Penthouse </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
