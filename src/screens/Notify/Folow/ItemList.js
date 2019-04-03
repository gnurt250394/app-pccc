import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,TouchableOpacity,Dimensions } from 'react-native';
import images from 'assets/images'
import { fontStyle } from 'config/Controller';
import { fontStyles } from 'config/fontStyles';

const {width} = Dimensions.get('window')
export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  checColor=(item)=>{
      if(item.status == 1){
        return {
            
        }
      }else{
        return {
           
          }
      }
  }
  render() {
    return (
        <View style={{flex:1}}>
      {this.props.item.status ==1 ?
      <TouchableOpacity style={styles.container}
      onPress={this.props.onPress}
      >
        <Image 
            source={this.props.item.image&&this.props.item.image.full_path?{uri:this.props.item.image.full_path}:images.logo}
            style={styles.image}
        />
        <View style={styles.containerTxt}>
            <Text style={[styles.txt,styles.edited,fontStyles.Acumin_ItPro_0]}>{this.props.item.message}</Text>
            <Text style={[styles.time,fontStyles.Acumin_thin]}>{this.props.item.time}</Text>
        </View>
      </TouchableOpacity>
    :
    <TouchableOpacity style={styles.container}
      onPress={this.props.onPress}
      >
        <Image 
            source={this.props.item.image&&this.props.item.image.full_path?{uri:this.props.item.image.full_path}:images.logo}
            style={styles.image}
        />
        <View style={styles.containerTxt}>
            <Text style={[styles.txt,styles.unEdited,fontStyles.Acumin_bold]}>{this.props.item.message}</Text>
            <Text style={[styles.time,fontStyles.Acumin_thin]}>{this.props.item.time}</Text>
        </View>
      </TouchableOpacity>}
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
    edited:{
      color:'#555555',
      fontWeight: 'normal',
      // fontFamily:fontStyles.Acumin_ItPro_0
    },
    unEdited:{
      color:'#333333',
      // fontFamily:fontStyles.Acumin_bold
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
        // fontFamily:fontStyles.Acumin_bold ,
    },
    time:{
        color:'#CCCCCC',
        // fontFamily:fontStyles.Acumin_thin,
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