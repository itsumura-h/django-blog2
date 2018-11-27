from . import Model
import json

class Series(Model):
    __table__ = 'series'

    @staticmethod
    def get_series():
        return Series.select('id', 'title').get().serialize()

    @staticmethod
    def get_series_en():
        return Series.select('id', 'title_en as title').get().serialize()