# Generated by Django 5.0.1 on 2024-01-28 17:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("site_data", "0010_remove_page_url_slug_page_page_title"),
    ]

    operations = [
        migrations.AddField(
            model_name="manufacturerpage",
            name="article_subtitle",
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
