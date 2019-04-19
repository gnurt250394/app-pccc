import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity, Platform } from 'react-native'
import images from "assets/images"
import moment from 'moment'
import { fontStyles } from 'config/fontStyles';
moment.locale('vn')
class MenuItem extends React.PureComponent{
      render(){
          return(
              <TouchableOpacity 
              onPress={this.props.onPress}
              style={styles.btnMenu}>
                  <Image source={this.props.source}
                  style={[styles.imgMenu,{...this.props.style}]}
                  resizeMode="contain"
                  />
                  <Text style={styles.txtMenu}>{this.props.name}</Text>
              </TouchableOpacity>
          )
      }
  }
export default class Item extends React.PureComponent {
      handleCategory=(item)=>{
            let arr =[]
            item.category.forEach(e=>{
                  
                  arr.push(e.name)})
            return arr.join(',')
      }
     
      render() {
            const {item,index}= this.props
            return (
                  <View style={styles.container}
                  onStartShouldSetResponderCapture={this.props.onStartShouldSetResponderCapture}
                  >
                  {item.isShow?<View style={styles.containerMenu}>
                  <MenuItem name={"Sửa"} onPress={this.props.edit} style={styles.imgEdit} source={images.edit}/>
                  <MenuItem name={"Xoá"} onPress={this.props.delete} source={images.trash}/>
              </View>:null}
                  <TouchableOpacity onPress={this.props.onShowMenu}
                        style={styles.dots}
                  >
                        <Image source={images.dots}
                              style={styles.imgDots}
                              resizeMode="contain"
                        />

                  </TouchableOpacity>

                        <TouchableOpacity
                              onPress={this.props.onPress}
                              style={styles.containerList}>
                              <Text numberOfLines={1} style={[styles.txtName, fontStyles.Acumin_bold]}>{item.title ? item.title : null}</Text>
                              <Text numberOfLines={2} style={[styles.txtDescription, fontStyles.Acumin_RPro_0]}>{item.description}</Text>
                              <View style={styles.rowList}>
                                    <View style={[styles.row, styles.category]}>
                                          <Image source={images.menu}
                                                style={[styles.imgLocation, { marginTop: Platform.OS == "ios" ? 2 : 1 }]}
                                                resizeMode="contain"
                                          />
                                          <View style={styles.wrap}>
                                                <Text numberOfLines={1} style={styles.txtDescription}>{item && item.category ? this.handleCategory(item) : null}</Text>
                                          </View>
                                    </View>
                                    <Text style={styles.txtTime}>{item.time ? item.time : null}</Text>

                              </View>
                              <View style={styles.row}>
                                    <Image source={images.shopLocation}
                                          style={[styles.imgLocation, { marginTop: Platform.OS == "ios" ? 0 : 1 }]}
                                          resizeMode="contain"
                                    />
                                    <Text style={styles.txtDescription}>{item.city && item.city.name ? item.city.name : null}</Text>
                              </View>
                        </TouchableOpacity>
                        
                        <View
                              style={styles.end}
                        />
                  </View>
            )
      }
}

const styles = StyleSheet.create({
      containerList: {
            paddingHorizontal: 15,
            flex:1,
      },
      btnMenu:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-around',
            marginBottom:6,
            zIndex:3
        },
        txtMenu:{
            color:'#333333'
        },
        imgMenu:{
            height:14,
            width:14,
            marginRight:5,
            tintColor:'#333333'
        },
      wrap: {
            flexWrap: 'wrap',
            flexShrink: 5,
            width: '90%',
      },
      imgEdit:{
            height:12,
            width:12,
            marginLeft:4
        },
      containerMenu:{
            position:'absolute',
            right:10,
            elevation:2,
            padding:4,
            borderRadius:5,
            backgroundColor:'#FFFFFF',
            zIndex:5,
            top: 10,
            flex:1,
        },
      dots:{
            height:30,
            width:50,
            position:'absolute',
            right:5,
            top: 8,
            zIndex:1

        },
        imgDots:{
            height:15,
            width:15,
            alignSelf: 'flex-end',
        },
      category: {
            marginBottom: 10,
            alignItems: 'flex-start',
            width: '82%',

      },
      txtName: {
            color: '#333333',
            fontSize: 15,
            marginBottom: 10,
            marginTop: 7,
            width:'96%'
      },
      txtDescription: {
            fontSize: 13,
            color: '#333333',
      },
      container: {
            flex: 1,
            backgroundColor: '#FFFFFF'
      },
      imgLocation: {
            height: 14,
            width: 14,
            tintColor: '#2166A2',
            marginRight: 5
      },
      row: {
            flexDirection: 'row',
      },
      rowList: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',

            marginTop: 12
      },
      end: {
            height: 1,
            backgroundColor: '#CCCCCC',
            width: '100%',
            marginTop: 15
      },
      txtTime: {
            fontSize: 11,
            color: '#999999'
      }

})