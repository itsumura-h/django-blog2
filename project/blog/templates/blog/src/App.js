import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

//import logo from './logo.svg';
import './App.css';
import ClassAppBar from './components/Appbar';
import ClassDrawer from './components/Drawer';
import ClassTabs from './components/Tabs';
import ClassMain from './components/Main';

//React.jsのメソッドが呼ばれる順番
//https://qiita.com/kwst/items/b1f36d0a384eab1bc284
//https://qiita.com/yukika/items/1859743921a10d7e3e6b
//https://qiita.com/koba04/items/66e9c5be8f2e31f28461


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      paddingLeft: 300,
      drawerOpen: true,
      mobile: false,
      tab: '',
      timestamp: null,
    }
  }

  checkMobile=()=>{
    window.sessionStorage.removeItem('mobile');

    if(document.body.clientWidth < 800){
      this.setState({
        paddingLeft: 0,
        drawerOpen: false,
        mobile: true,
      });
      window.sessionStorage.mobile = true;
    }
  }

  changeDrawerOpen=()=>{
    const paddingLeft = !this.state.drawerOpen && !this.state.mobile? 300: 0;
    
    this.setState({
      drawerOpen: !this.state.drawerOpen,
      paddingLeft: paddingLeft
    });
  }

  closeDrawer=()=>{
    if(window.location.pathname.match('/all/')){
      this.setState({
        drawerOpen: false,
        paddingLeft: 0
      });
    }
  }

  drawer_changeDrawerOpen=()=>{
    const paddingLeft = !this.state.drawerOpen && !this.state.mobile? 300: 0;

    if(this.state.mobile){
      this.setState({
        drawerOpen: !this.state.drawerOpen,
        paddingLeft: paddingLeft
      });
    }
  }

  clickTab=(tab)=>{
    this.setState({tab: tab});

    if(this.state.mobile){
      this.setState({
        drawerOpen: true
      });
    }else{
      this.setState({
        drawerOpen: true,
        paddingLeft: 300
      });
    }
  }

  //ドロワークリック→記事表示
  getArticle=(e)=>{
    const timestamp = e.currentTarget.getAttribute('data-article-timestamp');
    this.setState({timestamp: timestamp});
  }

  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

  componentDidMount(){
    //スマホorPC
    this.checkMobile();

    // /all以下の時はDrawerを表示しない
    this.closeDrawer();
  }

  componentDidUpdate(){
    // 「/all」以下の時はDrawerを表示しない
    if(this.state.drawerOpen){
      this.closeDrawer();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ClassDrawer
            drawerOpen={this.state.drawerOpen} //開閉状態
            mobile={this.state.mobile} //PC or スマホ
            tab={this.state.tab} //選択したタブ
            changeDrawerOpen={this.changeDrawerOpen} //開閉する関数
            drawer_changeDrawerOpen={this.drawer_changeDrawerOpen}
            getArticle={this.getArticle}
          />
          <div className="rightContents" style={{paddingLeft: this.state.paddingLeft}}>
            <ClassAppBar
              changeDrawerOpen={this.changeDrawerOpen} //開閉する関数
              clickTab={this.clickTab}
            />
            <ClassTabs
              clickTab={this.clickTab}
            />
            <ClassMain
              timestamp={this.state.timestamp}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
