/**
 * Architecture diagrams keyed by case-study slug.
 * Each value is a Mermaid flowchart string.
 * Change content here without touching any page or component.
 */
export const caseDiagrams: Record<string, string> = {
  /* ──────────────────────────────────────────────────────────────────────────
   * Case Study 1 · Azure On-Prem to Cloud Migration
   * ────────────────────────────────────────────────────────────────────────── */
  "onprem-to-azure-migration": `
flowchart TD
  %% ── EDGE LAYER ─────────────────────────────────────────────────────────
  USERS(["👤 End Users"])

  subgraph EDGE["🌐  Edge Layer"]
    AFD["Azure Front Door\\nWAF · CDN · Global Load Balancer"]
  end

  %% ── AZURE VIRTUAL NETWORK ──────────────────────────────────────────────
  subgraph VNET["Azure Virtual Network · 10.0.0.0/16"]
    subgraph PUBSUB["Public Subnet · 10.0.1.0/24"]
      AGWY["Application Gateway v2\\nL7 · SSL Termination · WAF"]
    end

    subgraph APPSUB["App Subnet · 10.0.2.0/24"]
      AKS["AKS Cluster\\nContainerized Web App\\nPods · HPA · Ingress Controller"]
    end

    subgraph FUNCSUB["Functions Subnet · 10.0.3.0/24"]
      FUNC["Azure Functions\\nEvent-Driven Processing\\nConsumption Plan"]
    end

    subgraph DATASUB["Data Subnet · 10.0.4.0/24"]
      SQLDB[("Azure SQL Database\\nPrimary + Geo-Replica\\nPrivate Endpoint")]
      BLOB["Azure Blob Storage\\nZRS Redundancy\\nPrivate Endpoint"]
    end
  end

  %% ── SECURITY LAYER ──────────────────────────────────────────────────────
  subgraph SEC["🔐  Security Layer"]
    KV["Azure Key Vault\\nSecrets · Certificates · Keys"]
    AAD["Azure Active Directory\\nRBAC · Managed Identity"]
  end

  %% ── ENVIRONMENT ISOLATION ───────────────────────────────────────────────
  subgraph ENVS["📦  Resource Group Isolation"]
    RG_DEV["Dev\\nResource Group"]
    RG_TEST["Test\\nResource Group"]
    RG_PROD["Prod\\nResource Group"]
  end

  %% ── CI/CD LAYER ─────────────────────────────────────────────────────────
  subgraph CICD["⚙️  DevOps · CI/CD Layer"]
    GH["GitHub\\nSource Control · PRs · Branching"]
    AZDO["Azure DevOps Pipelines\\nBuild · Test · Release Gates"]
    ACR["Azure Container Registry\\nImage Store · Vulnerability Scan"]
  end

  %% ── MONITORING LAYER ────────────────────────────────────────────────────
  subgraph OBS["📊  Monitoring & Observability"]
    AM["Azure Monitor\\nMetrics · Alerts · Dashboards"]
    AI["Application Insights\\nAPM · Distributed Traces · User Flows"]
    LA["Log Analytics Workspace\\nAggregated Logs · KQL Queries"]
  end

  %% ── CONNECTIONS ─────────────────────────────────────────────────────────
  USERS --> AFD
  AFD --> AGWY
  AGWY --> AKS
  AKS --> FUNC
  AKS --> SQLDB
  FUNC --> BLOB
  FUNC --> SQLDB

  KV -.->|secret injection| AKS
  KV -.->|secret injection| FUNC
  AAD -.->|Managed Identity| AKS
  AAD -.->|Managed Identity| FUNC

  GH --> AZDO
  AZDO --> ACR
  ACR --> RG_DEV
  RG_DEV -->|promote| RG_TEST
  RG_TEST -->|approve & promote| RG_PROD

  AKS --> AM
  AKS --> AI
  FUNC --> AI
  AM --> LA
  AI --> LA
`,

  /* ──────────────────────────────────────────────────────────────────────────
   * Case Study 2 · AWS Kubernetes Fintech Infrastructure
   * ────────────────────────────────────────────────────────────────────────── */
  "aws-kubernetes-fintech": `
flowchart TD
  %% ── INTERNET EDGE ──────────────────────────────────────────────────────
  USERS(["👤 End Users"])

  subgraph INTERNET["🌐  Internet Edge"]
    R53["Route 53\\nDNS · Health Checks · Latency Routing"]
    CF["CloudFront\\nCDN · AWS WAF · Edge Caching"]
  end

  %% ── AWS VPC ─────────────────────────────────────────────────────────────
  subgraph VPC["AWS VPC · 172.16.0.0/16 · Multi-AZ (us-east-1a / 1b)"]

    subgraph PUB["Public Subnets"]
      IGW["Internet Gateway"]
      ALB["Application Load Balancer\\nHTTPS · SSL Offload · Target Groups"]
      NATGW["NAT Gateway\\nOutbound for private subnets"]
    end

    subgraph PRIV["Private Subnets"]
      subgraph EKS["Amazon EKS · Managed Control Plane"]
        NG["Node Groups\\nEC2 Auto Scaling · On-Demand + Spot"]
        ING["NGINX Ingress Controller\\nPath-based Routing · TLS"]
        APIP["API Pods\\nHorizontal Pod Autoscaler"]
        WRKP["Worker Pods\\nQueue Processors · Batch Jobs"]
      end
    end

    subgraph DATA["Isolated Data Subnet"]
      RDS[("RDS PostgreSQL\\nMulti-AZ · Encrypted · Read Replica")]
      S3["S3 Buckets\\nArtifacts · Logs · Backups · SSE-S3"]
    end

  end

  %% ── IAM & SECURITY ──────────────────────────────────────────────────────
  subgraph SEC["🔐  IAM & Security"]
    IAMR["IAM Roles\\nIRSA · Pod-Level Binding"]
    SM["Secrets Manager\\nDB Credentials · API Keys · Auto-Rotation"]
    SG["Security Groups\\nLeast Privilege · Network ACLs"]
  end

  %% ── CI/CD PIPELINE ──────────────────────────────────────────────────────
  subgraph CICD["⚙️  CI/CD Pipeline"]
    GH["GitHub\\nSource Control · Webhooks · Branch Strategy"]
    JEN["Jenkins\\nBuild · Unit Test · Integration Test · Push"]
    ECR["Amazon ECR\\nContainer Registry · Image Scan · Lifecycle"]
  end

  %% ── OBSERVABILITY ───────────────────────────────────────────────────────
  subgraph OBS["📊  Observability Stack"]
    PROM["Prometheus\\nMetrics Scraping · Time-Series Storage"]
    GRAF["Grafana\\nDashboards · SLO Tracking · Alerting"]
    CW["CloudWatch\\nAWS Native Metrics · Log Groups"]
  end

  %% ── CONNECTIONS ─────────────────────────────────────────────────────────
  USERS --> R53 --> CF
  CF --> IGW --> ALB
  ALB --> ING
  ING --> APIP
  ING --> WRKP
  APIP --> RDS
  WRKP --> RDS
  APIP --> S3
  WRKP --> S3
  PRIV --> NATGW

  IAMR -.->|IRSA binding| APIP
  IAMR -.->|IRSA binding| WRKP
  SM -.->|env secrets| APIP
  SM -.->|env secrets| WRKP
  SG -.->|restricts traffic| EKS
  SG -.->|restricts traffic| DATA

  GH --> JEN
  JEN --> ECR
  ECR --> NG

  APIP --> PROM
  WRKP --> PROM
  PROM --> GRAF
  RDS --> CW
  ALB --> CW
  CW --> GRAF
`,

  /* ──────────────────────────────────────────────────────────────────────────
   * Case Study 3 · CI/CD & Infrastructure Automation Modernization
   * ────────────────────────────────────────────────────────────────────────── */
  "cicd-automation-modernization": `
flowchart TD
  %% ── SOURCE CONTROL ──────────────────────────────────────────────────────
  subgraph CODE["📝  Source Control"]
    GH["GitHub\\nFeature Branches · Pull Requests · Webhooks"]
    TAG["Semantic Version Tags\\nRelease Triggers"]
  end

  %% ── CI PIPELINE ─────────────────────────────────────────────────────────
  subgraph CI["🔨  CI Pipeline · Jenkins"]
    JEN["Jenkins Master\\nPipeline Orchestration · Shared Libraries"]
    UNIT["Unit Tests\\nJUnit · pytest · Coverage Gates"]
    INT["Integration Tests\\nAPI Contract · End-to-End"]
    SAST["Security & Quality Scan\\nSonarQube · Trivy · OWASP Dependency Check"]
    DOCK["Docker Build\\nMulti-stage · Layer Caching · Non-root User"]
  end

  %% ── INFRASTRUCTURE AS CODE ──────────────────────────────────────────────
  subgraph IAC["🏗️  Infrastructure as Code"]
    TF["Terraform\\nCloud Resource Provisioning\\nRemote State · Atlantis PR Automation"]
    ANS["Ansible\\nConfiguration Management\\nHardening · Post-provision Roles"]
  end

  %% ── ARTIFACT REPOSITORY ─────────────────────────────────────────────────
  subgraph ARTIFACTS["📦  Artifact Repository"]
    NEX["Nexus / ECR\\nContainer Images · Helm Charts\\nVersioned & Immutable Artifacts"]
  end

  %% ── CD PIPELINE + ENVIRONMENTS ──────────────────────────────────────────
  subgraph CD["🚀  CD Pipeline · Kubernetes GitOps"]
    HELM["Helm\\nPackage Manager · Per-env Values Files"]
    subgraph ENVS["Environment Promotion"]
      DEV["Dev Namespace\\nAuto-deploy on merge to main"]
      STG["Staging Namespace\\nSmoke Tests · Approval Gate"]
      PROD["Prod Namespace\\nManual Approval · Blue-Green"]
    end
  end

  %% ── MONITORING STACK ────────────────────────────────────────────────────
  subgraph OBS["📊  Monitoring & Observability"]
    PROM["Prometheus\\nMetrics Scraping · AlertManager Rules"]
    GRAF["Grafana\\nDashboards · SLO Tracking"]
    LOGST["Logstash\\nLog Ingestion · Enrichment · Parsing"]
    ES["Elasticsearch\\nLog Storage · Full-Text Indexing"]
    KIB["Kibana\\nLog Visualization · Saved Searches"]
    ALERT["Alertmanager\\nPagerDuty · Slack · Escalation Policies"]
  end

  %% ── CONNECTIONS ─────────────────────────────────────────────────────────
  GH -->|webhook trigger| JEN
  GH -->|infra PR trigger| TF
  TAG --> NEX

  JEN --> UNIT
  JEN --> SAST
  UNIT --> INT
  INT --> DOCK
  SAST --> DOCK
  DOCK --> NEX

  TF --> ANS
  ANS -->|configure cluster nodes| ENVS

  NEX --> HELM
  HELM --> DEV
  DEV -->|promote on pass| STG
  STG -->|approved| PROD

  PROD --> PROM
  STG --> PROM
  DEV --> PROM
  PROM --> GRAF
  PROM --> ALERT
  ALERT -->|notify| GRAF

  PROD --> LOGST
  STG --> LOGST
  DEV --> LOGST
  LOGST --> ES --> KIB
`,
};
