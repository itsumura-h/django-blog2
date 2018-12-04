from django.contrib import admin
from .models import Tab, Series, Article, Toppage, Tag, Tagmap

# Register your models here.

class ToppageAdmin(admin.ModelAdmin):
    readonly_fields = ['article_html', 'article_html_en']
admin.site.register(Toppage, ToppageAdmin)

admin.site.register(Series)

class TagInline(admin.StackedInline):
    model = Tagmap
    extra = 1
    classes = ['collapse']
class ArticleAdmin(admin.ModelAdmin):
    readonly_fields = ['article_html', 'article_html_en', 'timestamp', 'posted_on', 'updated_on']
    list_display = ('title', 'timestamp')
    fieldsets = [
        (None,
        {'fields': [
            'title', 'article_md', 'title_en', 'article_md_en', 'meta_description',
            'series', 'posted_on', 'updated_on', 'timestamp']
        }
        ),
        ('html', {
            'classes': ('collapse',), #折りたたみ
            'fields': ['article_html', 'article_html_en']
        }),
    ]
    inlines = [TagInline]
admin.site.register(Article, ArticleAdmin)

admin.site.register(Tab)

admin.site.register(Tag)

class TagmapsAdmin(admin.ModelAdmin):
    list_display = ('article', 'tag')
admin.site.register(Tagmap, TagmapsAdmin)
