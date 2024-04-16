from django.http import JsonResponse
from .models import ManufacturerPage, SiteInfo, HomePage, HomeHeroSection

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
    
def home_page(request):
    home_page = HomePage.objects.first()
    hero_sections = HomeHeroSection.objects.filter(home_page=home_page)
    return JsonResponse({
        'page_title': home_page.page_title,
        'hero_sections': [
            {
                'bkgd_img': section.bkgd_img,
                'heading': section.heading,
                'title': section.title,
                'subtitle': section.subtitle,
                'btn_text': section.btn_text,
                'btn_link': section.btn_link
            } for section in hero_sections
        ]
    })

def site_info(request):
    info = SiteInfo.objects.first()
    manufacturer_pages = list(ManufacturerPage.objects.all().values_list('page_title', flat=True))
    page_dicts = [{'title': page, 'link': f"/manufacturers/{page.lower().replace(' ','-')}"} for page in manufacturer_pages]

    return JsonResponse({
        'site_description': info.site_description,
        'footer_description': info.footer_description,
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