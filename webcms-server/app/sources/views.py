from django.contrib.messages.views import SuccessMessageMixin
from django.http import HttpRequest
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView

from .forms.suggest import SuggestForm
from .models import Link, Region, Report
from .utils import get_username

class LinkListView (ListView):
    context_object_name = 'links'
    template_name = 'sources/index.html'

    def get_queryset(self):
        region_name = self.request.GET.get('filter', '')
        order = self.request.GET.get('orderby', 'region')
        region_id = None

        try:
            region_id = Region.objects.get(name__icontains = region_name)
        except Region.MultipleObjectsReturned:
            region_id = Region.objects.filter(name = region_name).first()
        
        if region_id != None:
            new_context = Link.objects.filter(region=region_id, is_verified=True).order_by(order)
        else:
            new_context = Link.objects.filter(is_verified=True).order_by(order)
        
        return new_context
    
class LinkCreateView (CreateView):
    """
        Do not  inherit SuccessMessageMixin before writing css styles for message
    """
    model = Link
    form_class = SuggestForm
    success_url = reverse_lazy('sources:index')
    success_message = 'Thank you for your submit, after verification your post will be published'
    template_name = 'sources/suggest.html'
    _request:HttpRequest

    def post(self, request) :
        self._request = request
        return super().post(request)
    
    def form_valid(self, form):
        instance = form.save(commit=False)
        instance.name=self._request.POST.get('name')
        instance.description=self._request.POST.get('description')
        instance.address=self._request.POST.get('address')
        instance.author=get_username(self._request)
        instance.is_verified=False
        instance.save()
        return super(LinkCreateView, self).form_valid(form)

class ReportCreateView (CreateView):
    """
        Do not inherit SuccessMessageMixin before writing css styles for message
    """
    model = Report
    fields = ['problem']
    template_name = 'sources/report.html'
    success_url = reverse_lazy('sources:index')
    success_message = 'Thank you for your report'
    _reported_link:Link
    _request:HttpRequest

    def get(self, request, id):
        self.reported_link = Link.objects.get(id=id)
        return super().get(request)
    
    def get_context_data(self, **kwargs):
        context = super(ReportCreateView, self).get_context_data(**kwargs)
        context['reported_link'] = self.reported_link
        return context

    def post(self, request, id, **kwargs):
        self._request = request
        self._id = id
        return super().post(request, **kwargs)
    
    def form_valid(self, form):
        instance = form.save(commit=False)
        instance.site = Link.objects.get(id=self._id)
        instance.problem = self._request.POST.get('problem')
        instance.author = get_username(self._request)
        instance.save()
        return super(ReportCreateView, self).form_valid(form)