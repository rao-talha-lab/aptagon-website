"use client";
import React, { useState, useRef } from "react";
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
    description:
      "Micro interactions bring life to digital products. Explore how subtle animations and responses shape user satisfaction and brand perception.",
    image: "/blogs/spotlight-cards/image-1.jpg",
    href: "#",
  },
  {
    id: "2",
    type: "Article",
    titleFirstPart: "From Code to Cloud: ",
    titleSecondPart: "A Modern Workflow",
    description:
      "Uncover how cloud-native environments empower development teams to simplify and scale deployment using containerization and automation.",
    image: "/blogs/spotlight-cards/image-2.jpg",
    href: "#",
  },
  {
    id: "3",
    type: "Article",
    titleFirstPart: "The Rise of Design Systems in ",
    titleSecondPart: "Agencies",
    description:
      "Learn how standardized design systems boost collaboration and consistency across UI/UX teams, while saving time in real-world projects.",
    image: "/blogs/spotlight-cards/image.jpg",
    href: "#",
  },
  {
    id: "4",
    type: "Article",
    titleFirstPart: "Smart Hiring in Tech: ",
    titleSecondPart: "Data-Driven Decisions",
    description:
      "Tech recruitment is evolving. This article dives into how data and behavioral metrics are transforming the hiring landscape.",
    image: "/blogs/spotlight-cards/image-4.jpg",
    href: "#",
  },
];

// UPDATED: Image ke mutabiq 3 cards aur authors ke sath
const spotlightItems2 = [
  {
    id: "1",
    type: "Article",
    titleFirstPart: "Redefining ",
    titleSecondPart: "UX with Micro interactions",
    description:
      "Modern UX must serve real emotions and needs, not just clean layouts. This article explores human-centered design in action.",
    author: "By Maham Khalid",
    image: "/blogs/spotlight-cards-2/image-1.jpg",
    href: "#",
  },
  {
    id: "2",
    type: "Article",
    titleFirstPart: "Why Brand Consistency ",
    titleSecondPart: "Begins in UI",
    description:
      "No-code platforms are revolutionizing development for startups and enterprises. Learn how to build smarter, faster, without deep coding knowledge.",
    author: "Ali Hassan",
    image: "/blogs/spotlight-cards-2/image-2.jpg",
    href: "#",
  },
  {
    id: "3",
    type: "Article",
    titleFirstPart: "How Smart ",
    titleSecondPart: "Web Development Drives Business Growth",
    description:
      "Modern web development helps businesses build fast, secure platforms. With the right technology and strategy, companies create powerful online experiences that perform efficiently.",
    author: "Ali Ahmed",
    image: "/blogs/spotlight-cards-2/image.jpg",
    href: "#",
  },
];

// Featured posts data
const featuredPosts = [
  { id: 1, title: "Smart UI for Businesses" },
  { id: 2, title: "Powering Insights with Data" },
  { id: 3, title: "Future of Business Automation" },
];

// Popular articles data
const popularArticles = [
  { id: 1, title: "Building Trust Through Consistent UI" },
  { id: 2, title: "AI-Driven Product Design Revolution" },
  { id: 3, title: "Smarter Documentation for Agile Teams" },
];

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const spotlightRef = useRef<HTMLDivElement>(null);
  const recentUpdatesRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const editorsPickRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);

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

    // Search index configuration
    const searchIndex = [
      {
        section: "Today's Spotlight",
        ref: spotlightRef,
        items: spotlightItems.map((item) => ({
          title: item.titleFirstPart + item.titleSecondPart,
          description: item.description,
          fullContent: (
            item.titleFirstPart +
            " " +
            item.titleSecondPart +
            " " +
            item.description
          ).toLowerCase(),
        })),
      },
      {
        section: "Editors' Pick",
        ref: editorsPickRef,
        items: spotlightItems2.map((item) => ({
          title: item.titleFirstPart + item.titleSecondPart,
          description: item.description,
          fullContent: (
            item.titleFirstPart +
            " " +
            item.titleSecondPart +
            " " +
            item.description
          ).toLowerCase(),
        })),
      },
      {
        section: "Recent Updates",
        ref: recentUpdatesRef,
        items: customPosts.map((item) => ({
          title: item.title1 + item.title2,
          description: item.date,
          fullContent: (
            item.title1 +
            " " +
            item.title2 +
            " Software License Management"
          ).toLowerCase(),
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
    ];

    for (const section of searchIndex) {
      if (section.section.toLowerCase().includes(searchTerm)) {
        section.ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        found = true;
        break;
      }

      for (const item of section.items) {
        if (item.title.toLowerCase().includes(searchTerm)) {
          section.ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          found = true;
          break;
        }

        if (
          item.description &&
          item.description.toLowerCase().includes(searchTerm)
        ) {
          section.ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          found = true;
          break;
        }

        if (item.fullContent.includes(searchTerm)) {
          section.ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          found = true;
          break;
        }
      }

      if (found) break;
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

      {/* 1. Today's Spotlight Section (Default 4 Cards) */}
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

      {/* 2. Editors' Pick Section (Width increased with columns={3}) */}
      <div ref={editorsPickRef}>
        <SpotlightSection
          HeadingFirstPart="Editors "
          HeadingSecondPart="Pick"
          items={spotlightItems2}
          columns={3} // <-- Yeh prop width aur grid layout 3 columns kar raha hai
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