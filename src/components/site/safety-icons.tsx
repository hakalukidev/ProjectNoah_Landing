import type { SVGProps } from "react";

/**
 * Hand-drawn, stroke-based glyphs for the Quality & Safety page.
 *
 * lucide-react covers hard hats and shields, but not the site-specific
 * gear and permit imagery the safety rules need (harness, cone, toolbox
 * briefing, lifting plan), so the whole set is drawn here instead - one
 * language across the page rather than half lucide, half custom.
 *
 * All of them share lucide's geometry: 24x24 viewBox, no fill, 1.75
 * stroke, round caps and joins, sized by the caller via className.
 */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/* -------------------------------------------------------------------- */
/* Pillar emblems - Quality, Reliability, Innovation, Safety, Sustainability */
/* -------------------------------------------------------------------- */

/** Award rosette - workmanship signed off, not assumed. */
export function QualityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M12 6.4l.9 1.9 2 .3-1.45 1.44.34 2.06L12 11.16l-1.79.94.34-2.06L9.1 8.6l2-.3.9-1.9Z" />
      <path d="M8.4 13.9L6.5 21l5.5-2.6L17.5 21l-1.9-7.1" />
    </svg>
  );
}

/** Shield with a check - work you can count on. */
export function ReliabilityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.75l7.5 2.9v6.1c0 4.35-3.05 7.9-7.5 9.5-4.45-1.6-7.5-5.15-7.5-9.5v-6.1L12 2.75Z" />
      <path d="M8.75 11.9l2.35 2.35 4.15-4.5" />
    </svg>
  );
}

/** Lightbulb with a filament - detailing solved before it reaches site. */
export function InnovationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.75a6.25 6.25 0 0 0-3.6 11.36c.5.36.8.93.8 1.54v.6h5.6v-.6c0-.61.3-1.18.8-1.54A6.25 6.25 0 0 0 12 2.75Z" />
      <path d="M9.9 18.9h4.2M10.6 21.25h2.8" />
      <path d="M12 16.25v-3.4M12 12.85l-1.6-1.6M12 12.85l1.6-1.6" />
    </svg>
  );
}

/** Hard hat - safety as the standing condition of every shift. */
export function SafetyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 16.5a9 9 0 0 1 18 0" />
      <path d="M2.25 16.5h19.5v1.4a1.6 1.6 0 0 1-1.6 1.6H3.85a1.6 1.6 0 0 1-1.6-1.6v-1.4Z" />
      <path d="M9.4 8.2V5.9a1.6 1.6 0 0 1 1.6-1.6h2a1.6 1.6 0 0 1 1.6 1.6v2.3" />
      <path d="M9.4 8.2c-1.55.62-2.8 1.9-3.5 3.5M14.6 8.2c1.55.62 2.8 1.9 3.5 3.5" />
    </svg>
  );
}

/** Leaf over a stem - lower-waste materials and methods. */
export function SustainabilityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M20.5 4.5c0 8.2-4.3 12.3-10.2 12.3-2.8 0-5-1.6-5-4.4 0-5 4.6-7.9 15.2-7.9Z" />
      <path d="M20.5 4.5C13 7 9 11 6.4 15.4 5.2 17.5 4.4 19.6 4 21.5" />
    </svg>
  );
}

/* -------------------------------------------------------------------- */
/* Site safety rules                                                     */
/* -------------------------------------------------------------------- */

/** Full PPE - helmet, vest, boots issued and worn. */
export function PpeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8.9 3.75L12 6.1l3.1-2.35 3.4 1.6a2 2 0 0 1 1.15 1.8v3.2h-3v9.9H7.35v-9.9h-3v-3.2a2 2 0 0 1 1.15-1.8l3.4-1.6Z" />
      <path d="M8.9 3.75L12 12l3.1-8.25" />
    </svg>
  );
}

/** Full-body harness clipped to an anchor - work at height. */
export function HarnessIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 3.25h6a3 3 0 0 1 3 3v.5" />
      <path d="M13 6.75l-2.4 2.4a2.2 2.2 0 0 0 0 3.1l2.4 2.4" />
      <circle cx="14.6" cy="17.6" r="3.15" />
      <path d="M13 14.65l1.6 2.95M17.75 17.6h3" />
    </svg>
  );
}

/** Speech bubble over a crew - toolbox briefing before the shift. */
export function ToolboxTalkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3.25 4.25h17.5v8.5H9.6l-4 3.1v-3.1H3.25v-8.5Z" />
      <path d="M7.5 7.6h9M7.5 10.1h5.5" />
      <path d="M6.4 21.25a3.1 3.1 0 0 1 6.2 0M17.6 21.25a2.6 2.6 0 0 1 3.9-2.25" />
    </svg>
  );
}

/** Signed permit-to-work - hot works, confined space, lifting. */
export function PermitIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6.25 3.25h11.5v17.5H6.25V3.25Z" />
      <path d="M9.4 3.25V2h5.2v1.25" />
      <path d="M9.1 9.4h5.8M9.1 12.4h3.4" />
      <path d="M9.1 17.05c1.2-1.4 2-1.4 2.6-.5.6.9 1.4.9 3.2-1.35" />
    </svg>
  );
}

/** Cone and barrier tape - the work zone is closed off and signposted. */
export function BarricadeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9.7 3.4h4.6l3.6 14.4H6.1L9.7 3.4Z" />
      <path d="M8.6 8.1h6.8M7.6 12.6h8.8" />
      <path d="M2.75 20.75h18.5" />
    </svg>
  );
}

/** Certified operator badge - only trained hands on plant and machinery. */
export function CertifiedOperatorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4.25 3.25h15.5v13.5H4.25V3.25Z" />
      <circle cx="9.6" cy="8.6" r="2.1" />
      <path d="M6.5 13.4a3.35 3.35 0 0 1 6.2 0" />
      <path d="M14.9 7.6h2.6M14.9 10.6h2.6" />
      <path d="M7.75 20.75h8.5" />
    </svg>
  );
}

/** Clear route through the site - housekeeping and access kept open. */
export function HousekeepingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8.25 21.25L10.4 2.75h3.2l2.15 18.5" />
      <path d="M2.75 21.25h18.5" />
      <path d="M9.5 11.75h5M9 16.5h6" />
    </svg>
  );
}

/** Incident reported and logged the same shift, not the next week. */
export function IncidentReportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.9l9.1 15.85H2.9L12 2.9Z" />
      <path d="M12 9.4v4.1M12 16.4h.01" />
    </svg>
  );
}
