import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,Dimensions } from 'react-native';
const {width} = Dimensions.get('window')
export default class Item extends Component {
 

  render() {
    return (
        <View style={styles.containerColum}>
      <View style={styles.container}>
      <View style={styles.containerRow}>
      <Image
          source={this.props.source}
          style={styles.image}
          resizeMode="contain"
      />
        <Text>{this.props.title}</Text>
        </View>
        <Text style={[styles.txt,{color:this.props.name?'#2166A2':'#999999'}]}>{this.props.name?this.props.name:this.props.subName}</Text>
      </View>
      <View style={styles.end}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    containerColum:{
        flex:1
    },
    end:{
        height:0.5,
        width,
        backgroundColor: '#CCCCCC',
        marginVertical: 14,
    },
    containerRow:{
        flexDirection: 'row',
    },
    image:{
        height:16,
        width:16,
        alignSelf: 'center',
        marginHorizontal: 10,
        tintColor:'#333333'
    },
    txt:{
        marginRight:8
    }
})