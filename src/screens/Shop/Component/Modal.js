import React, { Component } from 'react';
import { View, Text,Modal,StyleSheet,ScrollView,Dimensions,StatusBar,TextInput,TouchableOpacity } from 'react-native';
import DropDown from 'components/Dropdown';
import { getOtherData } from 'config/apis/myShop';
const {height,width} =Dimensions.get('window')
export default class ModalCustom extends Component {
 state={
     listCity:[],
     listCountry:[],
     Country:[],
     nameCity:'',
     nameCountry:'',
     parent_id:''
 }
    handleCountry=(id)=>{
        this.setState({
            listCountry: this.state.Country.filter(e=> e.parent_id == id)
        })
        console.log(id,'aaa')
        console.log(this.state.Country,'aaa')
        console.log(this.state.listCity,'aaa')
    }
  render() {
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}
       >
         <ScrollView showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            //  scrollEnabled={this.state.enableScrollViewScroll}
            //   ref={myScroll => (this._myScroll = myScroll)}
              contentContainerStyle={{flexGrow:1,justifyContent:'center'}}
            >
        <View style={styles.container}>
          <StatusBar
            barStyle={"light-content"}
            backgroundColor="#00000040"
            animated={true}
          />
          <View
            onTouchStart={this.props.onClose}
            style={styles.containerModal}
          />
          
          <View style={styles.modal}
          >
            <Text
              style={styles.txtHeader}
            >
              Nhập địa điểm
            </Text>
            <View style={styles.position}/>
            <View  
              style={{flex:1,justifyContent:'space-around'}}
              onStartShouldSetResponderCapture={() => {
                this.setState({ enableScrollViewScroll: true });
              }}>
                
                <DropDown
                  style={styles.searchText}
                  data={this.state.listCity}
                  touch={2}
                  value={this.state.nameCity}
                  onStartShouldSetResponderCapture={this.setScroll}
                  // label="a"
                  placeholder={"Tỉnh/ Thành phố"}
                  onItemSelect={value => {
                    if (value) {
                      this.setState({ nameCity:value.name,nameCountry: "" ,valueCountry:'',});
                        this.handleCountry(value.id)
                    }
                  }}
                />
                <DropDown
                  style={styles.searchText}
                  data={this.state.listCountry}
                  onStartShouldSetResponderCapture={this.setScroll}
                  touch={2}
                  value={this.state.nameCountry}
                  placeholder={'Quận/ Huyện'}
                  onItemSelect={value => {
                    this.setState({ valueCountry: value.id,nameCountry:value.name });
                  }}
                />
                <TextInput
                  style={styles.editText}
                  placeholder={"Nhập địa chỉ cụ thể"}
                  returnKeyType="done"
                  onChangeText={address => {
                    this.setState({ address });
                  }}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={this.postLocation}
                >
                  <Text style={[ { color: "#FFFFFF" }]}>
                    LƯU
                  </Text>
                </TouchableOpacity>
          
            </View>
          </View>
         
          {/* </KeyboardAvoidingView> */}
        </View>
        </ScrollView>
      </Modal>
    );
  }
  getData=()=>{
      getOtherData({table:'taxonomies'}).then(res=>{
          console.log(res.data,'ddđ')
          this.setState({
              listCity:res.data.data.filter(e=> e.type == "city"),
              Country:res.data.data.filter(e=> e.type == "district")
          })
      }).catch(err=>{
          console.log(err.response,'eerrr')
      })
  }
  componentDidMount = () => {
    this.getData()
  };
  
}
const styles = StyleSheet.create({
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
      alignSelf: "center",
      color: "#0082C0",
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
      height: height / 2,
      width: width -50,
      borderColor: "green",
      borderWidth: 2,
      borderRadius: 15,
      // display: "flex",
      // position: "absolute",
      padding: 8
    },
    editText: {
        // color:'#333333',
        // backgroundColor: "#F3F5F6",
        borderRadius: 5,
        height: 40,
        marginTop: 10,
        width: width -70,
        paddingLeft: 12,
        borderWidth: 1,
        borderColor: "#707070",
      },
      button: {
        height: 42,
        width: width-50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0082C0",
        alignSelf: "center",
        position:'absolute',
        bottom:-9.5,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        // borderRadius: 20,
      },
      searchText:{
        marginTop:8
      }
  });
  