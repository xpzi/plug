import React from 'react';

import Ad from '../public/ad';
import Banner from '../public/banner';
import Header from './header';
import Nav from './nav';
import Label from './label.js';
import Anli from './anli.js';
import List from './list.js';
import Footer from './footer.js';
import Fixedbottom from './fixedbottom.js';

require('./index.scss');
var imgUrl = 'http://bjcache.leju.com/gongzhang/';





class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state =  this.props ? this.props : {};

    this.renderBanner.bind(this);
  }


    renderBanner( focus ){
        return (
            <Banner id="focus" pagination={ true }>
                {
                    focus.map((item, index) => {
                        return (
                            <div key={index}>
                                <a href="#"> <img className="abcd" src={ item.pic_url } /> </a>
                            </div>
                        )
                    })
                }
            </Banner>
        )
    }
  
  render () {
    console.log( this.state );
  	const {  article, focus , Case , index_xq, inspiration} = this.state.initData.chief_list_star;

    // 工长案例数据
    var gzal = {
        moduoID: 'gzal',
        title: { title: '工长案例', link: '#'},
        data: Case
    }
    // 专属设计数据
    var zhuanshusheji = {
        moduoID: 'zssj',
        title: { title: '专属设计', link: '#'},
        data: index_xq
    }
     // 灵感图集
    var linggantuji = {
        moduoID: 'lgtj',
        title: { title: '灵感图集', link: '#'},
        data:inspiration
    }
     // 装修不被坑
    var bukeng = {
        title: { title: '装修不被坑', link: '#'},
        data:article
    }
    // const { assets } = this.state;
    return (
        <div className="home">
            <Ad  imgurl={ 'http://d1.leju.com/ia/2017/03/06/f58bd048209fe4img.jpg' } />
            <Header />
            { this.renderBanner( focus ) }
            <Nav />
            <Label />
            <Anli  data={ gzal } />
            <Anli  data={ zhuanshusheji } />
            <Anli  data={ linggantuji } />
            <List data={ bukeng } />
            <Footer />
            <Fixedbottom />  
        </div>
    )
  }
}

export default Home;




