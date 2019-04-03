import React, { PureComponent } from 'react';
import { View, Text,Image,StyleSheet,Dimensions,TouchableOpacity,TextInput } from 'react-native';
const {width} = Dimensions.get('window')
export default class Item extends PureComponent {
 

  render() {
   if(this.props.edit ==1 ) {
       return (
        <TouchableOpacity style={[styles.containerColum,{marginTop:8}]}
        onPress={this.props.onPress}
        >
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
      <View style={[styles.end,{...this.props.style}]}/>
      </TouchableOpacity>
      )} else {
        return(
            <View style={styles.containerColum}
            onPress={this.props.onPress}
            >
        <View style={styles.container}>
        <View style={styles.containerRow}>
        <Image
            source={this.props.source}
            style={styles.image}
            resizeMode="contain"
        />
            <Text>{this.props.title}</Text>
            </View>
            <TextInput 
            value={this.props.name}
            placeholder={this.props.placeholder}
            style={styles.txtInput}></TextInput>
        </View>
        <View style={styles.end2}/>
        </View>
        )
      }
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    containerColum:{
        flex:1,
    },
    end:{
        height:0.5,
        width,
        backgroundColor: '#CCCCCC',
        marginTop: 10,
    },
    end2:{
        height:0.5,
        width,
        backgroundColor: '#CCCCCC',
        // marginVertical: 14,
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
    },
    txtInput:{
        height:38,
        textAlign:'right',
        paddingRight:6
    }
})