import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const revalidate = 300; // 5 minutes

const BASE = "https://www.fmintel.com";

const CHANGE_LABELS: Record<string, string> = {
  new_entity: "Új entitás",
  updated_entity: "Frissítés",
  new_management: "Új kezelői megbízás",
  ended_management: "Megszűnt kezelés",
  personnel_move: "Személyi változás",
  company_relation: "Cégkapcsolat",
  data_correction: "Adatjavítás",
};

function xmlEscape(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: changes } = await sb
    .from("changes")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  const items = (changes || [])
    .map((c) => {
      const typeLabel = CHANGE_LABELS[c.change_type] || c.change_type;
      const title = xmlEscape(
        c.summary
          ? `${typeLabel}: ${c.summary}`
          : `${typeLabel} — FM Intel`
      );
      const summary = xmlEscape(c.summary || typeLabel);
      const entityPath =
        c.entity_type === "company"
          ? "cegek"
          : c.entity_type === "building"
          ? "ingatlanok"
          : "emberek";
      const link = c.entity_id
        ? `${BASE}/${entityPath}/${c.entity_id}`
        : `${BASE}/valtozasok`;
      const updated = new Date(c.created_at).toISOString();

      return `
    <entry>
      <id>${xmlEscape(link)}</id>
      <title>${title}</title>
      <link href="${xmlEscape(link)}" />
      <updated>${updated}</updated>
      <summary type="text">${summary}</summary>
      <category term="${xmlEscape(c.change_type)}" label="${xmlEscape(typeLabel)}" />
    </entry>`;
    })
    .join("");

  const now = new Date().toISOString();
  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>FM Intel — Piaci Változások</title>
  <subtitle>Magyar FM/PM/AM piaci intelligencia — napi változásfeed</subtitle>
  <id>${BASE}/api/feed</id>
  <link href="${BASE}/api/feed" rel="self" type="application/atom+xml" />
  <link href="${BASE}/valtozasok" rel="alternate" type="text/html" />
  <updated>${now}</updated>
  <author>
    <name>FM Intel</name>
    <uri>${BASE}</uri>
  </author>
  <rights>© FM Intel ${new Date().getFullYear()}</rights>
  <logo>${BASE}/tabloglogo/TablogLogo.png</logo>${items}
</feed>`;

  return new NextResponse(atom, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
