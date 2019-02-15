import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Footer, ViewMore } from '../layout'
import { ScreenName } from 'config'
import FastImage  from 'react-native-fast-image'
import Swiper from 'react-native-swiper'
import ListItem from './ListItem'
let {width,height} = Dimensions.get('window')
// this.props.navigation.openDrawer();
const list = [{image:'https://i.imgur.com/FxBPgGV.jpg',id:1},
{image:'https://c1.staticflickr.com/2/1847/44150042641_985d8586b0_b.jpg',id:2},
{image:'https://s3.anhdep24.net/images/2018/04/13/83584059240aa42353c_afebb6b58f984022a134a3fd49e11fac.jpg',id:3},
{image:'http://cms.sao360.vn/Uploads/tranquyen/06-03-2018/06032018-055046-043-1.jpg',id:4}]

class HomeScreen extends React.Component {
    mapImage=()=>{
        return(
            list.map((data)=>{
                return(
                    <FastImage key={data.id} source={{uri:data.image}}
                        style={{height:'100%',width:'100%'}}
                    />
                )
            })
        )
      
    }
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
                    <Swiper autoplay={true}
                    showsButtons={false}
                    height={height/3}>
                   {this.mapImage()}
                    </Swiper>
                   
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