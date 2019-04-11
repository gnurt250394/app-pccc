import React, { Component } from 'react'
import { Text, View, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import CustomDialog from 'components/CustomDialog';
import DropDown from 'components/Dropdown';
import { getOtherData } from 'config/apis/myShop';

export default class Modal extends Component {
  state = {
    visible: this.props.visible,
    cityName: 'Chọn tỉnh/Thành phố',
    idCity: '',
    idDistrict: '',
    districtName: 'Quận/Huyện',
    value: '',
    Country: [],
    listCity: [],
    listCountry: [],

  }
  componentWillReceiveProps(props) {
    if (props.visible && props.visible != "") this.setState({ visible: props.visible })
  }
  _onItemSelectCity = (state, state2) => (value) => {
    this.setState({ [state]: value.name, [state2]: value.id, districtName: '', idDistrict: '', listCountry: this.state.Country.filter(e => e.parent_id == value.id) })
  }
  _onItemSelectCountry = (state, state2) => (value) => {
    this.setState({ [state]: value.name, [state2]: value.id })
  }
  _onChangeTextCity = (state) => (value) => {
    if (value == '') {
      this.setState({ districtName: 'Quận/Huyện', idDistrict: '',[state]:value,listCountry:[] })
    } else {
      this.setState({ [state]: value })
    }

  }
  _onChangeText= (state) => (value) => {

    this.setState({ [state]: value })


  }
  _save = () => {

    this.setState({ visible: false }, () => this.props.handleAddress(`${this.state.value} - ${this.state.districtName} - ${this.state.cityName}`))


  }
  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <CustomDialog

          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
          title={"Nhập địa điểm"}
        >
          <DropDown
            ref={val => this.city = val}
            placeholder={"Chọn tỉnh/Thành phố"}
            style={styles.dropDown}
            onChangeText={this._onChangeTextCity('cityName')}
            value={this.state.cityName}
            onItemSelect={this._onItemSelectCity('cityName', 'idCity')}
            data={this.state.listCity}
          />
          <DropDown
            ref={val => this.district = val}
            style={styles.dropDown}
            placeholder={"Quận/Huyện"}
            onChangeText={this._onChangeText('districtName')}
            value={this.state.districtName}
            onItemSelect={this._onItemSelectCountry('districtName', 'idDistrict')}
            data={this.state.listCountry}
          />
          <TextInput
            multiline={true}
            style={[styles.inputItem]}
            placeholder={'Nhập địa chỉ cụ thể'}
            onChangeText={this._onChangeText('value')}
          />
          <TouchableOpacity style={styles.btn}
            onPress={this._save}
          >
            <Text style={styles.txtBtn}>LƯU</Text>
          </TouchableOpacity>
        </CustomDialog>
      </ScrollView>
    )
  }
  getData = () => {
    getOtherData({ table: 'taxonomies' }).then(res => {
      
      this.setState({
        listCity: res.data.data.filter(e => e.type == "city"),
        Country: res.data.data.filter(e => e.type == "district")
      })
    }).catch(err => {
      
    })
  }
  componentDidMount = () => {
    this.getData()
  };
}
const styles = StyleSheet.create({
  inputItem: {
    marginTop: 15,
    height: 37,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: '#707070',
    borderWidth: 0.7
  },
  dropDown: {
    marginTop: 10,
    marginHorizontal: 10
  },
  btn: {
    height: 39,
    flex: 1,
    width: '100%',
    backgroundColor: '#2166A2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  txtBtn: {
    color: '#FFFFFF',
    fontWeight: '600'
  }
})