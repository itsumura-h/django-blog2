import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { /*BrowserRouter, Route, */Link,/* Switch*/ } from 'react-router-dom';

import I18N from '../common/I18N';

class ClassAppBar extends React.Component {
  titleClick=()=>{
    this.props.clickTab('plain');
  }

  changeLanguage=()=>{
    let language = window.localStorage.getItem('language');
    window.localStorage.removeItem('language');
    
    if(language === 'ja' || !language){
      window.localStorage.language = 'en';
    }else{
      window.localStorage.language = 'ja';
    }

    window.location.href = window.location.href;
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
          <Link to="/blog/" 
            onClick={this.titleClick}
            className={marquee}
            style={{flexGrow: 1}} //後ろの要素を右端に寄せる
          >
            <Typography
              variant="title"
              color="inherit"
              className="Title"
            >
             DumblePy
            </Typography>
          </Link>
          <Button 
            variant="extendedFab"
            onClick={this.changeLanguage}
          >
            {I18N.EnglishButton}
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

ClassAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  grow: {
    flexGrow: 1,
  },
};

export default withStyles(styles)(ClassAppBar);
