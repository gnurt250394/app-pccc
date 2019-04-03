import React, { Component } from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';
import images from "assets/images"
export default class CustomText extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        this.props.name?<View style={styles.row}>
                <Image
                source={images.offline}
                style={styles.image}
               /> 
               <View style={styles.Wrap}>
               <Text style={styles.txt}>{this.props.value}: {this.props.name}</Text>
               </View>
            </View>: null
        
    );
  }
}
const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        marginBottom:9,
        alignItems:'flex-start'
    },
    Wrap:{
      flexWrap:'wrap',
      flexShrink:5
    },
    txt:{
      color:'#333131',
      fontSize:12,
    },
    image:{
      width: 6, 
      height: 6, 
      // marginLeft: 10,
      marginRight: 10, 
      marginTop: 5,
      tintColor:'gray',
  
    },
})