"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoAdd, IoClose } from "react-icons/io5";

const faqs = [
  {
    question: "What services does Aptagon Technologies provide?",
    answer: "Aptagon Technologies offers web development, mobile app development, custom software, UI/UX design, digital marketing, and IT consulting solutions.",
  },
  {
    question: "Do you develop custom software?",
    answer: "Yes, we specialize in developing custom software solutions tailored to your business needs.",
  },
  {
    question: "How long does a project usually take?",
    answer: "Project timelines vary depending on complexity, requirements, and scope. We provide clear timelines after requirement analysis.",
  },
  {
    question: "How is project pricing decided?",
    answer: "Pricing is based on project scope, complexity, technologies used, and timeline.",
  },
  {
    question: "Can you upgrade or improve an existing website or app?",
    answer: "Yes, we can enhance performance, UI/UX, features, and security of existing websites or applications.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-[#F8FAFC] py-16 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Main Heading */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black text-[#335ECE] tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.06, 
                  ease: "easeOut" 
                }}
                viewport={{ once: false, amount: 0.2 }}
                
                /* BOTTOM BORDER & SHADOW MATCHER */
                className="rounded-sm bg-white border-t border-x border-gray-200 border-b-4 border-b-gray-300 shadow-md overflow-hidden transition-all duration-200"
              >
                {/* Question Area */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left focus:outline-none"
                >
                  <span className="text-base md:text-lg font-bold text-[#355ED1]">
                    {faq.question}
                  </span>

                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-[#355ED1]">
                    {isOpen ? (
                      <IoClose className="text-xl" />
                    ) : (
                      <IoAdd className="text-xl" />
                    )}
                  </div>
                </button>

                {/* Answer Area */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.25, ease: "easeOut" },
                          opacity: { duration: 0.2, delay: 0.05 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: { duration: 0.2, ease: "easeInOut" }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <p className="text-xs md:text-sm leading-relaxed text-gray-500 font-medium">
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