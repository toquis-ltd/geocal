from ..abs.service import Service

class CoordinateReferenceSystemCase(Service):
    
    def _get_queryset(self, request):
        return request.GET.get('crs')
    
    def _get_response(self):
        return self._result