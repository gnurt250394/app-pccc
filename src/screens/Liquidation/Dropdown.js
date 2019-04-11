import React, { PureComponent } from 'react'
import {
      Text,
      FlatList,
      Image,
      View,
      TouchableOpacity,
      StyleSheet,Dimensions
} from 'react-native';
import { fontStyles } from 'config/fontStyles';
import images from "assets/images"
import { getOtherData } from 'config/apis/myShop';
const { width } = Dimensions.get('window')

export default class DropDown extends PureComponent {


      constructor(props) {
            super(props);
            this.state = {
                  item: {},
                  listItems: [],
                  focus: false,
            };
      };

      renderFlatList() {
            if (this.state.focus) {
                  return (
                        <FlatList
                              style={styles.listItems}
                              keyboardShouldPersistTaps="always"
                              data={this.state.listItems}
                              keyExtractor={(item, index) => `${item.id || index}`}
                              renderItem={this.renderItems} />
                  )
            }
      }

      componentDidMount() {
            const listItems = this.props.items;
            const defaultIndex = this.props.defaultIndex;
            if (defaultIndex && listItems.length > defaultIndex) {
                  this.setState({
                        listItems,
                        item: listItems[defaultIndex]
                  });
            }
            else {
                  this.setState({ listItems });
            }
      }


      handleItem = (item) => () => {
            this.setState({ item: item, focus: false });
            setTimeout(() => {
                  this.props.onItemSelect(item);
            }, 0);
      }
      renderItems = ({item}) => {
            
            return (
                  <TouchableOpacity style={styles.itemStyle} onPress={this.handleItem(item)}>
                        <Text style={styles.itemTextStyle}>{item.name}</Text>
                  </TouchableOpacity>
            );
      };

      showFlatlit = () => {
            this.setState({
                  focus: true,
                  listItems: this.props.items
            });
      }

      render() {
            return (
                  <View keyboardShouldpersist='always' style={[styles.containerStyle,{ ...this.props.containerStyle }]}>
                        <Text style={[styles.txtNameItem, fontStyles.Acumin_RPro_0]}>{this.props.name}</Text>
                        <TouchableOpacity
                              onPress={this.showFlatlit}

                              style={styles.editText} >
                              <Text numberOfLines={1} style={styles.txtBtn}>{this.state.item.name}</Text>
                              <Image source={images.icon_up} resizeMode="contain" style={styles.ticker}/>
                        </TouchableOpacity>
                        {this.renderFlatList()}
                  </View>
            );
      };
     
}

const styles = StyleSheet.create({
      editText: {
            backgroundColor: '#FFFFFF',
            borderRadius: 5,
            height: 40,
            width: '100%',
            alignItems: 'center',
            flexDirection:'row',
            justifyContent: 'space-between',
            marginTop: 3,
            paddingLeft: 12,
            borderWidth: 1,
            borderColor: '#707070',
      },
      ticker:{
            height:14,
            width:14,
            marginRight:10,
            transform:[{rotate:'180deg'}]
        },
      containerStyle:{
            padding:10
      },
      txtNameItem: {
            color: '#333333',
            fontWeight: '600',
            fontSize: 15
      },
      txtBtn: {
            color: '#333333',
      },
      listItems: {
            maxHeight: 120,

      },
      itemTextStyle: {
            color: '#222'
      },
      itemStyle: {
            padding: 10,
            marginTop: 2,
            backgroundColor: '#DCF6FF',
            borderColor: '#333333',
            borderWidth: 0.09,
            borderRadius: 5,
      },

})