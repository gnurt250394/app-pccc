import React, { Component } from 'react'
import { Text, View, StyleSheet,Dimensions } from 'react-native'
import images from "assets/images"
import moment from 'moment'
moment.locale('vn')
export default class Item extends Component {
      render() {
            return (
                  <View style={styles.container}>
                        <View style={styles.containerList}>
                              <View style={styles.Image}>
                                    <Image source={{ uri: this.props.item.image }}
                                          style={styles.image}
                                          resizeMode="contain"
                                    />
                              </View>
                              <TouchableOpacity onPress={this.props.onPress}
                                    style={styles.dots}
                              >
                                    <Image source={images.dots}
                                          style={styles.imgDots}
                                          resizeMode="contain"
                                    />
                              </TouchableOpacity>
                              <View style={styles.containerText}>
                                    <Text style={styles.txtName}>{this.props.item.name}</Text>
                                    <Text style={styles.txtPrice}>{this.props.item.description}</Text>
                                    <View style={styles.rowList}>
                                          <View style={styles.row}>
                                                <Image source={images.shopLocation}
                                                      style={styles.imgLocation}
                                                      resizeMode="contain"
                                                />
                                                <Text>{this.props.item.city_id}</Text>
                                          </View>
                                          {/* <View style={styles.row}>
                <Image 
                    source={images.shopPrice}
                    style={styles.imgLocation}
                    resizeMode="contain"
                />
                <Text>{this.props.item.price}</Text>
                </View> */}
                                          <Text style={{ marginLeft: 10 }}>{this.props.item.time}</Text>

                                    </View>
                              </View>

                        </View>
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
      container: {
            flex: 1
      },
      titleList: {
            color: '#333333',
            // fontFamily: fontStyles.Acumin_RPro_0,
      },
      timeList: {
            // fontFamily: fontStyles.Acumin_ItPro_0,
            fontSize: 11,
            color: '#999999',
            marginTop: 5
      },
      end: {
            height: 1,
            backgroundColor: '#DEDEDE',
            width:'100%',
            marginVertical: 5,
      },
      image: {
            height: 10,
            width: 10,
            // tintColor:'gray',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 4,
      },
})