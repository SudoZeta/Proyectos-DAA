import "./globals.css";

import Link from "next/link";

export default function RootLayout({

 children,

}: {

 children: React.ReactNode;

}) {

 return (

  <html lang="es">

    <body>

      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>

        <Link href="/">Inicio</Link> |{" "}

        <Link href="/login">Login</Link> |{" "}

        <Link href="/register">Registro</Link> |{" "}

        <Link href="/solicitudes">Solicitudes</Link>

      </nav>

      {children}

    </body>

  </html>

 );

}