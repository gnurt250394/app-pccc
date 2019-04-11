import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import images from "assets/images"
import moment from 'moment'
import { getLiquidation, getOtherData } from 'config/apis/myShop';
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
import DropDown from './Dropdown';
moment.locale('vn')


export default class Liquidation extends Component {

      state = {
            title: '',
            decription: '',
            type: '1',
            category_id: '',
            city_id: '',
            district_id: '',
            address: '',
            location: 'Chọn địa chỉ',
            isVisible: false,
            value: '',
            listCategory: []
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
      render() {
            return (
                  <View style={styles.container}>

                        <Header
                              check={1}
                              onPress={this._goBack}
                              title={'Tin thanh lý'}
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
                                    <DropDown
                                          onItemSelect={(item) => { }}
                                          name={'Danh mục cần mua'}
                                          value={this.state.value}
                                          ref={ref => this.dropdown = ref}
                                          items={this.state.listCategory}
                                    />
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
                  listCategory = this.footer.state.listFile.join(',') || []
            let params = {
                  'title': this.state.title,
                  'description': this.state.decription,
                  'type': this.state.type,
                  'category_id[]': listCategory,
                  'city_id': idCity,
                  'district_id': idCountry,
            }

            postLiquidation(params).then(res => {
                  if(res.data.code == Status.SUCCESS){
                        navigation.pop()
                  }
            })
          
      }
      getData = () => {
            getOtherData({ table: 'categories' }).then(res => {

                  this.setState({
                        listCategory: res.data.data
                  })
            }).catch(err => {

            })
      }
      componentDidMount = () => {
            this.getData()
      };
}


const styles = StyleSheet.create({
      container: {
            flex: 1,
            // padding: 10,
      },
      btnGroup: {
            padding: 10
      },
      btnDropdown: {
            marginTop: 7,
            color:'#333333',
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
            paddingLeft: 10
      },
      inputItem: {
            height: 100,
      },
      btnLiquidation: {
            width: '95%',
            borderRadius: 5
      }
})