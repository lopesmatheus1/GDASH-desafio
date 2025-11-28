# Build
FROM golang AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o worker main.go

# Final stage
FROM debian:bookworm-slim

WORKDIR /root/

COPY --from=builder /app/worker .

CMD ["./worker"]
