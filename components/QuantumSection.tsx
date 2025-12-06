"use client";
import { motion } from "framer-motion";
import { TextMask } from "@/animations";
import { Button } from "@/components";

export default function QuantumSection() {
	const phares1 = ["Quantum Mechanics", "Research Excellence"];
	const phares2 = [
		"Advancing fundamental research in quantum mechanics.",
		"Exploring quantum superposition, entanglement, and interference.",
		"Pushing the boundaries of quantum information science.",
	];
	const phares3 = [
		"Advancing fundamental research in quantum mechanics. Exploring quantum superposition, entanglement, and interference. Pushing the boundaries of quantum information science.",
	];

	return (
		<div className="w-full padding-x py-20 bg-gradient-to-b from-[#d2dcff] to-white xm:py-10 sm:py-10">
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
							Quantum Research
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

				<div className="w-full grid grid-cols-3 gap-8 xm:grid-cols-1 sm:grid-cols-1">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="p-8 rounded-3xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA]">
						<h3 className="text-[24px] font-bold text-black mb-3">
							Quantum Superposition
						</h3>
						<p className="text-[#010D3E] leading-relaxed">
							Quantum bits exist in multiple states simultaneously, enabling exponential computational parallelism impossible with classical systems.
						</p>
						<div className="mt-6 p-4 bg-gradient-to-b from-white to-[#d2dcff] rounded-xl border border-[#F1F1F1]">
							<code className="text-sm text-[#001E7F] font-mono">
								|ψ⟩ = α₀|0⟩ + α₁|1⟩
							</code>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						viewport={{ once: true }}
						className="p-8 rounded-3xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA]">
						<h3 className="text-[24px] font-bold text-black mb-3">
							Quantum Entanglement
						</h3>
						<p className="text-[#010D3E] leading-relaxed">
							Quantum particles become mysteriously connected, allowing instant correlation across vast distances - Einstein's "spooky action at a distance."
						</p>
						<div className="mt-6 p-4 bg-gradient-to-b from-white to-[#d2dcff] rounded-xl border border-[#F1F1F1]">
							<code className="text-sm text-[#001E7F] font-mono">
								Ψ_AB = Σᵢⱼ αᵢⱼ|i⟩⊗|j⟩
							</code>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="p-8 rounded-3xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA]">
						<h3 className="text-[24px] font-bold text-black mb-3">
							Quantum Interference
						</h3>
						<p className="text-[#010D3E] leading-relaxed">
							Quantum amplitudes interfere constructively and destructively, amplifying correct solutions while canceling incorrect ones.
						</p>
						<div className="mt-6 p-4 bg-gradient-to-b from-white to-[#d2dcff] rounded-xl border border-[#F1F1F1]">
							<code className="text-sm text-[#001E7F] font-mono">
								U†U = I
							</code>
						</div>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					viewport={{ once: true }}
					className="mt-10 p-12 rounded-3xl bg-black text-white xm:p-8 sm:p-8">
					<div className="max-w-3xl mx-auto text-center">
						<h3 className="text-[40px] font-bold mb-4 leading-tight tracking-[-1.2px]">
							Quantum Information Science
						</h3>
						<p className="paragraph opacity-90 mb-8">
							Conducting fundamental research in quantum mechanics and quantum information theory. 
							Exploring the mathematical foundations and physical principles that govern quantum systems.
						</p>
						<div className="grid grid-cols-3 gap-6 xm:grid-cols-1 sm:grid-cols-1">
							<div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
								<div className="text-[32px] font-bold mb-2">|ψ⟩ = Σαᵢ|i⟩</div>
								<div className="text-sm opacity-80">State Vector</div>
							</div>
							<div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
								<div className="text-[32px] font-bold mb-2">P(i) = |αᵢ|²</div>
								<div className="text-sm opacity-80">Probability</div>
							</div>
							<div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
								<div className="text-[32px] font-bold mb-2">|ψ&apos;⟩ = U|ψ⟩</div>
								<div className="text-sm opacity-80">Evolution</div>
							</div>
						</div>
						<div className="mt-8">
							<Button
								title="Learn More"
								className="bg-white text-black py-3 px-8 rounded-lg font-bold"
								href="/features"
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
