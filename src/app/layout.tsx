import type { Metadata } from "next";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fmintel.com"),
  title: {
    default: "FM Intel | Piaci Intelligencia",
    template: "%s — FM Intel",
  },
  description:
    "Magyar FM/PM/AM piaci intelligencia platform. Facility management, property management és asset management adatok, elemzések és piaci trendek.",
  keywords: [
    "facility management",
    "property management",
    "asset management",
    "FM",
    "PM",
    "AM",
    "irodapiac",
    "Budapest",
    "kereskedelmi ingatlan",
    "ingatlankezelés",
    "épületüzemeltetés",
    "piaci intelligencia",
    "FM Intel",
  ],
  openGraph: {
    title: "FM Intel | Piaci Intelligencia",
    description:
      "Magyar FM/PM/AM piaci intelligencia platform. Facility management, property management és asset management adatok, elemzések és piaci trendek.",
    locale: "hu_HU",
    type: "website",
    url: "https://www.fmintel.com",
    siteName: "FM Intel",
    images: [
      {
        url: "https://www.fmintel.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "FM Intel — Magyar FM/PM/AM Piaci Intelligencia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FM Intel | Piaci Intelligencia",
    description:
      "Magyar FM/PM/AM piaci intelligencia platform — facility, property és asset management adatok.",
    images: ["https://www.fmintel.com/opengraph-image"],
  },
  alternates: {
    canonical: "https://www.fmintel.com",
    types: {
      "application/atom+xml": "https://www.fmintel.com/api/feed",
    },
  },
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
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.fmintel.com/#website",
      name: "FM Intel",
      url: "https://www.fmintel.com",
      description:
        "Magyar FM/PM/AM piaci intelligencia platform — facility management, property management és asset management adatok.",
      inLanguage: "hu-HU",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://www.fmintel.com/cegek?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.fmintel.com/#organization",
      name: "FM Intel",
      url: "https://www.fmintel.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.fmintel.com/tabloglogo/TablogLogo.png",
      },
      description:
        "A magyar kereskedelmi ingatlanpiac facility management, property management és asset management szektorának átfogó piaci intelligencia platformja.",
      areaServed: {
        "@type": "Country",
        name: "Hungary",
        sameAs: "https://www.wikidata.org/wiki/Q28",
      },
      knowsAbout: [
        "Facility Management",
        "Property Management",
        "Asset Management",
        "Commercial Real Estate",
        "Hungarian Real Estate Market",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className="antialiased">
        <JsonLd data={websiteSchema} />
        {children}
      </body>
    </html>
  );
}
