"use client";

import CopyButton from "./CopyButton";

interface CommandCardProps {
  command: string;
  description: string;
  expectedOutput: string;
  safety: "safe" | "active" | "restricted";
  troubleshooting: string | null;
  legalNote: string | null;
}

const safetyConfig: Record<string, { label: string; color: string; border: string }> = {
  safe: {
    label: "SAFE",
    color: "text-[var(--color-glow-green)] bg-[var(--color-bg-green)] border-[var(--color-muted-green)]",
    border: "border-[var(--color-muted-green)]",
  },
  active: {
    label: "ACTIVE",
    color: "text-[var(--color-glow-blue)] bg-[var(--color-bg-blue)] border-[var(--color-dim-blue)]",
    border: "border-[var(--color-dim-blue)]",
  },
  restricted: {
    label: "RESTRICTED \u2014 YOUR NETWORK ONLY",
    color: "text-[var(--color-glow-red)] bg-[var(--color-bg-red)] border-[var(--color-dim-red)]",
    border: "border-[var(--color-dim-red)]",
  },
};

export default function CommandCard({
  command,
  description,
  expectedOutput,
  safety,
  troubleshooting,
  legalNote,
}: CommandCardProps) {
  const badge = safetyConfig[safety] || safetyConfig.safe;

  return (
    <div
      data-testid="command-card"
      className={`terminal-block overflow-hidden rounded-xl border transition-all hover:border-[var(--color-border-strong)]`}
    >
      {/* Command header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-4 py-3">
        <div className="flex items-start gap-3 min-w-0">
          <span className="font-mono text-xs text-[var(--color-txt-muted)] shrink-0 mt-0.5">$</span>
          <code
            className="font-mono text-sm font-medium text-[var(--color-glow-green)] break-all"
          >
            {command}
          </code>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            data-testid="safety-label"
            className={`rounded-md border px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider ${badge.color}`}
          >
            {badge.label}
          </span>
          <CopyButton text={command} />
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3 space-y-3">
        {/* Description */}
        <p className="text-sm text-[var(--color-txt-secondary)]">{description}</p>

        {/* Expected Output */}
        {expectedOutput && (
          <div className="overflow-x-auto rounded-lg bg-[#060810] p-3 border border-[var(--color-border-subtle)]">
            <p className="mb-1.5 font-mono text-[11px] font-medium uppercase tracking-widest text-[var(--color-txt-muted)]">
              Expected output
            </p>
            <pre
              data-testid="expected-output"
              className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[var(--color-txt-secondary)]"
            >
              {expectedOutput}
            </pre>
          </div>
        )}

        {/* Legal Note */}
        {legalNote && (
          <div
            data-testid="legal-note"
            className="flex gap-2 rounded-lg border border-[var(--color-dim-red)] bg-[var(--color-bg-red)] p-3"
          >
            <span className="mt-0.5 shrink-0 font-mono text-xs text-[var(--color-glow-red)]">!</span>
            <p className="text-xs leading-relaxed text-[var(--color-glow-red)]">
              {legalNote}
            </p>
          </div>
        )}

        {/* Troubleshooting */}
        {troubleshooting && (
          <div
            data-testid="troubleshooting"
            className="flex gap-2 rounded-lg border border-[var(--color-dim-amber)] bg-[var(--color-bg-amber)] p-3"
          >
            <span className="mt-0.5 shrink-0 font-mono text-xs text-[var(--color-glow-amber)]">!</span>
            <p className="text-xs leading-relaxed text-[var(--color-dim-amber)]">
              {troubleshooting}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
