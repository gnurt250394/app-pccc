import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,ImageBackground,StatusBar } from 'react-native';
import images from "assets/images"
import { HelloScreen } from 'config/screenNames';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
    componentDidMount(){
        setTimeout(()=>{
                this.props.navigation.navigate(HelloScreen)
        },1000)
    }
  render() {
    return (
             <ImageBackground style={styles.container}
      source={images.splash} resizeMode="stretch">
             <StatusBar backgroundColor="#FCCF31" barStyle="light-content" />
      
      </ImageBackground>
      
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})