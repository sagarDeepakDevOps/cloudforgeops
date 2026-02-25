/**
 * Injects a JSON-LD <script> block into the page <head>.
 * This is a Server Component — no "use client" needed.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  );
}
