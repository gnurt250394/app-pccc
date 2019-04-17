import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import images from "assets/images"
import moment from 'moment'
import { Status, removeItem, getMimeType, popup, typeScreen } from 'config/Controller';
import navigation from 'navigation/NavigationService';
import { SigninScreen, ListLiquidation, DetailLiquidation, ListCategory } from 'config/screenNames';
import { Header } from 'components';
import { connect } from 'react-redux'
import { Btn } from 'components';
import { postLiquidation, getDetailLiquidation, updateLiquidation } from 'config/apis/liquidation';
import { fontStyles } from 'config/fontStyles';
import SimpleToast from 'react-native-simple-toast';
import { Messages } from 'config/Status';
import Item from 'screens/Liquidation/Item';
import ModalScreen from 'screens/Liquidation/Modal';
import FooterLiquidation from 'screens/Liquidation/FooterLiquidation';
moment.locale('vn')


class Edit extends Component {
      constructor(props) {
            super(props)
            this.state = {
                  title: '',
                  decription: '',
                  category_id: [],
                  city_id: '',
                  district_id: '',
                  address: '',
                  location: 'Chọn địa chỉ',
                  isVisible: false,
                  value: '',
                  id: this.props.navigation.getParam('id', ' '),
                  Liquidation: {},
                  listCategory: [],
                  loading: false,
                  name: 'Chọn danh mục',
                  address: this.props.users.address,
                  type: this.props.navigation.getParam('type', '')
            }
            this.refress = this.props.navigation.getParam('refress', '')
      }
      componentDidMount() {
            this.getDetail()
      }
      getDetail = () => {
            console.log(this.state.id, 'iii')
            getDetailLiquidation(this.state.id).then(res => {
                  if (res.data.code == Status.SUCCESS) {
                        const data = res.data.data;
                        console.log(data, 'sss')
                        this.inputTitle.handleText(data.title)
                        this.inputDescription.handleText(data.description)
                        this.footer.forrmatData(data.file_attach)
                        this.setState({
                              name: data.category,
                              location: data.address + " - " + data.district + " - " + data.city
                        })
                  } else if (res.data.code == Status.ID_NOT_FOUND) {
                        this.setState({ loading: false,  })
                  }
            }).catch(err => {
                  this.setState({ loading: false })
            })
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
      handleItem = (value, id) => {
            this.setState({ name: value, category_id: id })
      }
      showFlatlit = () => {
            navigation.navigate(ListCategory, { fun: this.handleItem, id: this.state.category_id })
      }
      render() {
            const { type } = this.state
            return (
                  <View style={styles.container}>

                        <Header
                              check={1}
                              onPress={this._goBack}
                              title={type == typeScreen.Liquidation ? 'Tin thanh lý' : 'Đăng mua'}
                        />
                        <ScrollView keyboardShouldPersistTaps="handled">
                              <View style={styles.container}>

                                    <Item
                                          name={"Tên tiêu đề"}
                                          ref={val => this.inputTitle = val}
                                          placeholder={"Nhập nội dung"}
                                    />
                                    <Item
                                          name={type == typeScreen.Liquidation ? "Nội dung cần thanh lý" : 'Nội dung cần mua'}
                                          multiline={true}
                                          ref={val => this.inputDescription = val}
                                          placeholder={"Nhập nội dung"}
                                          style={styles.inputItem}
                                    />
                                    <View keyboardShouldpersist='always' style={styles.containerStyle}>
                                          <Text style={[styles.txtNameTouch, fontStyles.Acumin_RPro_0]}>{type == typeScreen.Liquidation ? 'Danh mục cần thanh lý' : 'Danh mục cần mua'}</Text>
                                          <TouchableOpacity
                                                onPress={this.showFlatlit}

                                                style={styles.editText} >
                                                <Text numberOfLines={1} style={styles.txtBtn}>{this.state.name}</Text>
                                                <Image source={images.icon_up} resizeMode="contain" style={styles.ticker} />
                                          </TouchableOpacity>
                                    </View>
                                    <Text style={[styles.txtNameItem, fontStyles.Acumin_RPro_0]}>{type == typeScreen.Liquidation ? 'Địa chỉ thanh lý' : 'Địa chỉ mua'}</Text>
                                    <TouchableOpacity style={styles.btnModal}
                                          onPress={this._showModal}
                                    >
                                          <Text style={[styles.btnDropdown]}>{this.state.location}</Text>
                                    </TouchableOpacity>
                                    <ModalScreen
                                          visible={this.state.isVisible}
                                          ref={ref => this.Modal = ref}
                                          handleAddress={this.handleAddress()}
                                    />

                                    <FooterLiquidation
                                          ref={ref => this.footer = ref}
                                    />
                                    <Btn
                                          name={this.state.type == typeScreen.Liquidation ? "Sửa tin thanh lý" : "Sửa tin đăng mua"}
                                          onPress={this._nextPage}
                                          customStyle={styles.btnLiquidation}
                                    />
                              </View>
                        </ScrollView>
                  </View>
            );
      }
      _nextPage = () => {

            if (this.state.loading) {
                  return null
            } else {

                  let idCity = this.Modal.state.idCity || '',
                        idCountry = this.Modal.state.idDistrict || '',
                        listFile = this.footer.state.listFile || [],
                        title = this.inputTitle.state.text || '',
                        decription = this.inputDescription.state.text || '',
                        address = this.Modal.state.value || ''

                  let params = new FormData()
                  this.state.category_id.forEach(item => {
                        params.append('category_id[]', `${item}`)
                  })
                  let date = new Date()
                  listFile.forEach(item => {
                        const fileName = date.getTime() + '.' + /[^\.]*$/.exec(item.fileName)[0]
                        params.append('file[]', { uri: item.uri, type: item.type, name: fileName }, fileName)
                  })
                  params.append('title', title)
                  params.append('description', decription)
                  params.append('type', this.state.type == typeScreen.Liquidation ? 1 : 0)
                  params.append('city_id', idCity)
                  params.append('address', address)
                  params.append('district_id', idCountry)
                        console.log(params,'params')
                  if (this.validate() == '') {
                        this.setState({ loading: true })
                        updateLiquidation(params).then(res => {

                              if (res.data.code == Status.SUCCESS) {
                                    this.refress()
                                    this.setState({ loading: false })
                                    navigation.pop()
                              } else if (res.data.code == Status.TOKEN_EXPIRED) {
                                    SimpleToast.show('Phiên đăng nhập hết hạn')
                                    navigation.reset(SigninScreen)
                                    this.setState({ loading: false })
                                    removeItem('token')
                              } else {
                                    SimpleToast.show("Lỗi hệ thống")
                                    this.setState({ loading: false })
                              }
                        }).catch(err => {
                              this.setState({ loading: false })
                              console.log(err.response,'err')
                              SimpleToast.show("Server ERROR")

                        })
                  } else {
                        SimpleToast.show(this.validate())
                  }

            }

      }
      validate = () => {
            let msg = ''
            let idCity = this.Modal.state.idCity || '',
                  idCountry = this.Modal.state.idDistrict || '',
                  title = this.inputTitle.state.text || ''
            decription = this.inputDescription.state.text || ''


            let { category_id } = this.state
            if (title == '') {
                  return msg += 'Tên tiêu đề không được để trống';
            }
            if (decription == '') {
                  return msg += `Nội dung cần ${this.state.type == typeScreen.Liquidation ? 'thanh lý' : 'mua'} không được để trống`;
            }
            if (category_id.length == 0) {
                  return msg += 'Vui lòng chọn danh mục';
            }
            if (idCity == '' && idCountry == '') {
                  return msg += 'Vui lòng chọn địa chỉ'
            }
            return msg
      }

}


const styles = StyleSheet.create({
      container: {
            flex: 1,
            // padding: 10,
      },
      containerStyle: {
            padding: 10
      },
      btnGroup: {
            padding: 10
      },
      btnDropdown: {
            marginTop: 7,
            color: '#333333',
            width: '100%',
            height: 40,
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
            marginBottom: 5,
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
            width: '90%'
      },

})
const mapStateToProps = (state) => {
      return {
            users: state.users && state.users.data ? state.users.data : {},
      }
}
export default connect(mapStateToProps)(Edit)