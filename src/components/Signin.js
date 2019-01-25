import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { ScreenName } from 'config'
class Signin extends React.Component {
    render(){
        return (
            <View style={styles.content}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
                <View style={{height: "60%"}}>
                    <Image 
                        style={styles.logo}
                        source={images.shino} />
                    <Text style={styles.slogan}>好きな人 が いる こと</Text>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate(ScreenName.Signup)}
                        style={styles.btnSignup}>
                        <Text style={styles.textSignup}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnLogin}>
                        <Text style={styles.textLogin}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}
export default connect()(Signin)

