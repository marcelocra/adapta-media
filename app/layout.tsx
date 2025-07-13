import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import { WebcamProvider } from "@/context/WebCamContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adapta Midia",
  description: "Adapta Midia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <WebcamProvider>{children}</WebcamProvider>
        </LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}
