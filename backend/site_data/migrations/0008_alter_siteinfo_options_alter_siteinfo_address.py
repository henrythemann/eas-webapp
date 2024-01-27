# Generated by Django 5.0.1 on 2024-01-27 21:34

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("site_data", "0007_siteinfo"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="siteinfo",
            options={"verbose_name_plural": "Site Info"},
        ),
        migrations.AlterField(
            model_name="siteinfo",
            name="address",
            field=models.TextField(max_length=200),
        ),
    ]
