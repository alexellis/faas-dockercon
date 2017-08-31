import json
import base64
import os

import requests

def handle(req):
    req = json.loads(req)
    sender = req["sender"]
    avatar_url = sender["avatar_url"]

    r = requests.get(avatar_url)
    response = {}
    if os.getenv("Http_X_Raw") == None:
        # Base-64 encode the binary data into the response, so we can also package
        # the type of image such as jpeg/png.
        response["content"] = base64.standard_b64encode( r.content )
        response["contentType"] = r.headers['Content-Type']

        print(json.dumps(response))
    else:
        print(r.content)
