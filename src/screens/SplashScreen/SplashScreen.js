import React, { Component } from 'react';
import {TouchableWithoutFeedback,StyleSheet,ImageBackground,StatusBar, Image,AsyncStorage } from 'react-native';
import images from "assets/images"
import { HelloScreen, HomeScreen } from 'config/screenNames';
import navigation from 'navigation/NavigationService'
import { getInfoAcount } from 'config/apis/users';
import { connect } from 'react-redux'
import { Status } from 'config/Controller';
import { updateUserAction } from 'reduxs/actions/actionCreator';
class SplashScreen extends Component {
    constructor(props) {
        super(props);
            this.state = {
        };
    }
  
    componentDidMount = async()=>{
      
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('#179ECE');
        });

        let token = await AsyncStorage.getItem('token')
        let Remember = await AsyncStorage.getItem('Remember')
        if(token){
            this.getDetail()
            setTimeout(()=>{
                navigation.reset(HomeScreen)
            }, 2000)
            
        } else if(Remember){
            setTimeout(()=>{
                navigation.reset(HomeScreen)
            }, 2000)
        } else{
            setTimeout(()=>{
                navigation.reset(HelloScreen)
            }, 3000)
        }
       
    }
    getDetail = () => {

        getInfoAcount().then(res => {
              console.log(res, 'dadads')
              if (res.data.code == Status.SUCCESS) {
                   const data = res.data.data;
                    this.props.updateUsers(data)                  
              } else if (res.data.code == Status.ID_NOT_FOUND) {
                    this.setState({ loading: false, Liquidation: {}, loading: false })
              }
        }).catch(err => {
              this.setState({ loading: false })
        })
  }
   
    
    componentWillUnmount() {
        this._navListener.remove();
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
const mapStateToProps = (state) => {
  return{
      
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    updateUsers:(data)=>dispatch(updateUserAction(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SplashScreen)