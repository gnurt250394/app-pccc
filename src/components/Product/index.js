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
            name: 'Bình chữa cháy ABC 4Kg FSB-4L Firestar',
            created_at: '5 gio truoc',
            price: 150000,
            description: `Khi phát hiện có hỏa hoạn xảy ra, ngay lập tức hãy di chuyển bình cứu hỏa đến gần đám cháy trong phạm vi chữa cháy của bình:
            Chuyển bình tới gần địa điểm cháy. Lắc xóc vài lần, giật chốt hãm kẹp trì, chọn đầu hướng gió hướng...`
        }
    }
    render(){
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <ScrollView>
                    <View style={style.row}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                            <Image 
                                style={[styles.icon, {margin: 10, width: 10}]}
                                source={images.back} />
                        </TouchableOpacity>
                        <Text style={style.headText}>Chi tiết sản phẩm</Text>
                        <TouchableOpacity onPress={() =>  null} >
                                <Image 
                                    style={[styles.icon, {margin: 10, height: 18}]}
                                    source={images.share} />
                        </TouchableOpacity>
                    </View>
                    <Slide />
                    <Text style={style.name}>{this.state.name}</Text>
                    <View style={style.calender}>
                        <Text style={{color:'#FC6463', fontSize: 14,  flex: 1}}>{toPrice(this.state.price)}</Text>

                        <View style={style.row}>
                            <TouchableOpacity onPress={() =>  null} >
                                <Image 
                                    style={[styles.icon, {marginRight: 10, height: 18}]}
                                    source={images.calender} />
                            </TouchableOpacity>

                            <Text style={{color:'#999999', fontSize: 12}}>{this.state.created_at}</Text>
                        </View>
                    </View>

                    <View style={style.detail}>
                        <View style={{flexDirection: 'row', paddingBottom: 8,}}>
                            <Text style={style.dLabel}>Thương hiệu: </Text>
                            <Text style={style.dValue}>{this.state.created_at}</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 8,}}>
                            <Text style={style.dLabel}>Năm sản xuất: </Text>
                            <Text style={style.dValue}>{this.state.created_at}</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 8,}}>
                            <Text style={style.dLabel}>Tình trạng: </Text>
                            <Text style={style.dValue}>{this.state.created_at}</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 8,}}>
                            <Text style={style.dLabel}>Xuất sứ: </Text>
                            <Text style={style.dValue}>{this.state.created_at}</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 8,}}>
                            <Text style={style.dLabel}>Tiêu chuẩn: </Text>
                            <Text style={style.dValue}>{this.state.created_at}</Text>
                        </View>
                    </View>
                    <Text style={style.descLabel}>Mô tả: </Text>
                    <Text style={style.descValue}>{this.state.description}</Text>
                    
                    <View style={[styles.row, style.heading]}>
                        <Text style={style.moreLabel}>Sản phẩm tương tự</Text>
                        <ViewMore title='Xem tất cả'/>
                    </View>
                    <ListItem data={data} />
                </ScrollView>

                <View style={style.tabs}>
                    <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate(ScreenName.Profile)}
                            style={style.tabBtn}>
                        <Image 
                            style={[styles.icon, {alignSelf: 'center', width: 25}]}
                            source={images.messenger} />
                        <Text 
                            onPress={() => this.props.navigation.navigate(ScreenName.Profile)}
                            style={style.tabLabel}>{toUpperCase('Mua ngay')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate(ScreenName.Profile)}
                            style={[style.tabBtn, { backgroundColor: '#F55555'}]}>
                        <Image 
                            style={[styles.icon, {alignSelf: 'center', width: 12}]}
                            source={images.phoneLight} />
                        <Text 
                            onPress={() => this.props.navigation.navigate(ScreenName.Profile)}
                            style={[style.tabLabel, {color: '#fff'}]}>{toUpperCase('Liên hệ')}</Text>
                    </TouchableOpacity>
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
    headText: {fontSize: 20, color: '#333333', flex: 1, textAlign: 'center', fontWeight: 'bold',},
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center', paddingBottom: 0},
    tabs: {flexDirection: "row", borderTopWidth: 1, borderTopColor: '#F55555',},
    tabBtn: {flex: 1,  justifyContent: 'center', alignItems: 'center', flexDirection: 'row'},
    tabLabel: { color: '#F55555', fontWeight: 'bold',alignSelf: 'center',  textAlign:'center', paddingLeft: 8, fontSize: 12, padding: 0},
    detail: {borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 8, marginLeft: 10, marginRight: 10},
    dLabel: {color:'#555555', fontSize: 14},
    dValue: {color:'#333333', fontSize: 14, fontWeight: 'bold'},
    row: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    name: {color:'#1B1B1B', fontSize: 16, fontWeight: 'bold', paddingLeft: 10,paddingTop: 10},
    calender: {justifyContent: 'space-around', flexDirection: 'row',  alignItems: 'center',  padding: 10, margin: 0},
    descLabel: {color:'#333333', fontSize: 16, fontWeight: 'bold', paddingLeft: 10,paddingTop: 10},
    descValue: {color:'#555555', fontSize: 14, padding: 8,},
    moreLabel: {fontSize: 16, fontWeight: 'bold', color:'#333333'}
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