import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import Link from 'react-router-dom/Link';

import Models from '../../common/Models';

class MainNormal extends React.PureComponent {
  state = {
    article: null,
    article_html: null,
    title: null,
    posted_on: null,
    updated_on: null,
    tags: [],
  }

  getToppage=()=>{
    Models.getToppage()
    .then(response=>{
      this.setState({article: response});
    })
    .catch(err=>{
      console.log('Models.getToppage error');
    })
  }

  getArticle=(timestamp)=>{
    Models.getArticle(timestamp)
    .then(response=>{
      this.setState({article: response});
    })
    .catch(err=>{
      console.log('Models.getArticle error');
    })
  }

  // /blogならトップページ、/blog/:tab/:timestampなら記事取得
  getMainContent=()=>{
    const timestamp = window.location.pathname.split('/')[3];

    if(timestamp){
      this.getArticle(timestamp);
    }
    else if(window.location.pathname === `/blog/` || !this.state.article){
      this.getToppage();
    }
  }

  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

  componentDidMount(){
    this.getMainContent();

    if(document.getElementsByTagName('pre').length > 0){
      window.hljs.initHighlighting();
    }
  }

  componentDidUpdate(nextProps){
    if(this.props !== nextProps){
      this.getMainContent();
    }

    if(document.getElementsByTagName('pre').length > 0){
      window.hljs.initHighlighting.called = false;
      window.hljs.initHighlighting();
    }
  }

  render(){
    const article_html = this.state.article? this.state.article.article_html: '';
    const title = this.state.article? this.state.article.title: '';
    let posted_on = this.state.article? this.state.article.posted_on: '';
    let posted_on_new = new Date(posted_on).toDateString();
    let updated_on = this.state.article? this.state.article.updated_on: '';
    updated_on = new Date(updated_on).toDateString();
    let tags = this.state.article? this.state.article.tags: [];
    const timestamp = window.location.pathname.split('/')[3];

    let header = (
      <CardHeader
        title={title}
        subheader={'posted on:' + posted_on_new + ' , updated on:' + updated_on}
      />
    );

    let tag_chips = [];
    for(let tags_i in tags){
      let tag = tags[tags_i];
      tag_chips.push(
        <Link
          key={tags_i}
          to={"/blog/search/"+timestamp+"?tag="+tag.id}
        >
          <Chip
            label={tag.tag}
            clickable
          />
        </Link>
      );
    }

    let card;
    if(posted_on){
      card = (
        <Card
          className={this.props.appProps.classes.main}
          raised={true}
        >
          {header}
          <div>{tag_chips}</div>
          <div
            dangerouslySetInnerHTML={
              {__html: article_html} }
          />
        </Card>
      );
    }else{
      card = (
        <Card
          className={this.props.appProps.classes.main}
          raised={true}
          dangerouslySetInnerHTML={
            {__html: article_html} }
        />
      );
    }
    
    return card;
  }
}

const styles = {}

export default withStyles(styles)(MainNormal);

/*
timestampが存在
  => 記事取得
URIがトップページもしくはthis.state.articleが存在しない
  => トップページ取得
this.state.articleにposted_onが存在する
  => 記事を表示
this.state.articleにposted_onが存在しない
  => トップページを表示
*/