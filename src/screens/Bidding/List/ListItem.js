import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions} from 'react-native'
import images from "assets/images"
import { DetailBiddingScreen } from 'config/screenNames'
import {  color, StatusCode} from 'config'

class LI extends React.Component {

    render(){
        return (
            <View style={style.row}>
                <Image source={images.dot} style={style.dot}/>
                <Text style={style.label}>{this.props.label}</Text>
            </View>
        )
    }
}

export default class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            biddings: this.props.biddings || []
        }
    }

    

    renderItem = ({item, index}) => {
        return <TouchableOpacity 
                    onPress={this._navTo(DetailBiddingScreen, {name: item.name})}
                    style={style.box}>
                <Text style={style.name}>{item.name}</Text>
                <View style={[style.row, style.calender]}>
                    <Image source={images.calender} style={style.iconCalender}/>
                    <Text style={style.time}>{item.time}</Text>
                </View>
                {item.version && <LI label={`Phiên bản: ${item.version}`} />}
                {item.price && <LI label={`Giá trị: ${toPrice(item.price)}`} />}
                {item.phase && <LI label={`Giai đoạn: ${item.phase}`} />}
                {item.tbmt && <LI label={`Số TBMT: ${item.tbmt}`} />}
                {item.partner && <LI label={`Bên mời thầu: ${item.partner}`} />}
                {item.address && <LI label={`Địa điểm: ${item.address}`} />}
                {item.project_code && <LI label={`Mã dự án: ${item.project_code}`} />}
                {item.time_start && <LI label={`Thời gian mời thầu: ${item.time_start}`} />}
                {item.time_end && <LI label={`Thời gian đóng thầu: ${item.time_end}`} />}
            </TouchableOpacity>
    }
    render(){
        return (
            <FlatList
                data={this.state.biddings}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()} />
        )
    }

    _navTo = (screen, params = {} ) => () => {
        this.props.navigation.navigate(screen, params)
    }

}

const style = StyleSheet.create({
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'},
    box: { flex: 1, borderBottomWidth: 5, borderBottomColor: '#ddd',padding: 10, },
    dot: {width: 6,  resizeMode: 'contain', margin: 10,},
    name: { fontSize: 16, padding: 10, paddingTop: 0, textAlign: 'left', color: '#333333', fontWeight: 'bold',},
    txt: { fontSize: 14, textAlign: 'left',color: '#707070', padding: 10},
    time: { fontSize: 14, textAlign: 'left',color: '#707070', padding: 5},
    price: { fontSize: 13, padding: 10, textAlign: 'left', color , paddingTop: 0,},
    iconCalender: {width: 15,  resizeMode: 'contain', margin: 5,},
    keyword: {color, textAlign: 'left',},
    row: {flexDirection: 'row', alignItems: 'center',},
    calender: {width: '45%', alignSelf: 'flex-start', borderWidth: 1, borderColor: '#ddd', alignContent: 'center', borderRadius: 5, justifyContent: 'center', marginLeft: 10,}
})
