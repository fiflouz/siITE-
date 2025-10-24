import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "../components/shared/Nav";

export const metadata: Metadata = {
  title: {
    default: "PC Builder",
    template: "%s | PC Builder",
  },
  description: "Assemblez votre PC idéal avec des composants compatibles et les meilleurs prix mis à jour.",
  openGraph: {
    title: "PC Builder",
    description: "Outils gratuits pour comparer, configurer et suivre les prix de composants PC.",
    type: "website",
    url: "https://example.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-surface-900 text-neutral-100">
        <div className="container-page py-6">
          <Nav />
        </div>
        <main className="container-page pb-16">{children}</main>
      </body>
    </html>
  );
}
