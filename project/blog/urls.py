from django.conf.urls import url
from django.urls import re_path, path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    # API
    path('api/getToppage', views.get_toppage),
    path('api/getSeries', views.get_series),
    path('api/getNotes', views.get_notes),
    path('api/getArticles/<int:id>', views.get_articles),
    path('api/getArticle/<int:timestamp>', views.get_article),
    path('api/getLatests', views.get_latests),
    
    path('api/test1/<int:times>', views.test1),
    path('api/test2/<int:times>', views.test2),
    
    # manifest.json
    path('manifest.json', views.manifest),
    # templates
    url(r'^', views.FrontendAppView.as_view()),
    #url(r'^', views.show)
]