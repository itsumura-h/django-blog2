import React from 'react';
import { withStyles } from '@material-ui/core/styles';

//import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Link from 'react-router-dom/Link';

import Models from '../../common/Models';
import I18N from '../../common/I18N';

class ClassDrawerSeries extends React.PureComponent{
  state = {
    value: 0,
    seriesTitle: '',   //シリーズタイトル
    seriesId: 1,  //シリーズid
    series: null,
    articles: null,
  }
  changeTabDefault = (event, value) => {
    this.setState({ value });
  };

  //記事一覧を取得
  getSeries=()=>{
    Models.getSeries()
    .then(response=>{
      this.setState({
        series: response,
        seriesTitle: response[0].title //初期状態で0番目のタイトルをセット
      });
    })
    .catch(err=>{
      console.log('Models.getSeries error');
    })
  }

  //連載一覧の中のタイトルをクリックすると記事一覧に遷移
  clickSeries=(e)=>{
    let seriesTitle = e.currentTarget.getAttribute('data-series-title');
    let seriesId = e.currentTarget.getAttribute('data-series-id');

    this.setState({
      value: 1,
      seriesTitle: seriesTitle,
      seriesId: seriesId,
    });
  }

  componentDidMount(){
    this.getSeries();
  }
  
  render(){
    return (
      <div>
        <Tabs value={this.state.value} onChange={this.changeTabDefault} fullWidth>
          <Tab label={I18N.seriesList} />
          <Tab label={I18N.articlesList} />
        </Tabs>
        {this.state.value === 0 &&
          <ClassSeries //連載一覧
            clickSeries={this.clickSeries}
            series={this.state.series}
          />
        }
        {this.state.value === 1 &&
          <ClassArticles //記事一覧
            drawer_changeDrawerOpen={this.props.appProps.drawer_changeDrawerOpen}
            getArticle={this.props.appProps.getArticle}
            seriesTitle={this.state.seriesTitle}
            seriesId={this.state.seriesId}
          />
        }
      </div>
    );
  }
}

const styles = {}
export default withStyles(styles)(ClassDrawerSeries);

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
///_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

class ClassSeries extends React.PureComponent{

  render(){
    let listItems = [];
    
    for(let i in this.props.series){
      listItems.push(
        <ListItem button
          key={i}
          onClick={this.props.clickSeries}
          data-series-id={this.props.series[i].id}
          data-series-title={this.props.series[i].title}
        >
          <ListItemText primary={this.props.series[i].title}/>
        </ListItem>
      )
    }

    return (
      <div>
        {listItems}
      </div>
    );
  }
}

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
///_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

class ClassArticles extends React.PureComponent{
  state = {
    seriesTitle: '',
    articles: null
  }

  getArticles=()=>{
    const seriesId = this.props.seriesId;
    Models.getArticles(seriesId)
    .then(response=>{
      this.setState({articles: response});
    })
    .catch(err=>{
      console.log('Models.getArticles errror')
    })
  }

  componentDidMount(){
    this.setState({seriesTitle: this.props.seriesTitle});
    this.getArticles();
  }

  componentDidUpdate(nextProps){
    if(this.props !== nextProps){
      this.getArticles();
    }
  }

  render(){
    const seriesTitle = this.state.seriesTitle;

    const articles = [];
    for(let i in this.state.articles){
      articles.push(
        <Link
          to={'/blog/series/'+this.state.articles[i].timestamp}
          key={i}
        >
          <ListItem button
            onClick={this.props.drawer_changeDrawerOpen}
          >
            <ListItemText primary={this.state.articles[i].title}/>
          </ListItem>
        </Link>
      );
    }

    let articlesOf = seriesTitle + I18N.articlesOf;
    if(window.localStorage.getItem('language') === 'en'){
      articlesOf = I18N.articlesOf + seriesTitle;
    }

    return (
      <div>
        <ListItem>
          <ListItemText primary={articlesOf}/>
        </ListItem>
        {articles}
      </div>
    );
  }
}