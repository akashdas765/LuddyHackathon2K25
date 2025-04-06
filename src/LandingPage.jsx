import React, {useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import image from "../assets/LandingPage.png";
import Navbar from "./components/Navbar";

export default function LandingPage() {
    const companyLogos = [
        { symbol: "AAPL", src: "https://logo.clearbit.com/apple.com" },
        { symbol: "MSFT", src: "https://logo.clearbit.com/microsoft.com" },
        { symbol: "JPM", src: "https://logo.clearbit.com/jpmorganchase.com" },
        { symbol: "V", src: "https://logo.clearbit.com/visa.com" },
        { symbol: "JNJ", src: "https://logo.clearbit.com/jnj.com" },
        { symbol: "WMT", src: "https://logo.clearbit.com/walmart.com" },
        { symbol: "UNH", src: "https://logo.clearbit.com/unitedhealthgroup.com" },
        { symbol: "PG", src: "https://logo.clearbit.com/pg.com" },
        { symbol: "HD", src: "https://logo.clearbit.com/homedepot.com" },
        { symbol: "DIS", src: "https://logo.clearbit.com/disney.com" },
        { symbol: "INTC", src: "https://logo.clearbit.com/intel.com" },
        { symbol: "BA", src: "https://logo.clearbit.com/boeing.com" },
        { symbol: "CSCO", src: "https://logo.clearbit.com/cisco.com" },
        { symbol: "KO", src: "https://logo.clearbit.com/coca-cola.com" },
        { symbol: "MCD", src: "https://logo.clearbit.com/mcdonalds.com" },
        { symbol: "AXP", src: "https://logo.clearbit.com/americanexpress.com" },
        { symbol: "IBM", src: "https://logo.clearbit.com/ibm.com" },
        { symbol: "GS", src: "https://logo.clearbit.com/goldmansachs.com" },
        { symbol: "TRV", src: "https://logo.clearbit.com/travelers.com" },
        { symbol: "NKE", src: "https://logo.clearbit.com/nike.com" }
      ];
      
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="w-full min-h-screen bg-black text-white font-sans">
        <Navbar/>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-10 py-20 max-w-7xl mx-auto">
        <motion.div
          className="text-left max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white mb-6">
            Financial <span className="text-yellow-400">guidance</span> through <br /> powerful AI <span className="text-blue-400">agents</span>.
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Make smart investment decisions by analyzing trends, risks, and forecasts with our intelligent agent-based system.
          </p>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 text-lg rounded-full">
                Get Started
              </button>
            </Link>
            <Link to="/how-it-works" className="text-yellow-400 text-lg">How it works?</Link>
          </div>
        </motion.div>

        <motion.img
          src={image}
          alt="app preview"
          className="w-full md:w-[480px] mb-10 md:mb-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* Stats Section */}
      <section className="px-10 py-10 bg-gray-900 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="text-yellow-400">
            <p className="text-4xl font-bold">1M+</p>
            <p className="text-gray-400 mt-1">Active Portfolios</p>
          </div>
          <div className="text-blue-400">
            <p className="text-4xl font-bold">500K+</p>
            <p className="text-gray-400 mt-1">Decisions Made</p>
          </div>
          <div className="text-yellow-400">
            <p className="text-4xl font-bold">99.9%</p>
            <p className="text-gray-400 mt-1">System Uptime</p>
          </div>
        </div>
      </section>

      {/* Company Logo Slider */}
    <section className="overflow-hidden py-8 bg-black border-t border-gray-800">
        <div className="whitespace-nowrap animate-marquee flex gap-16 px-10">
          {[...companyLogos, ...companyLogos].map((company, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img src={company.src} alt={company.symbol} className="h-20 w-20 object-contain" />
              <span className="text-base text-gray-300 mt-2">{company.symbol}</span>
            </div>
          ))}
        </div>
      </section>

      {/* What, How, Why Section */}
      <section className="px-10 py-20 bg-black text-center border-t border-gray-800">
        <h2 className="text-3xl font-bold text-yellow-400 mb-10">Smarter Investing with Collaborative AI Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-md">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">What We Do</h3>
            <p className="text-gray-400">
              We offer a smart portfolio management system powered by four collaborative AI agents that analyze your stocks and guide your investment strategy.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-md">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">How We Do It</h3>
            <p className="text-gray-400">
              Our system coordinates a Decision Agent, Trend Agent, Risk Agent, and Forecast Agent to provide precise insights for Buy, Hold, or Sell actions.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-md">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Why It Matters</h3>
            <p className="text-gray-400">
              Traditional investing can be emotional and risky. Our agents remove the guesswork and provide data-backed decisions for better outcomes.
            </p>
          </div>
        </div>
      </section>

    

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-6 px-10 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500">
          <p>© 2025 FinAgent. All rights reserved.</p>
          <p>Empowering smarter investment decisions through AI agents.</p>
        </div>
      </footer>

      {/* Add this animation to Tailwind if not present */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>

    
  );
}
