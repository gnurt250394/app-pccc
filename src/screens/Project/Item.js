import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,TouchableOpacity,Animated,Easing ,Dimensions} from 'react-native';
import images from "assets/images"
const {width} = Dimensions.get('window')
class ListItem extends Component{
    render(){
        return this.props.name? <View style={styles.Square}>
                 <Image source={this.props.source}
                     style={styles.image}
                     resizeMode="contain"
                 />
                 <View style={{flexWrap:'wrap',flexShink:5}}>
                 <Text style={styles.txt} >
                 {this.props.name}</Text>
                 </View>  
             </View>
        : null
    }
}
export default class Item extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        show:false,
        checked:true,
        numberOfLines:1
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
            show:false,
            numberOfLines:1
        })
    } else{
        this._rolate(1)
        this.setState({
            show:true,
            numberOfLines:null
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
               {this.props.index == 0?null: <View
                style={styles.end}
                    />}
                <View style={styles.rowList}>
                {this.props.item.follow ==1?<TouchableOpacity 
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
                <Text numberOfLines={this.state.numberOfLines} style={styles.user_name}>{this.props.item.user_name}</Text>
                <Animated.Image source={images.icon_up}
                resizeMode="contain"
                    style={[{transform:[{rotate}]},styles.ticker]}
                />
                </TouchableOpacity>
            </View>
            {show?<View style={styles.container}>
            <ListItem source={images.proEmail} name={this.props.item.user_email}/>
            <ListItem source={images.proPhone} name={this.props.item.user_phone}/>
            <ListItem source={images.proFax} name={this.props.item.user_fax}/>
            <ListItem source={images.proLocation} name={this.props.item.user_address}/>
            <ListItem source={images.proCompany} name={this.props.item.user_company}/>
            <ListItem source={images.proPosition} name={this.props.item.user_position}/>
            <ListItem source={images.proSub} name={this.props.item.user_sub}/>
            </View> : null}
            
            </View>
    );
  }
}

const styles = StyleSheet.create({
    containerList:{
        flex:1,
        marginTop: 10,
    },
    user_name:{
        width:'90%',
        fontWeight:'500',
        color:'#333333'
    },
    txt:{
        color:'#333131',
        fontSize:13,
        // textAlign:'center'
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
        marginTop:9
    },
    image:{
        height:10,
        width:10,
        // tintColor:'gray',
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
        width:30,
        height:30
    }
})