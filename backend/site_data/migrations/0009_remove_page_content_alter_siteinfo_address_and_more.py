# Generated by Django 5.0.1 on 2024-01-27 21:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("site_data", "0008_alter_siteinfo_options_alter_siteinfo_address"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="page",
            name="content",
        ),
        migrations.AlterField(
            model_name="siteinfo",
            name="address",
            field=models.CharField(max_length=200),
        ),
        migrations.CreateModel(
            name="ManufacturerPage",
            fields=[
                (
                    "page_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="site_data.page",
                    ),
                ),
                ("content", models.TextField()),
            ],
            bases=("site_data.page",),
        ),
    ]
