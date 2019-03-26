import React, { Component } from 'react';
import { View, Text, Image, StyleSheet,Dimensions,TouchableOpacity } from 'react-native';
import images from "assets/images"
import moment from 'moment';

const {width} = Dimensions.get('window')
export default class ListItem extends Component {
  
  render() {
        return(
            <TouchableOpacity
            onPress={this.props.onPress}
             style={styles.container}>
            <View style={styles.containerList}>
              <View style={styles.Header}>
                  <Text style={styles.txtHeader}>{this.props.item.name}</Text>
              </View>
              {/* <View style={styles.row}>
                 
                 <Text style={styles.txtColor}>
                 <Image
                  source={images.offline}
                  style={styles.image}
                 />  Loại dự án: {this.props.item.type_project}</Text>
              </View> */}
              <View style={styles.row}>
                 
                 <Text style={styles.txtColor}>
                 <Image
                  source={images.offline}
                  style={styles.image}
                 />  Trạng thái dự án: {this.props.item.status}</Text>
              </View>
              <View style={styles.row}>
                 
                 <Text style={styles.txtColor}>
                 <Image
                  source={images.offline}
                  style={styles.image}
                 />  Thời gian bắt đầu: {moment(this.props.item.time_start,'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')}</Text>
              </View>
              <View style={styles.row}>
                 
                 <Text style={styles.txtColor}>
                 <Image
                  source={images.offline}
                  style={styles.image}
                 />  Thời gian kết thúc: {moment(this.props.item.time_end,'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')}</Text>
              </View>
              <View style={styles.row}>
                 
                 <Text style={styles.txtColor}>
                 <Image
                  source={images.offline}
                  style={styles.image}
                 />  Địa điểm: {this.props.item.address}</Text>
              </View>
            </View>
            <View style={styles.end}/>
            </TouchableOpacity>
        )
  }
}
const styles= StyleSheet.create({
    containerList:{
        flex:1,
        padding: 10,
    },
    txtColor:{
        color:'#333131'
    },
    container:{
        flex:1,
    },
    image:{
        height:5,
        width:5,
        tintColor:'gray',
        alignSelf: 'center',
        marginRight: 8,
    },
    txtHeader:{
        fontWeight:'600',
        fontSize:15,
        color:'#333333'
    },
    row:{
        flexDirection:'row',
        marginBottom:5
    },Header:{
        marginBottom:15
    },
    end:{
        height:8,
        backgroundColor: '#CCCCCC',
        width
    }
})
