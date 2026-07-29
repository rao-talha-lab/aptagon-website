"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { MdOutlineEmail, MdPhoneInTalk } from "react-icons/md";
import { IoLocationOutline, IoChevronDown } from "react-icons/io5";
import ConnectCard from "./ConnectCard";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const projectTypes = [
    "Web Development", "Mobile App", "AI Solutions",
    "UI/UX Design", "Automation", "Other",
  ];

  // Compact Input Styles
  const inputStyles = "w-[320px] bg-white dark:bg-[#FFFFFF] px-6 py-5 rounded-full border border-gray-100 dark:border-transparent shadow-[0_3px_5px_rgba(0,0,0,0.30)] text-sm text-[#000000] dark:text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#335ECE]/20 transition-all placeholder-[#666666]";

  // Input tracking handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID2;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID3;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY2;

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing EmailJS configuration.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    // Mapping template keys explicitly to match your state values
    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      subject: formData.subject || "No Project Type Selected",
      message: formData.message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        () => {
          setStatus("success");
          setFormData({ name: "", email: "", subject: "", message: "" });

          // Clear validation status badge after 3 seconds
          setTimeout(() => setStatus("idle"), 3000);
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setStatus("error");
          setTimeout(() => setStatus("idle"), 3000);
        }
      );
  };

  return (
    <div className="bg-[#FFFFFF] py-12 md:py-16 px-4 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-xl p-3 md:p-5 lg:p-7 relative overflow-hidden"
      >
        {/* Header - More Compact */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-3xl font-bold text-[#335ECE] tracking-tight">
           Get In Touch With Us
          </h2>
          <div className="w-12 h-1 bg-[#335ECE] mx-auto mt-2 rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-stretch">
          
          {/* Left Side - Info Column */}
          <div className="lg:w-[35%] flex flex-col gap-6 pb-8 lg:pb-0 lg:pr-8">
            <InfoItem icon={<MdPhoneInTalk />} title="Contact Us" value="+44 7882 610679" />
            <InfoItem icon={<MdOutlineEmail />} title="Email Us" value="contact@aptagon.com" />
            <InfoItem icon={<IoLocationOutline />} title="Locations" value="Dallas, USA | Poole, UK" />
            
            <div className="mt-auto pt-6">
              <ConnectCard />
            </div>
          </div>

          {/* Right Side - Form Column */}
          <form onSubmit={handleSubmit} className="lg:w-[65%] flex flex-col gap-5">
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

            {/* Custom Animated Selection Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-[680px] bg-white dark:bg-[#FFFFFF] px-6 py-5 rounded-full border border-gray-100 dark:border-transparent shadow-[0_3px_5px_rgba(0,0,0,0.30)] text-sm text-[#000000] dark:text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#335ECE]/20 transition-all placeholder-[#666666] text-left flex justify-between items-center`}
              >
                <span className={formData.subject ? "text-[#666565] dark:text-[#666565]" : "text-[#666565]"}>
                  {formData.subject || "Project Type"}
                </span>
                <IoChevronDown className={`text-[#666565] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 right-0 bg-white dark:bg-[#FFFFFF] rounded-xl shadow-2xl border border-gray-50 dark:border-gray-500/50 mt-2 z-50 max-h-48 overflow-y-auto"
                  >
                    {projectTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => { setFormData({ ...formData, subject: type }); setIsDropdownOpen(false); }}
                        className="px-6 py-2.5 hover:bg-[#335ECE] hover:text-[#FFFFFF] cursor-pointer text-sm text-[#666666] transition-colors"
                      >
                        {type}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <textarea
              name="message" 
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Message" 
              rows={8} 
              required
              className="w-[680px] bg-white dark:bg-[#FFFFFF] px-6 py-3 rounded-xl border border-gray-100 dark:border-transparent shadow-[0_3px_5px_rgba(0,0,0,0.30)] text-sm text-[#000000] dark:text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#335ECE]/20 transition-all placeholder-[#666666]"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-max bg-[#335ECE] hover:bg-blue-800 text-white px-10 py-3 rounded-xl text-sm font-bold shadow-lg transition-all disabled:opacity-50"
              >
                {status === "sending" ? "Sending Message..." : "Submit"}
              </motion.button>

              {/* Status Visual Feedback Flags */}
              {status === "success" && (
                <span className="text-[#335ECE] font-semibold text-sm transition-all animate-fade-in">
                  Message Sent Successfully✓
                </span>
              )}
              {status === "error" && (
                <span className="text-red-500 font-semibold text-sm transition-all animate-fade-in">
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

/* Info Item - Scaled Down */
const InfoItem = ({ icon, title, value }: { icon: any, title: string, value: string }) => (
  <div className="flex items-center gap-4">
    <div className="flex-shrink-0 w-11 h-11 bg-[#335ECE] text-[#FFFFFF] dark:text-[#FFFFFF] rounded-full flex items-center justify-center text-xl">
      {icon}
    </div>
    <div>
      <p className="font-bold text-sm text-[#335ECE] tracking-tight">{title}</p>
      <p className="text-xs text-[#666666] dark:text-[#666666] font-medium">{value}</p>
    </div>
  </div>
);

export default Contact;