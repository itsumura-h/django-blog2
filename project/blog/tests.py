from django.test import TestCase

# Create your tests here.
from .tables.Toppage import Toppage
class ToppageTest(TestCase):
    def count_toppage(self):
        toppage = Toppage.all()
        print(toppage)
        self.assertEqual(toppage.count(), 0)