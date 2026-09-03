"use client";

import { useMemo, useState } from "react";

import type { DailyVisitors } from "@/lib/analytics";

const WIDTH = 720;
const HEIGHT = 240;
const PAD_LEFT = 36;
const PAD_RIGHT = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;

function niceMax(value: number): number {
  if (value <= 5) return 5;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = magnitude / 2;
  return Math.ceil(value / step) * step;
}

function formatDate(dateKey: string, withYear = false): string {
  const date = new Date(`${dateKey}T00:00:00Z`);
  return date.toLocaleDateString("en-SG", {
    month: "short",
    day: "numeric",
    year: withYear ? "numeric" : undefined,
    timeZone: "UTC",
  });
}

export function VisitorsChart({ data }: { data: DailyVisitors[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const maxValue = useMemo(
    () => niceMax(Math.max(...data.map((d) => d.count), 0)),
    [data],
  );

  const xAt = (i: number) =>
    PAD_LEFT + (data.length <= 1 ? 0 : (i / (data.length - 1)) * plotWidth);
  const yAt = (value: number) =>
    PAD_TOP + plotHeight - (value / maxValue) * plotHeight;

  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"}${xAt(i)},${yAt(d.count)}`)
    .join(" ");
  const areaPath = `${linePath} L${xAt(data.length - 1)},${yAt(0)} L${xAt(0)},${yAt(0)} Z`;

  const gridLines = [0, 0.5, 1].map((f) => Math.round(maxValue * f));
  // Show roughly 6 date labels across the axis regardless of series length.
  const labelEvery = Math.max(1, Math.round(data.length / 6));

  const active = hovered !== null ? data[hovered] : null;
  const tooltipWidth = 108;
  const activeX = hovered !== null ? xAt(hovered) : 0;
  const tooltipX = Math.min(Math.max(activeX - tooltipWidth / 2, 0), WIDTH - tooltipWidth);

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        role="img"
        aria-label={`Daily visitors over the last ${data.length} days`}
      >
        {gridLines.map((value) => (
          <g key={value}>
            <line
              x1={PAD_LEFT}
              x2={WIDTH - PAD_RIGHT}
              y1={yAt(value)}
              y2={yAt(value)}
              stroke="var(--border)"
              strokeWidth={1}
            />
            <text
              x={PAD_LEFT - 8}
              y={yAt(value)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-muted-foreground text-[9px]"
            >
              {value.toLocaleString()}
            </text>
          </g>
        ))}

        {data.map((d, i) =>
          i % labelEvery === 0 ? (
            <text
              key={d.date}
              x={xAt(i)}
              y={HEIGHT - PAD_BOTTOM + 16}
              textAnchor="middle"
              className="fill-muted-foreground text-[9px]"
            >
              {formatDate(d.date)}
            </text>
          ) : null,
        )}

        <path d={areaPath} fill="var(--primary)" fillOpacity={0.1} stroke="none" />
        <path
          d={linePath}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* End marker: >=8px dot with a surface ring so it stays legible
            crossing the line. */}
        <circle
          cx={xAt(data.length - 1)}
          cy={yAt(data[data.length - 1]?.count ?? 0)}
          r={4}
          fill="var(--primary)"
          stroke="var(--card)"
          strokeWidth={2}
        />

        {hovered !== null && (
          <>
            <line
              x1={activeX}
              x2={activeX}
              y1={PAD_TOP}
              y2={HEIGHT - PAD_BOTTOM}
              stroke="var(--border)"
              strokeWidth={1}
            />
            <circle
              cx={activeX}
              cy={yAt(data[hovered].count)}
              r={4}
              fill="var(--primary)"
              stroke="var(--card)"
              strokeWidth={2}
            />
          </>
        )}

        {/* Hit target spans the full plot height per x-band - bigger than
            the 2px line, so the pointer only has to be close to a date. */}
        <rect
          x={PAD_LEFT}
          y={PAD_TOP}
          width={plotWidth}
          height={plotHeight}
          fill="transparent"
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const ratio = (event.clientX - rect.left) / rect.width;
            const index = Math.round(ratio * (data.length - 1));
            setHovered(Math.min(Math.max(index, 0), data.length - 1));
          }}
          onPointerLeave={() => setHovered(null)}
        />

        {active && (
          <foreignObject x={tooltipX} y={PAD_TOP} width={tooltipWidth} height={40}>
            <div className="rounded-md border border-border bg-popover px-2.5 py-1.5 text-center shadow-md">
              <p className="text-xs font-bold leading-none text-foreground">
                {active.count.toLocaleString()}
              </p>
              <p className="mt-1 text-[10px] leading-none text-muted-foreground">
                {formatDate(active.date, true)}
              </p>
            </div>
          </foreignObject>
        )}
      </svg>
    </div>
  );
}
