import React, { Component } from 'react'
import { Text, View ,TouchableOpacity,StyleSheet,Image} from 'react-native'
import {  color, width, popupOk} from 'config'
import images from "assets/images"
export default class TouchableOpacityCustom extends Component {
  render() {
    return (
      <TouchableOpacity style={[style.box2,this.props.style]} 
                                onPress={this.props.onPress} 
                                >
                                <Image 
                                    style={style.imgStreet}
                                    source={this.props.source} />
                                <Text style={style.text}>
                                    {this.props.label}  {this.props.count == 1?<Image  style={style.iconNotify} source={images.dotYellow} />:null}
                                </Text> 
                                
                            </TouchableOpacity>
    )
  }
}
const style = StyleSheet.create({
      box2: {
          flex: 1, 
          height: '100%',
          width:'100%',
          marginRight: 0.2, position: 'relative'},
      imgStreet: {
          width: '100%', 
        //   alignSelf: 'center',
          resizeMode: 'stretch',
          height: '100%'
        },
     
      
      iconNotify: {
          width: 12, 
          height: 12, 
          resizeMode: 'contain',
      },
      text: {
          position: 'absolute', top: 8, left: 8, color: "rgba(255, 255, 255, 1)", fontSize: 14, width: '80%',
          // textShadowColor: "gray",
          // textShadowOffset: {
          //     width: -1,
          //     height: 1,
          // },
          // textShadowRadius: 2,
          // elevation: 2,
      },
      
  })
  