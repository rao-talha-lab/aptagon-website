import React from "react";
import OurTeam from "../components/OurTeam";
import TransparentNavbar from "../components/Navbar";
import Footer from "../components/Footer";

import StatementSection from "./_components/StatementSection";
import WhatDrivesUsForward from "./_components/WhatDriveUS"; 
import OurEvolution from "./_components/OurEvolution";
import WorkProcess from "./_components/WorkProcess";
import Contact from "../components/Contact";
import AboutHero from "./_components/AboutHero";

function Page() {
  return (
    <>
      <TransparentNavbar />
      
      <AboutHero/>

      <OurEvolution />
      <WhatDrivesUsForward />
      
      <StatementSection
        title="Our Mission"
        description="Our mission is to deliver innovative, scalable, and reliable digital solutions that empower businesses to achieve sustainable growth, enhance efficiency, and stay competitive through strategic technology and design excellence."
        backgroundImage="/map2.png"
      />
      
      <OurTeam />
      
      <StatementSection
        title="Our Vision"
        description="Our vision is to become a trusted global technology partner, recognized for driving digital innovation, shaping meaningful experiences, and enabling businesses to thrive in a rapidly evolving digital world."
        backgroundImage="/map2.png"
      />
      
      <WorkProcess />
      <Contact />
      <Footer />
    </>
  );
}

export default Page;