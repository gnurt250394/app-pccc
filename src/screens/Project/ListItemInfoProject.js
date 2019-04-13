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
                  <Text style={styles.txtHeader}>{this.props.item.name}  {this.props.item.change ==0&& <Image  style={styles.iconNotify} source={images.dotYellow} />}
                   </Text>
              </View>
              {/* <View style={styles.row}>
                 
                 <Text style={styles.txtColor}>
                 <Image
                  source={images.offline}
                  style={styles.image}
                 />  Loại dự án: {this.props.item.type_project}</Text>
              </View> */}
              <View style={styles.row}>
              <Image
                  source={images.offline}
                  style={styles.image}
                 /> 
                 <Text style={styles.txtColor}>Trạng thái dự án: {this.props.item.status}</Text>
              </View>
              <View style={styles.row}>
              <Image
                  source={images.offline}
                  style={styles.image}
                 /> 
                 <Text style={styles.txtColor}>Thời gian bắt đầu: {moment(this.props.item.time_start,'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')}</Text>
              </View>
              <View style={styles.row}>
              <Image
                  source={images.offline}
                  style={styles.image}
                 /> 
                 <Text style={styles.txtColor}>Thời gian kết thúc: {moment(this.props.item.time_end,'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')}</Text>
              </View>
              <View style={styles.row}>
              <Image
                  source={images.offline}
                  style={styles.image}
                 /> 
                 <Text style={styles.txtColor}>Địa điểm: {this.props.item.address}</Text>
              </View>
            </View>
            {this.props.index < this.props.count - 1 && <View style={styles.end}/>}
            </TouchableOpacity>
        )
  }
}
const styles= StyleSheet.create({
    containerList:{
        flex:1,
        padding: 10,
    },
    iconNotify: {
        width: 12, 
        height: 12, 
        resizeMode: 'contain',
    },
    txtColor:{
        color:'#333131'
    },
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    image:{
        width: 6, 
        height: 6, 
        marginLeft: 10,
        marginRight: 10, 
        marginTop: 5,
        tintColor:'gray',
    },
    txtHeader:{
        fontWeight:'600',
        fontSize:15,
        color:'#333333'
    },
    row:{
        flexDirection:'row',
        marginBottom:5,
        alignItems:'flex-start'
    },Header:{
        marginBottom:15
    },
    end:{
        height:8,
        backgroundColor: '#CCCCCC',
        width
    }
})
