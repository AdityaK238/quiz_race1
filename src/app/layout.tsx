"use client"
import { useMemo } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./(components)/Header/Header";
import Footer from "./(components)/Footer/Footer";
import { AuthContextProvider } from "@/lib/firebase/authContext"
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Header></Header>
                {children}
          <Footer></Footer>
        </AuthContextProvider>
        </body>
    </html>
  );
}
