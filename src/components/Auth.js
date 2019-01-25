import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import styles from "public/css" 
import images from "public/images" 
import { ScreenName } from "config"
import { signup } from 'config/api'
class Auth extends React.Component {
    _login = async () => {
        let user = await signup();
        console.log('user: ', user);

    }
    render(){
        return (
            <View style={styles.content}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
                <View style={{height: "60%"}}>
                    <Image 
                        style={styles.logo}
                        source={images.shino} />
                    <Text style={styles.slogan}>好きな人 が いる こと</Text>
                    <TouchableOpacity style={styles.btnSignup} onPress={() => this.props.navigation.navigate(ScreenName.Signup)}>
                        <Text style={styles.textSignup}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnLogin} onPress={this._login}>
                        <Text style={styles.textLogin}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}
export default connect()(Auth)
