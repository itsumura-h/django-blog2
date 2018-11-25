import React from 'react';
import { withStyles } from '@material-ui/core/styles';

//import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FibernewIcon from '@material-ui/icons/FiberNew'

import Models from '../../common/Models';
import Link from 'react-router-dom/Link';

class ClassDrawerLatest extends React.PureComponent {
  state = {
    articles: null
  }
  
  getLatests=()=>{
    Models.getLatests()
    .then(response=>{
      this.setState({articles: response});
    })
    .catch(err=>{
      console.log('Models.getLatests() error');
    })
  }
  
  componentDidMount(){
    this.getLatests();
  }

  render() {
    let articles = [];
    for(let i in this.state.articles){
      articles.push(
        <Link
          key={i}
          to={"/blog/latest/"+this.state.articles[i].timestamp}
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
        <ListItem>
          <ListItemIcon>
            <FibernewIcon />
          </ListItemIcon>
          <ListItemText primary="新着20件" />
        </ListItem>
        {articles}
      </div>
    );
  }
}

const styles = {}
export default withStyles(styles)(ClassDrawerLatest);