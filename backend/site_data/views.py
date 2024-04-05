from django.http import JsonResponse
from .models import ManufacturerPage, SiteInfo

def manufacturer_page_detail(request, url_slug):
    page = ManufacturerPage.objects.filter(page_title__iexact=url_slug.replace('-',' ')).first()
    if page:
        return JsonResponse({
            'page_title': page.page_title,
            'content': page.content,
            'hero_bkgd_img': page.hero_bkgd_img,
            'article_subtitle': page.article_subtitle,
            'services': list(page.service_set.all().values_list('service_name', flat=True)),
        })
    else:
        return JsonResponse({'error': 'Page not found'}, status=404)

def site_info(request):
    info = SiteInfo.objects.first()
    manufacturer_pages = list(ManufacturerPage.objects.all().values_list('page_title', flat=True))
    page_dicts = [{'title': page, 'link': f"/manufacturers/{page.lower().replace(' ','-')}"} for page in manufacturer_pages]

    return JsonResponse({
        'site_description': info.site_description,
        'site_logo': info.site_logo,
        'address': info.address,
        'phone': info.phone,
        'email': info.email,
        'yelp_link': info.yelp_link,
        'instagram_link': info.instagram_link,
        'pages': [
            {
                'title': 'Home',
                'link': '/'
            },
            {
                'title': 'About',
                'link': '/about'
            },
            {
                'group': 'manufacturers',
                'title': 'Vehicles We Service',
                'pages': page_dicts
            },
            {
                'title': 'Reviews',
                'link': '/reviews'
            },
            {
                'title': 'Contact',
                'link': '/contact'
            }
        ]
    })