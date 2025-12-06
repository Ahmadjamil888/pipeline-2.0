"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import {
	CTA,
	Footer,
	Hero,
	LogoTicker,
	QuantumSection,
	ResearchShowcase,
	Testimonials,
} from "@/components";

export default function App() {
	useEffect(() => {
		const lenis = new Lenis();

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	}, []);
	return (
		<>
			<Hero />
			<LogoTicker />
			<QuantumSection />
			<ResearchShowcase />
			<Testimonials />
			<CTA />
			<Footer />
		</>
	);
}
