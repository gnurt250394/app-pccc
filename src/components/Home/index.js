import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Footer, ViewMore } from '../layout'
import { ScreenName } from 'config'
import ListItem from './ListItem'
let width = Dimensions.get('screen').width
let data = [
    {
        id: 1,
        name: 'Bình chữa cháy 1',
        price: 220000,
        like: false
    },
    {
        id: 2,
        name: 'Bình chữa cháy 2',
        price: 220000,
        like: true
    },
    {
        id: 3,
        name: 'Bình chữa cháy 3',
        price: 220000,
        like: false
    },
    {
        id: 4,
        name: 'Bình chữa cháy 4',
        price: 220000,
        like: false
    },
]
class HomeScreen extends React.Component {
    render(){
        return (
            <View style={{}}>
                <ScrollView>
                    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                    <Image 
                        style={[styles.icon, {margin: 10}]}
                        source={images.menu} />
                    <Image 
                        style={{width: width, resizeMode: 'contain', marginBottom: 10 }}
                        source={images.gas} />
                    <View style={[styles.row, style.heading]}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sản phẩm nổi bật</Text>
                        <ViewMore />
                    </View>
                    <ListItem data={data} />
                    <View style={[styles.row, style.heading]}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sản phẩm mới nhất</Text>
                        <ViewMore />
                    </View>
                    <ListItem data={data} />
                    <View style={[styles.row, style.heading]}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sản phẩm bán chạy</Text>
                        <ViewMore />
                    </View>
                    <ListItem data={data} />
                </ScrollView>
            </View>
        )
    }
}
export default connect()(HomeScreen)

const style = StyleSheet.create({
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'}
})
