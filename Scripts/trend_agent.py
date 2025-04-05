import yfinance as yf
import pandas as pd

class TrendAnalysisAgent:
    def __init__(self, period='5y'):
        self.period = period

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

            return {
                'Ticker': ticker,
                'trend_score': trend_score,
                'trend_type': trend_type,
                'sma_50': round(sma_50, 2),
                'sma_200': round(sma_200, 2),
                'rsi': round(rsi_val, 2),
                'macd': round(macd_val, 2),
                'macd_signal': round(signal_val, 2),
            }

        except Exception as e:
            print(f"[Error] TrendAgent failed for {ticker}: {e}")
            return None