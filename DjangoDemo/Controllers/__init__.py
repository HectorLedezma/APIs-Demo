from django.http import JsonResponse
import json
def GetRequest(req):
    try:
        #bod = json.dump  #req.body

        res = {
            "method":req.method,
            "headers":dict(req.headers),
            "body":json.loads(req.body.decode('utf-8'))
        }
        print(res["body"])
        return JsonResponse(res)
    except Exception as e:
        return JsonResponse({"Error":e})