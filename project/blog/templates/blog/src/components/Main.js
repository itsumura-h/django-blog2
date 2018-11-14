import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
//import from 'react-meta-tags';

import Util from '../common/Util';
import Models from '../common/Models';

class ClassMain extends React.Component {
  state = {
    article: null
  }

  getToppage=()=>{
    Models.getToppage()
      .then(response=>{
        this.setState({article: response.toppage});
      })
      .catch(err=>{
        console.log('Models.getToppage error');
      })
  }

  getArticle=(timestamp)=>{
    Models.getArticle(timestamp)
      .then(response=>{
        this.setState({article: response.article});
      })
      .catch(err=>{
        console.log('Models.getArticle error');
      })
  }

  // /blogならトップページ、/blog/:tab/:timestampなら記事取得
  getMainContent=()=>{
    const timestamp = window.location.pathname.split('/')[3];

    if(window.location.pathname === '/blog/'){
      this.getToppage();
    }else if(timestamp){
      this.getArticle(timestamp);
    }
  }

  componentDidMount(){
    this.getMainContent();

    if(document.getElementsByTagName('pre').length>0){
      window.hljs.initHighlighting();
    }
  }

  componentWillReceiveProps(nextProps){
    this.getMainContent();
  }

  componentDidUpdate(){
    if(document.getElementsByTagName('pre').length>0){
      window.hljs.initHighlighting.called = false;
      window.hljs.initHighlighting();
    }
  }

  

  render(){
    let backgroundImg = window.sessionStorage.getItem('backgroundImg');
    backgroundImg = backgroundImg? backgroundImg: 'plain';

    const article_html = this.state.article? this.state.article.article_html: '';

    return(
      <Card className={backgroundImg}>
        <Card
          className={this.props.classes.main}
          raised={true}
          dangerouslySetInnerHTML={
            {__html: article_html} }
        >
        </Card>
      </Card>
    );
  }
}

ClassMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  main: {
    width: "90%",
    minHeight: "85vh",
    backgroundColor: "rgba(255,255,255, 0.85)",
    margin: "auto",
    textShadow: "none",
    padding: "16px"
  }
};

export default withStyles(styles)(ClassMain);