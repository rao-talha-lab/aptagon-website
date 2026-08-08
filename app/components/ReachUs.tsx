
"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const payload = {
      user_first_name: formData.get("user_first_name"),
      user_last_name: formData.get("user_last_name"),
      user_email: formData.get("user_email"),
      user_phone: formData.get("user_phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/reach-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        console.error("Server Error:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Network Error:", err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000)
    }
  };

  return (
    <section className="w-full min-h-screen bg-white flex justify-center items-center py-15 px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* LEFT SIDE: FORM (SQUARE INPUTS WITH DARK SHADOWS) */}
        <div className="lg:col-span-7">
          <header className="mb-10">
            <p className="text-[#666666] font-bold text-sm tracking-widest mb-4 ml-2">
              Reach Us
            </p>
            <h2 className="text-[40px] font-bold text-[#335ECE] leading-[1.1] tracking-tight">
              Join Us In Creating <br /> Something Great
            </h2>
          </header>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="user_first_name"
                required
                placeholder="First Name *"
                className="w-full px-5 py-4 bg-[#FFFFFF] shadow-[0_5px_10px_rgba(0,0,0,0.3)] rounded-none focus:outline-none focus:border-[#335ECE] transition-all text-sm text-[#666666]"
              />
              <input
                type="text"
                name="user_last_name"
                required
                placeholder="Last Name *"
                className="w-full px-5 py-4 bg-white border shadow-[0_5px_10px_rgba(0,0,0,0.3)] rounded-none focus:outline-none focus:border-[#335ECE] transition-all text-sm text-[#666666]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="email"
                name="user_email"
                required
                placeholder="Email *"
                className="w-full px-5 py-4 bg-white shadow-[0_5px_10px_rgba(0,0,0,0.3)] rounded-none focus:outline-none focus:border-[#335ECE] transition-all text-sm text-[#666666]"
              />
              <input
                type="tel"
                name="user_phone"
                required
                placeholder="Phone Number *"
                className="w-full px-5 py-4 bg-white shadow-[0_5px_10px_rgba(0,0,0,0.3)] rounded-none focus:outline-none focus:border-[#335ECE] transition-all text-sm text-[#666666]"
              />
            </div>

            <input
              type="text"
              name="subject"
              required
              placeholder="Subject *"
              className="w-full px-5 py-4 bg-white shadow-[0_5px_10px_rgba(0,0,0,0.3)] rounded-none focus:outline-none focus:border-[#335ECE] transition-all text-sm text-[#666666]"
            />

            <textarea
              rows={8}
              name="message"
              required
              placeholder="Enter Project Details"
              className="w-full px-5 py-4 bg-white shadow-[0_5px_10px_rgba(0,0,0,0.3)] rounded-none focus:outline-none focus:border-[#335ECE] transition-all text-sm text-[#666666] resize-none"
            ></textarea>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-[#355ED1] text-white font-bold px-12 py-3 rounded-[6px] text-sm transform transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50"              >
                {status === "sending" ? "Sending..." : "Submit"}
              </button>

              {/* Status Visual Feedback Flags */}
              {status === "success" && (
                <span className="text-[#335ECE] font-semibold text-sm transition-all">
                  Message Sent Successfully✓
                </span>
              )}
              {status === "error" && (
                <span className="text-red-500 font-semibold text-sm transition-all">
                  Dispatch error ✕
                </span>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT SIDE: GRADIENT BOX (TOP ALIGNED) */}
        <div className="lg:col-span-5 h-full">
          <div className="bg-gradient-to-b from-[#355ED1] to-[#04368d] p-12 flex flex-col justify-start min-h-[500px] text-white rounded-none mt-40">

            <div className="space-y-6">
              {/* Contact Us */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#335ECE] text-xl shrink-0">
                  <Image
                    src="/reach-us/call.svg"
                    alt="Call"
                    height={20}
                    width={20}
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Contact Us</h4>
                  <p className="text-lg opacity-90">+44 7882 610679</p>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#335ECE] text-xl shrink-0">
                  <Image
                    src="/reach-us/mail.svg"
                    alt="Call"
                    height={20}
                    width={20}
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Email Us</h4>
                  <p className="text-lg opacity-90">contact@aptagon.com</p>
                </div>
              </div>

              {/* Locations */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#335ECE] text-xl shrink-0">
                  <Image
                    src="/reach-us/location.svg"
                    alt="Call"
                    height={40}
                    width={40}
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Locations</h4>
                  <p className="text-lg opacity-90">Clearwater, FL, USA | Poole, UK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
