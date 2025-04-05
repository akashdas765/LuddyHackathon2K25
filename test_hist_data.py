import yfinance as yf
import pandas as pd
from statsmodels.tsa.holtwinters import ExponentialSmoothing
import matplotlib.pyplot as plt

def get_5_year_history(ticker):
    try:
        data = yf.download(ticker, period="5y")
        if data.empty:
            print(f"No historical data found for {ticker}.")
            return None
        data.reset_index(inplace=True)
        return data
    except Exception as e:
        print(f"Error fetching data for {ticker}: {e}")
        return None

def forecast_next_3_months(data):
    # Use only closing prices
    ts = data.set_index("Date")["Close"]
    ts = ts.asfreq('B').interpolate()

    # Fit Holt-Winters exponential smoothing model
    model = ExponentialSmoothing(ts, trend="add", seasonal="add", seasonal_periods=252)
    fit = model.fit()

    # Forecast the next 3 months (approx. 63 business days)
    forecast = fit.forecast(63)

    # Plot the result
    plt.figure(figsize=(12, 6))
    plt.plot(ts, label="Historical")
    plt.plot(forecast, label="Forecast", color="green")
    plt.title("3-Month Forecast of Stock Prices")
    plt.xlabel("Date")
    plt.ylabel("Price")
    plt.legend()
    plt.tight_layout()
    plt.show()

    return forecast

if __name__ == '__main__':
    ticker = "AAPL"  # Replace with desired ticker
    history = get_5_year_history(ticker)
    print(history.head())
    if history is not None:
        forecast = forecast_next_3_months(history)
        print(forecast.head())