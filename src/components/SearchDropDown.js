import React, { Component } from 'react';
import {
  Text,
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard
} from 'react-native';

export default class SearchableDropDown extends Component{
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      listItems: [],
      focus: false,
    };
  };

  renderFlatList(){
    if(this.state.focus){
      return (
          <FlatList
            style={{ ...this.props.itemsContainerStyle }}
            keyboardShouldPersistTaps="always"
            data={this.state.listItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({  item  }) => this.renderItems(item)} />
         )
     }
  }

  componentDidMount(){
    const listItems = this.props.items;
    const defaultIndex = this.props.defaultIndex;
    if (defaultIndex && listItems.length > defaultIndex) {
      this.setState({
        listItems,
        item: listItems[defaultIndex]
      });
    }
    else {
      this.setState({listItems});
    }
  }

  searchedItems= (searchedText) => {
      var ac = this.props.items.filter((item)=> {
        return item.name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
      });
      let item = {
        id: -1,
        name: searchedText
      }
      this.setState({listItems: ac, item: item });

      const onTextChange = this.props.onTextChange;
      if (onTextChange && typeof onTextChange === 'function') {
        // setTimeout(() => {
          onTextChange(searchedText);
        // }, 1000);
      }
  };

  renderItems = (item) => {
    return (
      <TouchableOpacity style={{ ...this.props.itemStyle }} onPress={() => {
        this.setState({ item: item, focus: false });
        Keyboard.dismiss();
        setTimeout(() => {
          this.props.onItemSelect(item);
        }, 0);
      }}>
        <Text style={{ ...this.props.itemTextStyle }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  

 render() {
    return (
      <View keyboardShouldpersist='always' style={{...this.props.containerStyle}}>
        
        <TextInput
            underlineColorAndroid={this.props.underlineColorAndroid}
          editable={this.props.editable}
            onFocus={() => {
              this.setState({
                focus: true,
                // item: {
                //   name: '',
                //   id: 0
                // },
                listItems: this.props.items
              });
            }}
            
            onBlur={() => {
              this.setState({ focus: false })
            }}
            ref={(e) => this.input = e}
            onChangeText={(text) => {
              this.searchedItems(text)}
            }
            value={this.props.value}
            style={{ ...this.props.textInputStyle }}
            placeholderTextColor={this.props.placeholderTextColor}
            placeholder={this.props.placeholder} />
            { this.renderFlatList() }
      </View>
    );
  };
}
