import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Link from 'react-router-dom/Link';

import Models from '../../common/Models';
import I18N from '../../common/I18N';

class MainAll extends React.Component {
  state = {
    articles: null
  }

  getAllArticles=()=>{
    Models.getAllArticles()
    .then(response=>{
      this.setState({articles: response});
    })
    .catch(err=>{
      console.log('Models.getAllArticles error');
    })
  }
  
  componentDidMount(){
    this.getAllArticles();
  }

  componentDidUpdate(nextProps){
    if(this.props !== nextProps){
      this.getAllArticles();
    }
  }

  render(){
    let articles = this.state.articles;

    let series = [];
    for(let row_i in articles){
      let series_row = articles[row_i];

      let article = [];
      for(let article_i in series_row.articles){
        let article_row = series_row.articles[article_i];

        article.push(
          <p
            key={article_i}
          >
            <Link
              key={article_i}
              to={"/blog/all/" + article_row.timestamp}
            >
              <span>{article_row.article_title}</span>
            </Link>
          </p>
        );
      }

      if(series_row.series_id){
        // シリーズ以下の時
        series.push(
          <div>
            <h2>{series_row.series_title}</h2>
            {article}
          </div>
        );
      }else{
        //雑記の時
        series.push(
          <details>
            <summary><h2>{I18N.diariesWithClick}</h2></summary>
              {article}
          </details>
        );
      }
      
    }
    
    return(
      <Card
        className={this.props.appProps.classes.main}
        raised={true}
      >
        {series}
      </Card>
    );
  }
}

const styles = {
}

export default withStyles(styles)(MainAll);
