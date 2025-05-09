FROM golang:1.21-alpine

ENV PORT=4000
ENV ATTACK_URL=http://192.168.4.12
ENV ATTACK_DURATION=4
ENV ATTACK_FREQ=100

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o main main.go

EXPOSE 4000

CMD ["./main"]
