import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import FeaturedWork from "@/components/FeaturedWork";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import WritingSection from "@/components/WritingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutPreview />
      <FeaturedWork />
      <ExperienceTimeline />
      <WritingSection />
      <Footer />
    </main>
  );
}
