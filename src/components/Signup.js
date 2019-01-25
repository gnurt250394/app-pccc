import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'

class Signup extends React.Component {
    state = {
        fullname: "",
        username: "",
        password: "",
        rePassword: "",
    }
    _signup = async () => {
        if(
            this.state.fullname == "" || 
            this.state.username == "" || 
            this.state.password == "" 
        ){
            Alert.alert("Vui lòng nhập đủ thông tin");
        }else if(this.state.password != this.state.rePassword){
            Alert.alert("Mật khẩu nhập lại không đúng");
        }else{
            // something here
            let data = await signup({
                fullname: this.state.fullname,
                username: this.state.username,
                password: this.state.password,
            })
            console.log('data: ', data);
        }
    }
    render(){
        return (
            <View style={styles.content}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
                <View style={{height: "60%"}}>
                    <Image 
                        style={styles.logo}
                        source={images.shino} />
                    <Text style={[styles.slogan, {marginBottom: '20%'}]}>好きな人 が いる こと</Text>

                    <TextInput 
                        placeholder="Fullname"
                        placeholderTextColor="#717171"
                        onChangeText={fullname => this.setState({fullname})}
                        style={styles.input} />
                    <TextInput 
                        placeholder="Username"
                        placeholderTextColor="#717171"
                        onChangeText={username => this.setState({username})}
                        style={styles.input} />
                    <TextInput 
                        placeholder="Password"
                        placeholderTextColor="#717171"
                        keyboardType="default"
                        secureTextEntry={true}
                        onChangeText={password => this.setState({password})}
                        style={styles.input} />
                    <TextInput 
                        placeholder="Password confirm"
                        placeholderTextColor="#717171"
                        keyboardType="default"
                        secureTextEntry={true}
                        onChangeText={rePassword => this.setState({rePassword})}
                        style={styles.input} />
                    
                    <TouchableOpacity style={styles.btnSignup} onPress={this._signup}>
                        <Text style={styles.textSignup}>Sign Up</Text>
                    </TouchableOpacity>
                    
                </View>
                
            </View>
        )
    }
}
export default connect()(Signup)
