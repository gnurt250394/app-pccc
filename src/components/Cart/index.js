import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Btn, ViewMore } from '../layout'
import { ScreenName, toPrice, toUpperCase, removeItem, calTotalPrice } from 'config'
import { FlatList } from 'react-native-gesture-handler';

class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            totalPrice: calTotalPrice(datas),
            data: datas
        }
    }

    _removeItem = index => () => {
        Alert.alert(
            'Xóa sản phẩm',
            'Bạn có muốn xóa sản phẩm không',
            [
              {
                text: 'Cancel',style: 'cancel',
              },
              {text: 'OK', onPress: () => {
                let data = removeItem(this.state.data, index);
                    totalPrice = calTotalPrice(data)
                this.setState({  data, totalPrice});
              }},
            ],
            {cancelable: false},
        );
        
    }

    _addtract = index => () => {
        let data = [...this.state.data];
        data[index].total += 1;
        let totalPrice = this.state.totalPrice += data[index].price;
        this.setState({data, totalPrice })
    }

    _subtract = index => () => {
        let data = [...this.state.data];
        if(data[index].total > 1){
            data[index].total -= 1;
            let totalPrice = this.state.totalPrice -= data[index].price;
            this.setState({data, totalPrice })
        }
        
    }
    
    renderItem = ({item, index}) => {
        return <View style={style.box}>
            <Image source={images.binhCuuHoa} style={style.image}/>
            <View style={style.content}>
                <Text style={style.name}>{item.name}</Text>
                <Text style={style.price}>{toPrice(item.price * item.total)}</Text>
                <Text style={style.supplier}>Nhà cung cấp: {item.supplier}</Text>
                <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{borderWidth: 1, borderColor: '#ddd', flexDirection: 'row', justifyContent: 'space-between', width: '50%', alignItems: 'center'}}>
                        <TouchableOpacity 
                            onPress={this._subtract(index)}
                            style={{borderRightColor: '#ddd', borderRightWidth: 1, padding: 10}}>
                            <Text style={{fontSize: 20}}>-</Text>
                        </TouchableOpacity>
                        <Text style={{padding: 10 }}>{item.total}</Text>
                        <TouchableOpacity  
                            onPress={this._addtract(index)}
                            style={{borderLeftColor: '#ddd', borderLeftWidth: 1, padding: 10}}>
                            <Text style={{fontSize: 20}}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={this._removeItem(index)} >
                        <Image source={images.trash} style={ {width: 25, height: 25}}/>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    }

    showData = () => {
        if(this.state.data.length == 0){
            return <Text style={{textAlign: 'center', padding: 10}}>Bạn chưa có sản phẩm nào</Text>
        }else{
            return <FlatList 
                        extraData={this.state}
                        data={this.state.data}
                        renderItem={this.renderItem}/>
        }
    }
    render(){
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                    <Text style={style.heading}>Giỏ hàng</Text>
                    {this.showData()}
                <View style={style.totalBox}>
                    <Text style={style.total}>{toUpperCase('Tổng tiền')}:</Text>
                    <Text style={style.total}>{toPrice(this.state.totalPrice)}</Text>
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


let datas = [
    {
        id: 1,
        name: 'Bình chữa cháy 1',
        price: 250000,
        like: false,
        supplier: 'lehoangnd',
        total: 1
    },
    {
        id: 2,
        name: 'Bình chữa cháy 2',
        price: 220000,
        like: true,
        supplier: 'lehoangnd',
        total: 2
    },
]