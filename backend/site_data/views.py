from django.http import JsonResponse
from .models import ManufacturerPage, SiteInfo

def manufacturer_page_detail(request, url_slug):
    page = ManufacturerPage.objects.filter(page_title=url_slug.replace('-',' ').title()).first()
    if page:
        return JsonResponse({
            'page_title': page.page_title,
            'html_title': page.html_title,
            'content': page.content,
            'hero_bkgd_img': page.hero_bkgd_img,
            'article_subtitle': page.article_subtitle,
            'services': list(page.service_set.all().values_list('service_name', flat=True)),
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