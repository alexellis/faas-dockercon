import requests
import json
import base64

import sys

def get_stdin():
    buf = ""
    for line in sys.stdin:
        buf = buf + line
    return buf

if(__name__=="__main__"):
    st = get_stdin()

    # parse Github event
    req = json.loads(st)

    # download the avatar binary using getavatar function
    r = requests.post("http://gateway:8080/function/func_getavatar", json=req)

    res = r.json()

    # Figure out the correct extension for the avatar.
    ext = ".jpg"
    if res["contentType"] == "image/png":
        ext = ".png"

    # Take the encoded image and turn into binary bytes
    imageData = base64.standard_b64decode(res["content"])
    loginName = req["sender"]["login"]
    
    # Store in the fan-club photo gallery
    r1 = requests.post("http://minio-db:8080/put-blob/"+ loginName + ext, data=imageData)

    # Useful for logging, Github will receive this string.
    print('{"status": "success", "username": "' + req["sender"]["login"] + '", "bytes": "'+str(len(imageData))+'"}')

