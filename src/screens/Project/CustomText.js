import React, { Component } from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';
import images from "assets/images"
export default class CustomText extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        this.props.name?<View style={styles.row}>
               <Text style={styles.txt}>
               <Image
                source={images.offline}
                style={styles.image}
               />  {this.props.value}: {this.props.name}</Text>
            </View>: null
        
    );
  }
}
const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        marginBottom:9
    },
    txt:{
      color:'#333131'
    },
    image:{
        height:6,
        width:6,
        tintColor:'gray',
        alignSelf: 'center',
        marginRight: 8,
    },
})