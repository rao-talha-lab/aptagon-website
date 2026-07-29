"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What services does Aptagon Technologies provide?",
    answer:
      "Aptagon Technologies offers web development, mobile app development, custom software, UI/UX design, digital marketing, and IT consulting solutions.",
  },
  {
    question: "Do you develop custom software?",
    answer:
      "Yes, we specialize in developing custom software solutions tailored to your unique business requirements.",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "Project timelines vary depending on complexity, requirements, and scope. We provide clear timelines after requirement analysis.",
  },
  {
    question: "Do you provide post-launch support and maintenance?",
    answer:
      "Yes, we offer ongoing support and maintenance packages to ensure your website or application keeps running smoothly after launch.",
  },
  {
    question: "How is project pricing decided?",
    answer:
      "Pricing is based on project scope, complexity, required tech stack, and project timeline.",
  },
  {
    question: "Can you upgrade or improve an existing website or app?",
    answer:
      "Yes, we can enhance performance, UI/UX, features, and security of existing websites or applications.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-[#FAFAFA] dark:bg-[#121212] py-16 px-6 sm:px-12 transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-12"
        >
          <h2 className="text-[32px] sm:text-[42px] lg:text-[46px] font-inter font-bold text-[#355ECE] tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* ACCORDION ITEMS */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.04,
                  ease: "easeOut",
                }}
                viewport={{ once: false, amount: 0.2 }}
                className="bg-white dark:bg-[#1E1E1E] rounded-md border border-gray-100/80 dark:border-[#2D2D2D] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden transition-shadow duration-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.09)]"
              >
                {/* QUESTION BUTTON */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-8 py-5 text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-[16px] sm:text-[17px] font-inter font-semibold text-[#355ECE] leading-snug pr-4">
                    {faq.question}
                  </span>

                  {/* TOGGLE ICON (+ / ✕) WITH EXACT EQUAL SVG SIZE */}
                  <span className="shrink-0 ml-2 w-6 h-6 flex items-center justify-center text-[#335ECE] transition-transform duration-200">
                    {isOpen ? (
                      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    )}
                  </span>
                </button>

                {/* ANSWER CONTENT */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3, ease: "easeInOut" },
                          opacity: { duration: 0.2 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: { duration: 0.2, ease: "easeInOut" },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-5 pt-0">
                        <p className="text-[14px] sm:text-[15px] font-inter leading-relaxed text-[#666666] dark:text-gray-300 font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}