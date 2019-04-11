import React, { Component } from 'react'
import { Text, View,Image,StyleSheet } from 'react-native'
import images from "assets/images"
import { fontStyles } from 'config/fontStyles';
export default class HeaderDetail extends Component {
  render() {
    return (
      <View style={styles.row}>
                                    <Image source={this.props.image?{uri:this.props.image}:images.userBlue} style={styles.image} />
                                    <View style={styles.containerName}>
                                          <Text style={styles.txtName}>{this.props.name}</Text>
                                          <View style={styles.rowChil}>
                                                <Image source={images.proLocation}
                                                      resizeMode="contain"
                                                      style={styles.Image} />
                                                <Text style={styles.txtAddress}>{this.props.address}</Text>
                                          </View>
                                    </View>
                              </View>
    )
  }
}
const styles = StyleSheet.create({

      image: {
            height: 50,
            width: 50,
            borderRadius: 25
      },
      Image: {
            height: 15,
            width: 15,
            marginRight:7
      },
      txtAddress: {
            color: '#999999',
      },
      txtName: {
            fontSize: 15,
            color: '#333333',
            fontWeight: 'bold',
      },
      rowChil: {
            flexDirection: 'row',
      },
      row: {
            flexDirection: 'row',
            marginTop: 15
      },
      containerName: {
            flex: 1,
            justifyContent: 'space-around',
            marginLeft: 10
      }
})