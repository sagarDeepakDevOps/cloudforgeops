import { ArrowDown } from "lucide-react";

interface ArchitectureDiagramProps {
  steps: string[];
  title?: string;
}

/**
 * Visual architecture flow diagram.
 * Renders each step from the `architecture` frontmatter array
 * as a connected node in a vertical flow.
 */
export function ArchitectureDiagram({
  steps,
  title = "Architecture Overview",
}: ArchitectureDiagramProps) {
  if (!steps?.length) return null;

  // Detect if a step is "grouped" (contains → indicating a branch)
  const parseStep = (step: string) => {
    const isConnector = step.includes("→");
    const parts = step.split("→").map((s) => s.trim());
    return { isConnector, parts };
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
      <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        {title}
      </p>

      <div className="flex flex-col items-center gap-0">
        {steps.map((step, i) => {
          const { parts } = parseStep(step);
          const isLast = i === steps.length - 1;

          return (
            <div key={i} className="flex w-full flex-col items-center">
              {/* Node */}
              <div className="w-full max-w-lg">
                {parts.length === 1 ? (
                  /* Single node */
                  <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)] px-5 py-3.5 shadow-sm">
                    <div className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {parts[0]}
                    </span>
                  </div>
                ) : (
                  /* Flow node: A → B */
                  <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-5 py-3.5 shadow-sm">
                    <div className="flex flex-1 flex-wrap items-center gap-1.5">
                      {parts.map((part, pi) => (
                        <span key={pi} className="flex items-center gap-1.5">
                          <span className="text-sm font-medium text-[var(--foreground)]">
                            {part}
                          </span>
                          {pi < parts.length - 1 && (
                            <span className="text-[var(--accent)] font-bold">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Connector arrow */}
              {!isLast && (
                <div className="flex h-6 w-6 items-center justify-center text-[var(--border)]">
                  <ArrowDown size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-center text-xs text-[var(--muted)]">
        Architecture simplified for illustration. Actual implementation may include additional components.
      </p>
    </div>
  );
}
