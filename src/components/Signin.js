import React from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { ScreenName, toUpperCase } from 'config'
class Signin extends React.Component {
    state = {
        username: '',
        password: '',
    }
    render(){
        AsyncStorage.getItem('test').then(console.log)
        return (
            <View style={styles.content}>
                <View style={{height: "100%"}}>
                    <Image 
                        style={styles.logo}
                        source={images.logo} />
                    <Text style={[styles.slogan, { color: '#DA0006'}]}>{toUpperCase('Fire Protection')}</Text>

                    <View style={styles.inputBox}>
                        <Image 
                            style={[styles.icon]}
                            source={images.user} />
                        <TextInput 
                            placeholder="Tài khoản"
                            placeholderTextColor="#DADADA"
                            onChangeText={username => this.setState({username})}
                            style={styles.loginInput} />
                    </View>

                    <View style={styles.inputBox}>
                        <Image 
                            style={[styles.icon]}
                            source={images.key} />
                        <TextInput 
                            placeholder="Mật khẩu"
                            placeholderTextColor="#DADADA"
                            keyboardType="default"
                            secureTextEntry={true}
                            onChangeText={password => this.setState({password})}
                            style={styles.loginInput} />
                    </View>
                    
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate(ScreenName.Signup)}
                        style={styles.btnLogin}>
                        <Text style={styles.textLogin}>{toUpperCase("Đăng nhập")}</Text>
                    </TouchableOpacity>

                    <Text style={styles.forgot}>Quyên mật khẩu</Text>
                    
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate(ScreenName.Signup)}
                        style={[styles.btnLogin, { backgroundColor: '#3A5A97'}]}>
                        <Text style={[styles.textLogin]}>{toUpperCase("Đăng nhập với facebook")}</Text>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row', alignContent: 'center', textAlign: 'center', justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'gray'}}>Bạn chưa có tài khoản?</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'red', marginLeft: 10}}>Đăng ký</Text>
                    </View>
                </View>
                
            </View>
        )
    }
}
export default connect()(Signin)

