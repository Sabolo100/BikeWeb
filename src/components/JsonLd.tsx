/**
 * Reusable JSON-LD structured data injector.
 * Usage: <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", ... }} />
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
