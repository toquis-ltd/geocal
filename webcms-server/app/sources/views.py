import csv
from django.shortcuts import render, redirect, HttpResponse
from django.db.models import Q

from .models import Link, Report

def sites_list(request):

    context = {
                'links':Link.objects.all(),
            }

    return render(request, 'sources/index.html',  context=context)

def contact_form(request):
    form = request.path.split("/")[2]
    context = {'name': form}
    return render(request, f'sources/{form}.html', context=context)

# def add(request, context):
#     response = redirect('sources:links')

#     def add_report():
#         q = request.POST.get('site-name')
#         p = request.POST.get('problem')
#         try:
#             link = Link.objects.filter(Q(site_name__contains=q)|Q(site_address__contains=q))[0]
#             Report(site=link, problem=p, author=get_username(request)).save()
#         except:
#             pass

#     def add_suggest():
#         Link(site_name=request.POST.get('site-name'),
#              site_discription=request.POST.get('site-discription'),
#              site_address=request.POST.get('site-address'),
#              author=get_username(request),
#              is_verified=False
#             ).save()

#     if context == "report":
#         add_report()
#         return response

#     add_suggest()
#     return response

def download(request):
    response = HttpResponse(content_type='text/csv')
    
    file = csv.writer(response)
    file.writerow(['name', 'discription', 'address'])

    for i in Link.objects.filter(is_verified=True).values_list('site_name', 'site_discription', 'site_address'):
        file.writerow(i)

    response['Content-Disposition'] = 'attachment; filename="sites_list.csv"'
    return response