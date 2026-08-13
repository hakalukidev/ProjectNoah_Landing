import type { SVGProps } from "react";

/**
 * Minimal, stroke-based brand glyphs matching the lucide icon language used
 * across the rest of the site. lucide-react ships no brand/logo icons, so
 * these are hand-drawn approximations rather than official marks.
 */

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.3v5.4l5-2.7-5-2.7Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path
        d="M13.5 21v-7.5H16l.5-3h-3v-2c0-.87.24-1.46 1.5-1.46h1.6V4.14c-.28-.04-1.2-.12-2.28-.12-2.26 0-3.82 1.38-3.82 3.9v2.18H8v3h2.5V21h3Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 11.5a8.5 8.5 0 0 1-12.36 7.56L3 20l1.06-5.4A8.5 8.5 0 1 1 21 11.5Z" />
      <path
        d="M8.5 9.6c.1-.5.5-1 1-1s.7.3.9.7c.2.5.5 1.2.3 1.6-.2.5-.7.7-.5 1.2.3.7 1.4 1.8 2.1 2.1.5.2.7-.3 1.2-.5.4-.2 1.1.1 1.6.3.4.2.7.4.7.9 0 .8-1 1.4-1.7 1.4-1.9 0-5.6-2.4-5.6-6.7Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
