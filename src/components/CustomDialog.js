import React, { Component } from 'react';
import { View, Text,Modal,Dimensions,StyleSheet ,ScrollView,StatusBar} from 'react-native';
import { fontStyles } from 'config/fontStyles';
const {height,width} = Dimensions.get('window')
export default class CustomDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Modal
      visible={this.props.visible}
      transparent={true}
      animationType='slide'
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
          {/* <StatusBar
            barStyle={"light-content"}
            backgroundColor="#00000040"
            animated={true}
          /> */}
          <View onTouchStart={this.props.onClose} style={styles.containerModal}/>
          <View style={styles.modal}>
            <Text style={[styles.txtHeader,fontStyles.Acumin_bold]}>{this.props.title}</Text>
              {this.props.children}
          </View>
        </View>
        </ScrollView>
      </Modal>
    );
  }
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
});
