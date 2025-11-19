import requests
import os
from weather_code_translator import translate_weather_code

LAT_NOVA_FRIBURGO = -22.28
LON_NOVA_FRIBURGO = -42.53

BASE_URL = os.getenv("OPEN_METEO_URL", "https://api.open-meteo.com/v1/forecast")

params = {
    'latitude': LAT_NOVA_FRIBURGO,
    'longitude': LON_NOVA_FRIBURGO,
    'hourly': 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation_probability',
    'current': 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation_probability',
    'timezone': 'America/Sao_Paulo'
}


##Função para buscar dados climáticos atuais
def fetch_weather():
    print('Buscando dados')

    response = requests.get(BASE_URL, params=params)

    if response.status_code != 200:
        print('Erro ao buscar dados:', response.text)
        return None

    data = response.json()

    current = data.get('current', {})
    weather = {
        'temperature': current.get('temperature_2m'),
        'humidity': current.get('relative_humidity_2m'),
        'wind_speed': current.get('wind_speed_10m'),
        'weather_condition': translate_weather_code(current.get('weather_code')),
        'precipitation_probability': current.get('precipitation_probability')
    }

    print('Dados coletados:', weather)

    return weather


