"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import TransparentNavbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Video, Clock, CheckCircle } from "lucide-react";
import SchedualHero from "./SchedualHero";
import { email } from "zod";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingData {
  name: string;
  email: string;
  date: string;
  time: string;
}

const ScheduleCallPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    email: "",
    date: "",
    time: "",
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Available time slots
  const timeSlots: TimeSlot[] = [
    { time: "09:00 AM", available: true },
    { time: "09:30 AM", available: true },
    { time: "10:00 AM", available: false },
    { time: "10:30 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "11:30 AM", available: true },
    { time: "02:00 PM", available: true },
    { time: "02:30 PM", available: true },
    { time: "03:00 PM", available: false },
    { time: "03:30 PM", available: true },
    { time: "04:00 PM", available: true },
    { time: "04:30 PM", available: true },
  ];

  // Get available dates (next 30 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const day = date.getDay();
      // Skip weekends
      if (day !== 0 && day !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    setSelectedDate(dateStr);
    setFormData({ ...formData, date: dateStr });
    setSelectedTime("");
    setFormData((prev) => ({ ...prev, time: "" }));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFormData({ ...formData, time: time });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date || !formData.time) {
      return;
    }
    try{
      const res = await fetch("api/schedule-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          date: formData.date,
          time: formData.time,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setBookingConfirmed(true);
        setTimeout(() => {
          setBookingConfirmed(false);
          setFormData({name: "", email: "", date: "", time: ""});
          setSelectedDate("");
          setSelectedTime("");
        }, 3000);
      } else {
        alert(data.message || "Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Network Error:", err);
      alert("Network error. Please try again.");
    }
  };
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] dark:from-[#1a1a1a] to-gray-100 dark:to-[#0f0f0f] transition-colors duration-300">
      <TransparentNavbar />

      {/* Success Modal */}
      {bookingConfirmed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-[#2a2a2a] rounded-xl p-8 max-w-md text-center"
          >
            <CheckCircle className="w-16 h-16 text-[#335ECE] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We sent a confirmation email to {formData.email}
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-semibold">
              {formatDateDisplay(formData.date)} at {formData.time}
            </p>
          </motion.div>
        </motion.div>
      )}

      <SchedualHero />

      {/* Main Container */}
      <div id="booking" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[20px] font-bold text-[#666666] dark:text-[#0EBAB0] uppercase tracking-wider mb-2">
            LET's SHAPE YOUR DIGITAL SUCCESS
          </p>
          <h1 className="text-3xl font-bold text-[#335ECE] dark:text-white mb-4">
            Book a Free Consultation and Turn Your Goals into Reality
          </h1>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.4fr] bg-[#FFFFFF] rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Left Side - Info Card */}
          <motion.div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
            <div className="border-b border-[#666666]/20 dark:border-gray-700">
              {/* Logo Section */}
              <div className="p-6 pb-6 mb-8 flex justify-start">
                <img
                  src="/logos/aptagon-tech-new-logo.png"
                  alt="Aptagon Technologies"
                  className="h-12 w-auto object-contain dark:invert"
                />
              </div>
            </div>

            {/* Meeting Card*/}
            <div className="p-8 flex flex-col items-start gap-2 mb-2">
              <img
                src="/team/founders/faizan.jpeg"
                alt="Boss"
                className="w-16 h-16 rounded-full object-cover shrink-0"
              />
              <div>
                <h3 className="text-sm font-semibold text-[#666666] tracking-tight leading-none dark:text-white">
                  Syed Faizan Amjad
                </h3>
                <p className="text-xl text-[#335ECE] font-bold mt-1">
                  30 Minutes meeting
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#335ECE] dark:text-[#335ECE]" />
                <span className="text-[#666666] dark:text-gray-300">
                  30 min
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Video className="w-5 h-5 text-[#335ECE] dark:text-[#0EBAB0] mt-0.5" />
                <span className="text-[#666666] dark:text-gray-300">
                  Web conferencing details provided upon confirmation
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Booking Form */}
          <motion.div className="p-8 flex flex-col justify-start bg-[#FFFFFF] dark:bg-[#2a2a2a]">
            <h2 className="text-xl font-bold text-[#335ECE] dark:text-white mb-2">
              Select a Date & Time
            </h2>
            <p className="text-sm text-[#666666] dark:text-gray-400 mb-6">
              Choose a time that works best for you
            </p>

            {/* Date Selection */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-[#335ECE] dark:text-white mb-3">
                Select Date
              </label>
              <div className="grid grid-cols-3 gap-2 mb-4 max-h-48 overflow-y-auto pr-1">
                {availableDates.map((date) => {
                  const dateStr = date.toISOString().split("T")[0];
                  const isSelected = selectedDate === dateStr;
                  return (
                    <button
                      key={dateStr}
                      onClick={() => handleDateSelect(date)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${isSelected
                        ? "bg-[#335ECE] dark:bg-[#335ECE] text-white dark:text-[#1a1a1a] shadow-lg"
                        : "bg-gray-100 dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#3a3a3a]"
                        }`}
                    >
                      <div className="text-xs">
                        {date.toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </div>
                      <div>{date.getDate()}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <label className="block text-sm font-bold text-[#335ECE] dark:text-white mb-3">
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() =>
                        slot.available && handleTimeSelect(slot.time)
                      }
                      disabled={!slot.available}
                      className={`p-2 rounded-lg text-sm font-medium transition-all ${selectedTime === slot.time
                        ? "bg-[#335ECE] dark:bg-[#0EBAB0] text-white dark:text-[#1a1a1a] shadow-lg"
                        : slot.available
                          ? "bg-gray-100 dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#3a3a3a] cursor-pointer"
                          : "bg-gray-50 dark:bg-[#0f0f0f] text-gray-400 dark:text-gray-600 cursor-not-allowed"
                        }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Contact Form */}
            {selectedTime && (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-bold text-[#335ECE] dark:text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white rounded-lg focus:ring-2 focus:ring-[#335ECE] dark:focus:ring-[#0EBAB0] focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#335ECE] dark:text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white rounded-lg focus:ring-2 focus:ring-[#335ECE] dark:focus:ring-[#0EBAB0] focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#355ED1] dark:bg-[#0EBAB0] hover:teal-[#335ECE] dark:hover:bg-[#0EBAB0]/80 text-white dark:text-[#1a1a1a] font-semibold py-3 rounded-lg transition-colors duration-200"
                >
                  Confirm Booking
                </button>
              </motion.form>
            )}

            {/* Summary */}
            {(selectedDate || selectedTime) && (
              <div className="mt-6 p-4 bg-[#002892]/10 dark:bg-[#0EBAB0]/10 rounded-lg border border-[#335ECE]/20 dark:border-[#0EBAB0]/50">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Selected:{" "}
                  </span>
                  {formatDateDisplay(selectedDate)} {selectedTime}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ScheduleCallPage;