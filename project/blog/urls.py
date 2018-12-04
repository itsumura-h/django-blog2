from django.urls import include, path, re_path
from django.views.generic import TemplateView
from . import views

api_patterns = [
    path('getToppage', views.get_toppage),
    path('getToppage_en', views.get_toppage_en),
    
    path('getSeries', views.get_series),
    path('getSeries_en', views.get_series_en),

    path('getDiaries', views.get_diaries),
    path('getDiaries_en', views.get_diaries_en),

    path('getArticles/<int:series_id>', views.get_articles),
    path('getArticles_en/<int:series_id>', views.get_articles_en),

    path('getArticle/<int:timestamp>', views.get_article),
    path('getArticle_en/<int:timestamp>', views.get_article_en),

    path('getLatests', views.get_latests),
    path('getLatests_en', views.get_latests_en),
    
    path('getAllArticles', views.get_all_articles),
    path('getAllArticles_en', views.get_all_articles_en),
    
    path('getArticlesByKeyword/<str:keyword>', views.getArticlesByKeyword),
    path('getArticlesByKeyword_en/<str:keyword>', views.getArticlesByKeyword_en),

    path('getArticlesByTagId/<int:tag_id>', views.getArticlesByTagId),
    path('getArticlesByTagId_en/<int:tag_id>', views.getArticlesByTagId_en),

    path('getTagsByTimestamp/<int:timestamp>', views.getTagsByTimestamp),
    path('getTagsByTimestamp_en/<int:timestamp>', views.getTagsByTimestamp_en),

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