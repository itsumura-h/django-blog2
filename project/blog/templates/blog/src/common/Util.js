import React from 'react';
import axios from 'axios';
import CONST from './Const';
import zIndex from '@material-ui/core/styles/zIndex';

export default class Util extends React.Component{
  static method1 = (arg1, arg2) => {
    return arg1 + arg2;
  }

  static getAPI=(url)=>{
    url = CONST.APIHOST + url;
    let data = null;
    return axios
      .get(url, CONST.APIMODE)
      .then(response=>{
        return response.data;
      })
      .catch(err=>{
        console.error(err);
      })
  }

  static postAPI=(url)=>{
    url = CONST.APIHOST + url;
    return axios
      .get(url, CONST.APIMODE)
      .then(response=>{
        return response.data;
      })
      .catch(err=>{
        console.error(err);
      })
  }
}