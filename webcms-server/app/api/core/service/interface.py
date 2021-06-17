from abc import ABC, abstractmethod

from django.http.request import HttpRequest

class Service(ABC):
    """
        Service's abstract fabric
    """
    def __init__(self, request:HttpRequest):
        self._query = self._get_queryset(request)
        self._result = self._get_result()
        self._response = self._get_response()

    def get(self):
        return self._response
    
    @abstractmethod
    def _get_queryset(self):
        pass

    @abstractmethod
    def _get_result(self):
        pass
    
    @abstractmethod
    def _get_response(self):
        pass