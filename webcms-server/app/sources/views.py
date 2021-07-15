from django.contrib import messages
from django.views.generic import ListView, CreateView
from django.shortcuts import render, redirect

from .forms.suggest import SuggestForm
from .models import Link, Report
from .utils import get_username


class LinkListView (ListView):
    context_object_name = 'links'
    queryset = Link.objects.filter(is_verified=True)
    template_name = 'sources/index.html'

class LinkCreateView (CreateView):
    model = Link
    form_class = SuggestForm
    template_name = 'sources/suggest.html'
    
    def post(self, request) :
        Link(
                name=request.POST.get('name'),
                description=request.POST.get('description'),
                address=request.POST.get('address'),
                author=get_username(request),
                is_verified=False
            ).save()
        return redirect('..')

class ReportCreateView (CreateView):
    model = Report
    fields = ['problem']
    template_name = 'sources/report.html'
    reported_link:Link
    
    def get(self, request, id):
        self.reported_link = Link.objects.get(id=id)
        return super().get(request)
    
    def get_context_data(self, **kwargs):
        context = super(ReportCreateView, self).get_context_data(**kwargs)
        context['reported_link'] = self.reported_link
        return context
    
    def post(self, request, **kwargs) :
        Report( 
                site=Link.objects.get(id=request.POST.get('id')), 
                problem=request.POST.get('problem'),
                author=get_username(request)
            ).save()
        messages.success(request, 'Thank you for your report')
        return redirect('../..')