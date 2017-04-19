FROM functions/alpine:health

RUN apk --no-cache add python py-pip && \
 pip install requests
WORKDIR /root/

COPY handler.py .

ENV fprocess="/usr/bin/python handler.py"
EXPOSE 8080

CMD ["fwatchdog"]
