from django.http import JsonResponse

def GetRequest(req):
    try:
        res = {
            "method":req.method,
            "headers":dict(req.headers),
            "body":req.body.decode('utf-8')
        }
        return JsonResponse(res)
    except Exception as e:
        return JsonResponse(e)