import React from 'react';
import { withStyles } from '@material-ui/core/styles';

//import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Models from '../../common/Models';
import Link from 'react-router-dom/Link';

class ClassDrawerNotes extends React.PureComponent {
  state = {
    articles: null
  }
  
  getNotes=()=>{
    Models.getNotes()
    .then(response=>{
      this.setState({articles: response});
    })
    .catch(err=>{
      console.log('Models.getNotes() error');
    })
  }
  
  componentDidMount(){
    this.getNotes();
  }

  render() {
    let articles = [];
    for(let i in this.state.articles){
      articles.push(
        <Link
          key={i}
          to={"/blog/notes/"+this.state.articles[i].timestamp}
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
        {articles}
      </div>
    );
  }
}

const styles = {}
export default withStyles(styles)(ClassDrawerNotes);