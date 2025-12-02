package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

type WeatherData struct {
	Temperature              float64 `json:"temperature"`
	Humidity                 float64 `json:"humidity"`
	WindSpeed                float64 `json:"windSpeed"`
	WeatherCondition         string  `json:"weatherCondition"`
	PrecipitationProbability float64 `json:"precipitationProbability"`
	WeatherCode              int     `json:"weatherCode"`
}

func main() {
	apiURL := getEnv("API_URL", "http://host.docker.internal:3000/weather/logs")
	rabbitURL := getEnv("RABBIT_URL", "amqp://guest:guest@rabbitmq:5672/")

	conn := connectRabbit(rabbitURL)
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Erro ao abrir canal")
	defer ch.Close()

	declareQueue(ch)
	consumeMessages(ch, apiURL)
}


func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func connectRabbit(url string) *amqp.Connection {
	var conn *amqp.Connection
	var err error

	for {
		conn, err = amqp.Dial(url)
		if err == nil {
			log.Println("[RabbitMQ] Conectado com sucesso!")
			return conn
		}

		log.Println("[RabbitMQ] Falha ao conectar, tentando novamente em 3s...", err)
		time.Sleep(3 * time.Second)
	}
}

func declareQueue(ch *amqp.Channel) {
	_, err := ch.QueueDeclare(
		"weather_queue",
		true,
		false,
		false,
		false,
		nil,
	)
	failOnError(err, "Erro ao declarar fila")
}

func consumeMessages(ch *amqp.Channel, apiURL string) {
	msgs, err := ch.Consume(
		"weather_queue",
		"",
		false,
		false,
		false,
		false,
		nil,
	)
	failOnError(err, "Erro ao registrar consumidor")

	log.Println("[Worker] Aguardando mensagens...")

	for msg := range msgs {
		processMessage(msg, apiURL)
	}
}

func processMessage(msg amqp.Delivery, apiURL string) {
    var data WeatherData

    if err := json.Unmarshal(msg.Body, &data); err != nil {
        log.Println("[Worker] JSON inválido:", err)
        msg.Nack(false, false) 
        return
    }

    log.Println("[Worker] Mensagem recebida. Enviando para API...")

    if sendToAPI(apiURL, data) {
        msg.Ack(false)
    } else {
        log.Println("[Worker] Falha ao enviar. Tentando novamente em 5s...")
        time.Sleep(5 * time.Second) 
        
        msg.Nack(false, true) 
    }
}


func sendToAPI(url string, data WeatherData) bool {
	jsonBody, _ := json.Marshal(data)

	client := http.Client{
		Timeout: 5 * time.Second,
	}

	resp, err := client.Post(url, "application/json", bytes.NewBuffer(jsonBody))
	if err != nil {
		log.Println("[API] Erro ao chamar API:", err)
		return false
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 200 && resp.StatusCode < 300 {
		log.Println("[API] Dados enviados com sucesso!")
		return true
	}

	log.Printf("[API] Resposta %d recebida da API\n", resp.StatusCode)
	return false
}

/* ---------------------------------- ERROS -------------------------------------- */

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}
