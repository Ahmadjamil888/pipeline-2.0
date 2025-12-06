"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { Footer, Navbar } from "@/components";
import { motion } from "framer-motion";

export default function FeaturesPage() {
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
							Research Capabilities
						</h1>
						<p className="paragraph text-[#010D3E] max-w-3xl mx-auto">
							Exploring the frontiers of quantum mechanics and autonomous artificial intelligence 
							through advanced research methodologies and computational approaches.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Core Features */}
			<section className="w-full padding-x py-20 bg-white">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16">
						<h2 className="text-[48px] font-bold text-[#010D3E] mb-6">
							Research Focus Areas
						</h2>
						<p className="paragraph text-[#010D3E] max-w-4xl mx-auto">
							Our research spans quantum mechanics fundamentals and autonomous AI systems, 
							advancing theoretical understanding and practical applications in computational science.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="p-10 rounded-3xl bg-gradient-to-br from-[#183EC2] to-[#001E7F] text-white">
							<h3 className="text-[32px] font-bold mb-4">
								Quantum Supremacy at Scale
							</h3>
							<p className="text-white/90 leading-relaxed mb-6">
								Access quantum processors with thousands of qubits, achieving computational 
								advantages impossible with classical supercomputers. Solve problems that 
								would take classical computers millennia in mere seconds.
							</p>
							<ul className="space-y-3 text-white/80">
								<li>• 1000+ qubit quantum processors</li>
								<li>• 99.9% quantum gate fidelity</li>
								<li>• Microsecond coherence times</li>
								<li>• Real-time quantum error correction</li>
							</ul>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="p-10 rounded-3xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA]">
							
							<h3 className="text-[32px] font-bold text-[#010D3E] mb-4">
								Instant Quantum Access
							</h3>
							<p className="text-[#010D3E] leading-relaxed mb-6">
								No more waiting in quantum computing queues. Our cloud infrastructure 
								provides instant access to quantum resources whenever you need them, 
								with global availability and enterprise-grade reliability.
							</p>
							<ul className="space-y-3 text-[#010D3E]/80">
								<li>• Zero-latency quantum job submission</li>
								<li>• 24/7 global quantum availability</li>
								<li>• Auto-scaling quantum resources</li>
								<li>• 99.99% uptime guarantee</li>
							</ul>
						</motion.div>
					</div>

					{/* Feature Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="p-8 rounded-3xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA] text-center">
							
							<h3 className="text-[24px] font-bold text-black mb-3">
								Quantum AI Integration
							</h3>
							<p className="text-[#010D3E] leading-relaxed">
								Seamlessly integrate quantum computing with artificial intelligence. 
								Train quantum neural networks and solve optimization problems exponentially faster.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}
							className="p-8 rounded-3xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA] text-center">
							
							<h3 className="text-[24px] font-bold text-black mb-3">
								Quantum Cryptography
							</h3>
							<p className="text-[#010D3E] leading-relaxed">
								Implement unbreakable quantum encryption and secure communication protocols. 
								Protect your data with the fundamental laws of quantum physics.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className="p-8 rounded-3xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA] text-center">
						
							<h3 className="text-[24px] font-bold text-black mb-3">
								Molecular Simulation
							</h3>
							<p className="text-[#010D3E] leading-relaxed">
								Simulate complex molecular interactions and chemical reactions with quantum precision. 
								Accelerate drug discovery and materials science breakthroughs.
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Quantum Algorithms */}
			<section className="w-full padding-x py-20 bg-gradient-to-b from-white to-[#d2dcff]">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16">
						<h2 className="text-[48px] font-bold text-[#010D3E] mb-6">
							Quantum Algorithm Library
						</h2>
						<p className="paragraph text-[#010D3E] max-w-4xl mx-auto">
							Access the most comprehensive collection of quantum algorithms, 
							from foundational quantum circuits to cutting-edge research implementations.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{ name: "Shor's Algorithm", desc: "Factor large integers exponentially faster"},
							{ name: "Grover's Search", desc: "Search unsorted databases quadratically faster"},
							{ name: "VQE", desc: "Variational Quantum Eigensolver for chemistry"},
							{ name: "QAOA", desc: "Quantum optimization for complex problems"},
							{ name: "Quantum ML", desc: "Machine learning with quantum advantage"},
							{ name: "HHL Algorithm", desc: "Solve linear systems exponentially faster"},
							{ name: "Quantum Walks", desc: "Quantum random walks for graph problems"},
							{ name: "QSVM", desc: "Quantum support vector machines"}
						].map((algo, index) => (
							<motion.div
								key={algo.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="p-6 rounded-2xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA] text-center hover:shadow-[0px_14px_28px_0px_#EAEAEA] transition-all">
								<h3 className="text-lg font-bold text-black mb-2">{algo.name}</h3>
								<p className="text-sm text-[#010D3E]/80">{algo.desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Developer Experience */}
			<section className="w-full padding-x py-20 bg-black text-white">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16">
						<h2 className="text-[48px] font-bold mb-6">
							Quantum Developer Experience
						</h2>
						<p className="paragraph opacity-90 max-w-3xl mx-auto">
							Built for developers, by developers. Our quantum cloud platform provides 
							the most intuitive and powerful development environment for quantum computing.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}>
							<h3 className="text-[32px] font-bold mb-6">Quantum IDE</h3>
							<p className="text-white/90 leading-relaxed mb-6">
								Write, debug, and optimize quantum circuits with our advanced integrated 
								development environment. Features real-time quantum state visualization, 
								circuit optimization suggestions, and collaborative quantum programming.
								<>Try it here: https://qubit-web-wizard.vercel.app/</>
							</p>
							<div className="space-y-3 text-white/80">
								<div>• Visual quantum circuit designer</div>
								<div>• Real-time quantum state debugging</div>
								<div>• Automatic circuit optimization</div>
								<div>• Collaborative quantum notebooks</div>
								<div>• Multi-language support (Qiskit, Cirq, Q#)</div>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
							<div className="font-mono text-sm text-green-400">
								<div className="text-white/60"># Quantum Hello World</div>
								<div className="mt-2">
									<span className="text-blue-400">from</span> zehanx <span className="text-blue-400">import</span> QuantumCircuit
								</div>
								<div className="mt-1">
									<span className="text-blue-400">qc</span> = QuantumCircuit(<span className="text-yellow-400">2</span>)
								</div>
								<div className="mt-1">
									qc.h(<span className="text-yellow-400">0</span>)  <span className="text-white/60"># Superposition</span>
								</div>
								<div className="mt-1">
									qc.cx(<span className="text-yellow-400">0</span>, <span className="text-yellow-400">1</span>)  <span className="text-white/60"># Entanglement</span>
								</div>
								<div className="mt-1">
									result = qc.run_quantum()
								</div>
								<div className="mt-2 text-white/60"># Output: |00⟩ + |11⟩ (Bell State)</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
}