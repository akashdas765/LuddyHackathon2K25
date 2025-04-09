<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

=======
import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { TrendingUp, TrendingDown, ArrowRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532
const StockDetail = ({ stock, chartData, onClose }) => {
  // State to track whether agent data should be shown
  const [showAgentData, setShowAgentData] = useState(false);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(false);
  // State to track which agents have completed their analysis
  const [agentStatus, setAgentStatus] = useState({
    trend: { status: 'pending', data: null },
    risk: { status: 'pending', data: null },
    forecasting: { status: 'pending', data: null }
  });
  // State to track the current communication log
  const [communicationLog, setCommunicationLog] = useState([]);

  // Handler for the Ask Decision Agent button
  const handleAskDecisionAgent = () => {
    setIsLoading(true);
    setShowAgentData(false);
    setCommunicationLog([]);
    setAgentStatus({
      trend: { status: 'pending', data: null },
      risk: { status: 'pending', data: null },
      forecasting: { status: 'pending', data: null }
    });
    
    // Simulate communication with agents
    simulateAgentCommunication();
  };

<<<<<<< HEAD
  // Simulate communication with other agents
  const simulateAgentCommunication = () => {
    // Add initial message from Decision Agent
    addMessage("Decision Agent", "Initiating analysis request for " + stock.ticker);
    
    // Simulate Trend Agent communication with delay
    setTimeout(() => {
      addMessage("Decision Agent", "Requesting trend analysis for " + stock.ticker);
      
      setTimeout(() => {
        addMessage("Trend Agent", "Processing request, analyzing market trends...");
        
        setTimeout(() => {
          setAgentStatus(prev => ({
            ...prev,
            trend: { 
              status: 'completed',
              data: {
                trendType: "Bullish",
                sma50: stock.dayChange + 2.5,
                sma200: stock.high52W - 10,
                rsi: 65.4,
                macd: 1.2
              }
            }
          }));
          addMessage("Trend Agent", "Analysis complete, sending data");
          checkAllComplete();
        }, 2000);
      }, 1000);
    }, 500);
    
    // Simulate Risk Agent communication with delay
    setTimeout(() => {
      addMessage("Decision Agent", "Requesting risk assessment for " + stock.ticker);
      
      setTimeout(() => {
        addMessage("Risk Agent", "Evaluating market volatility and sector risks...");
        
        setTimeout(() => {
          setAgentStatus(prev => ({
            ...prev,
            risk: { 
              status: 'completed',
              data: {
                riskLevel: "Medium",
                volatility: 0.85,
                beta: 1.2,
                sharpeRatio: 1.7,
                downsideRisk: 8.3
              }
            }
          }));
          addMessage("Risk Agent", "Risk assessment complete, data ready");
          checkAllComplete();
        }, 3000);
      }, 800);
    }, 1500);
    
    // Simulate Forecasting Agent communication with delay
    setTimeout(() => {
      addMessage("Decision Agent", "Requesting price forecast for " + stock.ticker);
      
      setTimeout(() => {
        addMessage("Forecasting Agent", "Running predictive models and sentiment analysis...");
        
        setTimeout(() => {
          setAgentStatus(prev => ({
            ...prev,
            forecasting: { 
              status: 'completed',
              data: {
                forecastedPrice: stock.currentPrice * 1.12,
                percentChange: 12.0,
                trendDirection: "Upward"
              }
            }
          }));
          addMessage("Forecasting Agent", "Forecast models completed, sending predictions");
          checkAllComplete();
        }, 2500);
      }, 1200);
    }, 2000);
=======
  const simulateAgentCommunication = async () => {
    addMessage("Decision Agent", `Initiating analysis request for ${stock.ticker}`);
  
    try {
  await new Promise(resolve => setTimeout(resolve, 1000));
  addMessage("Decision Agent", `Requesting trend analysis for ${stock.ticker}`);
      const trendRes = await fetch(`http://127.0.0.1:5000/trend?ticker=${stock.ticker}`);
      const trendData = await trendRes.json();
      setAgentStatus(prev => ({
        ...prev,
        trend: { status: 'completed', data: trendData }
      }));
      addMessage("Trend Agent", `Trend Score: ${trendData.trend_score}, Type: ${trendData.trendtype}, SMA_50: ${trendData.sma50}, SMA_200: ${trendData.sma200}, RSI: ${trendData.rsi.toFixed(1)}, MACD: ${trendData.macd.toFixed(2)}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      addMessage("Trend Agent", `Trend Analysis: ${trendData.analysis}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      addMessage("Trend Agent", "Analysis complete, sending data");
      await new Promise(resolve => setTimeout(resolve, 3000));
  
      addMessage("Decision Agent", `Requesting risk assessment for ${stock.ticker}`);
      const riskRes = await fetch(`http://127.0.0.1:5000/risk?ticker=${stock.ticker}`);
      const riskData = await riskRes.json();
      setAgentStatus(prev => ({
        ...prev,
        risk: { status: 'completed', data: riskData }
      }));
      addMessage("Risk Agent", `Risk Level: ${riskData.risk_level}, Volatility: ${riskData.volatility.toFixed(2)}, Max Drawdown: ${riskData.max_drawdown.toFixed(2)}, VaR 95: ${riskData.VaR_95.toFixed(2)}, Model Risk Score: ${riskData.llm_risk_score.toFixed(2)}%`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      addMessage("Risk Agent", `Risk Assesment Analysis: ${trendData.analysis}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      addMessage("Risk Agent", "Risk Assessment complete, data ready");
      await new Promise(resolve => setTimeout(resolve, 3000));
  
      addMessage("Decision Agent", `Requesting price forecast for ${stock.ticker}`);
      const forecastRes = await fetch(`http://127.0.0.1:5000/forecast?ticker=${stock.ticker}`);
      const forecastData = await forecastRes.json();
      setAgentStatus(prev => ({
        ...prev,
        forecasting: { status: 'completed', data: forecastData }
      }));
      addMessage("Forecasting Agent", `Forecasted Price: $${forecastData.forecastedPrice.toFixed(2)}, Direction: ${forecastData.direction}, Change: ${forecastData.percentChange.toFixed(2)}%`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      addMessage("Forecasting Agent", `Forecasting Analysis: ${forecastData.analysis}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      addMessage("Forecasting Agent", "Forecast models completed, sending predictions");
      await new Promise(resolve => setTimeout(resolve, 3000));
  
      const decisionRes = await fetch(`http://127.0.0.1:5000/decision?ticker=${stock.ticker}`);
      const decisionData = await decisionRes.json();
  
      const dataForecastRes = await fetch(`http://127.0.0.1:5000/data_forcast?ticker=${stock.ticker}`);
      const csvText = await dataForecastRes.text();
      const lines = csvText.trim().split('\n');
      const headers = lines[0].split(',');
      const dateIndex = headers.indexOf('date');
      const priceIndex = headers.indexOf('predictedPrice');
  
      const parsedDataForecast = lines.slice(1).map(line => {
        const cols = line.split(',');
        return {
          date: cols[dateIndex],
          predictedPrice: parseFloat(parseFloat(cols[priceIndex]).toFixed(2)),
        };
      }).filter(item => item.date && !isNaN(item.predictedPrice));
  
      parsedDataForecast.forEach(forecast => {
        const index = chartData.findIndex(d => d.date === forecast.date);
        if (index !== -1) {
          chartData[index].predictedPrice = forecast.predictedPrice;
        } else {
          chartData.push({ date: forecast.date, price: null, predictedPrice: forecast.predictedPrice });
        }
      });
  
      setAgentStatus(prev => ({
        ...prev,
        decision: { status: 'completed', data: decisionData }
      }));
      addMessage("Decision Agent", `Final Decision: ${decisionData.decision.decision} — ${decisionData.decision.reasoning}`);
  
      checkAllComplete();
    } catch (error) {
      console.error("Agent API error:", error);
      addMessage("System", "Failed to contact one or more agents.");
      setIsLoading(false);
    }
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532
  };

  // Add a message to the communication log
  const addMessage = (sender, message) => {
    setCommunicationLog(prev => [...prev, { sender, message, timestamp: new Date() }]);
  };

  // Check if all agents have completed their tasks
  const checkAllComplete = () => {
    setAgentStatus(prev => {
      // Check if all agents have completed
      if (prev.trend.status === 'completed' && 
          prev.risk.status === 'completed' && 
          prev.forecasting.status === 'completed') {
        
        // Add final message
        setTimeout(() => {
          addMessage("Decision Agent", "All data collected, generating comprehensive analysis");
          
          setTimeout(() => {
            setIsLoading(false);
            setShowAgentData(true);
            addMessage("Decision Agent", "Analysis complete, displaying results");
          }, 1500);
        }, 500);
      }
      return prev;
    });
  };
<<<<<<< HEAD
=======
  console.log(agentStatus);
  const logEndRef = useRef(null);
  
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [communicationLog]);

  const forecastData = Array.isArray(agentStatus.forecasting.data) ? agentStatus.forecasting.data : [];
  const combinedData = chartData.map(original => {
    const match = forecastData.find(f => f.date === original.date);
    return {
      ...original,
      predictedPrice: match ? match.predictedPrice : original.predictedPrice
    };
  }).concat(
    forecastData.filter(f => !chartData.find(d => d.date === f.date)).map(f => ({
      date: f.date,
      price: null,
      predictedPrice: f.predictedPrice
    }))
  );
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto scrollbar-none"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-none"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{stock.name}</h2>
            <p className="text-gray-400">{stock.ticker}</p>
          </div>
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="mb-6">
          <ResponsiveContainer width="100%" height={400}>
<<<<<<< HEAD
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" name="Historical" stroke="#8884d8" dot={false} connectNulls={true} />
              <Line type="monotone" dataKey="predictedPrice" name="Predicted" stroke="#ff7300" strokeDasharray="5 5" dot={false} connectNulls={true} />
            </LineChart>
=======
           <LineChart width={800} height={400} data={combinedData}>
             <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
             <XAxis
               dataKey="date"
               stroke="#9CA3AF"
               tick={{ fill: '#9CA3AF' }}
               tickFormatter={(tick) => {
                 const date = new Date(tick);
                 return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
               }}
               minTickGap={40}
             />
             <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
             <Tooltip
               contentStyle={{
                 backgroundColor: '#1F2937',
                 border: '1px solid #374151',
                 borderRadius: '8px',
                 padding: '10px',
                 color: '#F9FAFB',
               }}
               labelStyle={{ color: '#9CA3AF' }}
               formatter={(value, name, props) => {
                 const date = new Date(props.payload.date);
                 const formattedDate = !isNaN(date.getTime())
                   ? date.toLocaleDateString('en-US', {
                       weekday: 'short',
                       year: 'numeric',
                       month: 'short',
                       day: 'numeric',
                     })
                   : props.payload.date;
                 const label = name === 'predictedPrice' ? 'Forecast' : 'Price';
                 return [`$${Number(value).toFixed(2)}`, `${label}`];
               }}
             />
             <Legend />
             <Line type="monotone" dataKey="price" name="Historical" stroke="lightblue" dot={false} />
             {showAgentData && (
               <Line
                 type="monotone"
                 dataKey="predictedPrice"
                 name="Predicted"
                 stroke={agentStatus.forecasting.data?.percentChange >= 0 ? "green" : "red"}
                 dot={false}
                 strokeDasharray="5 5"
               />
             )}
           </LineChart>
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">Current Price</p>
            <p className="text-xl font-bold">${stock.currentPrice.toFixed(2)}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">52W Return</p>
            <p className="text-xl font-bold text-red-500">
              {stock.dayChange >= 0 ? '+' : ''}
              {stock.dayChange.toFixed(2)}%
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">52W High</p>
            <p className="text-xl font-bold">${stock.high52W.toFixed(2)}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">52W Low</p>
            <p className="text-xl font-bold">${stock.low52W.toFixed(2)}</p>
          </div>
        </div>
        
        {/* Decision Agent Buttons: Two buttons in a grid with 2 columns */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button
            variant="contained"
            size="large"
            className="bg-green-500 hover:bg-green-600 text-white w-full"
            onClick={handleAskDecisionAgent}
            disabled={isLoading}
          >
<<<<<<< HEAD
            {isLoading ? 'Processing...' : 'Ask Decision Agent'}
=======
            <Activity className="mr-2" />
            {isLoading ? 'Processing...' : 'Ask SIRIUS ... '} 
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532
          </Button>
          <Button
            variant="outlined"
            size="large"
            className="border border-gray-400 text-white hover:text-white hover:border-white w-full"
            onClick={onClose}
            disabled={isLoading}
          >
            Back
          </Button>
        </div>

        {/* Loading screen with agent communication visualization */}
        {isLoading && (
          <div className="mt-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-center mb-4">
              <CircularProgress color="primary" />
<<<<<<< HEAD
              <span className="ml-3 text-lg">Processing stock analysis...</span>
=======
              <span className="ml-3 text-lg">Analysing {stock.name} . . . </span>
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532
            </div>
            
            {/* Agent status indicators */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className={`p-3 rounded-lg border ${agentStatus.trend.status === 'completed' ? 'border-green-500 bg-green-900 bg-opacity-20' : 'border-gray-600'}`}>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${agentStatus.trend.status === 'completed' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  <span>Trend Agent</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg border ${agentStatus.risk.status === 'completed' ? 'border-green-500 bg-green-900 bg-opacity-20' : 'border-gray-600'}`}>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${agentStatus.risk.status === 'completed' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  <span>Risk Agent</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg border ${agentStatus.forecasting.status === 'completed' ? 'border-green-500 bg-green-900 bg-opacity-20' : 'border-gray-600'}`}>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${agentStatus.forecasting.status === 'completed' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  <span>Forecasting Agent</span>
                </div>
              </div>
            </div>
            
            {/* Communication log */}
            <div className="bg-black bg-opacity-50 p-3 rounded-lg h-56 overflow-y-auto font-mono text-sm">
              {communicationLog.map((log, index) => (
                <div key={index} className="mb-1">
                  <span className={`mr-2 ${
                    log.sender === 'Decision Agent' ? 'text-blue-400' : 
                    log.sender === 'Trend Agent' ? 'text-green-400' : 
                    log.sender === 'Risk Agent' ? 'text-yellow-400' : 'text-purple-400'
                  }`}>
                    [{log.timestamp.toLocaleTimeString()}] {log.sender}:
                  </span>
                  <span className="text-gray-300">{log.message}</span>
                </div>
              ))}
<<<<<<< HEAD
=======
              <div ref={logEndRef}></div>
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532
            </div>
          </div>
        )}

        {/* Conditionally render all agent sections based on showAgentData state */}
        {showAgentData && (
          <>
            {/* TREND ANALYSER */}
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Trend Agent</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Trend Type</p>
<<<<<<< HEAD
                  <p className="text-xl font-bold">{agentStatus.trend.data.trendType}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">SMA_50</p>
                  <p className="text-xl font-bold text-green-500">
                    {agentStatus.trend.data.sma50 >= 0 ? '+' : ''}
                    {agentStatus.trend.data.sma50.toFixed(2)}%
=======
                  <p className={`text-xl font-bold ${
                    agentStatus.trend.data.trendtype.includes("Strong Bullish") || agentStatus.trend.data.trendtype === "Very Strong Bullish"
                      ? 'text-green-400'
                      : agentStatus.trend.data.trendtype.includes("Strong Bearish") || agentStatus.trend.data.trendtype === "Very Strong Bearish"
                      ? 'text-red-400'
                      : agentStatus.trend.data.trendtype.includes("Bullish")
                      ? 'text-green-300'
                      : agentStatus.trend.data.trendtype.includes("Bearish")
                      ? 'text-red-300'
                      : 'text-yellow-300'
                  }`}>
                    {agentStatus.trend.data.trendtype}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">SMA_50</p>
                  <p className={`text-xl font-bold ${agentStatus.trend.data.sma50 < stock.currentPrice ? 'text-green-300' : 'text-red-300'}`}>
                    ${agentStatus.trend.data.sma50.toFixed(2)}
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">SMA_200</p>
<<<<<<< HEAD
                  <p className="text-xl font-bold">${agentStatus.trend.data.sma200.toFixed(2)}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">RSI</p>
                  <p className="text-xl font-bold">{agentStatus.trend.data.rsi.toFixed(1)}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">MACD</p>
                  <p className="text-xl font-bold">{agentStatus.trend.data.macd.toFixed(2)}</p>
=======
                  <p className={`text-xl font-bold ${agentStatus.trend.data.sma200 < stock.currentPrice ? 'text-green-300' : 'text-red-300'}`}>
                    ${agentStatus.trend.data.sma200.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">RSI</p>
                  <p className={`text-xl font-bold ${
                    agentStatus.trend.data.rsi < 30 ? 'text-green-400' :
                    agentStatus.trend.data.rsi <= 70 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {agentStatus.trend.data.rsi.toFixed(1)}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">MACD</p>
                  <p className={`text-xl font-bold ${agentStatus.trend.data.macd > 0 ? 'text-green-300' : 'text-red-300'}`}>{agentStatus.trend.data.macd.toFixed(2)}</p>
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532
                </div>
              </div>
            </div>

            {/* Risk Agent */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Risk Agent</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Risk Level</p>
<<<<<<< HEAD
                  <p className="text-xl font-bold">{agentStatus.risk.data.riskLevel}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Volatility</p>
                  <p className="text-xl font-bold">
                    {agentStatus.risk.data.volatility.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Beta</p>
                  <p className="text-xl font-bold">{agentStatus.risk.data.beta.toFixed(2)}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Sharpe Ratio</p>
                  <p className="text-xl font-bold">{agentStatus.risk.data.sharpeRatio.toFixed(2)}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Downside Risk</p>
                  <p className="text-xl font-bold">{agentStatus.risk.data.downsideRisk.toFixed(1)}%</p>
=======
                <p className={`text-xl font-bold ${
                  agentStatus.risk.data.risk_level === 'Low' ? 'text-green-400' :
                  agentStatus.risk.data.risk_level === 'Moderate' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {agentStatus.risk.data.risk_level}
                </p>
                </div>
               <div className="bg-gray-700 p-4 rounded-lg">
                 <p className="text-gray-400">Volatility</p>
                 <p className={`text-xl font-bold ${
                   agentStatus.risk.data.volatility < 20 ? 'text-green-400' :
                   agentStatus.risk.data.volatility < 40 ? 'text-yellow-400' :
                   'text-red-400'
                 }`}>
                   {agentStatus.risk.data.volatility.toFixed(2)}
                 </p>
               </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Max Drawdown</p>
                  <p className={`text-xl font-bold ${
                    agentStatus.risk.data.max_drawdown < 20 ? 'text-green-400' :
                    agentStatus.risk.data.max_drawdown < 40 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {agentStatus.risk.data.max_drawdown.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">VaR 95</p>
                  <p className={`text-xl font-bold ${
                    agentStatus.risk.data.VaR_95 <= 2 ? 'text-green-400' :
                    agentStatus.risk.data.VaR_95 <= 5 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {agentStatus.risk.data.VaR_95.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Model Risk Score</p>
                <p className={`text-xl font-bold ${
                  agentStatus.risk.data.llm_risk_score < 33 ? 'text-green-400' :
                  agentStatus.risk.data.llm_risk_score < 66 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {agentStatus.risk.data.llm_risk_score.toFixed(2)}%
                </p>
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532
                </div>
                {/* Placeholder item - now empty to maintain grid balance */}
                <div className="bg-gray-700 p-4 rounded-lg opacity-0"></div>
              </div>
            </div>

<<<<<<< HEAD
            {/* Recent News Analyser */}
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2">Recent News</h3>
              <div className="space-y-2">
                <p className="text-gray-400">• {stock.name} Announces Q4 Results</p>
                <p className="text-gray-400">• New Product Launch Expected Next Month</p>
                <p className="text-gray-400">• Company Expands International Operations</p>
=======
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2">Recent News</h3>
              <div className="space-y-2">
                {agentStatus.risk.data.news_headlines.slice(0, 3).map((headline, index) => (
                  <p key={index} className="text-gray-300">• {headline}</p>
                ))}
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532
              </div>
            </div>

            {/* Forecasting Agent */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Forecasting Agent</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Final Forecasted Price</p>
<<<<<<< HEAD
                  <p className="text-xl font-bold">${agentStatus.forecasting.data.forecastedPrice.toFixed(2)}</p>
=======
                  <p className={ `text-xl font-bold ${agentStatus.forecasting.data.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>${agentStatus.forecasting.data.forecastedPrice.toFixed(2)} </p>
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">% Change</p>
                  <p className={`text-xl font-bold ${agentStatus.forecasting.data.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {agentStatus.forecasting.data.percentChange >= 0 ? '+' : ''}
                    {agentStatus.forecasting.data.percentChange.toFixed(2)}%
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Trend Direction</p>
<<<<<<< HEAD
                  <p className="text-xl font-bold">{agentStatus.forecasting.data.trendDirection}</p>
=======
                <div className={`text-xl font-bold flex items-center gap-2 ${agentStatus.forecasting.data.direction == "Upward" ? 'text-green-500' : 'text-red-500'}`}>
                  <span>{agentStatus.forecasting.data.direction}</span>
                  {agentStatus.forecasting.data.direction == "Upward"
                    ? <TrendingUp className="text-green-500" size={20} />
                    : <TrendingDown className="text-red-500" size={20} />}
                </div>
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532
                </div>
              </div>
            </div>

<<<<<<< HEAD
=======
            {/* Decision Agent */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Decision Agent</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Final Decison</p>
                <p className={`text-xl font-bold ${
                  agentStatus.decision.data.decision.decision === 'BUY' ? 'text-green-500' :
                  agentStatus.decision.data.decision.decision === 'SELL' ? 'text-red-500' :
                  'text-yellow-400'
                }`}>
                  {agentStatus.decision.data.decision.decision}
                </p>
                </div>
              </div>
            </div>
            
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532
            {/* Communication Log History */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">Agent Communication Log</h2>
              <div className="bg-black bg-opacity-50 p-3 rounded-lg h-40 overflow-y-auto font-mono text-sm">
                {communicationLog.map((log, index) => (
                  <div key={index} className="mb-1">
                    <span className={`mr-2 ${
                      log.sender === 'Decision Agent' ? 'text-blue-400' : 
                      log.sender === 'Trend Agent' ? 'text-green-400' : 
                      log.sender === 'Risk Agent' ? 'text-yellow-400' : 'text-purple-400'
                    }`}>
                      [{log.timestamp.toLocaleTimeString()}] {log.sender}:
                    </span>
                    <span className="text-gray-300">{log.message}</span>
                  </div>
                ))}
<<<<<<< HEAD
=======
                <div ref={logEndRef}></div>
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532
              </div>
            </div>
          </>
        )}
<<<<<<< HEAD
      </div>
    </div>
=======
      {/* ... existing modal content remains unchanged ... */}
        </motion.div>
      </motion.div>
    </AnimatePresence>
>>>>>>> 5add5710532197c1d38ebc2f0304eee477bc9532
  );
};

export default StockDetail;