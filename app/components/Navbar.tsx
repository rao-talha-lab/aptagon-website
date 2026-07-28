"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone, MapPin, Mail, ChevronDown, Menu, X
} from "lucide-react";

type DropdownType = "services" | null;

const services = [
  { title: "Web Development", desc: "Scalable, high-performing websites built to support your business growth.", href: "/services/web-development", icon: "/what-we-do/icons/web.png" },
  { title: "Mobile App Development", desc: "Innovative and seamless mobile apps.", href: "/services/mobile-apps", icon: "/what-we-do/icons/mobile.png" },
  { title: "UI/UX Designing", desc: "Creative and user-focused designs.", href: "/services/ui-ux", icon: "/what-we-do/icons/uiux.png" },
  { title: "Business Process Automation", desc: "Smart automation for efficiency.", href: "/services/business-process-automation", icon: "/what-we-do/icons/business.png" },
  { title: "Software Quality Assurance", desc: "Reliable and error-free software.", href: "/services/sqa", icon: "/what-we-do/icons/sqa.png" },
  { title: "LLM Development & Training", desc: "Custom-trained language models.", href: "/services/llm-development", icon: "/what-we-do/icons/llm.png" },
  { title: "Chatbot Development", desc: "Intelligent bots for engagement.", href: "/services/chatbots", icon: "/what-we-do/icons/chatbot.png" },
  { title: "AI & Generative Solutions", desc: "Transformative AI-driven innovations.", href: "/services/ai", icon: "/what-we-do/icons/ai.png" },
];

/* ================= SERVICE CARD ================= */
const ServiceCard = ({ service, onClick }: { service: typeof services[0]; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const [burst, setBurst] = useState(false);

  return (
    <a
      href={service.href}
      onClick={onClick}
      onMouseEnter={() => { setHovered(true); setBurst(true); setTimeout(() => setBurst(false), 750); }}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", display: "block", textDecoration: "none", height: "100%" }}
    >
      {/* Card Body */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: 16,
          border: hovered ? "1px solid #335ECE" : "1px solid #6E6E6E66",
          background: "#fff",
          boxShadow: hovered ? "0 12px 40px rgba(53,94,209,0.22)" : "0 4px 16px rgba(0,0,0,0.03)",
          transition: "box-shadow 0.4s ease, border 0.3s ease",
          padding: "1.3rem 1.2rem",
          height: "210px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden"
        }}
      >
        {/* Fill Sweep Effect */}
        <motion.div
          initial={false}
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            background: "#335ECE",
            transformOrigin: "bottom",
            borderRadius: 15,
            zIndex: 0
          }}
        />

        {/* Particle Burst */}
        {burst && Array.from({ length: 8 }).map((_, i) => {
          const rad = ((i / 8) * 360 * Math.PI) / 180;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], x: Math.cos(rad) * 55, y: Math.sin(rad) * 55, scale: [0, 1.3, 0] }}
              transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }}
              style={{ position: "absolute", left: "50%", top: "40%", width: 6, height: 6, marginLeft: -3, marginTop: -3, borderRadius: "50%", background: "#FFFFFF", zIndex: 20, pointerEvents: "none" }}
            />
          );
        })}

        {/* Content Container */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>

          <div>
            {/*Icon Box*/}
            <div className="w-[42px] h-[42px] rounded-lg bg-[#EFF6FF] flex items-center justify-center mb-3">
              <Image
                src={service.icon}
                alt={service.title}
                height={22}
                width={22}
                className="object-contain"
              />
            </div>

            {/* Service Title */}
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: hovered ? "#fff" : "#355ED1", lineHeight: 1.3, transition: "color 0.3s ease", marginBottom: "0.4rem" }}>
              {service.title}
            </h4>

            {/* Service Description */}
            <p style={{ fontSize: "0.78rem", fontWeight: 400, color: hovered ? "rgba(255,255,255,0.88)" : "#666666", lineHeight: 1.5, transition: "color 0.3s ease" }}>
              {service.desc}
            </p>
          </div>

          {/* Learn More -> Button */}
          <div style={{ fontSize: "0.78rem", fontWeight: 500, color: hovered ? "#FFFFFF" : "#888888", display: "flex", alignItems: "center", gap: 6, transition: "color 0.3s ease" }}>
            Learn more <span style={{ fontSize: "0.9rem" }}>→</span>
          </div>

        </div>
      </div>
    </a>
  );
};

/* ================= MAIN NAVBAR ================= */
const TransparentNavbar = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleTriggerMenu = () => {
      setOpenDropdown("services");
      setMobileOpen(true);
      setMobileServicesOpen(true);
    };

    window.addEventListener("openNavbarDropdown", handleTriggerMenu);
    return () => window.removeEventListener("openNavbarDropdown", handleTriggerMenu);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full bg-white shadow-sm">

      {/* TOP MINI NAVBAR */}
      <div className="hidden xl:block w-full h-9 bg-[#355ED1]">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 h-full flex items-center justify-center gap-8 text-[12px] text-white">          <div className="flex items-center gap-2">
          <Phone size={14} /><span className="font-medium">+44 7882 610679</span>
          <Phone size={14} className="ml-2" /><span className="font-medium">+92 370 4640036</span>
        </div>
          <div className="h-4 w-[1px] bg-white/30" />
          <div className="flex items-center gap-2"><MapPin size={14} /><span className="font-medium">Benazir road Dolphin mall building number 25 okara</span></div>
          <div className="h-4 w-[1px] bg-white/30" />
          <div className="flex items-center gap-2"><Mail size={14} /><span className="font-medium">hr@aptagon.com</span></div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav
        className="h-20 flex items-center bg-white relative z-20"
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between relative">
          {/* LEFT GROUP: Logo + Navigation Links */}
          <div className="flex items-center gap-12 lg:gap-16">

            {/* Logo */}
            <Link href="/" className="relative h-11 w-48 shrink-0">
              <Image src="/logos/aptagon-tech-new-logo.png" alt="Aptagon Technologies Logo" fill className="object-contain" priority />
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden xl:flex items-center space-x-7">
              <NavLink href="/" isActive={pathname === "/"}>Home</NavLink>
              <NavLink href="/about" isActive={pathname === "/about"}>Who We Are</NavLink>

              {/* WHAT WE DO TRIGGER */}
              <div
                className="py-6 cursor-pointer"
                onMouseEnter={() => setOpenDropdown("services")}
              >
                <button className={`flex items-center gap-1.5 text-[15px] font-semibold transition-colors ${pathname.includes("/services") || openDropdown === "services" ? "text-[#355ED1]" : "text-[#585858] hover:text-[#355ED1]"}`}>
                  What We Do
                  <ChevronDown size={15} className={`transition-transform duration-300 ${openDropdown === "services" ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* PORTFOLIO LINK (Updated to check subroutes) */}
              <NavLink href="/portfolio" isActive={pathname.startsWith("/portfolio")}>Portfolio</NavLink>
              <NavLink href="/blogs" isActive={pathname.startsWith("/blogs")}>Blogs</NavLink>
              <NavLink href="/reach-us" isActive={pathname === "/reach-us"}>Reach Us</NavLink>
            </div>

          </div>

          {/* RIGHT CTA BUTTON */}
          <Link
            href="/schedule-call"
            className="hidden xl:block px-7 py-3 text-[13px] font-bold text-white uppercase tracking-wider rounded-full bg-[#355ED1] hover:bg-[#2c4eb3] transition-all duration-300 shadow-md hover:shadow-lg shrink-0"
          >
            Schedule a Call
          </Link>

          {/* HAMBURGER BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[#355ED1] hover:bg-[#f0f4ff] transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* WHAT WE DO DROPDOWN PANEL */}
          <AnimatePresence>
            {openDropdown === "services" && (
              <motion.div
                initial={{ opacity: 0, y: -8, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: -8, x: "-50%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute left-1/2 top-full w-full max-w-[1280px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-2 border-[#355ED1] overflow-hidden rounded-b-2xl z-50"
              >
                <div className="grid grid-cols-4 gap-4 p-7">
                  {services.map((service) => (
                    <ServiceCard key={service.title} service={service} onClick={() => setOpenDropdown(null)} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="xl:hidden bg-white shadow-xl overflow-hidden z-10"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              <MobileNavLink href="/" isActive={pathname === "/"} onClick={closeMobile}>Home</MobileNavLink>
              <MobileNavLink href="/about" isActive={pathname === "/about"} onClick={closeMobile}>Who We Are</MobileNavLink>

              {/* What We Do Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`w-full flex items-center justify-between py-3 text-[15px] font-semibold transition-colors ${pathname.includes("/services") || mobileServicesOpen
                      ? "text-[#355ED1]"
                      : "text-[#585858] hover:text-[#355ED1]"
                    }`}
                >
                  What We Do
                  <ChevronDown size={16} className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1 py-2 pl-2">
                        {services.map((service) => (
                          <a
                            key={service.title}
                            href={service.href}
                            onClick={closeMobile}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#f0f4ff] transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#f0f4ff] flex items-center justify-center text-[#355ED1] group-hover:bg-[#355ED1] group-hover:text-white transition-all duration-300 shrink-0">
                              <Image
                                src={service.icon}
                                alt={service.title}
                                width={18}
                                height={18}
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <p className="text-[13px] font-bold text-[#585858] group-hover:text-[#355ED1] transition-colors">{service.title}</p>
                              <p className="text-[11px] text-[#888888]">{service.desc}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <MobileNavLink href="/portfolio" isActive={pathname.startsWith("/portfolio")} onClick={closeMobile}>Portfolio</MobileNavLink>
              <MobileNavLink href="/blogs" isActive={pathname.startsWith("/blogs")} onClick={closeMobile}>Blogs</MobileNavLink>
              <MobileNavLink href="/reach-us" isActive={pathname === "/reach-us"} onClick={closeMobile}>Reach Us</MobileNavLink>

              {/* Schedule CTA */}
              <div className="pt-3 pb-2">
                <Link href="/schedule-call" onClick={closeMobile} className="block w-full text-center px-6 py-3 text-[13px] font-bold text-white uppercase tracking-wider rounded-full bg-[#355ED1] shadow-md">
                  Schedule a Call
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ================= NAV LINK COMPONENTS ================= */
const NavLink = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) => (
  <Link href={href} className={`text-[15px] font-semibold transition-colors ${isActive ? "text-[#355ED1]" : "text-[#585858] hover:text-[#355ED1]"}`}>
    {children}
  </Link>
);

const MobileNavLink = ({ href, children, isActive, onClick }: { href: string; children: React.ReactNode; isActive: boolean; onClick: () => void }) => (
  <Link href={href} onClick={onClick} className={`py-2.5 text-[15px] font-semibold transition-colors ${isActive ? "text-[#355ED1]" : "text-[#585858] hover:text-[#355ED1]"}`}>
    {children}
  </Link>
);

export default TransparentNavbar;