FROM golang:1.7.5
RUN mkdir -p /go/src/app
RUN go get github.com/alexellis/faas/watchdog/types
WORKDIR /go/src/app

COPY main.go .
COPY handler.go .
COPY types.go .
COPY proxy.go .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

CMD ["echo"]
