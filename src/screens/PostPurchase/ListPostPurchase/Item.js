import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity ,Platform} from 'react-native'
import images from "assets/images"
import moment from 'moment'
import { fontStyles } from 'config/fontStyles';
moment.locale('vn')
export default class Item extends Component {
      render() {
            return (
                  <View style={styles.container}>


                        <TouchableOpacity
                              onPress={this.props.onPress}
                              style={styles.containerList}>
                              <Text style={[styles.txtName, fontStyles.Acumin_bold]}>{this.props.item.title ? this.props.item.title : null}</Text>
                              <Text numberOfLines={2} style={[styles.txtDescription, fontStyles.Acumin_RPro_0]}>{this.props.item.description}</Text>
                              <View style={styles.rowList}>
                                    <View style={[styles.row,styles.category]}>
                                          <Image source={images.menu}
                                                style={[styles.imgLocation,{marginTop:Platform.OS == "ios"?0:3}]}
                                                resizeMode="contain"
                                          />
                                          <Text>{this.props.item.category ? this.props.item.category : null}</Text>
                                    </View>
                                    <Text style={styles.txtTime}>{this.props.item.time ? this.props.item.time : null}</Text>

                              </View>
                              <View style={styles.row}>
                                          <Image source={images.shopLocation}
                                                style={[styles.imgLocation,{marginTop:Platform.OS == "ios"?0:3}]}
                                                resizeMode="contain"
                                          />
                                          <Text>{this.props.item.city ? this.props.item.city : null}</Text>
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
            flex: 1,
            paddingHorizontal: 15
      },
      category:{
            marginBottom:10,
            alignItems:'center'
      },
      txtName: {
            color: '#333333',
            fontSize: 15,
            marginBottom: 10,
            marginTop: 7
      },
      txtDescription: {
            fontSize: 13,
            color:'#333333'
      },
      container: {
            flex: 1,
            backgroundColor: '#FFFFFF'
      },
      imgLocation: {
            height: 14,
            width: 14,
            tintColor:'#2166A2',
            marginRight: 5
      },
      row: {
            flexDirection: 'row',
      },
      rowList: {
            flexDirection: 'row',
            justifyContent: 'space-between',
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