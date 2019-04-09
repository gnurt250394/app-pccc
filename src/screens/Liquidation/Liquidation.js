import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import images from "assets/images"
import moment from 'moment'
import { getLiquidation } from 'config/apis/myShop';
import { Status, removeItem } from 'config/Controller';
import navigation from 'navigation/NavigationService';
import { SigninScreen, ListLiquidation, DetailLiquidation } from 'config/screenNames';
import { popupCancel } from 'config';
import { Header } from 'components';
import Item from './Item';
import { Btn } from 'components';
moment.locale('vn')


export default class Liquidation extends Component {





      _nextPage = () => {
            navigation.navigate(DetailLiquidation)
      }
      _goBack = () => {
            navigation.pop()
      }
      render() {
            return (
                  <View style={styles.container}>
                        <Header
                              check={1}
                              onPress={this._goBack}
                              title={'Tin thanh lý'}
                        />

                        <Item
                              name={"Tên tiêu đề"}
                              ref={ref => {this.inputTitle = ref}}
                              placeholder={"Nhập nội dung"}
                        />
                        <Item
                              name={"Nội dung cần mua"}
                              multiline={true}
                              ref={ref => {this.inputTitle = ref}}
                              placeholder={"Nhập nội dung"}
                              style={styles.inputItem}
                        />
                        <Item
                              name={"Địa chỉ mua"}
                              ref={ref => {this.inputTitle = ref}}
                              placeholder={"Nhập nội dung"}
                              // style={styles.inputItem}
                        />

                        <Btn
                              name="đăng tin"
                              onPress={this._nextPage}
                              customStyle={styles.btnLiquidation}
                        />

                  </View>
            );
      }
      getLiquidation = () => {
            getLiquidation(this.state.page).then(res => {
                  if (res.data.code == Status.SUCCESS) {
                        this.setState({
                              listLiqiudation: res.data.data,
                              loadMore: true
                        })
                  } else if (res.data.code == Status.NO_CONTENT) {
                        this.setState({
                              listLiqiudation: [],
                              loadMore: false,
                              Thresold: 0
                        })
                  } else if (res.data.code == Status.TOKEN_EXPIRED) {
                        navigation.reset(SigninScreen)
                        removeItem('token')
                  } else if (res.data.code == Status.TOKEN_VALID) {
                        popupCancel('Bạn phải đăng nhập để xử dụng tính năng này', () => navigation.navigate(SigninScreen))
                  }
            }).catch(err => {
                  console.log(err.response, 'err')
            })
      }
      componentDidMount = () => {
            // this.getLiquidation()
      };

}


const styles = StyleSheet.create({
      container: {
            flex: 1,
            // padding: 10,
      },
      txtNameItem: {
            color: '#333333',
            fontWeight: '500',
            fontSize: 15
      },
      inputItem: {
            height: 100,
      },
      btnLiquidation:{
            width:'95%',
            borderRadius:5
      }
})