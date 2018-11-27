class Service:
    @staticmethod
    def all_articles_to_hierarchy(articles):
        i = 0
        length = len(articles)
        for article in articles:
            
            if i == 0:
                list_articles = [{
                    'article_id': article['article_id'],
                    'article_title': article['article_title'],
                    'timestamp': article['timestamp']
                }]

                series_id = article['series_id']
                series_title = article['series_title'] if article['series_title'] else '雑記'
                list_series = [{
                    'series_id': series_id,
                    'series_title': series_title
                }]
            elif list_series[-1]['series_id'] != article['series_id']:
                list_series[-1]['articles'] = list_articles

                list_articles = [{
                    'article_id': article['article_id'],
                    'article_title': article['article_title'],
                    'timestamp': article['timestamp']
                }]

                series_id = article['series_id']
                series_title = article['series_title'] if article['series_title'] else '雑記'
                list_series += [{
                    'series_id': series_id,
                    'series_title': series_title
                }]
            else:
                list_articles += [{
                    'article_id': article['article_id'],
                    'article_title': article['article_title'],
                    'timestamp': article['timestamp']
                }]
            
            i += 1

            if i == length:
                list_series[-1]['articles'] = list_articles
        
        return list_series