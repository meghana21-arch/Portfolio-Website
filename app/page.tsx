import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import WhyHireMe from "@/components/WhyHireMe";
import FeaturedWork from "@/components/FeaturedWork";
import SkillCloud from "@/components/SkillCloud";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import WritingSection from "@/components/WritingSection";
import Footer from "@/components/Footer";
import BootWrapper from "@/components/BootWrapper";

export default function Home() {
  return (
    <BootWrapper>
      <main>
        <Navbar />
        <Hero />
        <WhyHireMe />
        <AboutPreview />
        <FeaturedWork />
        <SkillCloud />
        <ExperienceTimeline />
        <WritingSection />
        <Footer />
      </main>
    </BootWrapper>
  );
}
