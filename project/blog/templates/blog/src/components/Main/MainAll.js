import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';

class MainAll extends React.Component {
  state = {
    article: null
  }

  render(){
    const article_html = 'All';
    
    return(
      <Card
        className={this.props.appProps.classes.main}
        raised={true}
        dangerouslySetInnerHTML={
          {__html: article_html} }
      >
      </Card>
    );
  }
}

const styles = {}

export default withStyles(styles)(MainAll);