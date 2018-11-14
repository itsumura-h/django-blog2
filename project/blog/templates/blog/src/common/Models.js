import React from 'react';
import axios from 'axios';
import CONST from './Const';
import Util from './Util';

export default class Models extends React.Component{
  
  static getToppage=()=>{
    const url = '/blog/api/getToppage'
    return Util.getAPI(url);
  }
  
  static getSeries=()=>{
    const url = '/blog/api/getSeries';
    return Util.getAPI(url);
  }

  static getNotes=()=>{
    const url = '/blog/api/getNotes';
    return Util.getAPI(url);
  }

  static getArticles=(id)=>{
    const url = '/blog/api/getArticles/' + id;
    return Util.getAPI(url);
  }

  static getArticle=(timestamp)=>{
    const url = '/blog/api/getArticle/' + timestamp;
    return Util.getAPI(url);
  }
}