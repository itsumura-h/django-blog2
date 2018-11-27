import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';

import Models from '../../common/Models';

class MainNormal extends React.Component {
  state = {
    article: null
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

    if(document.getElementsByTagName('pre').length>0){
      window.hljs.initHighlighting();
    }
  }

  componentDidUpdate(nextProps){
    if(this.props !== nextProps){
      this.getMainContent();
    }

    if(document.getElementsByTagName('pre').length>0){
      window.hljs.initHighlighting.called = false;
      window.hljs.initHighlighting();
    }
  }

  render(){
      const article_html = this.state.article? this.state.article.article_html: '';

      return(
        <Card
          className={this.props.appProps.classes.main}
          raised={true}
          dangerouslySetInnerHTML={
            {__html: article_html} }
        >
        </Card>
      );
    }
}

const styles = {}

export default withStyles(styles)(MainNormal);