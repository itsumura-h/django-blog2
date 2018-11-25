import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { /*BrowserRouter, Route, */Link,/* Switch*/ } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class ClassAppBar extends React.Component {
  titleClick=()=>{
    this.props.clickTab('plain');
  }

  render(){
    let backgroundImg = window.location.pathname.split('/')[2];
    if(!backgroundImg || backgroundImg === 'latest'){
      backgroundImg = 'plain';
    }

    const mobile = window.sessionStorage.getItem('mobile');
    const marquee = mobile? 'marquee': '';

    return(
      <AppBar position="static" className={backgroundImg}>
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={this.props.changeDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/blog/" onClick={this.titleClick} className={marquee}>
            <Typography variant="title" color="inherit" className="Title">
             DumblePy
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

ClassAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
};

export default withStyles(styles)(ClassAppBar);