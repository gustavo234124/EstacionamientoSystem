// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Sistema de estacionamiento" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Estacionamiento</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body className="bg-gray-100">
        <Main />      
        <NextScript /> 
      </body>
    </Html>
  );
}
