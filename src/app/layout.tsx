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
  metadataBase: new URL("https://coldsolutionsti.com"),
  title: "ColdSolutions TI | Soluciones tecnológicas para digitalizar tu negocio",
  description: "Automatización, software a medida, datos e IA para tu empresa. Cuéntanos tu problema y te ayudamos a encontrar la solución tecnológica adecuada.",
  keywords: [
    "automatización de procesos",
    "software a medida Perú",
    "desarrollo web Lima",
    "inteligencia artificial empresas",
    "Business Intelligence Perú",
    "Power BI dashboards",
    "RPA Python",
    "consultoría TI Lima",
    "transformación digital empresas",
    "ColdSolutions TI"
  ],
  authors: [{ name: "ColdSolutions TI", url: "https://coldsolutionsti.com" }],
  creator: "ColdSolutions TI",
  publisher: "ColdSolutions TI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://coldsolutionsti.com",
  },
  icons: {
    icon: "/images/logoCompleto.png",
    shortcut: "/images/logoCompleto.png",
    apple: "/images/logoCompleto.png",
  },
  openGraph: {
    title: "ColdSolutions TI | Soluciones tecnológicas para digitalizar tu negocio",
    description: "Automatización, software a medida, datos e IA para tu empresa.",
    url: "https://coldsolutionsti.com",
    siteName: "ColdSolutions TI",
    images: [
      {
        url: "/images/logoCompleto.png",
        width: 1200,
        height: 630,
        alt: "ColdSolutions TI - Soluciones Tecnológicas",
      }
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ColdSolutions TI | Soluciones tecnológicas",
    description: "Automatización, software a medida, datos e IA para tu empresa.",
    images: ["/images/logoCompleto.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://coldsolutionsti.com/#organization",
      "name": "ColdSolutions TI",
      "url": "https://coldsolutionsti.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://coldsolutionsti.com/#logo",
        "url": "https://coldsolutionsti.com/images/logoCompleto.png",
        "caption": "ColdSolutions TI"
      },
      "image": "https://coldsolutionsti.com/images/logoCompleto.png",
      "description": "Empresa peruana de soluciones tecnológicas: desarrollo de software a medida, automatización con RPA, Business Intelligence, Inteligencia Artificial y consultoría TI.",
      "taxID": "10482568811",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lima",
        "addressCountry": "PE"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+51-963-478-502",
          "contactType": "sales",
          "areaServed": "PE",
          "availableLanguage": ["es"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+51-945-430-381",
          "contactType": "technical support",
          "areaServed": "PE",
          "availableLanguage": ["es"]
        }
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://coldsolutionsti.com/#service",
      "name": "ColdSolutions TI - Servicios Tecnológicos",
      "url": "https://coldsolutionsti.com",
      "parentOrganization": {
        "@id": "https://coldsolutionsti.com/#organization"
      },
      "priceRange": "$$",
      "image": "https://coldsolutionsti.com/images/logoCompleto.png",
      "telephone": "+51-963-478-502",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lima",
        "addressCountry": "PE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -12.046374,
        "longitude": -77.042793
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios de Tecnología",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Software & Sistemas a Medida",
              "description": "Desarrollo de sistemas empresariales, plataformas web y módulos personalizados."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Automatización & RPA",
              "description": "Automatización de flujos repetitivos, procesamiento de archivos e integración de sistemas con Python."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Datos & Business Intelligence",
              "description": "ETL, bases de datos SQL, tableros interactivos Power BI y KPIs para toma de decisiones."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Inteligencia Artificial Aplicada",
              "description": "Implementación de agentes inteligentes, asistentes y automatizaciones para optimizar procesos de negocio."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Desarrollo Web & Landing Pages",
              "description": "Sitios web corporativos, landings comerciales y portales modernos optimizados para conversión y SEO."
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://coldsolutionsti.com/#website",
      "url": "https://coldsolutionsti.com",
      "name": "ColdSolutions TI",
      "publisher": {
        "@id": "https://coldsolutionsti.com/#organization"
      },
      "inLanguage": "es-PE"
    }
  ]
};

import { ScrollProgressIndicator } from "@/components/ScrollProgressIndicator";
import { CursorGlow } from "@/components/CursorGlow";
import { ThemeProvider } from "@/components/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable} data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logoCompleto.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logoCompleto.png" />
        {/* Schema.org Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('coldsolution_theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID && process.env.NEXT_PUBLIC_GTM_ID !== 'GTM-XXXXXXX' ? process.env.NEXT_PUBLIC_GTM_ID : 'GTM-MN398M78'}');
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <CursorGlow />
          <ScrollProgressIndicator />
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID && process.env.NEXT_PUBLIC_GTM_ID !== 'GTM-XXXXXXX' ? process.env.NEXT_PUBLIC_GTM_ID : 'GTM-MN398M78'}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
