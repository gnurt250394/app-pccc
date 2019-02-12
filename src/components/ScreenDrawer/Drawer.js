import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions,Image,TouchableOpacity,ScrollView } from 'react-native';
import {TextBold,TextItali} from '../layout/CustomText';

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
       <View style={styles.containerHeader}>
           <Image source={{uri:'https://i.imgur.com/FxBPgGV.jpg'}}
               style={styles.image}
           />
           <TextBold style={styles.txt}
               value={"Khách"}
           />
       </View>
       <TouchableOpacity style={styles.button}>
           <TextBold style={styles.txt}
               value={"Cửa hàng"}
           />
       </TouchableOpacity>
       <TouchableOpacity style={styles.button}>
           <TextBold style={styles.txt}
               value={"Tin tức"}
           />
       </TouchableOpacity>
       <TouchableOpacity style={styles.button}>
           <TextBold style={styles.txt}
               value={"Liên hệ"}
           />
       </TouchableOpacity>
       <TouchableOpacity style={styles.button}>
           <TextBold style={styles.txt}
               value={"Giới thiệu"}
           />
       </TouchableOpacity>
       <TouchableOpacity style={styles.button}>
           <TextBold style={styles.txt}
               value={"Cài đặt"}
           />
       </TouchableOpacity>
       <TouchableOpacity style={styles.button}>
           <TextBold style={styles.txt}
               value={"Danh mục"}
           />
       </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingLeft: 10,
        backgroundColor: '#FF8C00',
    },
    image:{
        height:60,
        width:60,
        borderRadius: 30,
    },
    txt:{
    color:'white',
    fontSize:16,
    marginLeft: 10,
    fontWeight:'500'
    },
    containerHeader:{
    flexDirection:'row',
    alignItems:'center',
    height:140
},
button:{
    justifyContent:'center',
    height:60
}
})