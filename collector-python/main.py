import schedule
import time
from fetch_weather import fetch_weather
from send_to_rabbit_mq import send_to_rabbit_mq

def excecute():
    weather_data = fetch_weather()
    send_to_rabbit_mq(weather_data)

##Agendamento para coletar dados a cada 10 minutos
schedule.every(10).minutes.do(excecute)

while True:
    schedule.run_pending()
    time.sleep(1)
