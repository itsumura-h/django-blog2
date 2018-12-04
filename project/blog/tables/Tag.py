import json
from . import Model

class Tag(Model):
    __table__ = 'tags'

    @staticmethod
    def search_tags_by_timestamp(timestamp):
        return Tag \
            .select('tags.id', 'tag') \
            .left_join('tagmaps', 'tags.id', '=', 'tagmaps.tag_id') \
            .left_join('articles', 'tagmaps.article_id', '=', 'articles.id') \
            .where('articles.timestamp', '=', timestamp) \
            .get() \
            .serialize()

    @staticmethod
    def search_tags_by_timestamp_en(timestamp):
        return Tag \
            .select('tags.id', 'tag_en as tag') \
            .left_join('tagmaps', 'tags.id', '=', 'tagmaps.tag_id') \
            .left_join('articles', 'tagmaps.article_id', '=', 'articles.id') \
            .where('articles.timestamp', '=', timestamp) \
            .get() \
            .serialize()
    #-----------------------------------------------------------
