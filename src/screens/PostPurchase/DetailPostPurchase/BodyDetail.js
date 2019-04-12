import React, { Component } from 'react'
import { Text, View ,StyleSheet,} from 'react-native'
import { fontStyles } from 'config/fontStyles';

export default class BodyDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.txtTitle,fontStyles.Acumin_bold]}>{this.props.title}</Text>
        <Text style={styles.txtTime}>{this.props.time}</Text>
        <Text style={styles.txtDescription}>{this.props.description}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
      container:{
            flex:1,
            // padding:10
      },
      txtTitle:{
            fontSize:15,
            color:'#333333'
      },
      txtDescription:{
            fontSize:13,
            color:'#333333'
      },
      txtTime:{
            fontSize:11,
            color:'#999999',
            marginTop:10,
            marginBottom:14
      }
})