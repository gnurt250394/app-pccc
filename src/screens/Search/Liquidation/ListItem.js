import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions,RefreshControl} from 'react-native'
import images from "assets/images"
import { ProductDetailScreen } from 'config/screenNames'
import { toPrice, color, ellipsis } from 'config'
const {width} = Dimensions.get('screen')
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
    renderItem = ({item, index}) => {
        return <View style={style.box}>
                <TouchableOpacity onPress={this._navTo(ProductDetailScreen)}>
                    <Image source={images.maybom} style={style.image}/>
                </TouchableOpacity>
                <View style={style.flex}>
                    {this._showName(item.name)}
                    <Text style={style.desc}>{ellipsis(item.desc, 80)}</Text>
                    <View style={style.bottomBox}>
                        <View style={style.boxIcon}>
                            <Image source={images.sLocation} style={style.iconLocation}/>
                            <Text style={style.location}>Ha Noi</Text>
                        </View>
                        <View style={style.boxIcon}>
                            <Image source={images.sDolla} style={style.iconLocation}/>
                            <Text style={style.location}>{toPrice(item.price)}</Text>
                        </View>
                        
                        <Text style={style.desc}>{"10 phut truoc"}</Text>
                    </View>
                    
                </View>
                
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
                data={this.state.datas}
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
    box: { flex: 1, borderBottomWidth: 1, borderBottomColor: '#ddd', padding: 10, flexDirection: 'row',},
    image: {width: 90, height: 90, resizeMode: 'contain', margin: 10, borderWidth: 1, borderColor: '#ddd',},
    name: { fontSize: 15, textAlign: 'left',color: '#707070'},
    txt: { fontSize: 14, textAlign: 'left',color: '#707070'},
    price: { fontSize: 13, textAlign: 'left', color , paddingTop: 0,},
    iconHeart: {alignSelf: 'flex-end', marginRight: 5,},
    keyword: {color, textAlign: 'left',},
    flex: { flex: 1},
    desc: {},
    boxIcon: {flexDirection: 'row', alignItems: 'center'},
    iconLocation: {width: 15, height: 15, resizeMode: 'contain', marginRight: 5},
    bottomBox: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10},
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
