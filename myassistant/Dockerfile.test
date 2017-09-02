FROM functions/alpine:latest

RUN apk add --no-cache nodejs ca-certificates

WORKDIR /root/
ADD package.json .
RUN npm i

COPY samples samples
COPY index.js .
COPY handler.js .

ENV fprocess="node index.js"
CMD ["fwatchdog"]
