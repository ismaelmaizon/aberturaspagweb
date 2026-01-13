import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./../components/navbar/navBar";
import Footer from "./../components/footer/footer";



export const metadata: Metadata = {
  title: "Aberturas Bodereau",
  description: "Sitio web de aberturas", 
  icons: {
    icon: "/img/logopag.png",
  },
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
