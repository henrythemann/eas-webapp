# Generated by Django 5.0.1 on 2024-01-27 04:16

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("site_data", "0005_alter_page_hero_bkgd_img"),
    ]

    operations = [
        migrations.AlterField(
            model_name="page",
            name="hero_bkgd_img",
            field=models.CharField(blank=True, max_length=200),
        ),
    ]