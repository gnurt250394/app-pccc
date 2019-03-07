import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { signup } from 'config/apis/users'
import { Slide, ViewMore } from 'components'
import { toPrice , toUpperCase, color} from 'config'
import { ViewAllProductScreen, ProfileScreen, ContactsScreen } from 'config/screenNames'
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
            Chuyển bình tới gần địa điểm cháy. Lắc xóc vài lần, giật chốt hãm kẹp trì, chọn đầu hướng gió hướng...`,
            quantity: 1000,
            sell: 500
        }
    }

    // set status bar
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(color);
        });
      }
    
    componentWillUnmount() {
        this._navListener.remove();
    }
    render(){
        return (
            <View style={style.flex}>
                <ScrollView>
                    <View style={[style.row, {backgroundColor: color}]}>
                        <TouchableOpacity onPress={this._goBack} >
                            <Image 
                                style={[styles.icon, style.iconBack]}
                                source={images.backLight} />
                        </TouchableOpacity>
                        <Text style={style.headText}>Chi tiết sản phẩm</Text>
                        <TouchableOpacity onPress={() =>  null} >
                                <Image 
                                    style={[styles.icon, style.iconShare]}
                                    source={images.share} />
                        </TouchableOpacity>
                    </View>
                    <Slide />
                    <Text style={style.name}>{this.state.name}</Text>
                    <View style={style.calender}>
                        <Text style={style.price}>{toPrice(this.state.price)}</Text>

                        <View style={style.row}>

                            <Text style={style.quantity}>Số lượng: {this.state.quantity}</Text>
                            <Text style={style.sell}>Đã bán: {this.state.sell}</Text>
                        </View>
                    </View>

                    <View style={style.detail}>
                        <View style={style.box}>
                            <Text style={style.dLabel}>Thương hiệu: </Text>
                            <Text style={style.dValue}>{this.state.created_at}</Text>
                        </View>
                        <View style={style.box}>
                            <Text style={style.dLabel}>Năm sản xuất: </Text>
                            <Text style={style.dValue}>{this.state.created_at}</Text>
                        </View>
                        <View style={style.box}>
                            <Text style={style.dLabel}>Tình trạng: </Text>
                            <Text style={style.dValue}>{this.state.created_at}</Text>
                        </View>
                        <View style={style.box}>
                            <Text style={style.dLabel}>Xuất sứ: </Text>
                            <Text style={style.dValue}>{this.state.created_at}</Text>
                        </View>
                        <View style={style.box}>
                            <Text style={style.dLabel}>Tiêu chuẩn: </Text>
                            <Text style={style.dValue}>{this.state.created_at}</Text>
                        </View>
                    </View>
                    <Text style={style.descLabel}>Mô tả: </Text>
                    <Text style={style.descValue}>{this.state.description}</Text>
                    
                    <View style={[styles.row, style.heading]}>
                        <Text style={style.moreLabel}>Sản phẩm tương tự</Text>
                        <ViewMore 
                            onPress={this._navTo(ViewAllProductScreen, {title: "Sản phẩm tương tự"})}
                            title='Xem tất cả'/>
                    </View>
                    <ListItem data={data} navigation={this.props.navigation} />
                </ScrollView>

                <View style={style.tabs}>
                    <TouchableOpacity 
                            onPress={this._navTo(ProfileScreen)}
                            style={style.tabBtn}>
                        <Image 
                            style={[styles.icon, style.iconMsg]}
                            source={images.messenger} />
                        <Text 
                            onPress={this._navTo(ProfileScreen)}
                            style={style.tabLabel}>{toUpperCase('Mua ngay')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                            onPress={this._navTo(ContactsScreen)}
                            style={[style.tabBtn, style.bg]}>
                        <Image 
                            style={[styles.icon, style.iconPhone]}
                            source={images.phoneLight} />
                        <Text 
                            // onPress={this._navTo(ContactsScreen)}
                            style={[style.tabLabel, style.white]}>{toUpperCase('Gọi điện')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _navTo = (screen, params = {} ) => () => {
        this.props.navigation.navigate(screen, params)
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

}
export default connect()(ProductDetail)

const style = StyleSheet.create({
    icon: {width: 30, resizeMode: 'contain', marginLeft: 10, marginRight: 10},
    iconNext: {width: 10, resizeMode: 'contain', marginLeft: 10, marginRight: 10},
    label: {color: '#585858', fontSize: 16, flex: 1, paddingTop: 5},
    headText: {fontSize: 20, color: '#fff', flex: 1, textAlign: 'center', fontWeight: 'bold',},
    heading: {justifyContent: 'space-between', padding: 8, alignContent:'center', paddingBottom: 0},
    tabs: {flexDirection: "row", borderTopWidth: 1, borderTopColor: color,},
    tabBtn: {flex: 1,  justifyContent: 'center', alignItems: 'center', flexDirection: 'row'},
    tabLabel: { color: color, fontWeight: 'bold',alignSelf: 'center',  textAlign:'center', paddingLeft: 8, fontSize: 12, padding: 0},
    detail: {borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 8, marginLeft: 10, marginRight: 10},
    dLabel: {color:'#555555', fontSize: 14},
    dValue: {color:'#333333', fontSize: 14, fontWeight: 'bold'},
    row: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    name: {color:'#1B1B1B', fontSize: 16, fontWeight: 'bold', paddingLeft: 10,paddingTop: 10},
    calender: {justifyContent: 'space-around', flexDirection: 'row',  alignItems: 'center',  padding: 10, margin: 0},
    descLabel: {color:'#333333', fontSize: 16, fontWeight: 'bold', paddingLeft: 10,paddingTop: 10},
    descValue: {color:'#555555', fontSize: 14, padding: 8,},
    moreLabel: {fontSize: 16, fontWeight: 'bold', color:'#333333'},
    flex: {flex: 1},
    iconBack: {margin: 10, width: 10},
    iconShare: {margin: 10, height: 18},
    iconPhone: {alignSelf: 'center', height: 18},
    price: {color:'#FC6463', fontSize: 14,  flex: 1},
    quantity: {color:'#999999', fontSize: 12},
    sell: {color:'#999999', fontSize: 12, paddingLeft: 10},
    box: {flexDirection: 'row', paddingBottom: 8,},
    bg: { backgroundColor: color},
    iconMsg: {alignSelf: 'center', height: 40, width: 20,},
    white: {color: '#fff'}
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