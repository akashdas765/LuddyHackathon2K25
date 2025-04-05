import yfinance as yf
import pandas as pd
import requests
import os
import openai
from datetime import datetime, timedelta
import re
import json
from dotenv import load_dotenv
load_dotenv()
print("🔐 OpenAI Key Detected:", os.getenv("MISTAL_API_KEY") is not None)
class RiskAssessmentAgent:
    def __init__(self, period='5y'):
        self.period = period
        self.finnhub_api_key = os.getenv("FINNHUB_API_KEY")
        self.mistral_api_key = os.getenv("MISTAL_API_KEY")

    def fetch_news_headlines(self, ticker):
        try:
            today = datetime.today().date()
            from_date = today - timedelta(days=7)
            url = (
                f"https://finnhub.io/api/v1/company-news?symbol={ticker}"
                f"&from={from_date}&to={today}&token={self.finnhub_api_key}"
            )
            response = requests.get(url)
            articles = response.json()
            headlines = [article["headline"] for article in articles[:5]]
            return headlines
        except Exception as e:
            print(f"[Error] Failed to fetch news for {ticker}: {e}")
            return []

    def evaluate_news_with_llm(self, ticker, headlines):
        try:
            openai.api_key = self.mistral_api_key
            openai.api_base = os.getenv("MISTRAL_API_BASE")
            prompt = (
                f"You are a financial news analyzer helping with portfolio risk assessment. "
                f"Given the recent news headlines for stock {ticker}, analyze the sentiment and potential risk impact. "
                f"Return your response strictly in JSON format with the following structure:\n"
                f"{{\n  \"analysis\": \"<summary of sentiment and impact>\",\n  \"risk_score\": <number from 0 to 100>\n}}\n"
                f"News Headlines: {headlines}"
            )
            response = openai.ChatCompletion.create(
                model="mistral-large-2407",
                messages=[
                    {"role": "system", "content": "You are a financial analyst assistant."},
                    {"role": "user", "content": prompt}
                ]
            )
            content = response.choices[0].message["content"].strip()
            print("LLM response: ", content)
            match = re.search(r'"risk_score"\s*:\s*(\d{1,3})', content)
            score = int(match.group(1)) if match and 0 <= int(match.group(1)) <= 100 else None
            return content, score
        except Exception as e:
            print(f"[Error] OpenAI API calling mistral model failed for {ticker}: {e}")
            return "LLM analysis failed.", None

    def run(self, ticker):
        try:
            data = yf.download(ticker, period=self.period, auto_adjust=False, progress=False)
            if data.empty:
                raise ValueError("No data returned for ticker.")
            if 'Close' not in data.columns or data['Close'].isna().all().item():
                raise ValueError("No valid closing price data.")

            close = data['Close'].dropna()
            daily_returns = close.pct_change().dropna()

            # Annualized volatility
            volatility = daily_returns.std() * (252 ** 0.5)
            risk_score = float(round(volatility * 100, 2))
            
            # Maximum drawdown
            cumulative_returns = (1 + daily_returns).cumprod()
            peak = cumulative_returns.cummax()
            drawdown = ((cumulative_returns - peak) / peak).min()
            max_drawdown = round(drawdown * 100, 2)

            # Value at Risk (VaR) at 95% confidence level
            var_95 = round(daily_returns.quantile(0.05) * 100, 2)

            # Risk level classification
            if risk_score < 20:
                risk_level = "Low"
            elif risk_score < 40:
                risk_level = "Moderate"
            else:
                risk_level = "High"

            # Fetch and analyze news
            headlines = self.fetch_news_headlines(ticker)
            llm_analysis, llm_risk_score = self.evaluate_news_with_llm(ticker, headlines)
            if llm_risk_score == None:
                llm_risk_score = risk_score
            return {
                'Ticker': str(ticker),
                'risk_score': float(risk_score),
                'risk_level': str(risk_level),
                'max_drawdown_%': float(max_drawdown),
                'VaR_95_%': float(var_95),
                'news_headlines': [str(h) for h in headlines],
                'llm_analysis': str(llm_analysis),
                'llm_risk_score': float(llm_risk_score) if llm_risk_score is not None else None
            }

        except Exception as e:
            print(f"[Error] RiskAssessmentAgent failed for {ticker}: {e}")
            return None
