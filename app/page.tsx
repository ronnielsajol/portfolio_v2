"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import StackSection from "@/components/StackSection";
import Footer from "@/components/Footer";

const PageLoader = dynamic(() => import("@/components/Loader"), { ssr: false });

export default function Home() {
	const [heroReady, setHeroReady] = useState(false);

	return (
		<>
			{!heroReady && <PageLoader onFinish={() => setHeroReady(true)} />}
			<NavBar visible={heroReady} />
			<main id='main-content'>
				<HeroSection startAnimation={heroReady} />
				<AboutSection />
				<StackSection />
				<ExperienceSection />
				<ProjectsSection />
			</main>
			<Footer />
		</>
	);
}
