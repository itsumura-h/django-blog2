const DEV = {
  num: 1,
  char: 'aaa',
  APIMODE: {mode: 'no-cors'},
  APIHOST: 'http://localhost:8001',
}

const PROD = {
  num: 2,
  char: 'bbb',
  APIMODE: '',
  //APIHOST: 'http://dumblepy.site',
  APIHOST: 'http://localhost:8001',
}

let CONST = null;
if(process.env.NODE_ENV === 'development'){
  CONST = DEV;
}else if(process.env.NODE_ENV === 'production'){
  CONST = PROD;
}

export default CONST;