import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,TouchableOpacity,Dimensions } from 'react-native';
import images from 'assets/images'
import { fontStyle } from 'config/Controller';

const {width} = Dimensions.get('window')
export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  checColor=()=>{
      if(this.props.item.status == 1){
        return {
            color:'#555555',
            fontWeight: 'normal',
            fontFamily:fontStyle.Acumin_ItPro_0
        }
      }else{
        return {
            color:'#333333',
            fontFamily:fontStyle.Acumin_bold
          }
      }
  }
  render() {
    return (
        <View style={{flex:1}}>
      <TouchableOpacity style={styles.container}>
        <Image 
            source={{uri:this.props.item.image}}
            style={styles.image}
        />
        <View style={styles.containerTxt}>
            <Text style={[styles.txt,this.checColor()]}>{this.props.item.name}</Text>
            <Text style={styles.time}>{this.props.item.time}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.end} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        padding: 5,
    },
    image:{
        height:40,
        width:40,
        padding:9,
        borderRadius: 20,
        margin: 7,
    },
    txt:{
        marginBottom: 12,
        marginTop: 5,
        fontFamily:fontStyle.Acumin_bold ,
    },
    time:{
        color:'#CCCCCC',
        fontFamily:fontStyle.Acumin_thin,
        fontSize:12
    },
    containerTxt:{
        paddingLeft:7,
        flexWrap: 'wrap',
        flexShrink: 5,
    },
    end:{
        marginTop:4,
        height:0.6,
        backgroundColor: '#DEDEDE',
        width
    }
})