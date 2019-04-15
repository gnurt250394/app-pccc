import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity ,Image} from 'react-native'
import images from 'assets/images'
export default class HeaderMsg extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.container,this.props.style]}>
       <Image style={styles.img} source={images.binhCuuHoa} resizeMode="contain"/>
       <View style={styles.txtContainer}>
           <Text style={styles.txtName}>Binh chua chay</Text>
           <Text style={styles.txtcontact}>Lien he</Text>
       </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        padding:6,
        backgroundColor:'#FFFFFF',
        marginVertical:10,
        elevation:5
    },
    txtContainer:{
        marginLeft:8
    },
    img:{
        height:70,
        width:70,
        borderColor:'#2166A2',
        borderWidth:1,
        borderRadius:2
    },
    txtName:{
        color:'#333333',
        fontSize:15,
        fontWeight:'600',
        marginBottom:20
    },
    txtcontact:{
        color:'#2166A2',
        fontSize:13
    }
})