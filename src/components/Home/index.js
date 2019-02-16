import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Slide, ViewMore } from 'layout'
import { ScreenName } from 'config'
import ListItem from './ListItem'

class HomeScreen extends React.Component {
   
    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>this.props.navigation.closeDrawer()}>
                <ScrollView>
                    <StatusBar backgroundColor="#fff" barStyle="dark-content" />

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity onPress={() =>  this.props.navigation.openDrawer()} >
                            <Image 
                                style={[styles.icon, {margin: 10, width: 18}]}
                                source={images.menu} />
                        </TouchableOpacity>
                        
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                                <Image 
                                    style={[styles.icon, {margin: 10, width: 15}]}
                                    source={images.SearchRed} />
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={() =>  this.props.navigation.openDrawer()} >
                                <Image 
                                    style={[styles.icon, {margin: 10, width: 15}]}
                                    source={images.filter} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Slide />
                   
                    <View style={[styles.row, style.heading]}>
                        <Text style={{fontSize: 20, fontWeight: '500', color: '#333333', fontSize: 18}}>Sản phẩm nổi bật</Text>
                        <ViewMore />
                    </View>
                    <ListItem data={data} navigate={this.props.navigation.navigate} />
                    <View style={[styles.row, style.heading]}>
                        <Text style={{fontSize: 20, fontWeight: '500', color: '#333333'}}>Sản phẩm mới nhất</Text>
                        <ViewMore />
                    </View>
                    <ListItem data={data} navigate={this.props.navigation.navigate} />
                    <View style={[styles.row, style.heading]}>
                        <Text style={{fontSize: 20, fontWeight: '500', color: '#333333'}}>Sản phẩm bán chạy</Text>
                        <ViewMore />
                    </View>
                    <ListItem data={data} navigate={this.props.navigation.navigate} />
                </ScrollView>
            </TouchableWithoutFeedback>
        )
    }
}
export default connect()(HomeScreen)

const style = StyleSheet.create({
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'}
})

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
        price: "liên hệ",
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