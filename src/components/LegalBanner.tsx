"use client";

import { useState, useEffect } from "react";

interface LegalBannerProps {
  warning: string;
  lessonId: number;
}

export default function LegalBanner({ warning, lessonId }: LegalBannerProps) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      const key = `hackyoung_legal_dismissed_${lessonId}`;
      const wasDismissed = sessionStorage.getItem(key);
      setDismissed(!!wasDismissed);
    } catch {
      setDismissed(false);
    }
  }, [lessonId]);

  function handleDismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(`hackyoung_legal_dismissed_${lessonId}`, "1");
    } catch {
      // sessionStorage blocked — silently ignore
    }
  }

  if (dismissed) return null;

  return (
    <div
      data-testid="legal-banner"
      role="alert"
      className="mb-6 rounded-xl border border-[var(--color-dim-red)] bg-[var(--color-bg-red)] p-4"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0 text-lg" aria-hidden="true">&#x1F6E1;</span>
        <div className="flex-1 min-w-0">
          <p className="mb-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--color-glow-red)]">
            Legal Warning
          </p>
          <p className="text-sm leading-relaxed text-[var(--color-glow-red)]">
            {warning}
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="shrink-0 rounded-md border border-[var(--color-dim-red)] px-3 py-1 font-mono text-[11px] font-medium text-[var(--color-glow-red)] transition-all hover:bg-[var(--color-dim-red)] hover:text-[var(--color-canvas)]"
          aria-label="Dismiss legal warning"
        >
          understood
        </button>
      </div>
    </div>
  );
}
