import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "EMJ-Consulting | Agence de voyage et visa",
  description: "EMJ-Consulting accompagne particuliers, étudiants et professionnels dans leurs démarches de voyage et d'immigration depuis Lomé, Togo.",
  keywords: "visa, agence voyage, immigration, Togo, Lomé, visa touristique, visa étudiant",
  openGraph: {
    title: "EMJ-Consulting | Agence de voyage et visa",
    description: "Votre partenaire de confiance pour vos voyages et vos demandes de visa.",
    url: "https://emj-consulting.fr",
    siteName: "EMJ-Consulting",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr" suppressHydrationWarning>
        <body className="antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
