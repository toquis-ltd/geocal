# Generated by Django 3.1.11 on 2021-07-07 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sources', '0004_auto_20210703_0219'),
    ]

    operations = [
        migrations.AlterField(
            model_name='link',
            name='description',
            field=models.TextField(blank=True, max_length=3072, null=True),
        ),
        migrations.AlterField(
            model_name='link',
            name='name',
            field=models.CharField(max_length=128),
        ),
    ]