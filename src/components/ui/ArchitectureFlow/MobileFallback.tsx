import type { ArchitectureConfig } from "@/types/architecture";
import { layerColors } from "./flowConstants";

interface Props {
  config: ArchitectureConfig;
}

/**
 * Compact list view shown below the `md` breakpoint.
 * Groups each service by its parent layer.
 */
export function MobileFallback({ config }: Props) {
  // Build a map: groupId → { group def, nodes[] }
  const grouped = config.groups.map((g) => ({
    group: g,
    nodes: config.nodes.filter((n) => n.groupId === g.id),
  }));

  // Nodes without a group (e.g. standalone "Users" node)
  const standalone = config.nodes.filter((n) => !n.groupId);

  const colors = (style: string) =>
    layerColors[style as keyof typeof layerColors] ?? layerColors.edge;

  return (
    <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
        Architecture Overview
      </p>

      {/* Standalone nodes */}
      {standalone.map((n) => (
        <div
          key={n.id}
          className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5"
        >
          {n.icon && <span className="text-base">{n.icon}</span>}
          <div>
            <p className="text-xs font-semibold text-[var(--foreground)]">{n.label}</p>
            <p className="text-[10px] text-[var(--muted)]">{n.description}</p>
          </div>
        </div>
      ))}

      {/* Grouped layers */}
      {grouped.map(({ group, nodes }) => {
        if (nodes.length === 0) return null;
        const c = colors(group.layerStyle);

        return (
          <div
            key={group.id}
            style={{ borderColor: c.border }}
            className="rounded-xl border bg-[var(--background)] p-3"
          >
            {/* Layer label */}
            <p
              style={{ color: c.label }}
              className="mb-2 text-[10px] font-bold uppercase tracking-widest"
            >
              {group.label}
            </p>

            {/* Node chips */}
            <div className="space-y-1.5">
              {nodes.map((n) => (
                <div
                  key={n.id}
                  className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
                >
                  {n.icon && <span className="text-sm">{n.icon}</span>}
                  <div>
                    <p className="text-xs font-semibold leading-none text-[var(--foreground)]">
                      {n.label}
                    </p>
                    <p className="mt-1 text-[10px] leading-snug text-[var(--muted)]">
                      {n.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <p className="mt-2 text-center text-[10px] text-[var(--muted)]">
        View on a wider screen for the interactive diagram.
      </p>
    </div>
  );
}
