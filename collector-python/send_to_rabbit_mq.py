import pika
import json

import os

RABBIT_HOST = os.getenv("RABBITMQ_HOST", "rabbitmq")
RABBIT_USER = os.getenv("RABBITMQ_USER", "guest")
RABBIT_PASSWORD = os.getenv("RABBITMQ_PASSWORD", "guest")

credentials = pika.PlainCredentials(RABBIT_USER, RABBIT_PASSWORD)

def send_to_rabbit_mq(weather_data):
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(RABBIT_HOST, credentials=credentials)
    )
    channel = connection.channel()

    # Cria a fila
    channel.queue_declare(queue='weather_queue', durable=True)

    # Converte para JSON 
    message = json.dumps(weather_data)

    # Publica na fila
    channel.basic_publish(
        exchange='',                 
        routing_key='weather_queue',
        body=message,
        properties=pika.BasicProperties(
            delivery_mode=2  
        )
    )

    print('Mensagem enviada para fila:', message)
    connection.close()
