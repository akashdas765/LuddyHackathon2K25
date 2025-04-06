# LuddyHackathon2K25

This repository hosts a multi-agent stock analysis application that uses **Flask** (Python) on the backend and **React + Vite** on the frontend to provide end-to-end stock insights. The application integrates four specialized “agents” to help users make informed investment decisions.

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Prerequisites](#prerequisites)  
4. [Installation](#installation)  
5. [Database Setup (Optional)](#database-setup-optional)  
6. [Environment Variables](#environment-variables)  
7. [Usage](#usage)  
   - [Running the Flask Backend](#running-the-flask-backend)  
   - [Running the React Frontend](#running-the-react-frontend)  
8. [Agents and Scripts](#agents-and-scripts)  
   - [TrendAnalysisAgent](#trendanalysisagent)  
   - [RiskAssessmentAgent](#riskassessmentagent)  
   - [ForecastingAgent](#forecastingagent)  
   - [DecisionAgent](#decisionagent)  
9. [Endpoints and API](#endpoints-and-api)  
10. [Testing the Agents](#testing-the-agents)  
11. [Cases Folder](#cases-folder)  
12. [Troubleshooting](#troubleshooting)  
13. [License](#license)

---

## 1. Overview

**LuddyHackathon2K25** is a comprehensive platform designed for stock portfolio analysis. It leverages multiple Python “agents” to:

- Perform **technical trend analysis** (SMA, RSI, MACD).  
- Assess **risk** (volatility, max drawdown, VaR) and incorporate **news sentiment**.  
- **Forecast** prices using time series modeling (Exponential Smoothing).  
- Combine all results to issue **BUY/SELL/HOLD** **decisions**.

The front end (React + Vite) provides a user interface that fetches results from the Flask APIs and displays them in interactive dashboards.

---

## 2. Features

- **Trend Analysis**  
  Calculates various technical indicators and synthesizes them into a single trend score. An optional LLM provides short reasoning about the trend.

- **Risk Assessment**  
  Measures annualized volatility, Value at Risk (VaR), and maximum drawdown, and parses recent news headlines via Finnhub API. An LLM can produce a “news-based risk score.”

- **Forecasting**  
  Predicts the stock’s closing price over the next 3 months using **ExponentialSmoothing**. Summarize the forecast using an LLM-generated explanation.

- **Decision Making**  
  Aggregates the above agents’ results to suggest a final trading action: **BUY**, **SELL**, or **HOLD**.

- **Flask RESTful API**  
  Provides endpoints to query portfolio information, trigger the analysis, and retrieve results or CSV exports of historical/forecast data.

- **React + Vite Frontend**  
  Presents an interactive dashboard that displays all results, enabling convenient user interaction.

---

## 3. Prerequisites

Before installing and running, ensure you have:

1. **Python 3.9+**  
2. **PostgreSQL** (optional if you want to store portfolio holdings in a database)  
4. **Finnhub API Key** – if you wish to pull relevant news headlines and incorporate them into the risk analysis.  
5. **Mistral or OpenAI API credentials** – for the LLM functionalities in your agents (optional but recommended).

---

## 4. Installation

1. **Clone this repo**:

   ```bash
   git clone https://github.com/your-org/LuddyHackathon2K25.git
   cd LuddyHackathon2K25-main
   pip install --upgrade pip
   pip install -r requirements.txt
   npm install

2. **Create Environment Variables file

   ```bash
   DB_NAME=your_database_name
   DB_USER=your_username
   DB_PASS=your_password
   DB_HOST=localhost
   DB_PORT=5432
   
   # Finnhub API Key (for risk analysis headlines)
   FINNHUB_API_KEY=YOUR_FINNHUB_API_KEY
   
   # Mistral or OpenAI credentials
   MISTAL_API_KEY=YOUR_MISTRAL_KEY
   MISTRAL_API_BASE=https://api.openai.com/v1



