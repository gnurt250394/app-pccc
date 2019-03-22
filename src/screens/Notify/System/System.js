import React, { Component } from 'react';
import { View, FlatList,  } from 'react-native';
import {connect} from 'react-redux'
import ItemList from './ItemList';

 class System extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _renderItem=({item})=>{
      return(
          <ItemList
              item={item}
          />
      )
  }
  _keyExtractor=(item,index)=>{
      return `${item.id|| index}`
  }
  render() {
    return (
      <View>
       <FlatList
           data={data}
           renderItem={this._renderItem}
           keyExtractor={this._keyExtractor}
       />
      </View>
    );
  }
}


const data =[
    {
        id:1,
        name:'Gói thông tin đấu thầu của bạn sẽ hết hạn vào ngày mùng 5/5/2019',
        time:'hôm nay 20:10',
        status:1
    },
    {
        id:2,
        name:'Gói thông tin đấu thầu của bạn sẽ hết hạn vào ngày mùng 5/5/2019',
        time:'hôm nay 20:10',
        status:1
    },
    {
        id:3,
        name:'Gói thông tin đấu thầu của bạn sẽ hết hạn vào ngày mùng 5/5/2019',
        time:'hôm nay 20:10',
        status:0
    },
    {
        id:4,
        name:'Gói thông tin đấu thầu của bạn sẽ hết hạn vào ngày mùng 5/5/2019',
        time:'hôm nay 20:10',
        status:0
    },
    {
        id:5,
        name:'Gói thông tin đấu thầu của bạn sẽ hết hạn vào ngày mùng 5/5/2019',
        time:'hôm nay 20:10',
        status:0
    },
]

export default connect()(System)