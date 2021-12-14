from django.test import TestCase

from .conversion import PointConversion

class TransformationTestCase(TestCase):
    
        def test_conversion(self):
            test_contex = {
                            't_crs': 6397,
                            's_crs': 4326,
                            'source_x':"50",
                            'source_y':"0",
                            'source_z':"0",
                            }
            
            test_case = PointConversion(test_contex)
            responce = assert (test_case.get_target_values() == {
                                                            "target_x":2629241.69312173,
                                                            "target_y":8030699.58282062,
                                                            "target_z":.0
                                                        })
           
            return responce
 