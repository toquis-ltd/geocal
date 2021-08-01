from ..abs.service import Service

class CoordinateReferenceSystemList (Service):
    get_item_parameters = lambda item: {
                                        'code': item.coord_ref_sys_code,
                                        'name': item.coord_ref_sys_name,
                                        'area': item.area_name,
                                        'unityOfMeasure': item.get_unity_of_measure(),
                                        # 'bounds': item.get_bounds()
                                    }
    
    def _get_queryset(self, *args, **kwargs) -> None:
        return

    def _get_result(self, *args, **kwargs) -> None:
        return

    def _get_response(self) -> dict:
        return  {
                    'find': len(self._result),
                    'findCRS': map(self.__class__.get_item_parameters, self._result),
                }