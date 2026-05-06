import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE = "https://www.fmintel.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [companiesRes, buildingsRes, peopleRes] = await Promise.all([
    sb.from("companies").select("id, updated_at"),
    sb.from("buildings").select("id, updated_at"),
    sb.from("people").select("id, updated_at"),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE}/cegek`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE}/ingatlanok`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE}/emberek`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE}/valtozasok`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE}/modszertan`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const companyRoutes: MetadataRoute.Sitemap = (
    companiesRes.data || []
  ).map((c) => ({
    url: `${BASE}/cegek/${c.id}`,
    lastModified: new Date(c.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const buildingRoutes: MetadataRoute.Sitemap = (
    buildingsRes.data || []
  ).map((b) => ({
    url: `${BASE}/ingatlanok/${b.id}`,
    lastModified: new Date(b.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const peopleRoutes: MetadataRoute.Sitemap = (
    peopleRes.data || []
  ).map((p) => ({
    url: `${BASE}/emberek/${p.id}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...companyRoutes,
    ...buildingRoutes,
    ...peopleRoutes,
  ];
}
