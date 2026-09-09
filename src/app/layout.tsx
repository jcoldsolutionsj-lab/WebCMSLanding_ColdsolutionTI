import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ColdSolutions TI | Soluciones tecnológicas para digitalizar tu negocio",
  description: "Automatización, software a medida, datos e IA para tu empresa. Cuéntanos tu problema y te ayudamos a encontrar la solución tecnológica adecuada.",
  icons: {
    icon: "/images/logoCompleto.png",
    shortcut: "/images/logoCompleto.png",
    apple: "/images/logoCompleto.png",
  },
  openGraph: {
    title: "ColdSolutions TI | Soluciones tecnológicas para digitalizar tu negocio",
    description: "Automatización, software a medida, datos e IA para tu empresa.",
    url: "https://coldsolutionsti.com", // PENDIENTE: Reemplazar por dominio real
    siteName: "ColdSolutions TI",
    images: [
      {
        url: "/images/logoCompleto.png",
        width: 1200,
        height: 630,
        alt: "ColdSolutions TI - Soluciones Tecnológicas",
      }
    ],
    locale: "es_PE", // PENDIENTE: Confirmar país
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ColdSolutions TI | Soluciones tecnológicas",
    description: "Automatización, software a medida, datos e IA para tu empresa.",
    images: ["/images/logoCompleto.png"],
  },
};

import { ScrollProgressIndicator } from "@/components/ScrollProgressIndicator";
import { CursorGlow } from "@/components/CursorGlow";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="icon" href="/images/logoCompleto.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logoCompleto.png" />
        {/* Google Tag Manager - PENDIENTE: Reemplazar GTM-XXXXXXX con ID real */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />
      </head>
      <body>
        <CursorGlow />
        <ScrollProgressIndicator />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
