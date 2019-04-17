import React, { PureComponent } from 'react'
import { Text, View, ScrollView, TextInput, StyleSheet, TouchableOpacity ,Modal,Dimensions} from 'react-native'
import CustomDialog from 'components/CustomDialog';
import DropDown from 'components/Dropdown';
import { getOtherData } from 'config/apis/myShop';
import SimpleToast from 'react-native-simple-toast';
import { fontStyles } from 'config/fontStyles';
const {height,width} = Dimensions.get('window')
export default class ModalScreen extends PureComponent {
  state = {
    visible: this.props.visible,
    cityName: '',
    idCity: '',
    idDistrict: '',
    districtName: '',
    value: '',
    Country: [],
    listCity: [],
    listCountry: [],
    enableScrollViewScroll: true
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
      this.setState({ districtName: 'Quận/Huyện', idDistrict: '', [state]: value, listCountry: [] })
    } else {
      this.setState({ [state]: value })
    }

  }
  _onChangeText = (state) => (value) => {

    this.setState({ [state]: value })


  }
  _save = () => {
    if (this.validate() == '') {
      this.setState({ visible: false }, () => this.props.handleAddress(`${this.state.value} - ${this.state.districtName} - ${this.state.cityName}`))
    } else {
      SimpleToast.show(this.validate())
    }



  }
  validate = () => {
    let msg = ''
    switch ('') {
      case this.state.idCity:
        return msg += 'Vui lòng chọn tỉnh/thành phố'
      case this.state.idDistrict:
        return msg += 'Vui lòng chọn Quận/huyện'
      case this.state.value:
        return msg += 'Vui lòng nhập địa chỉ cụ thể'
      default:
        return msg
    }
  }
  setScroll = () => {
    this.setState({ enableScrollViewScroll: false });
    if (this._myScroll.contentOffset === 0
      && this.state.enableScrollViewScroll === false) {
      this.setState({ enableScrollViewScroll: true });
    }
  }
  closeModal=()=>{
    this.setState({ visible: false })
  }
  render() {
    return (
      <Modal
        visible={this.state.visible}
        transparent={true}
        animationType='slide'
        onRequestClose={this.closeModal}
      >
        <ScrollView showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onStartShouldSetResponderCapture={() => {
            this.setState({ enableScrollViewScroll: true });
          }}
          scrollEnabled={this.state.enableScrollViewScroll}
          ref={myScroll => (this._myScroll = myScroll)}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View style={styles.container}>
            <View onTouchStart={this.closeModal} style={styles.containerModal} />
            <View style={styles.modal}>
              <Text style={[styles.txtHeader, fontStyles.Acumin_bold]}>Nhập địa điểm</Text>
              <DropDown
                ref={val => this.city = val}
                placeholder={"Chọn tỉnh/Thành phố"}
                onStartShouldSetResponderCapture={this.setScroll}
                onResponderRelease={this.setScroll}
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
                onResponderRelease={this.setScroll}
                onStartShouldSetResponderCapture={this.setScroll}
                onChangeText={this._onChangeText('districtName')}
                value={this.state.districtName}
                onItemSelect={this._onItemSelectCountry('districtName', 'idDistrict')}
                data={this.state.listCountry}
              />
              <TextInput
                multiline={true}
                style={[styles.inputItem]}
                value={this.state.value}
                placeholder={'Nhập địa chỉ cụ thể'}
                onChangeText={this._onChangeText('value')}
              />
              <TouchableOpacity style={styles.btn}
                onPress={this._save}
              >
                <Text style={styles.txtBtn}>LƯU</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
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
    paddingLeft: 10,
    paddingTop: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: '#707070',
    borderWidth: 0.7,
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
    marginTop: 20,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  txtBtn: {
    color: '#FFFFFF',
    fontWeight: '600'
  },
  containerModal: {
    flex: 1,
    height: height,
    width: width,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#00000040",
    position:'absolute'
  },
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center" 
  },
  txtHeader:{
    textAlign: "center",
    color: "#2166A2",
    marginTop:5,
    fontSize: 19
  },
  position:{
    backgroundColor: "gray",
    height: 1,
    width: width -50,
    marginTop: 10,
    alignSelf: "center"
  },
  modal: {
    backgroundColor: "#FFFFFF",
    width: width -50,
    borderColor: "#2166A2",
    borderWidth: 0.5,
    borderRadius: 7,
    // display: "flex",
    // position: "absolute",
  },
})