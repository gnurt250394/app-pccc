import React,{PureComponent} from 'react'
import { View, Text,Dimensions,StyleSheet,TouchableOpacity,TextInput,Image,PixelRatio} from 'react-native';
import SearchableDropDown from './SearchDropDown';
const {width} = Dimensions.get('window')

export default class DropDown extends PureComponent {


    render() {
      return(
      <View onStartShouldSetResponderCapture={this.props.onStartShouldSetResponderCapture} >
      {this.props.touch ==2?
          null:
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      <View style={{flexDirection:'row',marginBottom:3}}>
      <Text style={styles.textLabel}>{this.props.label}</Text>
      {this.props.checkValidate == 1?null:  <Text style={{color:'red',marginLeft:3}}>*</Text> }
    
      </View>
      { this.props.touch ==1?
          <TouchableOpacity
          style={{marginBottom:3}}
              onPress={this.props.onPress}>
                <Text style={[{color:'#0082C0'},FontStyle.bold]}>{this.props.nameOnPress}</Text>
              </TouchableOpacity>
              :
              <View/>
      }
      </View>
  }
  
     
      <SearchableDropDown
          onItemSelect={this.props.onItemSelect}
          containerStyle={this.props.style}
          value={this.props.value}
          textInputStyle={styles.editText}
          itemStyle={styles.itemStyle}
          itemTextStyle={{ color: '#222' }}
          itemsContainerStyle={{ maxHeight: 120 }}
          items={this.props.data}
          defaultIndex={2}
          onTextChange={this.props.onChangeText}
          placeholder={this.props.placeholder}
          resetValue={false}
          editable={this.props.editable}
          value={this.props.value}
          // listType="ListView"
          underlineColorAndroid="transparent"
        />
        </View>
      )
    }
  }
  const styles= StyleSheet.create({
    editText:{
        color:'#333333',
        backgroundColor:'#F3F5F6',
        borderRadius:5,
        height:40,
        marginTop:3,
        paddingLeft:12,
        borderWidth:0.09,
        borderColor: '#333333',
    },
    imageButton:{
        height:80,
        width:80,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:5,
        backgroundColor:'#F5FCFF',
        borderColor:'#0082C0',
        borderStyle:'dotted',
        borderWidth:1
    },
    button:{
        height:25,
        width:70,
        justifyContent:'center',
        alignItems: 'flex-end',
        marginRight: 8,
        // borderStyle:'dotted',
    },
    dropdownStyle:{
        width:width-20,
        left:0,

    },
    pickerStyle:{
        width:width-20,
        backgroundColor:'#DBEDEF',
        borderRadius:5,
        // alignSelf:'center'

    },
    drop:{
        borderRadius:5,
        backgroundColor:'#F3F5F6',
        height:40,
        alignSelf:'center',
        justifyContent:'center',
        // marginTop:20,
        paddingLeft:5,
        paddingBottom: 19,
        marginRight:9,
        borderWidth:0.09,
        borderColor: '#333333',

    },
    itemTextStyle:{
        width:width,
        height:28,

    },
    itemStyle:{
        padding: 10,
        marginTop: 2,
        backgroundColor: '#DCF6FF',
        borderColor: '#333333',
        borderWidth: 0.09,
        borderRadius: 5,
      },
      textLabel:{
          color:'#8E8E8E',
          marginLeft:6,
        }
})