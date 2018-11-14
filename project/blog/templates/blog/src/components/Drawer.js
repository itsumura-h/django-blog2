import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';

import  Close from '@material-ui/icons/Close';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import ClassDrawerSeries from './Drawer/DrawerSeries';
import ClassDrawerNotes from './Drawer/DrawerNote';
import Models from '../common/Models';

const styles = {
  DrawerStyle: {
    width: 300,
    backgroundColor: "rgba(255,255,255, 0.85)",
    minHeight: '100%'
  }
};

class ClassDrawer extends React.Component {
  state = {
    value: 0,
    series: null,
    seriesArg: null
  };

  render() {
    const docked = this.props.mobile ? "temporary" : "persistent";

    let backgroundImg = window.sessionStorage.getItem('backgroundImg');
    backgroundImg = backgroundImg ? backgroundImg : 'plain';

    return (
      <Drawer
      open={this.props.drawerOpen}
      variant={docked}
      classes={{paper: backgroundImg}}
      className="Drawer"
    >
      <List
        className={this.props.classes.DrawerStyle}
      >
        <ListItem
          button
          onClick={this.props.changeDrawerOpen}
        >
          <ListItemIcon>
            <Close />
          </ListItemIcon>
          <ListItemText inset primary="閉じる" />
        </ListItem>
          <Switch>
            <Route path="/blog/series"
              render={props=>(
                <ClassDrawerSeries
                  routeProps={props}
                  appProps={this.props}
                />
              )}
            />
            <Route path="/blog/notes"
              render={props=>(
                <ClassDrawerNotes
                  routeProps={props}
                  appProps={this.props}
                />
              )}
            />
          </Switch>
        </List>  
      </Drawer>
    );
  }
}

ClassDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClassDrawer);

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
///_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_

class DrawerNote extends React.Component{
  render(){
    return(
      <div/>
    );
  }
}

class DrawerAll extends React.Component{
  render(){
    return(
      <div/>
    );
  }
}