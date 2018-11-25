from django.urls import include, path, re_path
from django.views.generic import TemplateView
from . import views

api_patterns = [
    path('getToppage', views.get_toppage),
    path('getSeries', views.get_series),
    path('getNotes', views.get_notes),
    path('getArticles/<int:id>', views.get_articles),
    path('getArticle/<int:timestamp>', views.get_article),
    path('getLatests', views.get_latests),
    
    path('test1/<int:times>', views.test1),
    path('test2/<int:times>', views.test2),

    # 全てに一致しなかった時404を返す
    re_path(r'\w*', views.error),
]

urlpatterns = [
    path('api/', include(api_patterns)),

    # manifest.json
    path('manifest.json', views.manifest),
    # templates
    re_path(r'^', views.FrontendAppView.as_view()),
]