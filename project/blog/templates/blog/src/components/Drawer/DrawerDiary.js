import React from 'react';
import { withStyles } from '@material-ui/core/styles';

//import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'react-router-dom/Link';

import Models from '../../common/Models';

class ClassDrawerDiary extends React.PureComponent {
  state = {
    articles: null,
    error: false,
  }
  
  getDiaries=()=>{
    Models.getDiaries()
    .then(response=>{
      this.setState({articles: response});
    })
    .catch(err=>{
      console.log('Models.getDiaries() error');
    })
  }
  
  componentDidMount(){
    this.getDiaries();
  }

  render() {
    let articles = [];
    for(let i in this.state.articles){
      articles.push(
        <Link
          key={i}
          to={"/blog/diary/"+this.state.articles[i].timestamp}
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
export default withStyles(styles)(ClassDrawerDiary);