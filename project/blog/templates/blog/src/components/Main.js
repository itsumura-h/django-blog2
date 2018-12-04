import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import {Switch, Route} from 'react-router-dom';
//import from 'react-meta-tags';

import MainAll from './Main/MainAll';
import MainNormal from './Main/MainNormal';

class ClassMain extends React.Component {

  render(){
    let backgroundImg = window.location.pathname.split('/')[2];
    if(!backgroundImg || backgroundImg === 'latest'){
      backgroundImg = 'plain';
    }

   return(
    <Card className={backgroundImg}>
      <Switch>
        <Route exact path="/blog/all/"
          render={props=>(
            <MainAll
              routeProps={props}
              appProps={this.props}
            />
          )}
        />
        <Route
          render={props=>(
            <MainNormal
              routeProps={props}
              appProps={this.props}
            />
          )}
        />
      </Switch>
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
