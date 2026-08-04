export interface CaseStudy {
  slug: string;
  title: string;
  f_title: string;
  category: string;
  description: string;
  bgColor?: string;
  client: string;
  industry: string;
  timeline: string;
  tools: string;
  problem: string;
  solution: string;
  heroImages: string[];
  stats?: Array<{ value: string; label: string }>;
  features?: string[];
  research: string;
  wireframes: string;
  uiDesign: string;
  development: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "northwave-commerce",
    title: "PvP Gaming Community Platform",
    f_title: "PvP Gaming Platform",
    category: "Web & Mobile Development",
    description: "A universal gaming community platform built to help gamers discover, connect, and play together.",
    bgColor: "#5383FF",
    client: "PvP Gaming",
    industry: "Gaming / Social Community",
    timeline: "6 Months",
    tools: "React.js . Node.js . MongoDB . Figma",
    problem:
      "Needed a platform where gamers could discover, connect, and play together by skill and schedule.",
    solution:
      "Built a gaming community with Squad Finder, messaging, open lobbies, and Twitch integration.",
    research: "Analyzed gaming community needs, player behavior, and competitor platforms",
    wireframes: "Mapped user flows for Squad Finder, profiles, lobbies, and messaging",
    uiDesign: "Designed dark-themed, immersive UI with gaming-focused visual language",
    development: "Built full-stack platform with React.js, Node.js, MongoDB, and Twitch integration",
    heroImages: [
      "/portfolio-images/Card-images/card-image-1.png",
    ],
    stats: [
      { value: "60+", label: "Games Supported" },
      { value: "100K+", label: "Community Users" },
      { value: "Web & Mobile", label: "Platform" },
    ],
    features: [
      "Algorithmically matched gaming community",
      "Real-time squad finding and voice chat",
      "Twitch Extension for creator monetization",
    ],
  },
  {
    slug: "finlight-personal-finance",
    title: "CashBook Finance App",
    f_title: "TrendBost",
    category: "Web & Mobile Development",
    description: "A smart mobile finance app for tracking total balance, cash flow, and business books in one place.",
    bgColor: "#8EAEFF",
    client: "CashBook",
    industry: "Finance / Accounting",
    timeline: "14 weeks",
    tools: "React.js . Node.js . MongoDB . Figma",
    problem:
      "Needed a simple mobile solution to track business cash flow, balances, and multiple business books in one place",
    solution:
      "Built a clean mobile finance app with real-time balance tracking, multiple business books, and instant cash flow insights",
    research: "Analyzed user cash tracking needs and pain points",
    wireframes: "Mapped flows for balance, books, and transactions",
    uiDesign: "Designed clean purple-themed mobile interface",
    development: "Built with React Native for iOS and Android",
    heroImages: [
      "/portfolio-images/Card-images/card-image-2.png",
    ],
    stats: [
      { value: "Real-time", label: "Balance Tracking" },
      { value: "Multiple", label: "Business Books" },
      { value: "Instant", label: "Cash Flow Insights" },
    ],
    features: [
      "Clean dashboard for instant financial overview",
      "Multiple business books in one app",
      "Real-time cash in and cash out tracking",
    ],
  },
  {
    slug: "evergreen-brand-identity",
    title: "ZetaStudy Global Education Platform",
    f_title: "ZetaStudy",
    category: "Web Development & Dashboard",
    description: "A global education platform connecting 50K+ students with 500+ universities across 20+ countries.",
    bgColor: "#F2F4F7",
    client: "ZetaStudy",
    industry: "Education / EdTech",
    timeline: "Ongoing",
    tools: "React.js · Node.js · MongoDB · Figma",
    problem:
      "Students struggled to find and apply to international universities — with no centralized platform for program discovery, applications, and visa guidance",
    solution:
      "Built a comprehensive education platform with smart program matching, application tracking, and visa guidance for students worldwide",
    research: "Analyzed student needs, university requirements, and competitor platforms",
    wireframes: "Mapped flows for program search, applications, and partner dashboard",
    uiDesign: "Designed clean, professional interface for students and universities",
    development: "Built full-stack platform with dashboard and admin panel",
    heroImages: [
      "/portfolio-images/Card-images/card-image-3.png",
    ],
    stats: [
      { value: "50K+", label: "Students Placed" },
      { value: "500+", label: "Partner Universities" },
      { value: "20+", label: "Countries" },
    ],
    features: [
      "Centralized platform for global university discovery",
      "Smart program matching for students",
      "Streamlined admissions for universities worldwide",
    ],
  },
  {
    slug: "pulse-analytics-dashboard",
    title: "SyncOk AI Video Generator",
    f_title: "SyncOk AI",
    category: "AI & Generative Solutions",
    description: "An AI-powered tool that turns text into viral faceless videos for YouTube and TikTok creators.",
    bgColor: "#F8F9FA",
    client: "SyncOk",
    industry: "AI / Content Creation",
    timeline: "16 weeks",
    tools: "React.js · Node.js · Python · Figma",
    problem:
      "Content creators struggled with time-consuming video production — requiring expensive tools, editing skills, and hours of work for every upload",
    solution:
      "Built an AI-powered platform that transforms text prompts into professional faceless videos in under 3 minutes — no editing required",
    research: "Analyzed creator pain points and viral content patterns",
    wireframes: "Mapped flows for prompt input, video preview, and export",
    uiDesign: "Designed clean purple-themed interface for creators",
    development: "Built AI video generation engine with Python and React.js",
    heroImages: [
      "/portfolio-images/Card-images/card-img-4.png",
    ],
    stats: [
      { value: "3 Min", label: "Video Creation Time" },
      { value: "100s", label: "Videos Generated" },
      { value: "Zero", label: "Editing Required" },
    ],
    features: [
      "Text to video in under 3 minutes",
      "Zero editing skills required",
      "Viral-ready content for YouTube and TikTok",
    ],
  },
  {
    slug: "lumen-social-campaign",
    title: "Windsor Education Consultancy",
    f_title: "Windsor",
    category: "Web Development",
    description: "A trusted education consultancy connecting students with 232+ universities across 6 global destinations.",
    bgColor: "#8EAEFF",
    client: "Windsor Consultancy",
    industry: "Education / Consulting",
    timeline: "12 weeks",
    tools: "React.js · Node.js · MongoDB · Figma",
    problem:
      "Students lacked a single platform for study abroad programs, visa guidance, and IELTS preparation",
    solution:
      "Built a consultancy website with destination exploration, university listings, visa assistance, and test preparation guidance",
    research: "Analyzed student needs and consultancy workflows",
    wireframes: "Mapped flows for destinations, programs, and contact",
    uiDesign: "Designed professional, trust-building interface",
    development: "Built responsive website with contact and booking forms",
    heroImages: [
      "/portfolio-images/Card-images/card-img-5.png",
    ],
    stats: [
      { value: "95%", label: "Success Rate" },
      { value: "232+", label: "Partner Universities" },
      { value: "6", label: "Global Destinations" },
    ],
    features: [
      "Centralized platform for study abroad guidance",
      "Easy visa and IELTS support access",
      "Professional online presence for consultancy",
    ],
  },
  {
    slug: "savor-restaurant-booking",
    title: "Flavorscape Restaurant Website",
    f_title: "Flavorscape",
    category: "Web Development",
    description: "A restaurant website showcasing authentic cuisine with online menu, table booking, and special offers.",
    bgColor: "#D7E2FF",
    client: "Flavorscape",
    industry: "Food & Beverage",
    timeline: "6 Months",
    tools: "React.js · Node.js · Figma",
    problem:
      "Restaurant had no online presence — customers couldn't view the menu, book tables, or discover special offers digitally",
    solution:
      "Built a warm, inviting restaurant website with online menu, table booking, special offers, and contact integration",
    research: "Analyzed restaurant branding and customer needs",
    wireframes: "Mapped flows for menu, booking, and contact",
    uiDesign: "Designed warm, food-focused visual interface",
    development: "Built responsive website with booking and menu features",
    heroImages: [
      "/portfolio-images/Card-images/card-image-6.png",
    ],
    stats: [
      { value: "Fresh", label: "Ingredients" },
      { value: "Daily", label: "Service" },
      { value: "22+", label: "Years of Experience" },
    ],
    features: [
      "Professional online presence for restaurant",
      "Easy table booking and menu access",
      "Special offers and discounts showcase",
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getAllSlugs(): string[] {
  return caseStudies.map((study) => study.slug);
}

export function getCaseStudiesExcluding(slug: string): CaseStudy[] {
  return caseStudies.filter((study) => study.slug !== slug);
}