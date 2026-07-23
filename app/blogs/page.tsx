"use client";
import React, { useState, useRef, useEffect } from "react";
import TransparentNavbar from "../components/Navbar";
import BlogHero from "./BlogHero";
import SpotlightSection from "./_components/SpotlightSection";
import RecentUpdates from "./_components/Recentupdates";
import FeaturedPosts from "./_components/FeaturedPosts";
import PopularArticles from "./_components/PopularArticles";
import NewsletterBanner from "./_components/NewsletterBanner";
import Footer from "../components/Footer";

const customPosts = [
  {
    id: 1,
    title1: "Digitalization: ",
    title2: "The Real Estate Industry’s New Cornerstone",
    date: "February 21, 2024",
    image: "/blogs/updates-cards/right-image-1.jpg",
    featured: true,
  },
  {
    id: 2,
    title1: "How to Find Right ",
    title2: "IT Staff Augmentation Company",
    date: "October 11, 2022",
    image: "/blogs/updates-cards/right-image-2.jpg",
  },
  {
    id: 3,
    title1: "How to ",
    title2: "Generate Leads and Sales",
    date: "July 23, 2022",
    image: "/blogs/updates-cards/right-image-3.jpg",
  },
];

const spotlightItems = [
  {
    id: "1",
    type: "Article",
    titleFirstPart: "Redefining",
    titleSecondPart: " UX with Micro-interactions",
    description: "Micro interactions bring life to digital products. Explore how subtle animations and responses shape user satisfaction and brand perception.",
    image: "/blogs/spotlight-cards/image-1.jpg",
    href: "#",
  },
  {
    id: "2",
    type: "Article",
    titleFirstPart: "From Code to Cloud: ",
    titleSecondPart: "A Modern Workflow",
    description: "Uncover how cloud-native environments empower development teams to simplify and scale deployment using containerization and automation.",
    image: "/blogs/spotlight-cards/image-2.jpg",
    href: "#",
  },
  {
    id: "3",
    type: "Article",
    titleFirstPart: "The Rise of Design Systems in ",
    titleSecondPart: "Agencies",
    description: "Learn how standardized design systems boost collaboration and consistency across UI/UX teams, while saving time in real-world projects.",
    image: "/blogs/spotlight-cards/image.jpg",
    href: "#",
  },
  {
    id: "4",
    type: "Article",
    titleFirstPart: "Smart Hiring in Tech: ",
    titleSecondPart: "Data-Driven Decisions",
    description: "Tech recruitment is evolving. This article dives into how data and behavioral metrics are transforming the hiring landscape.",
    image: "/blogs/spotlight-cards/image-4.jpg",
    href: "#",
  },
];

const spotlightItems2 = [
  {
    id: "1",
    type: "Article",
    titleFirstPart: "Editor's Pick: ",
    titleSecondPart: "UX Innovations 2026",
    description:
      "Explore cutting-edge UX trends handpicked by our editors. Learn how innovative interactions shape modern digital experiences.",
    image: "/blogs/spotlight-cards/image-1.jpg",
    href: "#",
  },
  {
    id: "2",
    type: "Article",
    titleFirstPart: "Cloud Insights: ",
    titleSecondPart: "Future-Proofing Dev Teams",
    description:
      "Dive into the world of cloud-native strategies. See how teams are accelerating deployment, efficiency, and scalability.",
    image: "/blogs/spotlight-cards-2/image-2.jpg",
    href: "#",
  },
  {
    id: "3",
    type: "Article",
    titleFirstPart: "Design Evolution: ",
    titleSecondPart: "Scaling Creative Systems",
    description:
      "Learn how design systems empower teams to work smarter, not harder, maintaining consistent and impactful user interfaces.",
    image: "/blogs/spotlight-cards-2/image.jpg",
    href: "#",
  },
  {
    id: "4",
    type: "Article",
    titleFirstPart: "Tech Hiring: ",
    titleSecondPart: "Analytics-Driven Recruitment",
    description:
      "Leverage behavioral insights and metrics for strategic hiring decisions, ensuring high-quality tech talent acquisition.",
    image: "/blogs/spotlight-cards-2/image.jpg",
    href: "#",
  },
];

// Featured posts data
const featuredPosts = [
  { id: 1, title: "Smart UI for Businesses" },
  { id: 2, title: "Powering Insights with Data" },
  { id: 3, title: "Future of Business Automation" },
  { id: 4, title: "Smarter, Data-Driven Decisions" },
];

// Popular articles data
const popularArticles = [
  { id: 1, title: "Building Trust Through Consistent UI" },
  { id: 2, title: "AI-Driven Product Design Revolution" },
  { id: 3, title: "Smarter Documentation for Agile Teams" },
  { id: 4, title: "Mastering Visual Hierarchy in UX" },
];

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const spotlightRef = useRef<HTMLDivElement>(null);
  const recentUpdatesRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const editorsPickRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);

  // Debug effect to check refs


  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = (query: string) => {
  
    setSearchQuery(query);

    if (!query.trim()) {
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    let found = false;

    // Create searchable content index with section headings
    const searchIndex = [
      {
        section: "Today's Spotlight",
        ref: spotlightRef,
        items: spotlightItems.map((item) => ({
          title: item.titleFirstPart + item.titleSecondPart,
          description: item.description,
          fullContent: (item.titleFirstPart + " " + item.titleSecondPart + " " + item.description).toLowerCase(),
        })),
      },
      {
        section: "Editors' Pick",
        ref: editorsPickRef,
        items: spotlightItems2.map((item) => ({
          title: item.titleFirstPart + item.titleSecondPart,
          description: item.description,
          fullContent: (item.titleFirstPart + " " + item.titleSecondPart + " " + item.description).toLowerCase(),
        })),
      },
      {
        section: "Recent Updates",
        ref: recentUpdatesRef,
        items: customPosts.map((item) => ({
          title: item.title1 + item.title2,
          description: item.date,
          fullContent: (item.title1 + " " + item.title2 + " Software License Management").toLowerCase(),
        })),
      },
      {
        section: "Featured Posts",
        ref: featuredRef,
        items: featuredPosts.map((item) => ({
          title: item.title,
          description: "",
          fullContent: item.title.toLowerCase(),
        })),
      },
      {
        section: "Popular Articles",
        ref: popularRef,
        items: popularArticles.map((item) => ({
          title: item.title,
          description: "",
          fullContent: item.title.toLowerCase(),
        })),
      },
    ];

    // Search through all sections
    for (const section of searchIndex) {
   

      // Check if section heading matches
      if (section.section.toLowerCase().includes(searchTerm)) {
      
        section.ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        found = true;
        break;
      }

      // Check items in section
      for (const item of section.items) {

        // Check title
        if (item.title.toLowerCase().includes(searchTerm)) {
       
          section.ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          found = true;
          break;
        }

        // Check description/content
        if (item.description && item.description.toLowerCase().includes(searchTerm)) {
      
          section.ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          found = true;
          break;
        }

        // Check full content
        if (item.fullContent.includes(searchTerm)) {
      
          section.ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          found = true;
          break;
        }
      }

      if (found) break;
    }

    if (!found) {
    }
  };

  return (
    <>
      <TransparentNavbar />

      {/* Hero Section */}
      <BlogHero
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearch}
      />

      {/* Spotlight Section */}
      <div ref={spotlightRef}>
        <SpotlightSection
          HeadingFirstPart="Today's "
          HeadingSecondPart="Spotlight"
          items={spotlightItems}
        />
      </div>

      {/* Recent Updates */}
      <div ref={recentUpdatesRef}>
        <RecentUpdates
          mainTitle="Software License Management"
          mainDescription="A Cornerstone of IT Efficiency"
          mainImage="/blogs/updates-cards/left-image.jpg"
          updates={customPosts}
        />
      </div>

      {/* Featured Posts */}
      <div ref={featuredRef}>
        <FeaturedPosts />
      </div>

      {/* Editors' Pick */}
      <div ref={editorsPickRef}>
        <SpotlightSection
          HeadingFirstPart="Editor's "
          HeadingSecondPart="Pick"
          items={spotlightItems2}
        />
      </div>

      {/* Popular Articles */}
      <div ref={popularRef}>
        <PopularArticles />
      </div>

      {/* Newsletter */}
      <NewsletterBanner />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Page;
