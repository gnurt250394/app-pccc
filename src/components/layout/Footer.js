import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import images from "public/images"
import { connect } from 'react-redux'
import { ScreenName } from 'config';

class Footer extends React.Component {
    
    render(){
        return (
            <View style={styles.layout}>
                <TouchableOpacity 
                    onPress={() => this.props.navigate(ScreenName.Profile)}
                    style={styles.btn}>
                    <Image 
                        style={styles.icon}
                        source={images.home} />
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => this.props.navigate(ScreenName.Profile)}
                    style={styles.btn}>
                    <Image 
                        style={styles.icon}
                        source={images.more} />
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => this.props.navigate(ScreenName.Profile)}
                    style={styles.btn}>
                    <Image 
                        style={styles.icon}
                        source={images.search} />
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => this.props.navigate(ScreenName.Profile)}
                    style={styles.btn}>
                    <Image 
                        style={styles.icon}
                        source={images.cart} />
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => this.props.navigate(ScreenName.Profile)}
                    style={styles.btn}>
                    <Image 
                        style={styles.icon}
                        source={images.user} />
                </TouchableOpacity>
                
            </View>
        )
    }
}

export default connect()(Footer)

const styles = StyleSheet.create({
    icon: {width: 30, height: 30, },
    btn: {
        padding: 10,
    },
    layout: {flexDirection: "row", borderTopColor: '#ddd', borderTopWidth: 1, justifyContent: "space-between"}
})