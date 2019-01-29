import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Footer, ViewMore } from '../layout'
import { ScreenName } from 'config'

class HomeScreen extends React.Component {
    render(){
        return (
            <View style={{flex: 1, flexDirection:'column'}}>
                <ScrollView>
                    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                    <Image 
                        style={{width: 20, height: 20, margin: 15 }}
                        source={images.menu} />
                    <View style={[styles.row, style.heading]}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sản phẩm nổi bật</Text>
                        <ViewMore />
                    </View>
                    <View style={[styles.row, style.heading]}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sản phẩm mới nhất</Text>
                        <ViewMore />
                    </View>
                    <View style={[styles.row, style.heading]}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sản phẩm bán chạy</Text>
                        <ViewMore />
                    </View>
                </ScrollView>
                
                {/* <Footer navigate={this.props.navigation.navigate} name={ScreenName.HomeScreen}/> */}
            </View>
        )
    }
}
export default connect()(HomeScreen)

const style = StyleSheet.create({
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'}
})
