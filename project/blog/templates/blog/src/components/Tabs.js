import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Link from 'react-router-dom/Link';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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
      <div>
        <AppBar position="static" className={backgroundImg}>
          <Tabs 
            value={false}
            scrollable
            scrollButtons="auto"
            fullWidth
          >
            <Link to="/blog/series/" onClick={this.linkClick} data-tab="series">
              <Tab label="連載記事" className={classes.series + ' Tab'}/>
            </Link>
            <Link to="/blog/notes/" onClick={this.linkClick} data-tab="notes">
              <Tab label="雑記" className={classes.note + ' Tab'}/>
            </Link>
            <Link to="/blog/all/" onClick={this.linkClick} data-tab="all">
              <Tab label="全記事一覧" className={classes.all + ' Tab'}/>
            </Link>
          </Tabs>
        </AppBar>
      </div>
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
  note: {
    backgroundColor: 'orange',
  },
  all: {
    backgroundColor: 'green',
  },
  native: {
    backgroundColor: '#33f',
  },
  management: {
    backgroundColor: 'purple',
  },
  noteeee: {
    backgroundColor: '#333',
  }
};

export default withStyles(styles)(ClassTabs);