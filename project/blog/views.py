from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse, JsonResponse, HttpResponseNotFound
from django.conf import settings

import os
import logging
import time
import math

from .tables.Toppage import Toppage
from .tables.Series import Series
from .tables.Article import Article

#デバッグ
import pdb #pdb.set_trace()
import json

# Create your views here.

# API
def get_toppage(request):
    toppage = Toppage.get_toppage()
    return JsonResponse({'value': toppage})

def get_toppage_en(request):
    toppage = Toppage.get_toppage_en()
    return JsonResponse({'value': toppage})
#----------------------------------------------
def get_series(request):
    series = Series.get_series()
    return JsonResponse({'value': series})

def get_series_en(request):
    series = Series.get_series_en()
    return JsonResponse({'value': series})
#----------------------------------------------
def get_diaries(request):
    articles = Article.search_diaries()
    return JsonResponse({'value': articles})

def get_diaries_en(request):
    articles = Article.search_diaries_en()
    return JsonResponse({'value': articles})
#----------------------------------------------
def get_articles(request, series_id=1):
    articles = Article.search_articles_by_series_id(series_id)
    return JsonResponse({'value': articles})

def get_articles_en(request, series_id=1):
    articles = Article.search_articles_by_series_id_en(series_id)
    return JsonResponse({'value': articles})
#----------------------------------------------
def get_article(request, timestamp=1):
    article = Article.search_article_by_timestamp(timestamp)
    return JsonResponse({'value': article})

def get_article_en(request, timestamp=1):
    article = Article.search_article_by_timestamp_en(timestamp)
    return JsonResponse({'value': article})
#----------------------------------------------
def get_latests(request):
    articles = Article.search_latest_articles()
    return JsonResponse({'value': articles})

def get_latests_en(request):
    articles = Article.search_latest_articles_en()
    return JsonResponse({'value': articles})
#----------------------------------------------
from .service import Service
def get_all_articles(request):
    articles = Article.search_all_articles()
    list_series = Service.all_articles_to_hierarchy(articles)
    #print(json.dumps(list_series, indent=2, ensure_ascii=False))
    return JsonResponse({'value': list_series})

def get_all_articles_en(request):
    articles = Article.search_all_articles_en()
    list_series = Service.all_articles_to_hierarchy(articles)
    #print(json.dumps(list_series, indent=2, ensure_ascii=False))
    return JsonResponse({'value': list_series})
#----------------------------------------------
def getArticlesByKeyword(request, keyword):
    if keyword is '':
        return JsonResponse({'value': ''})

    articles = Article.searchArticlesByKeyword(keyword)
    return JsonResponse({'value': articles})

def getArticlesByKeyword_en(request, keyword):
    if keyword is '':
        return JsonResponse({'value': ''})

    articles = Article.searchArticlesByKeyword_en(keyword)
    return JsonResponse({'value': articles})
#----------------------------------------------
def error(request):
    return HttpResponseNotFound('<h1>API not found</h1>')

# /_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_

def manifest(request):
    return render(request, 'blog/build/manifest.json')

class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get(self, request):
        try:
            with open(os.path.join(settings.BLOG_REACT_DIR, 'build/index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )

#_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

def test1(request, times=10):
    responce = {}
    times = 100000 if times > 100000 else times

    start = time.time()
    # -----------------------------------------
    results = [1]
    MAX = times
    NUM = 2
    while NUM <= MAX:
        LIMIT=int(math.sqrt(NUM))
        i=1
        while i <= LIMIT:
            i += 1
            if i == NUM:
                FLAG = False
                results += [NUM]
                NUM = 1
                continue
            remainder = NUM % i
            if remainder == 0:
                FLAG = False
                break
            else:
                FLAG = True
        if (FLAG):
            results += [NUM]
        NUM += 2
    # -----------------------------------------
    responce['time'] = time.time() - start
    responce['language'] = 'Pypy'

    responce['results'] = results
    return  JsonResponse(responce)


def test2(request, times=1):
    def fib(n):
        a, b = 0, 1
        for i in range(n):
            a, b = b, a + b
        return b

    if(times > 5000):
        return HttpResponse('too much')

    start = time.time()
    results = [fib(i) for i in range(times)]
    r_time = time.time() - start

    return JsonResponse({'time': r_time, 'results': results})