import yfinance as yf
import pandas as pd
from statsmodels.tsa.holtwinters import ExponentialSmoothing

class ForecastingAgent:
    def __init__(self, period="5y"):
        self.period = period

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

        trend_direction = "up" if percent_change > 0 else "down"

        return {
            "ticker": ticker,
            "initial_price": round(initial_price, 2),
            "final_forecast_price": round(final_price, 2),
            "percent_change": round(percent_change, 2),
            "direction": trend_direction,
            "forecast": forecast.to_dict()
        }

