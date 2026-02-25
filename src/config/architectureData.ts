import type { ArchitectureConfig } from "@/types/architecture";

/**
 * Layout constants (all sizes in px):
 *   NODE_W=200  NODE_H=68  STEP_X=220  GROUP_H=140
 *   GROUP_HEADER=32  GROUP_PAD=20  NODE_Y=52
 *   NODE_X(i) = 20 + i * 220
 *   GROUP_W(n) = n * 220 + 20
 */

// ─── Case Study 1 ────────────────────────────────────────────────────────────
const azureMigration: ArchitectureConfig = {
  groups: [
    // Row 1 — Edge
    { id: "g-edge",       label: "🌐 Edge Layer",                   layerStyle: "edge",       x: 540,  y: 100, width: 240,  height: 140 },
    // Row 2 — Azure Virtual Network (5 nodes)
    { id: "g-vnet",       label: "☁️ Azure Virtual Network  ·  10.0.0.0/16",  layerStyle: "network",   x: 100,  y: 320, width: 1120, height: 140 },
    // Row 3 — Security | CI/CD
    { id: "g-security",   label: "🔐 Security Layer",                layerStyle: "security",   x: 100,  y: 540, width: 460,  height: 140 },
    { id: "g-cicd",       label: "⚙️ DevOps · CI/CD",               layerStyle: "cicd",       x: 620,  y: 540, width: 620,  height: 140 },
    // Row 4 — Environments
    { id: "g-envs",       label: "📦 Resource Group Isolation",      layerStyle: "deploy",     x: 100,  y: 760, width: 680,  height: 140 },
    // Row 5 — Monitoring
    { id: "g-monitoring", label: "📊 Monitoring & Observability",     layerStyle: "monitoring", x: 100,  y: 980, width: 1120, height: 140 },
  ],

  nodes: [
    // Standalone — End Users
    { id: "users",   label: "End Users",          description: "Client browsers & mobile",    icon: "👤", x: 560,  y: 10 },
    // Edge layer
    { id: "afd",     label: "Azure Front Door",    description: "WAF · CDN · Global LB",       icon: "🌐", groupId: "g-edge",       x: 20, y: 52 },
    // VNet
    { id: "agwy",    label: "App Gateway v2",      description: "L7 · SSL Termination · WAF",  icon: "🔀", groupId: "g-vnet",       x: 20,  y: 52 },
    { id: "aks",     label: "AKS Cluster",         description: "Pods · HPA · Ingress",         icon: "☸️", groupId: "g-vnet",       x: 240, y: 52 },
    { id: "func",    label: "Azure Functions",     description: "Event-Driven · Consumption",   icon: "⚡", groupId: "g-vnet",       x: 460, y: 52 },
    { id: "sqldb",   label: "Azure SQL Database",  description: "Multi-AZ · Private Endpoint",  icon: "🗄️", groupId: "g-vnet",       x: 680, y: 52 },
    { id: "blob",    label: "Blob Storage",         description: "ZRS Redundancy · Private EP",  icon: "📦", groupId: "g-vnet",       x: 900, y: 52 },
    // Security
    { id: "kv",      label: "Azure Key Vault",     description: "Secrets · Certs · Keys",       icon: "🔑", groupId: "g-security",   x: 20,  y: 52 },
    { id: "aad",     label: "Azure Active Dir.",   description: "RBAC · Managed Identity",      icon: "🛡️", groupId: "g-security",   x: 240, y: 52 },
    // CI/CD
    { id: "gh",      label: "GitHub",              description: "Source Control · PRs",          icon: "🐙", groupId: "g-cicd",       x: 20,  y: 52 },
    { id: "azdo",    label: "Azure DevOps",        description: "Build · Test · Release Gates", icon: "🔨", groupId: "g-cicd",       x: 210, y: 52 },
    { id: "acr",     label: "Container Registry",  description: "Image Store · Vuln Scan",       icon: "📋", groupId: "g-cicd",       x: 400, y: 52 },
    // Environments
    { id: "rg-dev",  label: "Dev RG",              description: "Dev Resource Group",            icon: "🛠️", groupId: "g-envs",       x: 20,  y: 52 },
    { id: "rg-test", label: "Test RG",             description: "Test Resource Group",           icon: "🧪", groupId: "g-envs",       x: 240, y: 52 },
    { id: "rg-prod", label: "Prod RG",             description: "Production Resource Group",     icon: "🚀", groupId: "g-envs",       x: 460, y: 52 },
    // Monitoring
    { id: "am",      label: "Azure Monitor",       description: "Metrics · Alerts · Dashboards",icon: "📈", groupId: "g-monitoring", x: 20,  y: 52 },
    { id: "ai",      label: "App Insights",        description: "APM · Distributed Traces",      icon: "🔭", groupId: "g-monitoring", x: 460, y: 52 },
    { id: "la",      label: "Log Analytics",       description: "Aggregated Logs · KQL",         icon: "📝", groupId: "g-monitoring", x: 900, y: 52 },
  ],

  edges: [
    { id: "e-u-afd",     source: "users",   target: "afd"    },
    { id: "e-afd-agwy",  source: "afd",     target: "agwy"   },
    { id: "e-agwy-aks",  source: "agwy",    target: "aks"    },
    { id: "e-aks-func",  source: "aks",     target: "func"   },
    { id: "e-aks-sql",   source: "aks",     target: "sqldb"  },
    { id: "e-func-blob", source: "func",    target: "blob"   },
    { id: "e-func-sql",  source: "func",    target: "sqldb"  },
    // Security (dashed)
    { id: "e-kv-aks",    source: "kv",      target: "aks",     label: "secret inject", dashed: true },
    { id: "e-kv-func",   source: "kv",      target: "func",    dashed: true },
    { id: "e-aad-aks",   source: "aad",     target: "aks",     label: "Managed Identity", dashed: true },
    { id: "e-aad-func",  source: "aad",     target: "func",    dashed: true },
    // CI/CD
    { id: "e-gh-azdo",   source: "gh",      target: "azdo"   },
    { id: "e-azdo-acr",  source: "azdo",    target: "acr"    },
    { id: "e-acr-dev",   source: "acr",     target: "rg-dev" },
    { id: "e-dev-test",  source: "rg-dev",  target: "rg-test", label: "promote" },
    { id: "e-test-prod", source: "rg-test", target: "rg-prod", label: "approve" },
    // Monitoring
    { id: "e-aks-am",    source: "aks",     target: "am"     },
    { id: "e-aks-ai",    source: "aks",     target: "ai"     },
    { id: "e-func-ai",   source: "func",    target: "ai"     },
    { id: "e-am-la",     source: "am",      target: "la"     },
    { id: "e-ai-la",     source: "ai",      target: "la"     },
  ],
};

// ─── Case Study 2 ────────────────────────────────────────────────────────────
const awsKubernetes: ArchitectureConfig = {
  groups: [
    // Row 1 — Internet Edge
    { id: "g-internet",  label: "🌐 Internet Edge",                            layerStyle: "edge",       x: 430,  y: 100,  width: 460,  height: 140 },
    // Row 2 — Public Subnet
    { id: "g-public",    label: "🔓 Public Subnets  ·  AWS VPC",               layerStyle: "network",    x: 100,  y: 320,  width: 680,  height: 140 },
    // Row 3 — EKS
    { id: "g-eks",       label: "☸️ Amazon EKS  ·  Private Subnets",           layerStyle: "compute",    x: 100,  y: 540,  width: 900,  height: 140 },
    // Row 4 — Data | Security
    { id: "g-data",      label: "🗄️ Data Subnet",                              layerStyle: "data",       x: 100,  y: 760,  width: 460,  height: 140 },
    { id: "g-security",  label: "🔐 IAM & Security",                           layerStyle: "security",   x: 620,  y: 760,  width: 680,  height: 140 },
    // Row 5 — CI/CD | Monitoring (same row)
    { id: "g-cicd",      label: "⚙️ CI/CD Pipeline",                           layerStyle: "cicd",       x: 100,  y: 980,  width: 680,  height: 140 },
    { id: "g-monitoring",label: "📊 Observability Stack",                       layerStyle: "monitoring", x: 100,  y: 1200, width: 1120, height: 140 },
  ],

  nodes: [
    // Standalone
    { id: "users2",  label: "End Users",           description: "Fintech customers · API clients",  icon: "👤", x: 560,  y: 10 },
    // Internet
    { id: "r53",     label: "Route 53",            description: "DNS · Health checks · Latency",    icon: "🔀", groupId: "g-internet",  x: 20,  y: 52 },
    { id: "cf",      label: "CloudFront",          description: "CDN · AWS WAF · Edge caching",     icon: "⚡", groupId: "g-internet",  x: 240, y: 52 },
    // Public
    { id: "igw",     label: "Internet Gateway",    description: "Inbound public traffic entry",     icon: "🚪", groupId: "g-public",    x: 20,  y: 52 },
    { id: "alb",     label: "App Load Balancer",   description: "HTTPS · SSL offload · TG routing", icon: "⚖️", groupId: "g-public",    x: 240, y: 52 },
    { id: "natgw",   label: "NAT Gateway",         description: "Outbound for private subnets",     icon: "🔁", groupId: "g-public",    x: 460, y: 52 },
    // EKS
    { id: "ng",      label: "Node Groups",         description: "EC2 Auto Scaling · Spot + OD",    icon: "🖥️", groupId: "g-eks",        x: 20,  y: 52 },
    { id: "ing",     label: "NGINX Ingress",       description: "Path routing · TLS termination",   icon: "🔀", groupId: "g-eks",        x: 240, y: 52 },
    { id: "apip",    label: "API Pods",            description: "HPA · Stateless · Request handles",icon: "⚙️", groupId: "g-eks",        x: 460, y: 52 },
    { id: "wrkp",    label: "Worker Pods",         description: "Queue processors · Batch jobs",    icon: "🔧", groupId: "g-eks",        x: 680, y: 52 },
    // Data
    { id: "rds",     label: "RDS PostgreSQL",      description: "Multi-AZ · Encrypted · Read replica",icon:"🗄️", groupId: "g-data",       x: 20,  y: 52 },
    { id: "s3",      label: "S3 Buckets",          description: "Artifacts · Logs · Backups · SSE", icon: "📦", groupId: "g-data",       x: 240, y: 52 },
    // Security
    { id: "iamr",    label: "IAM Roles / IRSA",   description: "Pod-level identity binding",        icon: "🔑", groupId: "g-security",  x: 20,  y: 52 },
    { id: "sm",      label: "Secrets Manager",     description: "DB creds · API keys · Auto-rotate",icon: "🔒", groupId: "g-security",  x: 240, y: 52 },
    { id: "sg",      label: "Security Groups",     description: "Least-privilege · Network ACLs",   icon: "🛡️", groupId: "g-security",  x: 460, y: 52 },
    // CI/CD
    { id: "gh2",     label: "GitHub",              description: "Source · Webhooks · Branch strategy",icon:"🐙", groupId: "g-cicd",       x: 20,  y: 52 },
    { id: "jen",     label: "Jenkins",             description: "Build · Unit test · Integration",  icon: "🔨", groupId: "g-cicd",       x: 240, y: 52 },
    { id: "ecr",     label: "Amazon ECR",          description: "Container registry · Image scan",  icon: "📋", groupId: "g-cicd",       x: 460, y: 52 },
    // Monitoring
    { id: "prom",    label: "Prometheus",          description: "Metrics scraping · Time-series",   icon: "📡", groupId: "g-monitoring", x: 20,  y: 52 },
    { id: "graf",    label: "Grafana",             description: "Dashboards · SLO · Alerting",      icon: "📊", groupId: "g-monitoring", x: 460, y: 52 },
    { id: "cw",      label: "CloudWatch",          description: "AWS native metrics · Log groups",  icon: "☁️", groupId: "g-monitoring", x: 900, y: 52 },
  ],

  edges: [
    { id: "e-u-r53",      source: "users2",  target: "r53"   },
    { id: "e-r53-cf",     source: "r53",     target: "cf"    },
    { id: "e-cf-igw",     source: "cf",      target: "igw"   },
    { id: "e-igw-alb",    source: "igw",     target: "alb"   },
    { id: "e-alb-ing",    source: "alb",     target: "ing"   },
    { id: "e-ing-apip",   source: "ing",     target: "apip"  },
    { id: "e-ing-wrkp",   source: "ing",     target: "wrkp"  },
    { id: "e-apip-rds",   source: "apip",    target: "rds"   },
    { id: "e-apip-s3",    source: "apip",    target: "s3"    },
    { id: "e-wrkp-rds",   source: "wrkp",    target: "rds"   },
    { id: "e-wrkp-s3",    source: "wrkp",    target: "s3"    },
    // IAM (dashed)
    { id: "e-iam-apip",   source: "iamr",    target: "apip",  label: "IRSA",         dashed: true },
    { id: "e-iam-wrkp",   source: "iamr",    target: "wrkp",  dashed: true },
    { id: "e-sm-apip",    source: "sm",      target: "apip",  label: "env secrets",  dashed: true },
    { id: "e-sm-wrkp",    source: "sm",      target: "wrkp",  dashed: true },
    // CI/CD
    { id: "e-gh2-jen",    source: "gh2",     target: "jen"   },
    { id: "e-jen-ecr",    source: "jen",     target: "ecr"   },
    { id: "e-ecr-ng",     source: "ecr",     target: "ng"    },
    { id: "e-ng-ing",     source: "ng",      target: "ing"   },
    // Monitoring
    { id: "e-apip-prom",  source: "apip",    target: "prom"  },
    { id: "e-wrkp-prom",  source: "wrkp",    target: "prom"  },
    { id: "e-prom-graf",  source: "prom",    target: "graf"  },
    { id: "e-alb-cw",     source: "alb",     target: "cw"    },
    { id: "e-cw-graf",    source: "cw",      target: "graf"  },
  ],
};

// ─── Case Study 3 ────────────────────────────────────────────────────────────
const cicdModernization: ArchitectureConfig = {
  groups: [
    // Row 1 — Source Control
    { id: "g-source",    label: "📝 Source Control",                 layerStyle: "cicd",       x: 430,  y: 20,  width: 460,  height: 140 },
    // Row 2 — CI Pipeline
    { id: "g-ci",        label: "🔨 CI Pipeline  ·  Jenkins",        layerStyle: "cicd",       x: 100,  y: 240, width: 1120, height: 140 },
    // Row 3 — IaC | Artifacts
    { id: "g-iac",       label: "🏗️ Infrastructure as Code",         layerStyle: "iac",        x: 100,  y: 460, width: 460,  height: 140 },
    { id: "g-artifacts", label: "📦 Artifact Repository",            layerStyle: "artifacts",  x: 620,  y: 460, width: 280,  height: 140 },
    // Row 4 — CD / Environments
    { id: "g-cd",        label: "🚀 CD Pipeline  ·  Kubernetes GitOps", layerStyle: "deploy",  x: 100,  y: 680, width: 900,  height: 140 },
    // Row 5 — Monitoring
    { id: "g-monitoring",label: "📊 Monitoring & Observability",      layerStyle: "monitoring", x: 100,  y: 900, width: 1140, height: 140 },
  ],

  nodes: [
    // Source
    { id: "gh3",     label: "GitHub",              description: "Feature branches · PRs · Webhooks",  icon: "🐙", groupId: "g-source",    x: 20,  y: 52 },
    { id: "tag",     label: "Version Tags",         description: "Semantic versioning · Release triggers",icon:"🏷️",groupId: "g-source",    x: 240, y: 52 },
    // CI
    { id: "jen3",    label: "Jenkins Master",       description: "Pipeline orchestration · Shared libs",icon: "🔨", groupId: "g-ci",        x: 20,  y: 52 },
    { id: "unit",    label: "Unit Tests",           description: "JUnit · pytest · Coverage gates",    icon: "🧪", groupId: "g-ci",        x: 240, y: 52 },
    { id: "int",     label: "Integration Tests",   description: "API contract · End-to-end",           icon: "🔗", groupId: "g-ci",        x: 460, y: 52 },
    { id: "sast",    label: "Security Scan",        description: "SonarQube · Trivy · OWASP Dep-Check",icon: "🛡️", groupId: "g-ci",        x: 680, y: 52 },
    { id: "dock",    label: "Docker Build",         description: "Multi-stage · Non-root user · Cache",icon: "🐳", groupId: "g-ci",        x: 900, y: 52 },
    // IaC
    { id: "tf",      label: "Terraform",            description: "Provisioning · Remote state · Atlantis",icon:"🏗️",groupId: "g-iac",        x: 20,  y: 52 },
    { id: "ans",     label: "Ansible",              description: "Config mgmt · Hardening · Roles",    icon: "⚙️", groupId: "g-iac",        x: 240, y: 52 },
    // Artifacts
    { id: "nex",     label: "Nexus / ECR",          description: "Container images · Helm charts",     icon: "📋", groupId: "g-artifacts", x: 40,  y: 52 },
    // CD / Environments
    { id: "helm",    label: "Helm",                 description: "Package manager · Per-env values",   icon: "⛵", groupId: "g-cd",        x: 20,  y: 52 },
    { id: "dev",     label: "Dev Namespace",         description: "Auto-deploy on merge to main",       icon: "🛠️", groupId: "g-cd",        x: 240, y: 52 },
    { id: "stg",     label: "Staging Namespace",    description: "Smoke tests · Approval gate",         icon: "🧪", groupId: "g-cd",        x: 460, y: 52 },
    { id: "prod3",   label: "Prod Namespace",        description: "Manual approval · Blue-green deploy", icon: "🚀", groupId: "g-cd",        x: 680, y: 52 },
    // Monitoring (6 nodes at step=180)
    { id: "prom3",   label: "Prometheus",           description: "Metrics scraping · AlertManager",    icon: "📡", groupId: "g-monitoring", x: 20,  y: 52 },
    { id: "graf3",   label: "Grafana",              description: "Dashboards · SLO tracking",           icon: "📊", groupId: "g-monitoring", x: 200, y: 52 },
    { id: "logst",   label: "Logstash",             description: "Log ingestion · Enrichment",          icon: "🔄", groupId: "g-monitoring", x: 380, y: 52 },
    { id: "es",      label: "Elasticsearch",        description: "Log storage · Full-text indexing",    icon: "🔍", groupId: "g-monitoring", x: 560, y: 52 },
    { id: "kib",     label: "Kibana",               description: "Log viz · Saved searches",            icon: "👁️", groupId: "g-monitoring", x: 740, y: 52 },
    { id: "alert",   label: "Alertmanager",         description: "PagerDuty · Slack · Escalation",      icon: "🚨", groupId: "g-monitoring", x: 920, y: 52 },
  ],

  edges: [
    // Source → CI
    { id: "e-gh3-jen",    source: "gh3",    target: "jen3",  label: "webhook"   },
    { id: "e-gh3-tf",     source: "gh3",    target: "tf",    label: "infra PR"  },
    { id: "e-tag-nex",    source: "tag",    target: "nex"                       },
    // CI pipeline
    { id: "e-jen-unit",   source: "jen3",   target: "unit"   },
    { id: "e-jen-sast",   source: "jen3",   target: "sast"   },
    { id: "e-unit-int",   source: "unit",   target: "int"    },
    { id: "e-int-dock",   source: "int",    target: "dock"   },
    { id: "e-sast-dock",  source: "sast",   target: "dock"   },
    { id: "e-dock-nex",   source: "dock",   target: "nex"    },
    // IaC
    { id: "e-tf-ans",     source: "tf",     target: "ans"    },
    { id: "e-ans-helm",   source: "ans",    target: "helm",  label: "configure" },
    // CD
    { id: "e-nex-helm",   source: "nex",    target: "helm"  },
    { id: "e-helm-dev",   source: "helm",   target: "dev"   },
    { id: "e-dev-stg",    source: "dev",    target: "stg",   label: "promote"   },
    { id: "e-stg-prod",   source: "stg",    target: "prod3", label: "approved"  },
    // Metrics
    { id: "e-prod-prom",  source: "prod3",  target: "prom3" },
    { id: "e-stg-prom",   source: "stg",    target: "prom3" },
    { id: "e-dev-prom",   source: "dev",    target: "prom3" },
    { id: "e-prom-graf",  source: "prom3",  target: "graf3" },
    { id: "e-prom-alert", source: "prom3",  target: "alert" },
    // Logs
    { id: "e-prod-log",   source: "prod3",  target: "logst" },
    { id: "e-stg-log",    source: "stg",    target: "logst" },
    { id: "e-logst-es",   source: "logst",  target: "es"    },
    { id: "e-es-kib",     source: "es",     target: "kib"   },
  ],
};

// ─── Public registry ─────────────────────────────────────────────────────────

export const architectureConfigs: Record<string, ArchitectureConfig> = {
  "onprem-to-azure-migration":     azureMigration,
  "aws-kubernetes-fintech":        awsKubernetes,
  "cicd-automation-modernization": cicdModernization,
};
