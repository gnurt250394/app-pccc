import React, { Component } from 'react'
import { Text, View ,TextInput,Image,StyleSheet,TouchableOpacity} from 'react-native'
import images from 'assets/images'
import { chooseImage } from 'config/uploadImage';
export default class FooterMsg extends Component {
    state={
        text:'',
        image:null
    }
    _onChangeText=(state)=>(value)=>{
        this.setState({[state]:value})
    }

    onClear =()=>{
        this.setState({text:''})
    }
    _onUploadImage =  () => {
         chooseImage().then(url => {
            this.props.selectImage(url.uri)
        }).catch(err => {

        })
    }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.containerInput}>
       <TextInput style={styles.input}
       placeholder={"Nhập tin nhắn"}
       value={this.state.text}
       onChangeText={this._onChangeText('text')}
       />
       <View style={styles.row}>
       <TouchableOpacity onPress={this._onUploadImage}>
           <Image
           style={styles.imgAvatar}
           resizeMode="contain"
           source={images.capture}
           />
       </TouchableOpacity>
       <TouchableOpacity>
           <Image
           style={styles.imgIcon}
           source={images.smile}
           resizeMode="contain"
           />
       </TouchableOpacity>
       </View>
       </View>
       <TouchableOpacity style={styles.containerSend}
       onPress={this.props.onPress}
       >
           <Text style={styles.send}>Gửi</Text>
       </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFFFFF',
        borderTopColor:'#CCCCCC',
        borderTopWidth:0.6,
        alignItems:'center',
        flexDirection:'row'
    },
    containerInput:{
        borderColor:'#2166A2',
        marginLeft:5,
        borderWidth:1,
        borderRadius:5,
        width:'87%',
        height:40,
        alignItems:'center',
        flexDirection:'row',
        marginVertical:6,
        paddingLeft:5
    },
    row:{
        flexDirection:'row',
        flex:1,
        justifyContent:'space-evenly'
    },
    containerSend:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    send:{
        color:'#2166A2',
        fontSize:16,
        fontWeight:'800'
    },
    input:{
        width:'70%',
        height:'100%'
    },
    imgAvatar:{
        height:23,
        width:23
    },
    imgIcon:{
        height:23,
        width:23
    }
})