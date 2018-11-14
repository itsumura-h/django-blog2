from django.contrib import admin
from .models import Tab, Series, Article, Toppage, Tag, Tagmap

# Register your models here.

class ToppageAdmin(admin.ModelAdmin):
    readonly_fields = ['article_html', 'article_html_en']
admin.site.register(Toppage, ToppageAdmin)

admin.site.register(Series)

class ArticleAdmin(admin.ModelAdmin):
    readonly_fields = ['article_html', 'article_html_en', 'timestamp']
    list_display = ('title', 'timestamp')
admin.site.register(Article, ArticleAdmin)

admin.site.register(Tab)

admin.site.register(Tag)

class TagmapsAdmin(admin.ModelAdmin):
    list_display = ('article', 'tag')
admin.site.register(Tagmap)
