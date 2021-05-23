from django.shortcuts import render
from .attribute import *

def render_page(func):
    def wrapper(request, code):
        attributes, is_transformable = func(code)
        context = {
                    'main_title': attributes.get_name(),
                    'sub_title': attributes.get_description(),
                    'is_deprecated': attributes.is_deprecated(),
                    'p_list': attributes.get_propreties(),
                    'is_transformable': is_transformable,
                    'code':code,
                    }
        return render(request, "wiki/index.html", context=context)
    return wrapper

@render_page
def coordinate_reference_system(code):
    attributes = Coordinate_Reference_System(code)
    is_transformable = True
    return attributes, is_transformable

@render_page
def coordinate_system(code):
    attributes = Coordinate_System(code)
    return attributes, False

@render_page
def datum(code):
    attributes = Datum(code)
    return attributes, False

@render_page
def prime_meridian(code):
    attributes = Prime_Meridian(code)
    return attributes, False

@render_page
def ellipsoid(code):
    attributes = Ellipsoid(code) 
    return attributes, False