import csv

from django.views.generic import ListView
from django.shortcuts import render, redirect

from .models import Link, Report
from .utils import get_username


class LinkListView (ListView):
    queryset = Link.objects.filter(is_verified=True)
    template_name = 'sources/index.html'


def contact_form(request, id=None):
    form = request.path.split("/")[2]
    context = {'context': form}
    if form == 'report':
        context.update({'item':Link.objects.get(id=id)})
    return render(request, f'sources/{form}.html', context=context)

def add(request, context):
    response = redirect('sources:index')

    def add_report():
        problem = request.POST.get('problem')
        id = request.POST.get('id')
        link = Link.objects.get(id=id)
        Report(site=link, problem=problem, author=get_username(request)).save()

    def add_suggest():
        Link(name=request.POST.get('site-name'),
             description=request.POST.get('site-description'),
             address=request.POST.get('site-address'),
             author=get_username(request),
             is_verified=False
            ).save()

    if context == "report":
        add_report()
    elif context == "suggest":
        add_suggest()
    
    return response