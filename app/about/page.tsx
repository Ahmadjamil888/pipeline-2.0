"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { Footer, Navbar } from "@/components";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
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
			<Navbar />
			
			{/* Hero Section */}
			<section className="w-full padding-x py-32 bg-gradient-to-b from-[#d2dcff] to-white">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16">
						<h1 className="heading font-bold leading-tight tracking-[-2.7px] bg-gradient-to-b from-black to-[#001E7F] bg-clip-text text-transparent mb-6">
							Advancing Computational Science
						</h1>
						<p className="paragraph text-[#010D3E] max-w-3xl mx-auto">
							ZehanX Tech is a research-focused organization dedicated to advancing quantum mechanics 
							and autonomous artificial intelligence systems through rigorous scientific inquiry.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Mission Section */}
			<section className="w-full padding-x py-20 bg-white">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}>
							<h2 className="text-[48px] font-bold text-[#010D3E] mb-6 leading-tight">
								Our Mission
							</h2>
							<p className="paragraph text-[#010D3E] mb-6">
								To conduct groundbreaking research in quantum mechanics and agentic artificial intelligence, 
								advancing the fundamental understanding of computational systems and intelligent agent architectures.
							</p>
							<p className="paragraph text-[#010D3E]">
								We pursue scientific excellence through rigorous research methodologies, exploring the 
								intersection of quantum information science and autonomous AI systems.
							</p>
						</motion.div>
						
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="relative">
							<div className="w-full h-96 bg-gradient-to-br from-[#183EC2] to-[#001E7F] rounded-3xl flex items-center justify-center">
								<div className="text-white text-center">
									<div className="text-6xl font-bold mb-4">∞</div>
									<div className="text-xl">Infinite Possibilities</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Vision Section */}
			<section className="w-full padding-x py-20 bg-gradient-to-b from-white to-[#d2dcff]">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16">
						<h2 className="text-[48px] font-bold text-[#010D3E] mb-6">
							The Quantum Advantage
						</h2>
						<p className="paragraph text-[#010D3E] max-w-4xl mx-auto">
							While traditional computers manipulate bits in states of 0 or 1, quantum computers 
							harness the mysterious properties of quantum mechanics - superposition, entanglement, 
							and interference - to process information in ways that defy classical physics.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="p-8 rounded-3xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA]">
							<h3 className="text-[24px] font-bold text-black mb-3">
								Superposition
							</h3>
							<p className="text-[#010D3E] leading-relaxed">
								Quantum bits exist in multiple states simultaneously, enabling 
								exponential computational parallelism impossible with classical systems.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}
							className="p-8 rounded-3xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA]">
							<h3 className="text-[24px] font-bold text-black mb-3">
								Entanglement
							</h3>
							<p className="text-[#010D3E] leading-relaxed">
								Quantum particles become mysteriously connected, allowing instant 
								correlation across vast distances through non-local interactions.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className="p-8 rounded-3xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA]">
							<h3 className="text-[24px] font-bold text-black mb-3">
								Interference
							</h3>
							<p className="text-[#010D3E] leading-relaxed">
								Quantum amplitudes interfere constructively and destructively, 
								amplifying correct solutions while canceling incorrect ones.
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="w-full padding-x py-20 bg-white">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16">
						<h2 className="text-[48px] font-bold text-[#010D3E] mb-6">
							Quantum Pioneers
						</h2>
						<p className="paragraph text-[#010D3E] max-w-3xl mx-auto">
							Our team consists of world-renowned quantum physicists, computer scientists, 
							and engineers who are pushing the boundaries of what's possible.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="p-8 rounded-3xl bg-gradient-to-br from-[#183EC2] to-[#001E7F] text-white text-center">
							<div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-6"></div>
							<h3 className="text-[24px] font-bold mb-2">Ahmad Jamil</h3>
							<p className="text-white/80 mb-4">Founder</p>
							<p className="text-sm text-white/90">
								Leading research initiatives in quantum mechanics and artificial intelligence, 
								driving innovation in computational science.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}
							className="p-8 rounded-3xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA] text-center">
							<div className="w-24 h-24 bg-gradient-to-br from-[#183EC2] to-[#001E7F] rounded-full mx-auto mb-6"></div>
							<h3 className="text-[24px] font-bold text-black mb-2">Humayl Butt</h3>
							<p className="text-[#010D3E]/80 mb-4">Co-Founder</p>
							<p className="text-sm text-[#010D3E]">
								Specializing in quantum algorithm development and agentic AI architectures, 
								advancing theoretical and applied research.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className="p-8 rounded-3xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA] text-center">
							<div className="w-24 h-24 bg-gradient-to-br from-[#183EC2] to-[#001E7F] rounded-full mx-auto mb-6"></div>
							<h3 className="text-[24px] font-bold text-black mb-2">Ahmad Ibrahim</h3>
							<p className="text-[#010D3E]/80 mb-4">Co-Founder</p>
							<p className="text-sm text-[#010D3E]">
								Focusing on autonomous agent systems and quantum information processing, 
								bridging theoretical research with practical applications.
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="w-full padding-x py-20 bg-black text-white">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16">
						<h2 className="text-[48px] font-bold mb-6">
							Our Quantum Values
						</h2>
						<p className="paragraph opacity-90 max-w-3xl mx-auto">
							We operate by principles as fundamental as the quantum mechanics we harness.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}>
							<h3 className="text-[32px] font-bold mb-4">Scientific Rigor</h3>
							<p className="text-white/90 leading-relaxed">
								We maintain the highest standards of scientific inquiry, employing rigorous 
								methodologies and peer-reviewed research practices in all our work.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}>
							<h3 className="text-[32px] font-bold mb-4">Innovation</h3>
							<p className="text-white/90 leading-relaxed">
								We push the boundaries of computational science, exploring novel approaches 
								to quantum mechanics and autonomous AI that advance the field.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}>
							<h3 className="text-[32px] font-bold mb-4">Collaboration</h3>
							<p className="text-white/90 leading-relaxed">
								We foster interdisciplinary collaboration, bringing together expertise in 
								physics, computer science, and mathematics to solve complex problems.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}>
							<h3 className="text-[32px] font-bold mb-4">Excellence</h3>
							<p className="text-white/90 leading-relaxed">
								We pursue excellence in all aspects of our research, from theoretical 
								foundations to experimental validation and practical implementation.
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
}