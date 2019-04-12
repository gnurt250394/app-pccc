import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import images from "assets/images"
import moment from 'moment'
import { Status, removeItem, getMimeType, popup } from 'config/Controller';
import navigation from 'navigation/NavigationService';
import { SigninScreen, ListLiquidation, DetailLiquidation, ListCategory } from 'config/screenNames';
import { Header } from 'components';
import Item from './Item';
import { Btn } from 'components';
import FooterLiquidation from './FooterPostPurchase';
import { postLiquidation } from 'config/apis/liquidation';
import { fontStyles } from 'config/fontStyles';
import SimpleToast from 'react-native-simple-toast';
import Modal from 'screens/Liquidation/Modal';
moment.locale('vn')


export default class PostPurchase extends Component {
constructor(props){
      super(props)
      this.state = {
            title: '',
            decription: '',
            type: '0',
            category_id: [],
            city_id: '',
            district_id: '',
            address: '',
            location: 'Chọn địa chỉ',
            isVisible: false,
            value: '',
            listCategory: [],
            name: 'Chọn danh mục'
      }
      this.refress = this.props.navigation.getParam('refress','')
}
      

      _showModal = () => {
            this.setState({ isVisible: true })
      }
      _onChangeText = (value) => (state) => {
            this.setState({ [value]: state })
      }
      _goBack = () => {
            navigation.pop()
      }

      handleAddress = () => (value) => {
            this.setState({ location: value, isVisible: false })

      }
      handleItem =(value,id)=>{
            this.setState({name:value,category_id:id})
      }
      showFlatlit = () => {
            navigation.navigate(ListCategory,{ fun: this.handleItem })
      }
      render() {
            return (
                  <View style={styles.container}>

                        <Header
                              check={1}
                              onPress={this._goBack}
                              title={'Đăng mua'}
                        />
                        <ScrollView keyboardShouldPersistTaps="handled">
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
                                          ref={val => this.inputDescription = val}
                                          placeholder={"Nhập nội dung"}
                                          style={styles.inputItem}
                                    />
                                     <View keyboardShouldpersist='always' style={styles.containerStyle}>
                                    <Text style={[styles.txtNameTouch, fontStyles.Acumin_RPro_0]}>Danh mục cần mua</Text>
                                    <TouchableOpacity
                                          onPress={this.showFlatlit}

                                          style={styles.editText} >
                                          <Text numberOfLines={1} style={styles.txtBtn}>{this.state.name}</Text>
                                          <Image source={images.icon_up} resizeMode="contain" style={styles.ticker} />
                                    </TouchableOpacity>
                                    </View>
                                    <Text style={[styles.txtNameItem, fontStyles.Acumin_RPro_0]}>Địa chỉ mua</Text>
                                    <TouchableOpacity style={styles.btnModal}
                                          onPress={this._showModal}
                                    >
                                          <Text style={[styles.btnDropdown]}>{this.state.location}</Text>
                                    </TouchableOpacity>
                                    <Modal
                                          visible={this.state.isVisible}
                                          ref={ref => this.Modal = ref}
                                          handleAddress={this.handleAddress()}
                                    />

                                    <FooterLiquidation
                                          ref={ref => this.footer = ref}
                                    />
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
           
            let idCity = this.Modal.state.idCity || '',
                  idCountry = this.Modal.state.idDistrict || '',
                  listFile = this.footer.state.listFile || []
                  
                  let params = new FormData()
                  this.state.category_id.forEach(item=>{
                        params.append('category_id[]', `${item}`)
                  })
                  listFile.forEach(item=>{
                        params.append('file[]',{uri:`${item.uri}`,type:getMimeType(item.fileName),name:`${item.fileName}`},`${item.fileName}`)
                  })
                  params.append('title', this.state.title)
                  params.append('description', this.state.decription)
                  params.append('type', this.state.type)
                  params.append('city_id', idCity)
                  params.append('district_id', idCountry)
            
            if(this.validate()==''){
                  postLiquidation(params).then(res => {
                        
                        if (res.data.code == Status.SUCCESS) {
                              this.refress()
                              navigation.pop()
                        }else if(res.data.code == Status.TOKEN_EXPIRED){
                              SimpleToast.show('Phiên đăng nhập hết hạn')
                              navigation.reset(SigninScreen)
                              removeItem('token')
                        }else if(res.data.code == Status.TOKEN_VALID){
                              popup('Bạn phải đăng nhập để sử dụng tính năng này.', null, () => navigation.navigate(SigninScreen))
                        } else{
                              SimpleToast.show("Lỗi hệ thống")
                        }
                  }).catch(err => {
                        SimpleToast.show("Server ERROR")
                        
                  })
            }else{
                  SimpleToast.show(this.validate())
            }
            

      }
      validate = () =>{
            let msg =''
            let  {title,decription} = this.state
            switch(''){
                  case title: msg += 'Tên tiêu đề không được để trống';
                  break;
                  case decription: msg += 'Nội dung cần mua không được để trống'
                  break;
                  default: msg
                  break
            }
      }

}


const styles = StyleSheet.create({
      container: {
            flex: 1,
            // padding: 10,
      },
      containerStyle:{
            padding:10
      },
      btnGroup: {
            padding: 10
      },
      btnDropdown: {
            marginTop: 7,
            color: '#333333',
            width: '100%',
            height: 37,
            padding: 10,
            borderRadius: 5,
            borderColor: '#707070',
            borderWidth: 0.7
      },
      btnModal: {
            width: '100%',
            paddingHorizontal: 10,
            paddingBottom: 10
      },
      txtNameItem: {
            color: '#333333',
            fontWeight: '500',
            fontSize: 15,
            paddingLeft:10
      },
      txtNameTouch: {
            color: '#333333',
            fontWeight: '500',
            fontSize: 15,
      },
      inputItem: {
            height: 100,
      },
      btnLiquidation: {
            width: '95%',
            borderRadius: 5
      },
      editText: {
            backgroundColor: '#FFFFFF',
            borderRadius: 5,
            height: 40,
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 3,
            marginBottom:5,
            paddingLeft: 12,
            borderWidth: 1,
            borderColor: '#707070',
      },
      ticker: {
            height: 14,
            width: 14,
            marginRight: 10,
            transform: [{ rotate: '180deg' }]
      },

     
      txtBtn: {
            color: '#333333',
            width:'90%'
      },

})