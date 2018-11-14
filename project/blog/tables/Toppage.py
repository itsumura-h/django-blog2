from . import Model

class Toppage(Model):
    __table__ = 'toppage'

    @staticmethod
    def get_toppage():
        return Toppage.find(1).serialize()