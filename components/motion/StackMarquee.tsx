/** Tools Demba runs in production. Proper nouns, so not translated. */
const stack = [
  "Claude API",
  "n8n",
  "DeepSeek",
  "Python",
  "PostgreSQL",
  "WooCommerce",
  "Tableau",
  "RapidMiner",
  "GA4",
  "Docker",
  "Stripe",
  "Odoo",
  "HubSpot",
  "BPMN 2.0",
  "Make",
  "Looker Studio",
];

/**
 * A slow ticker of the stack. The track holds the list twice and slides by
 * half its width, so the loop has no seam. Pure CSS: it pauses on hover and
 * stops entirely under reduced motion.
 */
export function StackMarquee() {
  const row = (duplicate: boolean) => (
    <ul aria-hidden={duplicate || undefined} className="flex shrink-0 items-center">
      {stack.map((tool) => (
        <li key={tool} className="tnum flex items-center gap-7 whitespace-nowrap pr-7 text-sm text-muted">
          {tool}
          <span className="text-brand" aria-hidden>
            /
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee relative overflow-hidden border-y border-border py-4 [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
