import React, { Component } from 'react';
import {TouchableWithoutFeedback,StyleSheet,ImageBackground,StatusBar } from 'react-native';
import images from "assets/images"
import { HelloScreen } from 'config/screenNames';
import { color } from 'config'
export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
            this.state = {
        };
    }
    componentDidMount(){
        setTimeout(()=>{
                this.props.navigation.navigate(HelloScreen)
        }, 2 * 1000)
    }
  render() {
    return (
        <TouchableWithoutFeedback style= { styles.container} onPress={() =>this.props.navigation.navigate(HelloScreen)}>
            <ImageBackground 
                style={styles.container}
                source={images.splash} resizeMode="stretch">
                <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
