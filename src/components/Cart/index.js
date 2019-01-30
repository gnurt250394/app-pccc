import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Btn, ViewMore } from '../layout'
import { ScreenName, toPrice, toUpperCase } from 'config'
import { FlatList } from 'react-native-gesture-handler';

class Cart extends React.Component {
    constructor(props){
        super(props);
        var totalPrice = data.map(item => item.price).reduce((prev, next) => prev + next);
        this.state = {
            totalPrice: totalPrice || 0
        }
    }
    
    renderItem = ({item}) => {
        return <View style={style.box}>
            <Image source={images.binhCuuHoa} style={style.image}/>
            <View style={style.content}>
                <Text style={style.name}>{item.name}</Text>
                <Text style={style.price}>{toPrice(item.price)} đ</Text>
                <Text style={style.supplier}>Nhà cung cấp: {item.supplier}</Text>
            </View>
        </View>
    }
    render(){
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                    <Text style={style.heading}>Giỏ hàng</Text>
                    <FlatList 
                        data={data}
                        renderItem={this.renderItem}/>
                <View style={style.totalBox}>
                    <Text style={style.total}>{toUpperCase('Tổng tiền')}:</Text>
                    <Text style={style.total}>{toPrice(this.state.totalPrice)} đ</Text>
                </View>
                
                </ScrollView>
                
                <Btn name={toUpperCase("Thanh toán")} />
            </View>
        )
    }
}
export default connect()(Cart)

const style = StyleSheet.create({
    heading: {textAlign: 'center', padding: 10, paddingTop: 15, fontSize: 20, color: '#FB3C30', borderBottomColor: '#ddd', borderBottomWidth: 2,},
    box: { flex: 1, borderBottomColor: '#ddd', borderBottomWidth: 2, paddingBottom: 20, paddingBottom: 10, flexDirection: 'row',},
    image: {width: 120, height: 120, margin: 10, borderColor: '#ddd', borderWidth: 1},
    boxImage: { borderColor: '#ddd', borderWidth: 1, width: 125, height: 125},
    content: {flex: 1, padding: 10},
    name: { fontSize: 18, fontWeight: 'bold', paddingBottom: 15, color: '#141414'},
    price: { fontSize: 16, fontWeight: '300', paddingBottom: 5, color: '#FB3C30'},
    supplier: { fontSize: 14, fontWeight: '300', paddingBottom: 10, color: '#A7A7A7'},
    totalBox: {flex: 1, flexDirection: 'row', justifyContent: 'space-between'},
    total: {fontSize: 18, fontWeight: 'bold', color: '#FB3C30', padding: 15},
})


let data = [
    {
        id: 1,
        name: 'Bình chữa cháy 1',
        price: 250000,
        like: false,
        supplier: 'lehoangnd'
    },
    {
        id: 2,
        name: 'Bình chữa cháy 2',
        price: 220000,
        like: true,
        supplier: 'lehoangnd'
    },
]