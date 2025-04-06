import yfinance as yf
import pandas as pd
from statsmodels.tsa.holtwinters import ExponentialSmoothing
import openai
import os

class ForecastingAgent:
    def __init__(self, period="5y"):
        self.period = period
        self.mistral_api_key = os.getenv("MISTAL_API_KEY")
    def get_historical_data(self, ticker):
        try:
            data = yf.download(ticker, period=self.period)
            if data.empty:
                return None
            data.reset_index(inplace=True)
            return data
        except Exception as e:
            print(f"Error fetching data for {ticker}: {e}")
            return None

    def forecast_next_3_months(self, data):
        ts = data.set_index("Date")["Close"]
        ts = ts.asfreq('B').interpolate()

        model = ExponentialSmoothing(ts, trend="add", seasonal="add", seasonal_periods=252)
        fit = model.fit()
        forecast = fit.forecast(63)
        return ts, forecast

    def run(self, ticker):
        data = self.get_historical_data(ticker)
        if data is None:
            return None

        ts, forecast = self.forecast_next_3_months(data)

        initial_price = ts.iloc[-1]
        final_price = forecast.iloc[-1]
        percent_change = ((final_price - initial_price) / initial_price) * 100

        # ✅ Safely convert to scalar if it's a Series
        if isinstance(percent_change, pd.Series):
            percent_change = percent_change.item()
        elif hasattr(percent_change, 'item'):
            percent_change = percent_change.item()

        trend_direction = "Upward" if percent_change > 0 else "Downnward" if percent_change < 0 else "No Change"

        # LLM Reasoning Prompt
        openai.api_key = self.mistral_api_key
        openai.api_base = os.getenv("MISTRAL_API_BASE")

        prompt = (
            f"You are a financial assistant. Based on the forecast for {ticker}, "
            f"the initial price is {round(initial_price, 2)}, and the forecasted price in 3 months is {round(final_price, 2)}. "
            f"The percentage change is {round(percent_change, 2)}%, indicating a {trend_direction} trend. "
            f"Please explain this forecast in 1-2 short sentences."
        )

        reasoning = ""
        try:
            response = openai.ChatCompletion.create(
                model="mistral-large-2407",
                messages=[
                    {"role": "system", "content": "You are a helpful financial assistant."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=60,
                temperature=0.7
            )
            reasoning = response['choices'][0]['message']['content']
        except Exception as e:
            print(f"LLM reasoning error: {e}")

        return {
            "ticker": ticker,
            "initial_price": round(initial_price, 2),
            "forecastedPrice": round(final_price, 2),
            "percentChange": round(percent_change, 2),
            "direction": trend_direction,
            "analysis": reasoning,
            "forecast": {str(k): v for k, v in forecast.items()}
        }