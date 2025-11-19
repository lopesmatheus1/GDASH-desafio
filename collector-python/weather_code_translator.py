##Função para traduzir códigos de clima em descrições em português
def translate_weather_code(code):
    weather_conditions = {
        0: "Céu limpo",
        1: "Principalmente limpo",
        2: "Parcialmente nublado",
        3: "Nublado",
        45: "Nevoeiro",
        48: "Nevoeiro com gelo",
        51: "Chuvisco leve",
        53: "Chuvisco moderado",
        55: "Chuvisco denso",
        56: "Chuvisco congelante leve",
        57: "Chuvisco congelante denso",
        61: "Chuva leve",
        63: "Chuva moderada",
        65: "Chuva forte",
        66: "Chuva congelante leve",
        67: "Chuva congelante forte",
        71: "Queda de neve leve",
        73: "Queda de neve moderada",
        75: "Queda de neve forte",
        77: "Grãos de neve",
        80: "Aguaceiros de chuva leves",
        81: "Aguaceiros de chuva moderados",
        82: "Aguaceiros de chuva violentos",
        85: "Aguaceiros de neve leves",
        86: "Aguaceiros de neve fortes",
        95: "Trovoada leve ou moderada",
        96: "Trovoada com granizo leve",
        99: "Trovoada com granizo forte"
    }
    return weather_conditions.get(code, "Código desconhecido")