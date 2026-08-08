"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TransparentNavbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Video, Clock, CheckCircle, Globe } from "lucide-react";
import SchedualHero from "./SchedualHero";

interface BaseTimeSlot {
  pktTime: string;
  time24: string;
  available: boolean;
}

interface BookingData {
  name: string;
  email: string;
  date: string;
  time: string; // Client's local time string
  pktTime: string; // Office (Pakistan) time string
  timezone: string;
}

// Office location timezone (Pakistan Standard Time)
const OFFICE_TIMEZONE = "Asia/Karachi";

// Base business hours in Pakistan Time (9:00 AM – 5:00 PM PKT)
const BASE_PKT_SLOTS: BaseTimeSlot[] = [
  { pktTime: "09:00 AM", time24: "09:00", available: true },
  { pktTime: "09:30 AM", time24: "09:30", available: true },
  { pktTime: "10:00 AM", time24: "10:00", available: false },
  { pktTime: "10:30 AM", time24: "10:30", available: true },
  { pktTime: "11:00 AM", time24: "11:00", available: true },
  { pktTime: "11:30 AM", time24: "11:30", available: true },
  { pktTime: "02:00 PM", time24: "14:00", available: true },
  { pktTime: "02:30 PM", time24: "14:30", available: true },
  { pktTime: "03:00 PM", time24: "15:00", available: false },
  { pktTime: "03:30 PM", time24: "15:30", available: true },
  { pktTime: "04:00 PM", time24: "16:00", available: true },
  { pktTime: "04:30 PM", time24: "16:30", available: true },
];

/**
 * Converts a 24-hour time slot on a given date in Asia/Karachi into the user's local timezone.
 */
function convertPktToClientTime(
  dateStr: string,
  time24: string,
  userTimeZone: string
): string {
  if (!dateStr) return time24;

  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hours, minutes] = time24.split(":").map(Number);

    const targetUtc = new Date(Date.UTC(year, month - 1, day, hours, minutes));

    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: OFFICE_TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const parts = formatter.formatToParts(targetUtc);
    const pktYear = Number(parts.find((p) => p.type === "year")?.value);
    const pktMonth = Number(parts.find((p) => p.type === "month")?.value);
    const pktDay = Number(parts.find((p) => p.type === "day")?.value);

    let pktHour = Number(parts.find((p) => p.type === "hour")?.value);
    if (pktHour === 24) pktHour = 0;

    const pktMin = Number(parts.find((p) => p.type === "minute")?.value);

    const utcTimeAsPkt = Date.UTC(pktYear, pktMonth - 1, pktDay, pktHour, pktMin);
    const utcTimeAsUtc = Date.UTC(year, month - 1, day, hours, minutes);
    const diffMs = utcTimeAsUtc - utcTimeAsPkt;

    const exactUtcDate = new Date(targetUtc.getTime() + diffMs);

    return exactUtcDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: userTimeZone,
    });
  } catch (error) {
    console.error("Time conversion error:", error);
    return time24;
  }
}

const ScheduleCallPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPktTime, setSelectedPktTime] = useState("");
  const [userTimeZone, setUserTimeZone] = useState(OFFICE_TIMEZONE);
  const [timeZoneName, setTimeZoneName] = useState("PKT");

  const [formData, setFormData] = useState<BookingData>({
    name: "",
    email: "",
    date: "",
    time: "",
    pktTime: "",
    timezone: OFFICE_TIMEZONE,
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Auto-detect visitor's timezone on load
  useEffect(() => {
    const detectedTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (detectedTz) {
      setUserTimeZone(detectedTz);
      setFormData((prev) => ({ ...prev, timezone: detectedTz }));

      try {
        const shortName = new Intl.DateTimeFormat("en-US", {
          timeZone: detectedTz,
          timeZoneName: "short",
        })
          .formatToParts(new Date())
          .find((part) => part.type === "timeZoneName")?.value;

        setTimeZoneName(`${detectedTz} (${shortName || ""})`);
      } catch {
        setTimeZoneName(detectedTz);
      }
    }
  }, []);

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    // Start loop from 0 instead of 1 to include today
    for (let i = 0; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const day = date.getDay();
      
      // Skip weekends (Saturday: 6, Sunday: 0)
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
    setSelectedTime("");
    setSelectedPktTime("");
    setFormData((prev) => ({ ...prev, date: dateStr, time: "", pktTime: "" }));
  };

  const handleTimeSelect = (clientTime: string, originalPktTime: string) => {
    setSelectedTime(clientTime);
    setSelectedPktTime(originalPktTime);
    setFormData((prev) => ({
      ...prev,
      time: clientTime,
      pktTime: originalPktTime,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!formData.name || !formData.email || !formData.date || !formData.time) {
  //     return;
  //   }
  //   try {
  //     const res = await fetch("api/schedule-call", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         name: formData.name,
  //         email: formData.email,
  //         date: formData.date,
  //         clientTime: formData.time,      // e.g. "02:00 PM" (Client Time)
  //         clientTimezone: formData.timezone,// e.g. "Europe/London"
  //         pktTime: formData.pktTime,      // e.g. "07:00 PM PKT" (Pakistan Office Time)
  //       }),
  //     });
  //     const data = await res.json();

  //     if (res.ok && data.success) {
  //       setBookingConfirmed(true);
  //       setTimeout(() => {
  //         setBookingConfirmed(false);
  //         setFormData({
  //           name: "",
  //           email: "",
  //           date: "",
  //           time: "",
  //           pktTime: "",
  //           timezone: userTimeZone,
  //         });
  //         setSelectedDate("");
  //         setSelectedTime("");
  //         setSelectedPktTime("");
  //       }, 3000);
  //     } else {
  //       alert(data.message || "Booking failed. Please try again.");
  //     }
  //   } catch (err) {
  //     console.error("Network Error:", err);
  //     alert("Network error. Please try again.");
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date || !formData.time) {
      return;
    }
    try {
      const res = await fetch("/api/schedule-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          date: formData.date,
          time: formData.time, // Keeps compatibility with existing backend
          clientTime: formData.time, // Client's local time (e.g. "02:00 PM")
          clientTimezone: formData.timezone, // Client's timezone (e.g. "Europe/London")
          timezone: formData.timezone,
          pktTime: formData.pktTime, // Pakistan Office Time (e.g. "07:00 PM PKT")
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setBookingConfirmed(true);
        setTimeout(() => {
          setBookingConfirmed(false);
          setFormData({
            name: "",
            email: "",
            date: "",
            time: "",
            pktTime: "",
            timezone: userTimeZone,
          });
          setSelectedDate("");
          setSelectedTime("");
          setSelectedPktTime("");
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
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
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
              {formatDateDisplay(formData.date)} at {formData.time} ({timeZoneName})
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
              <div className="p-6 pb-6 mb-8 flex justify-start">
                <img
                  src="/logos/aptagon-tech-new-logo.png"
                  alt="Aptagon Technologies"
                  className="h-12 w-auto object-contain dark:invert"
                />
              </div>
            </div>

            {/* Meeting Details */}
            <div className="p-8 flex flex-col items-start gap-2 mb-2">
              <img
                src="/team/founders/faizan.jpeg"
                alt="Syed Faizan Amjad"
                className="w-16 h-16 rounded-full object-cover shrink-0"
              />
              <div>
                <h3 className="text-sm font-semibold text-[#666666] tracking-tight leading-none dark:text-white">
                  Syed Faizan Amjad
                </h3>
                <p className="text-xl text-[#335ECE] font-bold mt-1">
                  30 Minutes Meeting
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#335ECE]" />
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
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                <Globe className="w-4 h-4 text-[#335ECE] shrink-0" />
                <span>Detected Timezone: <strong>{timeZoneName}</strong></span>
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
                      type="button"
                      onClick={() => handleDateSelect(date)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        isSelected
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
                <div className="mb-3">
                  <label className="block text-sm font-bold text-[#335ECE] dark:text-white">
                    Available Time Slots ({timeZoneName})
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Converted from 9:00 AM – 5:00 PM Pakistan Time (PKT)
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {BASE_PKT_SLOTS.map((slot) => {
                    const localTimeStr = convertPktToClientTime(
                      selectedDate,
                      slot.time24,
                      userTimeZone
                    );

                    const isSelected = selectedTime === localTimeStr;

                    return (
                      <button
                        key={slot.pktTime}
                        type="button"
                        onClick={() =>
                          slot.available && handleTimeSelect(localTimeStr, slot.pktTime)
                        }
                        disabled={!slot.available}
                        className={`p-2 rounded-lg text-sm font-medium transition-all ${
                          isSelected
                            ? "bg-[#335ECE] dark:bg-[#0EBAB0] text-white dark:text-[#1a1a1a] shadow-lg"
                            : slot.available
                            ? "bg-gray-100 dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#3a3a3a] cursor-pointer"
                            : "bg-gray-50 dark:bg-[#0f0f0f] text-gray-400 dark:text-gray-600 cursor-not-allowed"
                        }`}
                      >
                        {localTimeStr}
                      </button>
                    );
                  })}
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
                  className="w-full bg-[#355ED1] dark:bg-[#0EBAB0] hover:bg-[#335ECE] dark:hover:bg-[#0EBAB0]/80 text-white dark:text-[#1a1a1a] font-semibold py-3 rounded-lg transition-colors duration-200"
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
                  {formatDateDisplay(selectedDate)} {selectedTime} ({timeZoneName})
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