import yfinance as yf
import pandas as pd
import openai  # Ensure you have openai imported at the top of the file
import os
class TrendAnalysisAgent:
    def __init__(self, period='5y'):
        self.period = period
        self.mistral_api_key = os.getenv("MISTAL_API_KEY")
    def compute_rsi(self, series, window=14):
        delta = series.diff()
        gain = delta.clip(lower=0).rolling(window).mean()
        loss = -delta.clip(upper=0).rolling(window).mean()
        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))
        return rsi

    def compute_macd(self, series, short=12, long=26, signal=9):
        ema_short = series.ewm(span=short, adjust=False).mean()
        ema_long = series.ewm(span=long, adjust=False).mean()
        macd_line = ema_short - ema_long
        signal_line = macd_line.ewm(span=signal, adjust=False).mean()
        return macd_line, signal_line

    def get_llm_trend_reasoning(self, trend_score, trend_type, sma50, sma200, rsi, macd, macd_signal):
        try:
            openai.api_key = self.mistral_api_key
            openai.api_base = os.getenv("MISTRAL_API_BASE")
            prompt = (
                f"You are a financial analyst. Given the following trend indicators, provide a short reasoning "
                f"(1-2 sentences) explaining the trend:\n"
                f"Trend Score: {trend_score}\n"
                f"Trend Type: {trend_type}\n"
                f"SMA 50: {sma50}\n"
                f"SMA 200: {sma200}\n"
                f"RSI: {rsi}\n"
                f"MACD: {macd}\n"
                f"MACD Signal: {macd_signal}\n"
                f"Provide only reasoning without a summary or conclusion."
            )
            response = openai.ChatCompletion.create(
                model="mistral-large-2407",
                messages=[
                    {"role": "system", "content": "You are a financial trend analysis expert."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=60
            )
            return response['choices'][0]['message']['content'].strip()
        except Exception as e:
            print(f"[Error] LLM trend reasoning failed: {e}")
            return "LLM reasoning not available."

    def run(self, ticker):
        try:
            data = yf.download(ticker, period=self.period, auto_adjust=False, progress=False)
            if data.empty:
                raise ValueError("No data returned for ticker.")
            if 'Close' not in data.columns or data['Close'].isna().all().item():
                raise ValueError("No valid closing price data.")

            close = data['Close'].dropna()

            if len(close) < 200:
                raise ValueError("Not enough data for SMA-200")

            # SMA
            sma_50 = float(close.rolling(50).mean().iloc[-1])
            sma_200 = float(close.rolling(200).mean().iloc[-1])
            sma_signal = 1 if sma_50 > sma_200 else -1 if sma_50 < sma_200 else 0

            # RSI
            rsi_series = self.compute_rsi(close)
            if rsi_series.empty:
                raise ValueError("RSI series is empty.")
            rsi_val = float(rsi_series.iloc[-1])
            rsi_signal = 1 if rsi_val < 30 else -1 if rsi_val > 70 else 0

            # MACD
            macd_line, signal_line = self.compute_macd(close)
            if macd_line.empty or signal_line.empty:
                raise ValueError("MACD or signal line is empty.")
            macd_val = float(macd_line.iloc[-1])
            signal_val = float(signal_line.iloc[-1])
            macd_signal = 1 if macd_val > signal_val else -1 if macd_val < signal_val else 0

            # Final score
            trend_score = sma_signal + rsi_signal + macd_signal
            trend_type = (
                "Very Strong Bullish" if trend_score == 3 else
                "Strong Bullish" if trend_score == 2 else
                "Mild Bullish" if trend_score == 1 else
                "Neutral" if trend_score == 0 else
                "Mild Bearish" if trend_score == -1 else
                "Strong Bearish" if trend_score == -2 else
                "Very Strong Bearish"
            )

            llm_reasoning = self.get_llm_trend_reasoning(trend_score, trend_type, round(sma_50, 2), round(sma_200, 2),
                                                         round(rsi_val, 2), round(macd_val, 2), round(signal_val, 2))

            return {
                'Ticker': ticker,
                'trend_score': trend_score,
                'trendtype': trend_type,
                'sma50': round(sma_50, 2),
                'sma200': round(sma_200, 2),
                'rsi': round(rsi_val, 2),
                'macd': round(macd_val, 2),
                'macd_signal': round(signal_val, 2),
                'analysis': llm_reasoning,
            }

        except Exception as e:
            print(f"[Error] TrendAgent failed for {ticker}: {e}")
            return None