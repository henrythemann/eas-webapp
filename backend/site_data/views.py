from django.http import JsonResponse
from .models import Page

def page_detail(request, slug):
    page = Page.objects.filter(slug=slug).first()
    if page:
        data = {
            'title': page.title,
            'content': page.content,
        }
        return JsonResponse({'data': data})
    else:
        return JsonResponse({'error': 'Page not found'}, status=404)