"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import FeaturedWork from "@/components/FeaturedWork";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import WritingSection from "@/components/WritingSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(true); // set to false to re-enable loader

  return (
    <>
      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Intro loader — AnimatePresence here so exit animation fires on unmount */}
      <AnimatePresence>
        {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}
      </AnimatePresence>

      {/* Main content — rendered but invisible until loader completes */}
      <main
        className="transition-opacity duration-700"
        style={{ opacity: loaderDone ? 1 : 0 }}
      >
        <Navbar />
        <Hero />
        <AboutPreview />
        <FeaturedWork />
        <ExperienceTimeline />
        <WritingSection />
        <Footer />
      </main>
    </>
  );
}
