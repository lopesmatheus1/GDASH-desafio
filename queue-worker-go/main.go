package main

import (
	"encoding/json"
	"fmt"
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

type WeatherData struct {
	Temperature              float64 `json:"temperature"`
	Humidity                 float64 `json:"humidity"`
	WindSpeed                float64 `json:"wind_speed"`
	WeatherCondition         string  `json:"weather_condition"`
	PrecipitationProbability float64 `json:"precipitation_probability"`
	WeatherCode              int     `json:"weather_code"`
}

func main() {
	// Conecta ao RabbitMQ
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {
		log.Fatalf("Erro ao conectar ao RabbitMQ: %s", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Erro ao abrir canal: %s", err)
	}
	defer ch.Close()

	// Garante que a fila existe
	_, err = ch.QueueDeclare(
		"weather_queue",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("Erro ao declarar fila: %s", err)
	}

	// Configura consumo
	msgs, err := ch.Consume(
		"weather_queue",
		"",
		false,
		false,
		false,
		false,
		nil,
	)

	if err != nil {
		log.Fatalf("Erro ao registrar consumidor: %s", err)
	}

	fmt.Println("Worker em Go aguardando mensagens")

	forever := make(chan bool)

	go func() {
		for msg := range msgs {
			var data WeatherData

			if err := json.Unmarshal(msg.Body, &data); err != nil {
				log.Println("Erro ao converter JSON:", err)
				msg.Nack(false, false)
				continue
			}

			fmt.Println("Mensagem recebida:")
			fmt.Printf("Temperatura: %.2f°C\n", data.Temperature)
			fmt.Printf("Umidade: %.0f%%\n", data.Humidity)
			fmt.Printf("Vento: %.2f km/h\n", data.WindSpeed)
			fmt.Printf("Condição (code): %d\n", data.WeatherCode)
			fmt.Printf("Condição: %s\n", data.WeatherCondition)
			fmt.Printf("Probabilidade de chuva: %.0f%%\n", data.PrecipitationProbability)
			fmt.Println("")

			msg.Ack(false)
		}
	}()

	<-forever
}
