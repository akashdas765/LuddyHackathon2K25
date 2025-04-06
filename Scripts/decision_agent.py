import openai
import os
import json

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
        forecast_change = forecast_result.get('percentChange', 'N/A')
        forecast_initial = forecast_result.get('initial_price', 'N/A')
        forecast_final = forecast_result.get('forecastedPrice', 'N/A')

        prompt = (
            f"You are an expert financial portfolio advisor tasked with making investment decisions for clients based on multi-agent analysis.\n"
            f"Below is the detailed information about the stock {ticker}. Your task is to analyze this information and return a JSON object with two keys:\n"
            f" - decision: One of the following strings - BUY, SELL, or HOLD.\n"
            f" - reasoning: A one or two sentence explanation justifying the decision.\n\n"

            f"--- ANALYSIS INPUT ---\n"
            f"Trend Score (higher means stronger positive trend): {trend_score}\n"
            f"Risk Score (higher means more risk): {risk_score}\n"
            f"LLM Risk Score (LLM-inferred risk level): {llm_risk_score}\n"
            f"News Headlines: {headlines}\n"
            f"LLM Risk Analysis Summary: {analysis}\n"
            f"Forecast Initial Price: {forecast_initial}\n"
            f"Forecast Final Price: {forecast_final}\n"
            f"Forecast Direction: {forecast_trend}\n"
            f"Forecast Percent Change: {forecast_change}%\n"
            f"------------------------\n\n"

            f"Based on the above data, respond with a JSON object with the keys 'decision' and 'reasoning'."
        )

        try:
            response = openai.ChatCompletion.create(
                model="mistral-large-2407",
                messages=[
                    {"role": "system", "content": "You are a portfolio decision-making assistant."},
                    {"role": "user", "content": prompt}
                ]
            )
            content = response.choices[0].message.content.strip()
            print(content)
            try:
                parsed_json_str = content.strip('```json').strip('```').strip()
                parsed = json.loads(parsed_json_str)
                decision = parsed.get("decision", "").upper()
                reasoning = parsed.get("reasoning", "")
            except Exception as parse_error:
                print(f"[Error] Failed to parse decision response JSON for {ticker}: {parse_error}")
                decision = None
                reasoning = ""
        except Exception as e:
            print(f"[Error] OpenAI decision making failed for {ticker}: {e}")
            decision = None
            reasoning = ""

        return {
            'ticker': ticker,
            'trend_score': trend_score,
            'risk_score': risk_score,
            'llm_risk_score': llm_risk_score,
            'forecast_direction': forecast_trend,
            'forecast_percent_change': forecast_change,
            'decision': decision,
            'reasoning': reasoning
        }