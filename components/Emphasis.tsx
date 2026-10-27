/**
 * Renders `*phrase*` inside a dictionary string as the lime accent, so copy
 * editors choose the emphasised words without touching components.
 */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
          <em key={i} className="em-accent">
            {part.slice(1, -1)}
          </em>
        ) : (
          part
        )
      )}
    </>
  );
}
