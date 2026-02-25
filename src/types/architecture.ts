/**
 * Data-driven architecture diagram types.
 * Consumed by ArchitectureFlow — one config per case study.
 */

// ── Layer styles ─────────────────────────────────────────────────────────────

export type LayerStyle =
  | "edge"        // internet / CDN layer  (indigo)
  | "network"     // VPC / VNet            (sky)
  | "compute"     // EKS / AKS / VMs       (cyan)
  | "data"        // databases / storage   (pink)
  | "security"    // IAM / KV / secrets    (amber)
  | "cicd"        // pipelines / registries (green)
  | "monitoring"  // observability stack   (violet)
  | "iac"         // Terraform / Ansible   (orange)
  | "artifacts"   // Nexus / ECR           (slate)
  | "deploy";     // environments / CD     (teal)

// ── Source model — what you write in the config file ─────────────────────────

export interface ArchNodeDef {
  /** Unique ID across the entire diagram */
  id: string;
  /** Display name (short) */
  label: string;
  /** Sublabel / description shown inside the node */
  description: string;
  /** Emoji icon prepended to label */
  icon?: string;
  /** ID of the parent layer group (ArchGroupDef.id) */
  groupId?: string;
  /** Position relative to parent group (or canvas if no groupId) */
  x: number;
  y: number;
}

export interface ArchGroupDef {
  id: string;
  label: string;
  layerStyle: LayerStyle;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ArchEdgeDef {
  id: string;
  source: string;
  target: string;
  label?: string;
  /** Dashed line — used for indirect/indirect connections (secrets, IAM) */
  dashed?: boolean;
  /** Animated marching-ants flow line */
  animated?: boolean;
}

export interface ArchitectureConfig {
  /** Layer/group containers — rendered behind service nodes */
  groups: ArchGroupDef[];
  /** Service nodes — leaf nodes with label + description */
  nodes: ArchNodeDef[];
  /** Directed edges between node IDs */
  edges: ArchEdgeDef[];
}
