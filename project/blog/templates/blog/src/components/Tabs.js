import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Link from 'react-router-dom/Link';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import I18N from '../common/I18N';

class ClassTabs extends React.Component {
  linkClick=(e)=>{
    const data_tab = e.currentTarget.getAttribute('data-tab');
    this.props.clickTab(data_tab);
  }

  render() {
    const { classes } = this.props;

    let backgroundImg = window.location.pathname.split('/')[2];
    if(!backgroundImg || backgroundImg === 'latest'){
      backgroundImg = 'plain';
    }

    return (
      <AppBar position="static" className={backgroundImg}>
        <Tabs 
          value={false}
          scrollable
          scrollButtons="auto"
          fullWidth
        >
          <Link to="/blog/series/" onClick={this.linkClick} data-tab="series">
            <Tab label={I18N.seriesTab} className={classes.series + ' Tab'}/>
          </Link>
          <Link to="/blog/diary/" onClick={this.linkClick} data-tab="diary">
            <Tab label={I18N.diariesTab} className={classes.diary + ' Tab'}/>
          </Link>
          <Link to="/blog/search/" onClick={this.linkClick} data-tab="search">
            <Tab label={I18N.searchTab} className={classes.search + ' Tab'}/>
          </Link>
          <Link to="/blog/all/" onClick={this.linkClick} data-tab="all">
            <Tab label={I18N.allTab} className={classes.all + ' Tab'}/>
          </Link>
        </Tabs>
      </AppBar>
    );
  }
}

ClassTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = {
  series: {
    backgroundColor: '#f33',
  },
  diary: {
    backgroundColor: 'orange',
  },
  all: {
    backgroundColor: '#33f',
  },
  search: {
    backgroundColor: 'green',
  },
  management: {
    backgroundColor: 'purple',
  },
  noteeee: {
    backgroundColor: '#333',
  }
};

export default withStyles(styles)(ClassTabs);
