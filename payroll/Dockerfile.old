FROM functions/alpine:latest

RUN apk add --no-cache nodejs ca-certificates

# RUN apk add --no-cache nodejs curl ca-certificates && \
#     curl -SL https://github.com/alexellis/faas/releases/download/v0.5-alpha/fwatchdog > /usr/bin/fwatchdog && \
#     chmod +x /usr/bin/fwatchdog && \
#     apk del curl

WORKDIR /root/
ADD package.json .
RUN npm i

COPY index.js .

ENV fprocess="node index.js"
CMD ["fwatchdog"]
