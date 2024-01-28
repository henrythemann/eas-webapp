from django.http import JsonResponse
from .models import ManufacturerPage, SiteInfo

def manufacturer_page_detail(request, slug):
    page = ManufacturerPage.objects.filter(url_slug=slug).first()
    if page:
        return JsonResponse({
            'title': page.html_title,
            'content': page.content,
            'url_slug': page.url_slug,
            'hero_bkgd_img': page.hero_bkgd_img,
        })
    else:
        return JsonResponse({'error': 'Page not found'}, status=404)

def site_info(request):
    info = SiteInfo.objects.first()
    manufacturer_pages = list(ManufacturerPage.objects.all().values_list('url_slug', flat=True))
    return JsonResponse({
        'site_description': info.site_description,
        'site_logo': info.site_logo,
        'address': info.address,
        'phone': info.phone,
        'email': info.email,
        'manufacturer_pages': manufacturer_pages,
    })