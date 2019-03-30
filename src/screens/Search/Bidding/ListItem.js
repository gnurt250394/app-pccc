import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions,RefreshControl} from 'react-native'
import images from "assets/images"
import { DetailBiddingScreen } from 'config/screenNames'
import {  color, log } from 'config'
import moment from 'moment';

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
            datas: this.props.datas || [],
            keyword: this.props.keyword || '' ,
            keyword: this.props.loading || true ,
        }
        
    }
    
    componentWillReceiveProps(props){
        
        if(props.datas && props.datas.length > 0){
            log('props.datas: ', props.datas);
            this.setState({datas: props.datas})
        }
        this.setState({loading: props.loading})

    }

    _showName = name => {
        let keyword = this.state.keyword;
        let keywordLower = this.state.keyword.toLocaleLowerCase(); // chuyển từ khóa tìm kiếm về chữ thường
        let nameLower = name.toLocaleLowerCase(); // chuyển tên về chữ thường
        let index = nameLower.indexOf(keywordLower); // lấy vị trí của từ khóa trong tên
        let firtStr = name.substr(0, index) // cắt chuổi trước từ khóa
        let keyStr = name.substr(index, keyword.length + 1) // cắt từ khóa
        let lastStr = name.substr(index + keyword.length, name.length - 1) // cắt chuỗi sau từ khóa
        
        return (
            <Text style={style.txt}>
                {firtStr}
                <Text style={style.keyword}>{keyStr}</Text>
                {lastStr}
            </Text>
        )
    }
    renderItem = count => ({item, index}) => {
        return <TouchableOpacity 
                    onPress={this._navTo(DetailBiddingScreen, {bidding_id: item.id})}
                    style={index == count -1 ? [style.box, style.btw0] : style.box}>
                <Text style={style.name}>{item.name || item.name_bidding}</Text>
                {/* <View style={[style.row, style.calender]}>
                    <Image source={images.calender} style={style.iconCalender}/>
                    <Text style={style.time}>{this._formatTimeAction(item.time_action || item.time)}</Text>
                </View> */}
                {/* {item.version && <LI label={`Phiên bản: ${item.version}`} />} */}
                {/* {item.price && <LI label={`Giá trị: ${toPrice(item.price)}`} />}
                {item.phase && <LI label={`Giai đoạn: ${item.phase}`} />} */}
                <LI label={`Số TBMT: ${item.code || item.number_tbmt }`} />
                {item.partner && <LI label={`Bên mời thầu: ${item.partner}`} />}
                {/* {item.address && <LI label={`Địa điểm: ${item.address}`} />} */}
                {item.project_code && <LI label={`Mã dự án: ${item.project_code}`} />}
                {item.time_start && <LI label={`Thời gian mời thầu: ${moment(item.time_start,'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')}`} />}
                {item.time_end && <LI label={`Thời gian đóng thầu: ${moment(item.time_end,'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')}`} />}
            </TouchableOpacity>
    }
    ListEmptyComponent=()=>{
        return(
            <View style={style.group}>
            <Text style={style.notFound}>Không có dữ liệu</Text>
            </View>
        )
    }
    render(){
        let count = this.state.datas.length
        return (
            <FlatList
                data={this.state.datas}
                refreshControl={
                <RefreshControl
                    refreshing={this.props.loading}
                    colors={["#2166A2",'white']}
                    tintColor="#2166A2"
                />}
                renderItem={this.renderItem(count)}
                ListEmptyComponent={this.ListEmptyComponent}
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
    row: {flexDirection: 'row', alignItems: 'flex-start'},
    dot: {
        width: 6, 
        height: 6, 
        marginLeft: 10,
        marginRight: 10, 
        marginTop: 5
    },
    btw0: {
        borderBottomWidth: 0,
    },
    label: {color: '#555555', fontSize: 14, flex: 1, flexWrap: 'wrap', paddingBottom: 8},
    name: { fontSize: 16, padding: 10, paddingTop: 0, textAlign: 'left', color: '#333333', fontWeight: 'bold',},
    txt: { fontSize: 14, textAlign: 'left',color: '#707070', padding: 10},
    time: { fontSize: 14, textAlign: 'left',color: '#707070', padding: 5},
    price: { fontSize: 13, padding: 10, textAlign: 'left', color , paddingTop: 0,},
    iconCalender: {width: 15,  resizeMode: 'contain', margin: 5,},
    keyword: {color, textAlign: 'left',},
    calender: {width: '45%', alignSelf: 'flex-start', borderWidth: 1, borderColor: '#ddd', alignContent: 'center', borderRadius: 5, justifyContent: 'center', marginLeft: 10,},
    notFound: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    },
    group:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 50,
    }
})
