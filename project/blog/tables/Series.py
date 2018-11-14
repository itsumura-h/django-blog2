from . import Model

class Series(Model):
    __table__ = 'series'

    @staticmethod
    def get_series():
        return Series.all().serialize()