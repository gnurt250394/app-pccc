import React, { Component } from 'react'
import { Text, View,Image,StyleSheet, TouchableOpacity } from 'react-native'
import { fontStyles } from 'config/fontStyles';
import images from "assets/images"
export default class Button extends Component {
  render() {
    return (
      <View style={styles.rowBtn}>
                              <TouchableOpacity style={styles.btnMsg}
                                    onPress={this.props.onPressMsg}
                              >
                                    <Image
                                          source={images.messenger}
                                          style={styles.imgBtnMsg}
                                          resizeMode="contain"
                                    />
                                    <Text style={[styles.txtMsg, fontStyles.Acumin_bold]}>NHẮN TIN</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.btnPhone}
                                    onPress={this.props.onPressPhone}
                              >
                                    <Image
                                          source={images.phoneLight}
                                          style={styles.imgBtnPhone}
                                          resizeMode="contain"
                                    />
                                    <Text style={[styles.txtPhone, fontStyles.Acumin_bold]}>GỌI ĐIỆN</Text>
                              </TouchableOpacity>
                        </View>
    )
  }
}
const styles = StyleSheet.create({
      
      txtPhone: {
            color: '#FFFFFF'
      },
      txtMsg: {
            color: '#2166A2'
      },
      imgBtnMsg: {
            height: 24,
            width: 24,
            tintColor: '#2166A2',
            marginRight: 6
      },
      imgBtnPhone: {
            height: 20,
            width: 20,
            tintColor: '#FFFFFF',
            marginRight: 6
      },
      btnPhone: {
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            flexDirection: 'row',
            backgroundColor: '#2166A2',
            borderColor: '#2166A2',
            borderWidth: 1
      },
      btnMsg: {
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            backgroundColor: '#FFFFFF',
            borderColor: '#2166A2',
            borderWidth: 1
      },
      rowBtn: {
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0
      },
     
})
