import openai
import os

class DecisionAgent:
    def __init__(self):
        openai.api_key = os.getenv("MISTAL_API_KEY")
        openai.api_base = os.getenv("MISTRAL_API_BASE")

    def decide(self, trend_result, risk_result, forecast_result):
        ticker = trend_result['Ticker']
        trend_score = trend_result['trend_score']
        risk_score = risk_result['risk_score']
        headlines = risk_result['news_headlines']
        llm_risk_score = risk_result['llm_risk_score']
        analysis = risk_result.get('llm_analysis', '')
        
        forecast_trend = forecast_result.get('direction', 'N/A')
        forecast_change = forecast_result.get('percent_change', 'N/A')
        forecast_initial = forecast_result.get('initial_price', 'N/A')
        forecast_final = forecast_result.get('final_forecast_price', 'N/A')

        prompt = (
            f"You are a financial portfolio advisor. Given the following information for stock {ticker},\n"
            f"decide whether the investor should BUY, SELL, or HOLD the stock.\n"
            f"Provide only the decision in uppercase (BUY, SELL, HOLD).\n"
            f"\n"
            f"Trend Score: {trend_score}\n"
            f"Risk Score: {risk_score}\n"
            f"LLM Risk Score: {llm_risk_score}\n"
            f"Headlines: {headlines}\n"
            f"LLM Risk Analysis: {analysis}\n"
            f"Forecast Initial Price: {forecast_initial}\n"
            f"Forecast Final Price: {forecast_final}\n"
            f"Forecast Direction: {forecast_trend}\n"
            f"Forecast Percent Change: {forecast_change}%\n"
        )

        try:
            response = openai.ChatCompletion.create(
                model="mistral-large-2407",
                messages=[
                    {"role": "system", "content": "You are a portfolio decision-making assistant."},
                    {"role": "user", "content": prompt}
                ]
            )
            decision = response.choices[0].message.content.strip().upper()
        except Exception as e:
            print(f"[Error] OpenAI decision making failed for {ticker}: {e}")
            decision = None

        return {
            'ticker': ticker,
            'trend_score': trend_score,
            'risk_score': risk_score,
            'llm_risk_score': llm_risk_score,
            'forecast_direction': forecast_trend,
            'forecast_percent_change': forecast_change,
            'decision': decision
        }