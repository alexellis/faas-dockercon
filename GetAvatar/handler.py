import requests
import json
import base64

import sys

def get_stdin():
    buf = ""
    for line in sys.stdin:
        buf = buf + line
    return buf

if(__name__ == "__main__"):
    st = get_stdin()

    req = json.loads(st)
    sender = req["sender"]
    avatar_url = sender["avatar_url"]

    r = requests.get(avatar_url)

    response = {}

    # Base-64 encode the binary data into the response, so we can also package
    # the type of image such as jpeg/png.
    response["content"] = base64.standard_b64encode( r.content )
    response["contentType"] = r.headers['Content-Type']

    print(json.dumps(response))
