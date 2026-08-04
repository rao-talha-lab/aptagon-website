import React from "react";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getCaseStudiesExcluding, getAllSlugs } from "@/app/lib/caseStudies";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import HeroSection from "./HeroSection";
import ImageCarousel from "./ImageCarousel";
import ProjectMetaStrip from "./ProjectMetaStrip";
import ProblemSolutionSection from "./ProblemSolutionSection";
import ProcessSection from "./ProcessSection";
import MoreProjectsSection from "./MoreProjectsSection";
import CTASection from "./CTASection";
import OutcomeSection from "./OutcomeSection";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const unwrappedParams = await params;
  const caseStudy = getCaseStudyBySlug(unwrappedParams.slug);

  if (!caseStudy) {
    notFound();
  }

  const otherCaseStudies = getCaseStudiesExcluding(unwrappedParams.slug);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#1a1a1a] transition-colors duration-300 pt-24">
        {/* Hero Section */}
        <HeroSection
          title={caseStudy.title}
          description={caseStudy.description}
          category={caseStudy.category}
        />

        {/* Carousel Container */}
        <section className="relative pb-2 md:pb-4 px-4 md:px-6 lg:px-8 overflow-hidden pt-0">
          <div className="shadow-[#335ECE]/10 container mx-auto">
            <ImageCarousel
              images={caseStudy.heroImages}
              title={caseStudy.title}
              bgColor={caseStudy.bgColor}
            />
          </div>
        </section>

        {/* Project Meta Strip */}
        <div className="-mt-2 md:-mt-4">
          <ProjectMetaStrip
            client={caseStudy.client}
            industry={caseStudy.industry}
            timeline={caseStudy.timeline}
            tools={caseStudy.tools}
          />
        </div>

        {/* Problem/Solution Section */}
        <ProblemSolutionSection
          client={caseStudy.client}
          problem={caseStudy.problem}
          solution={caseStudy.solution}
        />

        {/* Process Section */}
        <ProcessSection
          research={caseStudy.research}
          wireframes={caseStudy.wireframes}
          uiDesign={caseStudy.uiDesign}
          development={caseStudy.development}
        />

        {/* Outcome Section with Fallback handling for Stats */}
        <OutcomeSection
          stats={caseStudy.stats || caseStudy.stats}
          features={caseStudy.features}
          image={caseStudy.heroImages?.[0] || "/portfolio-images/laptop-mockup.png"}
          bgColor={caseStudy.bgColor}
        />

        {/* More Projects Section */}
        <MoreProjectsSection
          otherCaseStudies={otherCaseStudies}
          currentSlug={unwrappedParams.slug}
        />

        {/* CTA Section */}
        <CTASection />
      </div>

      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({
    slug,
  }));
}