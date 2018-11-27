const ja = {
  EnglishButton: 'English Mode',
  closeButtonName: '閉じる',
  latest20: '新着20件',
  seriesList: '連載一覧',
  articlesList: '記事一覧',
  articlesOf: 'の記事一覧',
  series: '連載一覧',
  notes: '雑記一覧',
  allArticles: '全記事一覧',
  notesWithClick: '雑記(クリックで開く)',
}

const en = {
  EnglishButton: '日本語へ',
  closeButtonName: 'close',
  latest20: 'Latest 20 articles',
  seriesList: 'Series List',
  articlesList: 'Articles List',
  articlesOf: 'Articles of ',
  series: 'Series',
  notes: 'Notes',
  allArticles: 'All articles',
  notesWithClick: 'Notes(Click here to open)',
}

let I18N = null;
if(window.localStorage.getItem('language') === 'en'){
  I18N = en;
}else{
  I18N = ja;
}

export default I18N;
