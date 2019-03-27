import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions,RefreshControl} from 'react-native'
import images from "assets/images"
import { ProductDetailScreen } from 'config/screenNames'
import { toPrice, color } from 'config'
const {width} = Dimensions.get('screen')

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
            data: this.props.data || [],
            keyword: this.props.keyword || '' ,
        }
        
    }
    toggleLike = (index) => () => {
        let data = [...this.state.data];
        data[index].like = !data[index].like
        this.setState({data});
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
    renderItem = ({item, index}) => {
        return <View style={style.box}>
                {item.name && <Text style={style.name}>{item.name}</Text>}
                {item.version && <LI label={`Phiên bản: ${item.version}`} />}
                {item.price && <LI label={`Giá trị: ${toPrice(item.price)}`} />}
                {item.phase && <LI label={`Giai đoạn: ${item.phase}`} />}
                {item.tbmt && <LI label={`Số TBMT: ${item.tbmt}`} />}
                {item.partner && <LI label={`Bên mời thầu: ${item.partner}`} />}
                {item.address && <LI label={`Địa điểm: ${item.address}`} />}
                {item.project_code && <LI label={`Mã dự án: ${item.project_code}`} />}
                {item.time_start && <LI label={`Ngày đăng tin: ${item.time_start}`} />}
                {item.time_end && <LI label={`Ngày kết thúc: ${item.time_end}`} />}
                {/* {item.description && <LI label={`Thông tin: ${item.description}`} />} */}
            </View>
    }
    ListEmptyComponent=()=>{
        return(
            <View style={style.group}>
            <Text style={style.notFound}>Không có dữ liệu</Text>
            </View>
        )
    }
    render(){
        return (
            <FlatList
                data={this.state.data}
                refreshControl={
                <RefreshControl
                    refreshing={this.props.loading}
                    colors={["#2166A2",'white']}
                    tintColor="#2166A2"
                />}
                renderItem={this.renderItem}
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
    dot: {width: 6,  resizeMode: 'contain', margin: 10,},
    name: { fontSize: 16, padding: 10, paddingTop: 0, textAlign: 'left',color: '#707070', color: '#333333', fontWeight: 'bold',},
    txt: { fontSize: 14, textAlign: 'left',color: '#707070', padding: 10},
    price: { fontSize: 13, padding: 10, textAlign: 'left', color , paddingTop: 0,},
    iconHeart: {alignSelf: 'flex-end', marginRight: 5,},
    keyword: {color, textAlign: 'left',},
    row: {flexDirection: 'row', alignItems: 'center',},
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
