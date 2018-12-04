import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'react-router-dom/Link';

import Models from '../../common/Models';
import I18N from '../../common/I18N';

class ClassDrawerSearch extends React.PureComponent {
  state = {
    state: '',
    searchWord: '',
    searchedWord: '',
    articles: null
  }

  searchWord=(e)=>{
    this.setState({searchWord: e.target.value});
  }

  getArticlesByKeyword=(searchWord)=>{
    searchWord = this.state.searchWord? this.state.searchWord: searchWord;
    if(searchWord.length > 0){
      Models.getArticlesByKeyword(searchWord)
      .then(response=>{
        this.setState({
          searchedWord: searchWord,
          articles: response
        });
      })
      .catch(err=>{
        console.log('Models.getArticlesByKeyword() error');
      })
    }
  }

  getArticlesByTagId=(tagId)=>{
    Models.getArticlesByTagId(tagId)
    .then(response=>{
      this.setState({
        articles: response
      });
    })
    .catch(err=>{
      console.log('Models.getArticlesByTagId() error');
    })
  }

  componentDidMount(){
    const isWord = window.location.search.slice(1).match(/word/)? true: false;
    const isTag = window.location.search.slice(1).match(/tag/)? true: false;
    if(isWord){
      let searchWord = window.location.search.slice(1).match(/word/).input.split('=')[1];
      searchWord = decodeURIComponent(searchWord);
      this.setState({searchedWord: searchWord});
      this.getArticlesByKeyword(searchWord);
    }else if(isTag){
      const tagId = window.location.search.slice(1).match(/tag/).input.split('=')[1];
      this.getArticlesByTagId(tagId);
    }
  }

  componentDidUpdate(nextPrps){
    const isWord = window.location.search.slice(1).match(/word/)? true: false;
    const isTag = window.location.search.slice(1).match(/tag/)? true: false;
    if(this.props !== nextPrps){
      if(isWord){
        let searchWord = window.location.search.slice(1).match(/word/).input.split('=')[1];
        searchWord = decodeURIComponent(searchWord);
        this.setState({searchedWord: searchWord});
        this.getArticlesByKeyword(searchWord);
      }else if(isTag){
        const tagId = window.location.search.slice(1).match(/tag/).input.split('=')[1];
        this.getArticlesByTagId(tagId);
      }
    }
  }

  render() {
    const { classes } = this.props;
    const queryParams = window.location.search;

    let articles = [];
    for(let i in this.state.articles){
      articles.push(
        <Link
          key={i}
          to={"/blog/search/" + this.state.articles[i].timestamp + queryParams}
        >
          <ListItem button
            onClick={this.props.appProps.drawer_changeDrawerOpen}
          >
            <ListItemText primary={this.state.articles[i].title} />
          </ListItem>
        </Link>
      )
    }

    let explain = [];
    const isWord = window.location.search.slice(1).match(/word/)? true: false;
    const isTag = window.location.search.slice(1).match(/tag/)? true: false;
    let resultOf;

    if(isWord){
      resultOf = '"' + this.state.searchedWord + I18N.drawerSearchResultOf;
      if(window.localStorage.getItem('language') === 'en'){
        resultOf = I18N.drawerSearchResultOf + '"' + this.state.searchedWord + '"';
      }

      explain.push(
        <ListItemText primary={resultOf} />
      );
    }else if(isTag){
      const tagName = this.state.articles? this.state.articles[0].tag: '';
      resultOf = 'タグ"'+ tagName + I18N.drawerSearchResultOf;
      if(window.localStorage.getItem('language') === 'en'){
        resultOf = I18N.drawerSearchResultOf + I18N.drawerSearchResultTag + tagName;
      }

      explain.push(
        <ListItemText primary={resultOf} />
      );
    }

    const linkToSearch = "?word=" + this.state.searchWord;

    return (
      <div>
        <TextField
          id="searchWord"
          label={I18N.drawerSearchLabel}
          className={classes.textField}
          onChange={this.searchWord}
        />
        <Link
          to={{
            pathname: "/blog/search/",
            search: linkToSearch
          }}
        >
          <Button
            variant="contained"
          >
            {I18N.drawerSearchButton}
          </Button>
        </Link>
        
        <ListItem>
          {explain}
        </ListItem>
        {articles}
      </div>
    );
  }
}

const styles = {}
export default withStyles(styles)(ClassDrawerSearch);
