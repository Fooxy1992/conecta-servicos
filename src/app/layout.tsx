import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConectaServiços - Conectando pessoas e serviços de qualidade",
  description: "Plataforma que conecta clientes e trabalhadores autônomos para serviços de limpeza, obras e pintura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
} 