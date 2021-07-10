import csv
from django.shortcuts import render, redirect, HttpResponse
from django.db.models import Q

from .models import Link, Report
from .utils import get_username

def sites_list(request):

    context = {
                'links':Link.objects.filter(is_verified=True),
            }

    return render(request, 'sources/index.html',  context=context)

def contact_form(request, id=None):
    form = request.path.split("/")[2]
    context = {'context': form}
    if form == 'report':
        context.update({'item':Link.objects.get(id=id)})
    return render(request, f'sources/{form}.html', context=context)

def add(request, context):
    response = redirect('sources:')

    def add_report():
        problem = request.POST.get('problem')
        id = request.POST.get('id')
        link = Link.objects.get(id=id)
        Report(site=link, problem=problem, author=get_username(request)).save()

    def add_suggest():
        Link(name=request.POST.get('site-name'),
             discription=request.POST.get('site-discription'),
             address=request.POST.get('site-address'),
             author=get_username(request),
             is_verified=False
            ).save()

    if context == "report":
        add_report()
        return response

    if context == "suggest":
        add_suggest()
        return response

def download(request):
    response = HttpResponse(content_type='text/csv')
    
    file = csv.writer(response)
    file.writerow(['name', 'discription', 'address'])

    for i in Link.objects.filter(is_verified=True).values_list('site_name', 'site_discription', 'site_address'):
        file.writerow(i)

    response['Content-Disposition'] = 'attachment; filename="sites_list.csv"'
    return response