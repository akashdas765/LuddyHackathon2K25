import React, { useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Accuracy from "../assets/Accuracy.png";
import Workflow from "../assets/workflow.png";
import Learn from "../assets/Learn.png";
import Transparency from "../assets/transparency.png";
import Navbar from "./components/Navbar";
import Trend from "../assets/Trend.png";
import Risk from "../assets/Risk.png";
import Forecast from "../assets/forecast.png";
import Decision from "../assets/decision.png";



export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);

  const agentSteps = [
    {
      title: "Trend Agent",
      description: (
        <div className="space-y-2">
          <p className="text-blue-400 font-semibold">Purpose:</p>
          <p>To recognize patterns and momentum in the market.</p>
          <p className="text-blue-400 font-semibold mt-2">Core Capabilities:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Continuously scans real-time and historical price data.</li>
            <li>Applies technical indicators like moving averages, RSI, MACD.</li>
            <li>Identifies emerging trends early across sectors and asset classes.</li>
          </ul>
          <p className="italic text-yellow-300 mt-4">"Is this stock riding a long-term wave or just a temporary spike?"</p>
          <p>The Trend Agent ensures we always know.</p>
        </div>
      )
    },
    {
      title: "Risk Agent",
      description: (
        <div className="space-y-2">
          <p className="text-blue-400 font-semibold">Purpose:</p>
          <p>To assess and manage threats from both internal and external sources.</p>
          <p className="text-blue-400 font-semibold mt-2">Core Capabilities:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Ingests real-time financial news, earnings reports, and regulatory updates.</li>
            <li>Monitors macro events, geopolitical developments, and economic data releases.</li>
            <li>Flags unexpected anomalies such as insider trading, short squeezes, or volume spikes.</li>
          </ul>
          <p className="italic text-yellow-300 mt-4">"Before it hits the headlines, we already know the risk."</p>
          <p>The Risk Agent keeps us protected.</p>
        </div>
      )
    },
    {
      title: "Forecast Agent",
      description: (
        <div className="space-y-2">
          <p className="text-blue-400 font-semibold">Purpose:</p>
          <p>To predict future stock behavior using intelligent models.</p>
          <p className="text-blue-400 font-semibold mt-2">Core Capabilities:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Trains machine learning models on multi-modal data: prices, sentiment, fundamentals.</li>
            <li>Projects short- and long-term price movements and expected returns.</li>
            <li>Continuously improves via model retraining and feedback loops.</li>
          </ul>
          <p className="italic text-yellow-300 mt-4">"We can’t predict the future—but we can simulate it, intelligently."</p>
          <p>The Forecast Agent gives us foresight.</p>
        </div>
      )
    },
    {
      title: "Decision Agent",
      description: (
        <div className="space-y-2">
          <p className="text-blue-400 font-semibold">Purpose:</p>
          <p>To unify insights and provide clear investment guidance.</p>
          <p className="text-blue-400 font-semibold mt-2">Core Capabilities:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Aggregates inputs from the Trend, Risk, and Forecast Agents.</li>
            <li>Applies a multi-factor scoring system to every stock.</li>
            <li>Considers portfolio context, user risk profile, and investment horizon.</li>
            <li>Outputs Buy, Sell, or Hold recommendations with rationale.</li>
            <li>Offers explainability for each decision through natural language summaries.</li>
          </ul>
          <p className="italic text-yellow-300 mt-4">"No more guesswork. Just informed decisions—backed by data, risk, and foresight."</p>
          <p>The Decision Agent is your trusted final say.</p>
        </div>
      )
    }
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white font-sans">
      <Navbar/>

      {/* Header Section */}
      <section className="px-10 py-20 text-center max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          How FinAgent Empowers You
        </motion.h1>
        <motion.p
          className="text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          From real-time insights to powerful AI predictions, FinAgent is built to ensure every decision you make is smart, safe, and successful.
        </motion.p>
      </section>

        {/* Timeline Section with Image */}
        <section className="px-10 pt-10 pb-20 bg-gray-900">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">
        <motion.img
          src={Workflow}
          alt="Workflow Graphic"
          className="w-full h-full object-contain rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />

        <div className="flex flex-col justify-start">
          <h2 className="text-3xl font-bold text-blue-400 mb-20">Our 4-Agent Decision Engine</h2>
          <div className="relative border-l border-gray-700 ml-4">
            {agentSteps.map((step, index) => (
              <div
                key={index}
                className="mb-8 ml-6 relative cursor-pointer"
                onClick={() => setActiveIndex(index)}
              >
                <span className={`absolute -left-6 top-1 w-4 h-4 ${activeIndex === index ? "bg-yellow-400" : "bg-blue-500"} rounded-full border-2 border-white`}></span>
                <h3 className={`text-xl font-semibold mb-2 ${activeIndex === index ? "text-yellow-400" : "text-blue-300"}`}>{step.title}</h3>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      className="text-gray-300 text-lg"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {step.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

      {/* Trust Section */}
      <section className="px-10 py-20 text-center bg-black border-t border-gray-800">
        <h2 className="text-3xl font-bold text-yellow-400 mb-10">Why Investors Trust Us</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700">
            <img src={Transparency} alt="Transparency" className="mx-auto w-25 h-25 mb-4" />
            <h3 className="text-xl font-semibold text-blue-400 mb-2">Data Transparency</h3>
            <p className="text-gray-400">
              Every decision is backed by data you can trace. No black boxes, just honest insights.
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700">
            <img src={Learn} alt="Transparency" className="mx-auto w-25 h-25 mb-4" />
            <h3 className="text-xl font-semibold text-blue-400 mb-2">AI That Learns You</h3>
            <p className="text-gray-400">
              FinAgent adapts to your risk appetite and portfolio evolution over time.
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700">
            <img src={Accuracy} alt="Transparency" className="mx-auto w-25 h-25 mb-4" />
            <h3 className="text-xl font-semibold text-blue-400 mb-2">Proven Accuracy</h3>
            <p className="text-gray-400">
              With 90%+ predictive accuracy in historical tests, our system builds confidence.
            </p>
          </motion.div>
        </div>
      </section>



      {/* Call to Action */}
      <section className="bg-blue-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Maximize Your Investment?</h2>
        <p className="text-lg mb-6">Join thousands of users who made informed decisions with FinAgent.</p>
        <Link to="/login">
          <button className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-full text-lg">
            Get Started
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-6 px-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500">
          <p>© 2025 FinAgent. All rights reserved.</p>
          <p>Smarter decisions. Safer investments. Stronger portfolios.</p>
        </div>
      </footer>
    </div>
  );
}
