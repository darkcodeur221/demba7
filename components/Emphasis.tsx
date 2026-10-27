/**
 * Renders `*phrase*` inside a dictionary string as the serif-italic accent, so
 * copy editors can choose the emphasised words without touching components.
 */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
          <em key={i} className="em-serif">
            {part.slice(1, -1)}
          </em>
        ) : (
          part
        )
      )}
    </>
  );
}
