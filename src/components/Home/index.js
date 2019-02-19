import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { Slide, ViewMore } from 'layout'
import { ScreenName } from 'config'
import ListItem from './ListItem'
import { DrawerActions } from 'react-navigation-drawer';

class HomeScreen extends React.Component {
   
    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>this.props.navigation.closeDrawer()}>
                <ScrollView>
                    <StatusBar backgroundColor="#fff" barStyle="dark-content" />

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <TouchableOpacity style={{padding: 5}} onPress={() =>  this.props.navigation.dispatch(DrawerActions.toggleDrawer())} >
                            <Image 
                                style={[styles.icon, { height: 18}]}
                                source={images.menu} />
                        </TouchableOpacity>
                        
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                            <TouchableOpacity style={{padding: 5}} onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                                <Image 
                                    style={[styles.icon, { width: 15}]}
                                    source={images.SearchRed} />
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={{padding: 5, marginLeft: 10}} onPress={() =>  this.props.navigation.openDrawer()} >
                                <Image 
                                    style={[styles.icon, { width: 15}]}
                                    source={images.filter} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Slide />
                   
                    <View style={style.heading}>
                        <Text style={style.headingLabel}>Sản phẩm nổi bật</Text>
                        <ViewMore />
                    </View>
                    <ListItem data={data} navigate={this.props.navigation.navigate} />
                    <View style={style.hr}></View>

                    <View style={style.heading}>
                        <Text style={style.headingLabel}>Sản phẩm mới nhất</Text>
                        <ViewMore />
                    </View>
                    <ListItem data={data} navigate={this.props.navigation.navigate} />
                    <View style={style.hr}></View>

                    <View style={style.heading}>
                        <Text style={style.headingLabel}>Sản phẩm bán chạy</Text>
                        <ViewMore />
                    </View>
                    <ListItem data={data} navigate={this.props.navigation.navigate} style={{marginBottom: 8}} />
                </ScrollView>
            </TouchableWithoutFeedback>
        )
    }
}
export default connect()(HomeScreen)

const style = StyleSheet.create({
    heading: {flexDirection: 'row', justifyContent: 'space-between', padding: 8, alignItems:'center', },
    hr: {width: '100%', height: 3, backgroundColor: '#ddd', marginTop: 8, marginBottom: 3},
    headingLabel: {fontSize: 20, fontWeight: '500', color: '#333333', fontSize: 18}
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