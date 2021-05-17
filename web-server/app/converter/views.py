from django.shortcuts import render

def transform_point(request):
    return render(request, "converter/index.html")