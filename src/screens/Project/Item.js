import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,TouchableOpacity,Animated,Easing ,Dimensions} from 'react-native';
import images from "assets/images"
const {width} = Dimensions.get('window')
class ListItem extends Component{
    render(){
        return this.props.name? <View style={styles.Square}>
                 
                 <Text style={styles.txt} >
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
        show:false,
        checked:true,
    };
    this.rotate = new Animated.Value(0)
  }
  _rolate=(value)=>{
    Animated.spring(
      this.rotate,
      {
        toValue: value,
        duration: 1000,
        // easing: Easing.bounce
      }
    ).start()
  }

 
showList=()=>{
    if(this.state.show){
        this._rolate(0)
        this.setState({
            show:false
        })
    } else{
        this._rolate(1)
        this.setState({
            show:true
        })
    }
   
}
  render() {
      let {show} = this.state
      const rotate = this.rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '0deg']
      })
    return (
                <View style={styles.containerList}>
                <View style={styles.rowList}>
                {this.props.item.checked?<TouchableOpacity 
                    style={styles.buttonTicker}
                    onPress={this.props.onPressCheck}
                >
                <Image source={images.icon_ticker}
                    style={styles.ticker}
                />
                </TouchableOpacity>
                :
                <TouchableOpacity 
                    onPress={this.props.onPressUncheck}
                    style={styles.buttonTicker}>
                <Image source={images.unselect}
                    style={styles.ticker}
                />
                </TouchableOpacity>}
                <TouchableOpacity style={styles.button}
                onPress={this.showList}
                >
                <Text style={{fontSize:15,fontWeight:'500',color:'#333333'}}>{this.props.item.user_name}</Text>
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
            <View
                style={styles.end}
            />
            </View>
    );
  }
}

const styles = StyleSheet.create({
    containerList:{
        flex:1,
        marginTop: 10,
    },
    txt:{
        color:'#333131',
        fontSize:13
    },
    end:{
        height:0.6,
        width,
        backgroundColor: '#CCCCCC',
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