from django.http import JsonResponse
from .models import ManufacturerPage, SiteInfo, HomePage, HomeHeroSection, HomeExpertSection, ServicePage, ContactPage, AboutPage, YelpReview

def get_object_from_url_slug(model, url_slug):
    m = model.objects.filter(page_title__iexact=url_slug.replace('-',' ').replace('%26','&')).first()
    if m is not None:
        return m
    return model.objects.filter(page_title__iexact=url_slug.replace('%26','&')).first()

def manufacturer_page_detail(request, url_slug):
    page = get_object_from_url_slug(ManufacturerPage, url_slug)
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

def service_page_detail(request, url_slug):
    page = get_object_from_url_slug(ServicePage, url_slug)
    if page:
        return JsonResponse({
            'page_title': page.page_title,
            'content': page.content,
            'hero_bkgd_img': page.hero_bkgd_img,
            'article_subtitle': page.article_subtitle,
            'article_img': page.article_img,
        })
    else:
        return JsonResponse({'error': 'Page not found'}, status=404)
    
def contact_page(request):
    contact_page = ContactPage.objects.first()
    return JsonResponse({
        'page_title': contact_page.page_title,
        'hero_bkgd_img': contact_page.hero_bkgd_img,
    })

def home_page(request):
    home_page = HomePage.objects.first()
    hero_sections = HomeHeroSection.objects.filter(home_page=home_page)
    expert_sections = HomeExpertSection.objects.filter(home_page=home_page)
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
        ],
        'expert_sections': [
            {
                'title': section.title,
                'caption': section.caption,
                'icon': section.icon,
                'btn_text': section.btn_text,
                'btn_link': section.btn_link
            } for section in expert_sections
        ],
    })

def site_info(request):
    info = SiteInfo.objects.first()
    manufacturer_pages = list(ManufacturerPage.objects.all().values_list('page_title', flat=True))
    page_dicts = [{'title': page, 'link': f"/manufacturers/{page.lower().replace(' ','-').replace('&','%26')}"} for page in manufacturer_pages]

    services = list(ServicePage.objects.all().values_list('page_title', flat=True))
    service_dicts = [{'title': service, 'link': f"/services/{service.lower().replace(' ','-').replace('&','%26')}"} for service in services]\
    
    yelp_reviews = [review['data_review_id'] for review in YelpReview.objects.all().values()]

    return JsonResponse({
        'site_description': info.site_description,
        'footer_description': info.footer_description,
        'hours': info.hours,
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
                'group': 'services',
                'title': 'Services',
                'pages': service_dicts,
            },
            {
                'group': 'manufacturers',
                'title': 'Vehicles We Service',
                'pages': page_dicts
            },
            {
                'title': 'Contact',
                'link': '/contact'
            }
        ],
        'yelp_reviews': yelp_reviews,
    })

def about_page(request):
    about_page = AboutPage.objects.first()
    return JsonResponse({
        'page_title': about_page.page_title,
        'content': about_page.content,
        'hero_bkgd_img': about_page.hero_bkgd_img,
    })