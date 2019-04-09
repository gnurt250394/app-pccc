import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity,ScrollView } from 'react-native'
import { Header } from 'components';
import images from "assets/images"
import { fontStyles } from 'config/fontStyles';
import Button from './Button';
import navigation from 'navigation/NavigationService';

export default class DetailLiquidation extends Component {
      _nextPage=()=>{
            alert('111')
      }
      _goBack=()=>{
            navigation.pop()
      }
      render() {
            return (
                  <View style={styles.container}>
                        <Header
                              check={1}
                              onPress={this._goBack}
                              title={'Chi tiết thanh lý'}
                        />
                        <ScrollView>
                        <View style={styles.Group}>
                              <View style={styles.row}>
                                    <Image source={images.user} style={styles.image} />
                                    <View style={styles.containerName}>
                                          <Text style={styles.txtName}>abc</Text>
                                          <View style={styles.rowChil}>
                                                <Image source={images.proLocation}
                                                      resizeMode="contain"
                                                      style={styles.Image} />
                                                <Text style={styles.txtAddress}>ha noi</Text>
                                          </View>
                                    </View>
                              </View>
                              <View style={styles.end}/>
                              <Text >aaa</Text>
                              <Text>aaa</Text>
                              <Text>aaa</Text>
                              
                        </View>
                        </ScrollView>
                        <Button
                        onPressMsg={this._nextPage}
                        onPressPhone={this._nextPage}
                        />
                  </View>
            )
      }
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
      },
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
      Group: {
            flex: 1,
            padding:10
      },
      end: {
            height: 1,
            backgroundColor: 'gray',
            width: '100%',
            marginVertical:15
      },
      image: {
            height: 50,
            width: 50,
            borderRadius: 25
      },
      Image: {
            height: 15,
            width: 15
      },
      txtAddress: {
            color: '#999999',
      },
      txtName: {
            fontSize: 16,
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