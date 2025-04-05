import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" name="Historical" stroke="#8884d8" dot={false} connectNulls={true} />
              <Line type="monotone" dataKey="predictedPrice" name="Predicted" stroke="#ff7300" strokeDasharray="5 5" dot={false} connectNulls={true} />
            </LineChart>
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
            {isLoading ? 'Processing...' : 'Ask Decision Agent'}
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
              <span className="ml-3 text-lg">Processing stock analysis...</span>
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
                  <p className="text-xl font-bold">{agentStatus.trend.data.trendType}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">SMA_50</p>
                  <p className="text-xl font-bold text-green-500">
                    {agentStatus.trend.data.sma50 >= 0 ? '+' : ''}
                    {agentStatus.trend.data.sma50.toFixed(2)}%
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">SMA_200</p>
                  <p className="text-xl font-bold">${agentStatus.trend.data.sma200.toFixed(2)}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">RSI</p>
                  <p className="text-xl font-bold">{agentStatus.trend.data.rsi.toFixed(1)}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">MACD</p>
                  <p className="text-xl font-bold">{agentStatus.trend.data.macd.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Risk Agent */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Risk Agent</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Risk Level</p>
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
                </div>
                {/* Placeholder item - now empty to maintain grid balance */}
                <div className="bg-gray-700 p-4 rounded-lg opacity-0"></div>
              </div>
            </div>

            {/* Recent News Analyser */}
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2">Recent News</h3>
              <div className="space-y-2">
                <p className="text-gray-400">• {stock.name} Announces Q4 Results</p>
                <p className="text-gray-400">• New Product Launch Expected Next Month</p>
                <p className="text-gray-400">• Company Expands International Operations</p>
              </div>
            </div>

            {/* Forecasting Agent */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Forecasting Agent</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Final Forecasted Price</p>
                  <p className="text-xl font-bold">${agentStatus.forecasting.data.forecastedPrice.toFixed(2)}</p>
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
                  <p className="text-xl font-bold">{agentStatus.forecasting.data.trendDirection}</p>
                </div>
              </div>
            </div>

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
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StockDetail;