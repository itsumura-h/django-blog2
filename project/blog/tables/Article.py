import json
from . import Model

class Article(Model):
    __table__ = 'articles'

    @staticmethod
    def search_articles_by_series_id(id):
        return Article.select('id', 'title', 'timestamp').where('series_id', '=', id).get().serialize()

    @staticmethod
    def search_articles_by_series_id_en(id):
        return Article \
            .select(
                'id',
                'title_en as title',
                'timestamp'
            ) \
            .where('series_id', '=', id) \
            .get() \
            .serialize()
    #-----------------------------------------------------------
    @staticmethod
    def search_notes():
        return Article.select('title', 'timestamp') \
            .where_null('series_id') \
            .order_by('timestamp', 'desc') \
            .limit(20) \
            .get() \
            .serialize()

    @staticmethod
    def search_notes_en():
        return Article.select('title_en as title', 'timestamp') \
            .where_null('series_id') \
            .order_by('timestamp', 'desc') \
            .limit(20) \
            .get() \
            .serialize()
    #-----------------------------------------------------------
    @staticmethod
    def search_article_by_timestamp(timestamp):
        return Article \
            .select(
                'title',
                'article_html',
                'meta_description',
                'posted_on',
                'updated_on'
            ) \
            .where('timestamp', '=', timestamp) \
            .first() \
            .serialize()

    @staticmethod
    def search_article_by_timestamp_en(timestamp):
        return Article \
            .select(
                'title_en as title',
                'article_html_en as article_html',
                'meta_description',
                'posted_on',
                'updated_on'
            ) \
            .where('timestamp', '=', timestamp) \
            .first() \
            .serialize()
    #-----------------------------------------------------------
    @staticmethod
    def search_latest_articles():
        return Article \
            .select('title','timestamp') \
            .take(20) \
            .order_by('timestamp','desc') \
            .get() \
            .serialize()

    @staticmethod
    def search_latest_articles_en():
        return Article \
            .select('title_en as title','timestamp') \
            .take(20) \
            .order_by('timestamp','desc') \
            .get() \
            .serialize()
    #-----------------------------------------------------------

    @staticmethod
    def search_all_articles():
        """
        EXPLAIN
        SELECT series.id as series_id,
        series.title as series_title,
        articles.id as article_id,
        articles.title as article_title,
        *
        FROM articles
        LEFT OUTER JOIN series ON articles.series_id = series.id
        ORDER BY series.id, articles.id;
        """
        return Article \
            .select(
                'series.id as series_id',
                'series.title as series_title',
                'articles.id as article_id', 
                'articles.title as article_title',
                'articles.timestamp'
            ) \
            .left_join('series', 'articles.series_id', '=', 'series.id') \
            .order_by('series.id', 'asc', ) \
            .order_by('articles.id', 'asc') \
            .get() \
            .serialize()
        #print(json.dumps(a, indent=2, ensure_ascii=False))
    
    @staticmethod
    def search_all_articles_en():
        return Article \
            .select(
                'series.id as series_id',
                'series.title_en as series_title',
                'articles.id as article_id', 
                'articles.title_en as article_title',
                'articles.timestamp'
            ) \
            .left_join('series', 'articles.series_id', '=', 'series.id') \
            .order_by('series.id', 'asc', ) \
            .order_by('articles.id', 'asc') \
            .get() \
            .serialize()

    #_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    @staticmethod
    def test1():
        return Article.find(1).serialize()
