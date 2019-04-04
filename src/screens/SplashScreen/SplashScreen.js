import React, { Component } from 'react';
import {TouchableWithoutFeedback,StyleSheet,ImageBackground,StatusBar, Image,AsyncStorage } from 'react-native';
import images from "assets/images"
import { HelloScreen, HomeScreen } from 'config/screenNames';
import navigation from 'navigation/NavigationService'
export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
            this.state = {
        };
    }
  
    componentDidMount = async()=>{
        // this._navListener = this.props.navigation.addListener('didFocus', () => {
        //     StatusBar.setBarStyle('light-content');
        //     StatusBar.setBackgroundColor('#179ECE');
        // });

        let token = await AsyncStorage.getItem('token')
        let Remember = await AsyncStorage.getItem('Remember')
        if(token){
            setTimeout(()=>{
                navigation.reset(HomeScreen)
            }, 2000)
            
        } else if(Remember){
            setTimeout(()=>{
                navigation.reset(HomeScreen)
            }, 2000)
        } else{
            setTimeout(()=>{
                navigation.navigate(HelloScreen)
            }, 3000)
        }
       
    }

    // set status bar
    componentDidMount() {
        // this._navListener = this.props.navigation.addListener('didFocus', () => {
        //   StatusBar.setBarStyle('light-content');
        //   StatusBar.setBackgroundColor(color);
        // });
    }
    
    componentWillUnmount() {
        // this._navListener.remove();
    }

    render() {
        return (
            <TouchableWithoutFeedback style= {styles.flex} onPress={this._navTo(HomeScreen)}>
                <ImageBackground 
                    style={styles.container}
                    source={images.spBg} resizeMode="stretch">
                    <Image source={images.spLogo} style={styles.logo} />
                    <Image source={images.spSlogan} style={styles.slogan} />
                </ImageBackground>
            </TouchableWithoutFeedback>
        );
    }

    _navTo = screen => () => {
        this.props.navigation.navigate(screen)
    }

}

const styles = StyleSheet.create({
    container:{  flex:1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' },
    logo: {height: 110, resizeMode: 'contain', alignSelf: 'center', marginTop: -100,},
    slogan: {width: 130, resizeMode: 'contain', alignSelf: 'center',},
    flex:  {flex: 1}
})
