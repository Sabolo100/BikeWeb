import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicit allowlist for social media scrapers
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },
      {
        userAgent: "WhatsApp",
        allow: "/",
      },
      // General rules
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/admin/"],
      },
    ],
    sitemap: "https://www.fmintel.com/sitemap.xml",
  };
}
