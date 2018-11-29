from django.db import models
import markdown as md
import time
# Create your models here.

class Toppage(models.Model):
    def __str__(self):
        return str(self.title)

    title = models.CharField(max_length=255)
    article_md = models.TextField(blank=True, null=True)
    article_html = models.TextField(blank=True, null=True)
    title_en = models.CharField(max_length=255, blank=True, null=True)
    article_md_en = models.TextField(blank=True, null=True)
    article_html_en = models.TextField(blank=True, null=True)
    meta_description = models.CharField(max_length=255, blank=True, null=True)

    def save(self, *args, **kwargs):
        converted = md.markdown(self.article_md, extensions=['gfm'])
        converted = converted.replace('<pre>', '<pre><code>')
        converted = converted.replace('</pre>', '</code></pre>')
        self.article_html = converted

        converted_en = md.markdown(self.article_md_en, extensions=['gfm'])
        converted_en = converted_en.replace('<pre>', '<pre><code>')
        converted_en = converted_en.replace('</pre>', '</code></pre>')
        self.article_html_en = converted_en
        
        super().save(*args, **kwargs)

    class Meta:
        db_table = 'toppage'
        verbose_name_plural = 'toppage'


class Tab(models.Model):
    def __str__(self):
        return str(self.tab)

    tab = models.CharField(max_length=255)
    tab_en = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'tabs'
        verbose_name_plural = 'tab'


class Series(models.Model):
    def __str__(self):
        return str(self.title)

    title = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'series'
        verbose_name_plural = 'series'


class Article(models.Model):
    def __str__(self):
        return str(self.title)

    title = models.CharField(max_length=255)
    article_md = models.TextField(blank=True, null=True)
    article_html = models.TextField(blank=True, null=True)
    title_en = models.CharField(max_length=255, blank=True, null=True)
    article_md_en = models.TextField(blank=True, null=True)
    article_html_en = models.TextField(blank=True, null=True)
    meta_description = models.CharField(max_length=255, blank=True, null=True)
    posted_on = models.DateField(auto_now_add=True)
    updated_on = models.DateField(auto_now=True)
    timestamp = models.BigIntegerField()
    series = models.ForeignKey(Series, on_delete=models.PROTECT, blank=True, null=True)

    # https://docs.djangoproject.com/en/2.1/topics/db/models/#overriding-predefined-model-methods
    def save(self, *args, **kwargs):
        converted = md.markdown(self.article_md, extensions=['gfm'])
        converted = converted.replace('<pre>', '<pre><code>')
        converted = converted.replace('</pre>', '</code></pre>')
        self.article_html = converted

        converted_en = md.markdown(self.article_md_en, extensions=['gfm'])
        converted_en = converted_en.replace('<pre>', '<pre><code>')
        converted_en = converted_en.replace('</pre>', '</code></pre>')
        self.article_html_en = converted_en

        if self.timestamp == None:
            self.timestamp = time.time()

        super().save(*args, **kwargs)

    class Meta:
        db_table = 'articles'
        verbose_name_plural = 'article'


class Tag(models.Model):
    def __str__(self):
        return str(self.tag)

    tag = models.CharField(max_length=255)
    tag_en = models.CharField(max_length=255)

    class Meta:
        db_table = 'tags'
        verbose_name_plural = 'tag'

class Tagmap(models.Model):
    def __str__(self):
        return str(self.tag) + ' ―― ' + str(self.article)

    tag = models.ForeignKey(Tag, on_delete=models.PROTECT)
    article = models.ForeignKey(Article, on_delete=models.PROTECT)

    class Meta:
        db_table = 'tagmaps'
        verbose_name_plural = 'tagmap'
