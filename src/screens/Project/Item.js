import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,TouchableOpacity,Animated,Easing } from 'react-native';
import images from "assets/images"

class ListItem extends Component{
    render(){
        return this.props.name? <View style={styles.Square}>
                 
                 <Text >
                 <Image source={images.icon_square}
                     style={styles.image}
                     resizeMode="contain"
                 />  {this.props.name}</Text>
             </View>
        : null
    }
}
export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
        show:false
    };
    this.rotate = new Animated.Value(0)
  }
  _rolate=()=>{
    this.rotate.setValue(0)
    Animated.spring(
      this.rotate,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start()
  }

 
showList=()=>{
    if(this.state.show){
        this._rolate()
        this.setState({
            show:false
        })
    } else{
        this._rolate()
        this.setState({
            show:true
        })
    }
   
}
  render() {
      let {show} = this.state
      const rotate = this.rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
      })
    return (
                <View style={styles.containerList}>
                <View style={styles.rowList}>
                <TouchableOpacity style={styles.buttonTicker}>
                <Image source={images.icon_ticker}
                    style={styles.ticker}
                />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                onPress={this.showList}
                >
                <Text style={{fontSize:17,fontWeight:'500'}}>{this.props.item.name}</Text>
                <Animated.Image source={images.icon_up}
                resizeMode="contain"
                    style={[{transform:[{rotate}]},styles.ticker]}
                />
                </TouchableOpacity>
            </View>
            {show?<View style={styles.container}>
            <ListItem name={this.props.item.email}/>
            <ListItem name={this.props.item.phone}/>
            <ListItem name={this.props.item.fax}/>
            <ListItem name={this.props.item.address}/>
            <ListItem name={this.props.item.company}/>
            <ListItem name={this.props.item.position}/>
            <ListItem name={this.props.item.sub}/>
            </View> : null}
            </View>
    );
  }
}

const styles = StyleSheet.create({
    containerList:{
        flex:1,
        marginTop: 19,
    },
    Square:{
        flexDirection:'row',
        marginBottom:10
    },
    ticker:{
        height:14,
        width:14,

    },
    rowList:{
        flexDirection:'row',
        marginBottom:9
    },
    image:{
        height:8,
        width:8,
        tintColor:'gray',
        alignSelf: 'center',
        marginRight: 8,
    },
    container:{
        marginLeft:24
    },
    button:{
        alignItems:'center',
        justifyContent: 'space-between',
        flex:1,
        flexDirection:'row',
        paddingLeft: 7,
    },
    buttonTicker:{
        alignItems:'flex-start',
        justifyContent:'center',
        width:25,
        height:25
    }
})