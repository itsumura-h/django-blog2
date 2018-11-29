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
    searchWord: '',
    articles: null
  }

  searchWord=(e)=>{
    this.setState({searchWord: e.target.value});
  }

  getArticlesByKeyword=()=>{
    if(this.state.searchWord){
      Models.getArticlesByKeyword(this.state.searchWord)
      .then(response=>{
        this.setState({articles: response});
      })
      .catch(err=>{
        console.log('Models.getDiaries() error');
      })
    }
  }

  render() {
    const { classes } = this.props;

    let articles = [];
    for(let i in this.state.articles){
      articles.push(
        <Link
          key={i}
          to={"/blog/search/"+this.state.articles[i].timestamp}
        >
          <ListItem button
            onClick={this.props.appProps.drawer_changeDrawerOpen}
          >
            <ListItemText primary={this.state.articles[i].title} />
          </ListItem>
        </Link>
      )
    }

    return (
      <div>
        <TextField
          id="searchWord"
          label={I18N.drawerSearchLabel}
          className={classes.textField}
          onChange={this.searchWord}
        />
        <Button
          variant="contained"
          onClick={this.getArticlesByKeyword}
        >
          {I18N.drawerSearchButton}
        </Button>
        {articles}
      </div>
    );
  }
}

const styles = {}
export default withStyles(styles)(ClassDrawerSearch);