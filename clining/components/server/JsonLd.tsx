export default function JsonLd({
  data,
}: {
  data?: Record<string, unknown> | unknown[];
}) {
  if (data == null) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
