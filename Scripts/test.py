import warnings
warnings.filterwarnings("ignore")

from trend_agent import TrendAnalysisAgent
from risk_assesment import RiskAssessmentAgent
from decision_agent import DecisionAgent
from forecast_agent import ForecastingAgent

def run_trend_analysis_test():
    tickers = ['AAPL', 'TSLA', 'MSFT', 'NFLX', 'GOOGL']
    agent = TrendAnalysisAgent()
    results = []

    print("\n📈 Running Trend Analysis on Portfolio:\n")

    for ticker in tickers:
        print(f"▶️  Analyzing {ticker}...")
        result = agent.run(ticker)
        if result:
            results.append({
                'Ticker': ticker,
                'Trend': result['trend_type'],
                'SMA-50': result['sma_50'],
                'SMA-200': result['sma_200'],
                'RSI': result['rsi'],
                'MACD': result['macd'],
                'MACD Signal': result['macd_signal'],
                'Score': result['trend_score']
            })
            print(f"✅ {ticker} → {result['trend_type']}")
            print(f"    SMA-50: {result['sma_50']}, SMA-200: {result['sma_200']}")
            print(f"    RSI: {result['rsi']} | MACD: {result['macd']} | MACD Signal: {result['macd_signal']}")
            print(f"    Final Trend Score: {result['trend_score']}\n")
        else:
            print(f"❌ Failed to analyze {ticker}\n")

    if results:
        import pandas as pd
        df = pd.DataFrame(results)
        print("\n📊 Summary of Trend Analysis:")
        print(df.to_string(index=False))


def run_risk_assessment_test():
    tickers = ['AAPL', 'TSLA', 'MSFT', 'NFLX', 'GOOGL']
    agent = RiskAssessmentAgent()
    results = []

    print("\n📉 Running Risk Assessment on Portfolio:\n")

    for ticker in tickers:
        print(f"▶️  Assessing {ticker}...")
        result = agent.run(ticker)
        if result:
            results.append(result)
            print(f"✅ {ticker} → Risk Level: {result['risk_level']}, Risk Score: {result['risk_score']}")
            print(f"    Max Drawdown: {result['max_drawdown_%']}% | VaR 95%: {result['VaR_95_%']}%")

            print("    📰 Headlines:")
            for headline in result.get('news_headlines', []):
                print(f"     - {headline}")

            print("\n    🤖 LLM Risk Analysis:")
            print(f"    {result.get('llm_analysis', 'No analysis available')}")
            print(f"    LLM Risk Score: {result.get('llm_risk_score', 'N/A')}\n")
        else:
            print(f"❌ Failed to assess {ticker}\n")

    if results:
        import pandas as pd
        df = pd.DataFrame(results)
        print("\n📊 Summary of Risk Assessment:")
        print(df[['Ticker', 'risk_score', 'risk_level', 'max_drawdown_%', 'VaR_95_%', 'llm_risk_score']].to_string(index=False))

def run_forecasting_agent():
    tickers = ['AAPL', 'TSLA', 'MSFT', 'NFLX', 'GOOGL']
    agent = ForecastingAgent()
    results = []

    print("\n🔮 Running Forecasting Agent:\n")

    for ticker in tickers:
        print(f"▶️  Forecasting {ticker}...")
        result = agent.run(ticker)
        if result:
            results.append({
                "Ticker": result['ticker'],
                "Initial Price": result['initial_price'],
                "Final Forecast Price": result['final_forecast_price'],
                "% Change": result['percent_change'],
                "Direction": result['direction']
            })
            print(f"✅ {ticker} → {result['direction'].upper()} {result['percent_change']}% over 3 months")
            print(f"    Initial: {result['initial_price']}, Forecasted: {result['final_forecast_price']}\n")
        else:
            print(f"❌ Failed to forecast {ticker}\n")

    if results:
        import pandas as pd
        df = pd.DataFrame(results)
        print("\n📊 Forecast Summary:")
        print(df.to_string(index=False))

def run_final_decision_agent():
    tickers = ['AAPL', 'TSLA', 'MSFT', 'NFLX', 'GOOGL']
    trend_agent = TrendAnalysisAgent()
    risk_agent = RiskAssessmentAgent()
    forecast_agent = ForecastingAgent()
    decision_agent = DecisionAgent()
    results = []

    print("\n📊 Running Final Decision Agent:\n")

    for ticker in tickers:
        print(f"▶️  Evaluating {ticker}...")
        trend_result = trend_agent.run(ticker)
        risk_result = risk_agent.run(ticker)
        forecast_result = forecast_agent.run(ticker)
        if trend_result and risk_result:
            decision = decision_agent.decide(trend_result, risk_result, forecast_result)
            results.append(decision)
            print(f"✅ {ticker} → Decision: {decision['decision']}")
            print(f"    Trend Score: {decision['trend_score']}, Risk Score: {decision['risk_score']}, LLM Risk Score: {decision['llm_risk_score']}\n")
        else:
            print(f"❌ Failed to evaluate {ticker}\n")

    if results:
        import pandas as pd
        df = pd.DataFrame(results)
        print("\n📈 Final Portfolio Decisions:")
        print(df.to_string(index=False))

if __name__ == '__main__':
    run_trend_analysis_test()
    run_risk_assessment_test()
    run_forecasting_agent()
    run_final_decision_agent()
    print("\n✅ All tests completed successfully.")
    print("🔚 End of Test Output.")