export const profile = {
  name: "Arun Kumar",
  role: "Backend Engineer",
  location: "Hyderabad, Telangana, India",
  email: "arunkumar800a@gmail.com",
  linkedin: "https://linkedin.com/in/arunbalreddy",
  github: "", // TODO: add GitHub profile URL
  resumeFile: "/resume/Arun-Kumar-Resume.pdf",
  tagline: "I build scalable backend systems and REST APIs.",
  summary: [
    "I'm a backend engineer with 3+ years of experience designing and shipping scalable backend services and REST APIs. I work primarily with Node.js, NestJS, and TypeScript, backed by MySQL, PostgreSQL, Redis, and Prisma ORM — with a focus on microservices, asynchronous processing, authentication/authorization, and database performance.",
    "Currently, I'm a Senior Backend Developer at Candy Technologies, where I own the backend architecture for SyncOffice, a multi-tenant SaaS platform — from API design and queue-based processing to caching strategy and cloud storage integration.",
  ],
  currentRole: {
    title: "Senior Backend Developer",
    company: "Candy Technologies Pvt. Ltd.",
    period: "Jun 2023 — Present",
  },
  education: [
    {
      school: "NxtWave Disruptive Technologies",
      credential: "Industry Ready Certification in Full Stack Development",
    },
    {
      school: "Vidya Vikas Engineering College",
      credential: "Diploma in Mechanical Engineering",
    },
  ],
  certifications: [
    "Full Stack Development",
    "React JS",
    "Node JS",
    "JavaScript Essentials",
    "Introduction to Databases",
  ],
} as const;

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript (ES6+)"],
  },
  {
    category: "Backend & Frameworks",
    skills: ["Node.js", "NestJS", "Express.js"],
  },
  {
    category: "Databases & ORM",
    skills: ["MySQL", "PostgreSQL", "Prisma ORM", "Redis"],
  },
  {
    category: "Architecture & Messaging",
    skills: ["REST APIs", "Microservices", "BullMQ"],
  },
  {
    category: "Auth & Security",
    skills: ["JWT", "RBAC"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS S3", "Docker", "CI/CD", "Git"],
  },
  {
    category: "Testing & Performance",
    skills: ["Jest", "SQL Optimization"],
  },
];

export type Project = {
  slug: string;
  name: string;
  kind: "Professional" | "Personal Project";
  description: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  caseStudy: {
    problem: string;
    approach: string;
    outcome: string;
  };
};

export const projects: Project[] = [
  {
    slug: "syncoffice-platform",
    name: "SyncOffice Platform",
    kind: "Professional",
    description:
      "Backend architecture for a multi-tenant SaaS platform covering workforce management, document management, and invoicing.",
    tags: [
      "Node.js",
      "NestJS",
      "TypeScript",
      "Prisma",
      "MySQL",
      "Redis",
      "BullMQ",
      "AWS S3",
      "JWT",
      "RBAC",
    ],
    caseStudy: {
      problem:
        "Candy Technologies needed a single backend to power SyncOffice end-to-end — a multi-tenant SaaS product spanning workforce management, document management, and invoicing — with room to scale as tenants and document volume grew.",
      approach:
        "I designed and built the backend with NestJS, TypeScript, and Prisma over MySQL, modeling multi-tenant data access and REST APIs for each module. Document uploads, downloads, and restores run through AWS S3, with Redis caching and BullMQ-based background queues handling asynchronous processing to keep request latency low under heavier workloads. Authentication and authorization are handled with JWT and role-based access control (RBAC), and I optimized SQL queries and schemas as usage grew.",
      outcome:
        "I own this backend end-to-end in production — from architecture and API design to debugging and performance tuning — supporting storage tracking, async document workflows, and the day-to-day operation of a live multi-tenant SaaS product.",
    },
  },
  {
    slug: "nxttrendz-ecommerce",
    name: "NxtTrendz E-Commerce",
    kind: "Personal Project",
    description:
      "An Amazon-inspired shopping app with authentication, product search, filtering, and product management.",
    tags: ["JavaScript", "React", "REST APIs", "Authentication", "Search & Filtering"],
    caseStudy: {
      problem:
        "Build a shopping application that mirrors the core flows of a real e-commerce product — browsing a catalog, narrowing results, and managing a session securely — as a self-directed project during full-stack training.",
      approach:
        "I implemented token-based authentication, product listing with category and price filters, keyword search, and product management views, focusing on clean API consumption and predictable state on the client.",
      outcome:
        "A working, end-to-end shopping flow from login to checkout-ready product browsing — practicing the same auth and data-fetching patterns I now apply in production backend work.",
    },
  },
  {
    slug: "movies-app",
    name: "Movies App",
    kind: "Personal Project",
    description:
      "A Netflix-style streaming interface with content discovery and a fully responsive layout.",
    tags: ["JavaScript", "React", "REST APIs", "Responsive Design"],
    caseStudy: {
      problem:
        "Recreate the content-discovery experience of a streaming platform — browsing, searching, and viewing title details — across devices.",
      approach:
        "I consumed a movies API to render genre-based rows and search results, and built a fully responsive layout so the browsing experience holds up from mobile to desktop.",
      outcome:
        "A responsive, functional streaming-style browser that demonstrates API integration and UI craftsmanship independent of backend ownership.",
    },
  },
];
