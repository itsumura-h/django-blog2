const ja = {
  EnglishButton: 'English Mode',
  closeButtonName: '閉じる',
  latest20: '新着20件',
  seriesList: '連載一覧',
  articlesList: '記事一覧',
  articlesOf: 'の記事一覧',
  seriesTab: '連載一覧',
  diariesTab: '雑記一覧',
  searchTab: '検索',
  allTab: '全記事一覧',
  drawerSearchLabel: '検索ワード',
  drawerSearchButton: '検索',
  diariesWithClick: '雑記(クリックで開く)',
}

const en = {
  EnglishButton: '日本語へ',
  closeButtonName: 'close',
  latest20: 'Latest 20 articles',
  seriesList: 'Series List',
  articlesList: 'Articles List',
  articlesOf: 'Articles of ',
  seriesTab: 'Series',
  diariesTab: 'Diaries',
  allTab: 'All articles',
  searchTab: 'Search',
  drawerSearchLabel: 'search word',
  drawerSearchButton: 'search',
  diariesWithClick: 'Diaries(Click here to open)',
}

let I18N = null;
if(window.localStorage.getItem('language') === 'en'){
  I18N = en;
}else{
  I18N = ja;
}

export default I18N;
