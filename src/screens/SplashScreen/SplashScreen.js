import React, { Component } from 'react';
import {TouchableWithoutFeedback,StyleSheet,ImageBackground,StatusBar, Image } from 'react-native';
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
        }, 3 * 1000)
    }
    render() {
        return (
            <TouchableWithoutFeedback style= {styles.flex} onPress={() =>this.props.navigation.navigate(HelloScreen)}>
                <ImageBackground 
                    style={styles.container}
                    source={images.spBg} resizeMode="stretch">
                    <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
                    <Image source={images.spLogo} style={styles.logo} />
                    <Image source={images.spSlogan} style={styles.slogan} />
                </ImageBackground>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container:{  flex:1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' },
    logo: {height: 110, resizeMode: 'contain', alignSelf: 'center', marginTop: -100,},
    slogan: {width: 130, resizeMode: 'contain', alignSelf: 'center',},
    flex:  {flex: 1}
})
