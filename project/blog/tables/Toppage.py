from . import Model
import json

class Toppage(Model):
    __table__ = 'toppage'

    @staticmethod
    def get_toppage():
        return Toppage \
            .select(
                'title',
                'article_html',
                'meta_description'
            ) \
            .find(1) \
            .serialize()
    
    @staticmethod
    def get_toppage_en():
        return Toppage \
            .select(
                'title_en as title',
                'article_html_en as article_html',
                'meta_description'
            ) \
            .find(1) \
            .serialize()