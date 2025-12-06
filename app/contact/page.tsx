import { Footer, Navbar } from "@/components";
export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="relative bg-white w-full overflow-hidden"></div>
      {/* Hero Section */}
      <section className="w-full padding-x py-32 bg-gradient-to-b from-[#d2dcff] to-white">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="heading font-bold leading-tight tracking-[-2.7px] bg-gradient-to-b from-black to-[#001E7F] bg-clip-text text-transparent mb-6">
            Contact ZehanX Tech
          </h1>
          <p className="paragraph text-[#010D3E] max-w-3xl mx-auto">
            Interested in our research or potential collaboration? Reach out through the details below.
          </p>
        </div>
      </section>

      {/* Contact Info Only (Removed Form) */}
      <section className="w-full padding-x py-20 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left Box - Company Info */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#183EC2] to-[#001E7F] text-white">
            <h3 className="text-[28px] font-bold mb-6">ZehanX Technologies</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              A research-focused organization dedicated to advancing quantum mechanics 
              and agentic artificial intelligence through innovative computational science.
            </p>
            <div className="space-y-4 text-white/80">
              <div>Quantum Mechanics Research</div>
              <div>Agentic AI Development</div>
              <div>Computational Science Innovation</div>
            </div>
          </div>

          {/* Right Side - Contact Details */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA]">
              <h4 className="font-bold text-[#010D3E] mb-2">Email</h4>
              <p className="text-[#010D3E]/80">zehanxtech@gmail.com</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA]">
              <h4 className="font-bold text-[#010D3E] mb-2">Phone</h4>
              <p className="text-[#010D3E]/80">+92 344 2693910</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#F1F1F1] shadow-[0px_7px_14px_0px_#EAEAEA]">
              <h4 className="font-bold text-[#010D3E] mb-2">Research Inquiries</h4>
              <p className="text-[#010D3E]/80">For collaboration opportunities and research partnerships.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}