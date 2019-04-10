import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
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
import FooterLiquidation from './FooterLiquidation';
import { postLiquidation } from 'config/apis/liquidation';
import CustomDialog from 'components/CustomDialog';
import Modal from './Modal';
import { fontStyles } from 'config/fontStyles';
moment.locale('vn')


export default class Liquidation extends Component {
      
      state={
             title:'',
             decription:'',
             isVisible:false
      }


      _showModal =()=>{
            this.setState({isVisible:true})
      }
      _onChangeText = (value) => (state) =>{
            this.setState({[value]:state})
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
                        <ScrollView>
                        <View style={styles.container}>
                        <Item
                              name={"Tên tiêu đề"}
                              ref={val => this.inputTitle = val}
                              onChangeText={this._onChangeText('title')}
                              placeholder={"Nhập nội dung"}
                        />
                        <Item
                              name={"Nội dung cần mua"}
                              multiline={true}
                              onChangeText={this._onChangeText('decription')}
                              ref={val => this.inputDescription= val}
                              placeholder={"Nhập nội dung"}
                              style={styles.inputItem}
                        />
                        <Text style={[styles.txtNameItem,fontStyles.Acumin_RPro_0]}>Địa chỉ mua</Text>
                        <TouchableOpacity style={styles.btnModal}
                        onPress={this._showModal}
                        >
                        <Text style={[styles.btnDropdown]}>Địa chỉ mua</Text>
                        </TouchableOpacity>
                        <Modal 
                        visible={this.state.isVisible}
                        ref={ref => this.Modal = ref}/>
                       
                        <FooterLiquidation/>
                        <Btn
                              name="đăng tin"
                              onPress={this._nextPage}
                              customStyle={styles.btnLiquidation}
                        />
                        </View>
                        </ScrollView>
                  </View>
            );
      }
      _nextPage = () => {
            let params ={
                  title:this.state.title,
                  description:this.state.decription,
                  type:'',
                  category_id:'',
                  city_id:'',
                  district_id:'',
                  address:''
            }
            console.log(params,'aaaa')
            postLiquidation(params).then(res=>{
                  console.log(res)
            })
            navigation.navigate(ListLiquidation)
      }
      // getLiquidation = () => {
      //       getLiquidation(this.state.page).then(res => {
      //             if (res.data.code == Status.SUCCESS) {
      //                   this.setState({
      //                         listLiqiudation: res.data.data,
      //                         loadMore: true
      //                   })
      //             } else if (res.data.code == Status.NO_CONTENT) {
      //                   this.setState({
      //                         listLiqiudation: [],
      //                         loadMore: false,
      //                         Thresold: 0
      //                   })
      //             } else if (res.data.code == Status.TOKEN_EXPIRED) {
      //                   navigation.reset(SigninScreen)
      //                   removeItem('token')
      //             } else if (res.data.code == Status.TOKEN_VALID) {
      //                   popupCancel('Bạn phải đăng nhập để xử dụng tính năng này', () => navigation.navigate(SigninScreen))
      //             }
      //       }).catch(err => {
      //             console.log(err.response, 'err')
      //       })
      // }
      componentDidMount = () => {
            // this.getLiquidation()
      };

}


const styles = StyleSheet.create({
      container: {
            flex: 1,
            // padding: 10,
      },
      btnGroup:{
            padding:10
      },
      btnDropdown:{
            marginTop:7,
            width: '100%',
            height:37,
            padding: 10,
            borderRadius:5,
            borderColor:'#707070',
            borderWidth:0.7
      },
      btnModal:{
            width:'100%',
            paddingHorizontal:10,
            paddingBottom:10
      },
      txtNameItem: {
            color: '#333333',
            fontWeight: '500',
            fontSize: 15,
            paddingLeft:10
      },
      inputItem: {
            height: 100,
      },
      btnLiquidation:{
            width:'95%',
            borderRadius:5
      }
})