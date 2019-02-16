import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Slide, ViewMore } from 'layout'
import { ScreenName, toPrice , toUpperCase} from 'config'
import ListItem from './ListItem'
let width = Dimensions.get('window').width
class ProductDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'Bình chữa cháy ABC',
            created_at: '5 gio truoc',
            price: 150000,
            description: 'Dữ liệu, xu hướng quan trọng và thông tin chi tiết đối tượng được tổng hợp, ẩn danh về những người tương tác với ứng dụng của bạn.'
        }
    }
    render(){
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <ScrollView>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                            <Image 
                                style={[styles.icon, {margin: 10, width: 10}]}
                                source={images.back} />
                        </TouchableOpacity>
                        <Text style={{fontSize: 20, color: '#333333', flex: 1, textAlign: 'center', fontWeight: 'bold',}}>Chi tiết sản phẩm</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                            {/* <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity onPress={() =>  null} >
                                    <Image 
                                        style={[styles.icon, {margin: 10,}]}
                                        source={images.cartRed} />
                                </TouchableOpacity>
                                <Text style={styles.badge}>20</Text>
                            </View> */}
                            

                            <TouchableOpacity onPress={() =>  null} >
                                <Image 
                                    style={[styles.icon, {margin: 10, height: 18}]}
                                    source={images.share} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Slide />
                    <Text style={{color:'#1B1B1B', fontSize: 16, fontWeight: 'bold', paddingLeft: 10,paddingTop: 10}}>{this.state.name}</Text>
                    <View style={{justifyContent: 'space-around', flexDirection: 'row',  alignItems: 'center',  padding: 10, margin: 0}}>
                        <Text style={{color:'#FC6463', fontSize: 14,  flex: 1}}>{toPrice(this.state.price)}</Text>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                            <TouchableOpacity onPress={() =>  null} >
                                <Image 
                                    style={[styles.icon, {marginRight: 10, height: 18}]}
                                    source={images.calender} />
                            </TouchableOpacity>

                            <Text style={{color:'#707070', fontSize: 12}}>{this.state.created_at}</Text>
                        </View>
                    </View>

                    <View style={{borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 8, marginLeft: 10, marginRight: 10}}>
                        <View style={{flexDirection: 'row', paddingBottom: 8,}}>
                            <Text style={{color:'#707070', fontSize: 14}}>Thương hiệu: </Text>
                            <Text style={{color:'#1B1B1B', fontSize: 14, fontWeight: 'bold'}}>{this.state.created_at}</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 8,}}>
                            <Text style={{color:'#707070', fontSize: 14}}>Năm sản xuất: </Text>
                            <Text style={{color:'#1B1B1B', fontSize: 14, fontWeight: 'bold'}}>{this.state.created_at}</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 8,}}>
                            <Text style={{color:'#707070', fontSize: 14}}>Tình trạng: </Text>
                            <Text style={{color:'#1B1B1B', fontSize: 14, fontWeight: 'bold'}}>{this.state.created_at}</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 8,}}>
                            <Text style={{color:'#707070', fontSize: 14}}>Xuất sứ: </Text>
                            <Text style={{color:'#1B1B1B', fontSize: 14, fontWeight: 'bold'}}>{this.state.created_at}</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 8,}}>
                            <Text style={{color:'#707070', fontSize: 14}}>Tiêu chuẩn: </Text>
                            <Text style={{color:'#1B1B1B', fontSize: 14, fontWeight: 'bold'}}>{this.state.created_at}</Text>
                        </View>
                    </View>
                    <Text style={{color:'#1B1B1B', fontSize: 16, fontWeight: 'bold', paddingLeft: 10,paddingTop: 10}}>Mô tả: </Text>
                    <Text style={{color:'#707070', fontSize: 14, padding: 8,}}>{this.state.description}</Text>
                    
                    <View style={[styles.row, style.heading]}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color:'#1B1B1B'}}>Sản phẩm tương tự</Text>
                        <ViewMore title='Xem tất cả'/>
                    </View>
                    <ListItem data={data} />
                </ScrollView>

                <View style={style.footer}>
                    <View style={{}}>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate(ScreenName.Profile)}
                            style={style.btn}>
                            <Image 
                                style={[styles.icon, {alignSelf: 'center'}]}
                                source={images.messenger} />
                        </TouchableOpacity>
                        <Text 
                            onPress={() => this.props.navigation.navigate(ScreenName.Profile)}
                            style={{backgroundColor: '#FB3C30', width: '50%',color: '#fff', fontWeight: 'bold',alignSelf: 'center',  textAlign:'center', padding: 10 }}>{toUpperCase('Mua ngay')}</Text>
                    
                    </View>
                    <View style={{}}>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate(ScreenName.Profile)}
                            style={style.btn}>
                            <Image 
                                style={[styles.icon, {alignSelf: 'center'}]}
                                source={images.phoneLight} />
                        </TouchableOpacity>
                        <Text 
                            onPress={() => this.props.navigation.navigate(ScreenName.Profile)}
                            style={{backgroundColor: '#FB3C30', width: '50%',color: '#fff', fontWeight: 'bold',alignSelf: 'center',  textAlign:'center', padding: 10 }}>{toUpperCase('Mua ngay')}</Text>
                    
                    </View>
                </View>
            </View>
        )
    }
}
export default connect()(ProductDetail)

const style = StyleSheet.create({
    icon: {width: 30, resizeMode: 'contain', marginLeft: 10, marginRight: 10},
    iconNext: {width: 10, resizeMode: 'contain', marginLeft: 10, marginRight: 10},
    label: {color: '#585858', fontSize: 16, flex: 1, paddingTop: 5},
    title: {color: '#fff', fontSize: 20, alignSelf: 'center', fontWeight: "bold", paddingTop: 15 },
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center', paddingBottom: 0},
    footer: {flexDirection: "row", borderTopWidth: 1, borderTopColor: '#FEE6E5', },
    btn: {flex: 1, borderRightWidth: 1, borderRightColor: '#FEE6E5', alignContent: 'center', padding: 0,}
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