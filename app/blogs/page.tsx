
"use client";
import React, { useState, useRef, useMemo } from "react";
import TransparentNavbar from "../components/Navbar";
import BlogHero from "./BlogHero";
import SpotlightSection from "./_components/SpotlightSection";
import RecentUpdates from "./_components/Recentupdates";
import FeaturedPosts from "./_components/FeaturedPosts";
import PopularArticles from "./_components/PopularArticles";
import NewsletterBanner from "./_components/NewsletterBanner";
import Footer from "../components/Footer";

// --- Data Definitions ---

const mainRecentUpdate = {
  mainTitle: "Software License Management",
  mainDescription: "A Cornerstone of IT Efficiency",
  mainImage: "/blogs/updates-cards/left-image.jpg",
};

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

const featuredPostsData = [
  { id: 1, title: "Smart UI for Businesses", image: "/blogs/feature-cards/image-1.jpg" },
  { id: 2, title: "Powering Insights with Data", image: "/blogs/feature-cards/image-2.jpg" },
  { id: 3, title: "Future of Business Automation", image: "/blogs/feature-cards/image-3.jpg" },
  { id: 4, title: "Smarter, Data-Driven Decisions", image: "/blogs/feature-cards/image-4.jpg" },
];

const popularArticlesData = [
  {
    id: 1,
    title: "Building Trust Through Consistent UI",
    date: "10 July 2025",
    image: "/blogs/popular/image-1.jpg",
  },
  {
    id: 2,
    title: "AI-Driven Product Design Revolution",
    date: "10 July 2025",
    image: "/blogs/popular/image-2.jpg",
  },
  {
    id: 3,
    title: "Smarter Documentation for Agile Teams",
    date: "8 July 2025",
    image: "/blogs/popular/image-3.png",
  },
  {
    id: 4,
    title: "Mastering Visual Hierarchy in UX",
    date: "24 June 2025",
    image: "/blogs/popular/image-4.jpg",
  },
];

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const term = searchQuery.toLowerCase().trim();

  // 1. Filter Today's Spotlight (Matches title or description)
  const filteredSpotlight = useMemo(() => {
    if (!term) return spotlightItems;
    return spotlightItems.filter(
      (item) =>
        (item.titleFirstPart + item.titleSecondPart).toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
  }, [term]);

  // 2. Filter Editors' Pick (Matches title, description, or author)
  const filteredSpotlight2 = useMemo(() => {
    if (!term) return spotlightItems2;
    return spotlightItems2.filter(
      (item) =>
        (item.titleFirstPart + item.titleSecondPart).toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        (item.author && item.author.toLowerCase().includes(term))
    );
  }, [term]);

  // 3. Filter Recent Updates (Matches right-side posts OR main featured left card)
  const filteredUpdates = useMemo(() => {
    if (!term) return customPosts;
    return customPosts.filter(
      (item) =>
        (item.title1 + item.title2).toLowerCase().includes(term) ||
        item.date.toLowerCase().includes(term)
    );
  }, [term]);

  const showMainRecentUpdate = useMemo(() => {
    if (!term) return true;
    const combinedMain = (mainRecentUpdate.mainTitle + " " + mainRecentUpdate.mainDescription).toLowerCase();
    return combinedMain.includes(term);
  }, [term]);

  // 4. Filter Featured Posts Marquee
  const filteredFeatured = useMemo(() => {
    if (!term) return featuredPostsData;
    return featuredPostsData.filter((item) =>
      item.title.toLowerCase().includes(term)
    );
  }, [term]);

  // 5. Filter Popular Articles
  const filteredPopular = useMemo(() => {
    if (!term) return popularArticlesData;
    return popularArticlesData.filter((item) =>
      item.title.toLowerCase().includes(term)
    );
  }, [term]);

  // Has results check across everything
  const hasUpdatesSection = filteredUpdates.length > 0 || showMainRecentUpdate;
  const hasResults =
    filteredSpotlight.length > 0 ||
    filteredSpotlight2.length > 0 ||
    hasUpdatesSection ||
    filteredFeatured.length > 0 ||
    filteredPopular.length > 0;

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
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

      <div ref={resultsRef} className="pt-8">
        {/* Active Search Badge */}
        {searchQuery.trim() !== "" && (
          <div className="container mx-auto px-6 mb-6 flex items-center justify-between bg-blue-50/50 p-4 rounded-xl border border-blue-100 max-w-7xl">
            <p className="text-gray-700 text-sm md:text-base">
              Showing search results for:{" "}
              <span className="font-semibold text-[#335ECE]">"{searchQuery}"</span>
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs md:text-sm font-semibold text-red-500 hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* No Results Fallback */}
        {searchQuery.trim() !== "" && !hasResults && (
          <div className="container mx-auto px-6 py-16 text-center">
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No matching content found</h3>
            <p className="text-gray-500">
              Try searching for terms like "Real Estate", "Leads", "Automation", or "UX".
            </p>
          </div>
        )}

        {/* 1. Today's Spotlight */}
        {filteredSpotlight.length > 0 && (
          <SpotlightSection
            HeadingFirstPart="Today's "
            HeadingSecondPart="Spotlight"
            items={filteredSpotlight}
          />
        )}

        {/* 2. Recent Updates */}
        {hasUpdatesSection && (
          <RecentUpdates
            mainTitle={mainRecentUpdate.mainTitle}
            mainDescription={mainRecentUpdate.mainDescription}
            mainImage={mainRecentUpdate.mainImage}
            updates={filteredUpdates}
            showMain={showMainRecentUpdate}
          />
        )}

        {/* 3. Featured Posts */}
        {filteredFeatured.length > 0 && (
          <FeaturedPosts items={filteredFeatured} />
        )}

        {/* 4. Editors' Pick */}
        {filteredSpotlight2.length > 0 && (
          <SpotlightSection
            HeadingFirstPart="Editors "
            HeadingSecondPart="Pick"
            items={filteredSpotlight2}
            columns={3}
          />
        )}

        {/* 5. Popular Articles */}
        {filteredPopular.length > 0 && (
          <PopularArticles items={filteredPopular} />
        )}
      </div>

      <NewsletterBanner />
      <Footer />
    </>
  );
}

export default Page;