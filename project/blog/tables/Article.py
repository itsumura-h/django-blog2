from . import Model

class Article(Model):
    __table__ = 'articles'

    @staticmethod
    def search_articles_by_series_id(id):
        return Article.select('id', 'title', 'timestamp').where('series_id', '=', id).get().serialize()

    @staticmethod
    def search_notes():
        return Article.select('title', 'timestamp') \
            .where_null('series_id') \
            .order_by('timestamp', 'desc') \
            .limit(20) \
            .get() \
            .serialize()

    @staticmethod
    def search_article_by_timestamp(timestamp):
        return Article.where('timestamp', '=', timestamp).first().serialize()

    

    @staticmethod
    def test1():
        return Article.find(1).serialize()
