"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { MdOutlineEmail, MdPhoneInTalk, MdSubject } from "react-icons/md";
import { IoLocationOutline, IoChevronDown } from "react-icons/io5";
import ConnectCard from "./ConnectCard";
import { email } from "zod";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const projectTypes = [
    "Web Development", "Mobile App", "AI Solutions",
    "UI/UX Design", "Automation", "Other",
  ];

  // Responsive Input Styles - Safe for production deployment
  const inputStyles = "w-full bg-white dark:bg-[#FFFFFF] px-6 py-4 sm:py-5 rounded-full border border-gray-100 dark:border-transparent shadow-[0_3px_5px_rgba(0,0,0,0.15)] text-sm text-[#000000] dark:text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#335ECE]/20 transition-all placeholder-[#666666]";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try{
      const res = await fetch("api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "No Project Type Selected",
          message: formData.message,
        }),
      });
      const data = await res.json();

      if(res.ok && data.success){
        setStatus("success");
        setFormData({name: "", email: "", subject: "", message:""});
      } else {
        console.error("Server Error:", data);
        setStatus("error");
      }
    } catch(err) {
      console.error("Network Error:", err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };
  return (
    <div className="bg-[#FFFFFF] py-10 md:py-14 px-4 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-5 sm:p-8 lg:p-10 relative overflow-hidden"
      >
        {/* Header - Compact Space & Clean */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-3xl font-bold text-[#335ECE] tracking-tight">
            Get In Touch With Us
          </h2>
        </div>

        {/* Main Columns Container - Balanced gap for all screens */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">

          {/* Left Side: Info Items & Connect Card (Shifted slightly right using pl-2 sm:pl-6) */}
          <div className="w-full lg:w-[36%] flex flex-col justify-between gap-2 pl-2 sm:pl-6 pr-2">
            <div className="flex flex-col gap-6 pt-4">
              <InfoItem icon={<MdPhoneInTalk />} title="Contact Us" value="+44 7882 610679" />
              <InfoItem icon={<MdOutlineEmail />} title="Email Us" value="contact@aptagon.com" />
              <InfoItem icon={<IoLocationOutline />} title="Locations" value="Dallas, USA | Poole, UK" />
            </div>

            <div className="mt-auto pt-4">
              <ConnectCard />
            </div>
          </div>

          {/* Right Side: Form Inputs */}
          <form onSubmit={handleSubmit} className="w-full lg:w-[62%] flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name *"
                required
                className={inputStyles}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address*"
                required
                className={inputStyles}
              />
            </div>

            {/* Custom Selection Dropdown */}
            <div className="relative w-full" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`${inputStyles} text-left flex justify-between items-center cursor-pointer`}
              >
                <span className={formData.subject ? "text-[#000000]" : "text-[#666666]"}>
                  {formData.subject || "Project Type"}
                </span>
                <IoChevronDown className={`text-[#666666] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 right-0 bg-white dark:bg-[#FFFFFF] rounded-xl shadow-2xl border border-gray-100 mt-2 z-50 max-h-48 overflow-y-auto"
                  >
                    {projectTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, subject: type }));
                          setIsDropdownOpen(false);
                        }}
                        className="px-6 py-2.5 hover:bg-[#335ECE] hover:text-[#FFFFFF] cursor-pointer text-sm text-[#666666] transition-colors"
                      >
                        {type}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Message Area */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Message"
              rows={6}
              required
              className="w-full bg-white dark:bg-[#FFFFFF] px-6 py-6 rounded-2xl border border-gray-100 dark:border-transparent shadow-[0_3px_5px_rgba(0,0,0,0.15)] text-sm text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#335ECE]/20 transition-all placeholder-[#666666] resize-none"
            />

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-max bg-[#335ECE] hover:bg-blue-800 text-white px-10 py-3 rounded-xl text-sm font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                {status === "sending" ? "Sending Message..." : "Submit"}
              </motion.button>

              {status === "success" && (
                <span className="text-[#335ECE] font-semibold text-sm animate-fade-in">
                  Message Sent Successfully ✓
                </span>
              )}
              {status === "error" && (
                <span className="text-red-500 font-semibold text-sm animate-fade-in">
                  Dispatch error ✕
                </span>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

/* Info Item - Clean Line Height & Spacing */
const InfoItem = ({ icon, title, value }: { icon: any, title: string, value: string }) => (
  <div className="flex items-center gap-4">
    <div className="flex-shrink-0 w-11 h-11 bg-[#335ECE] text-[#FFFFFF] rounded-full flex items-center justify-center text-xl shadow-sm">
      {icon}
    </div>
    <div className="flex flex-col justify-center">
      <p className="font-bold text-sm text-[#335ECE] tracking-tight leading-snug">{title}</p>
      <p className="text-xs text-[#666666] font-medium mt-0.5 leading-snug">{value}</p>
    </div>
  </div>
);

export default Contact;