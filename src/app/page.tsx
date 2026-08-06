import { About } from "@/components/sections/About";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { OpenSource } from "@/components/sections/OpenSource";
import { SkillsCloud } from "@/components/sections/SkillsCloud";
import { Writing } from "@/components/sections/Writing";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <SkillsCloud />
      <FeaturedProjects />
      <OpenSource />
      <Writing />
      <ExperienceTimeline />
      <ContactCTA />
    </>
  );
}
