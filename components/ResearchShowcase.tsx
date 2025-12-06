import { motion } from "framer-motion";
import { TextMask } from "@/animations";

export default function ResearchShowcase() {
	const phares1 = ["Our Research", "Focus Areas"];
	const phares2 = [
		"Advancing quantum mechanics and autonomous AI systems.",
		"Conducting groundbreaking research in computational science",
		"and intelligent agent architectures.",
	];
	const phares3 = [
		"Advancing quantum mechanics and autonomous AI systems. Conducting groundbreaking research in computational science and intelligent agent architectures.",
	];
	
	return (
		<div className="w-full padding-x py-20 bg-gradient-to-b from-white to-[#d2dcff]">
			<div className="w-full flex flex-col gap-10">
				<div className="w-full flex items-center flex-col gap-3">
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 1,
							type: "spring",
						}}
						viewport={{ once: true }}>
						<button className="w-fit py-2 px-3 rounded-full border border-[#2222221A] text-black font-dmSans text-sm font-medium leading-tight tracking-[-0.02188rem]">
							Research Excellence
						</button>
					</motion.div>
					<div>
						<h1 className="heading text-center font-bold leading-tight tracking-[-2.7px] bg-gradient-to-b from-black to-[#001E7F] bg-clip-text">
							<TextMask>{phares1}</TextMask>
						</h1>
					</div>
					<div>
						<h1 className="text-[#010D3E] font-dmSans paragraph font-normal leading-tight text-center block xm:hidden sm:hidden">
							<TextMask>{phares2}</TextMask>
						</h1>
						<h1 className="text-[#010D3E] font-dmSans paragraph font-normal leading-tight text-center hidden xm:block sm:block">
							<TextMask>{phares3}</TextMask>
						</h1>
					</div>
				</div>

				<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="p-10 rounded-3xl bg-gradient-to-br from-[#183EC2] to-[#001E7F] text-white">
						<h3 className="text-[32px] font-bold mb-6">
							Quantum Mechanics Research
						</h3>
						<p className="text-white/90 leading-relaxed mb-6">
							Exploring the fundamental principles of quantum mechanics and their applications 
							in computational systems. Our research focuses on quantum algorithms, quantum 
							entanglement, and quantum information theory.
						</p>
						<div className="space-y-3 text-white/80">
							<div>Quantum Algorithm Development</div>
							<div>Quantum State Manipulation</div>
							<div>Quantum Error Correction</div>
							<div>Quantum Information Processing</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
						className="p-10 rounded-3xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA]">
						<h3 className="text-[32px] font-bold text-[#010D3E] mb-6">
							Agentic AI Systems
						</h3>
						<p className="text-[#010D3E] leading-relaxed mb-6">
							Developing autonomous artificial intelligence agents capable of independent 
							decision-making and adaptive learning. Our work advances multi-agent systems, 
							reinforcement learning, and cognitive architectures.
						</p>
						<div className="space-y-3 text-[#010D3E]/80">
							<div>Autonomous Agent Architectures</div>
							<div>Multi-Agent Coordination</div>
							<div>Adaptive Learning Systems</div>
							<div>Intelligent Decision Making</div>
						</div>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					viewport={{ once: true }}
					className="w-full max-w-6xl mx-auto p-10 rounded-3xl bg-black text-white">
					<div className="text-center">
						<h3 className="text-[32px] font-bold mb-6">
							Interdisciplinary Approach
						</h3>
						<p className="paragraph opacity-90 max-w-3xl mx-auto">
							Our research bridges quantum mechanics and artificial intelligence, exploring 
							how quantum principles can enhance AI systems and how AI can advance quantum 
							computing research. This unique intersection drives innovation in both fields.
						</p>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
