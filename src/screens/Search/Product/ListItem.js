import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions} from 'react-native'
import images from "assets/images"
import { ProductDetailScreen } from 'config/screenNames'
import { toPrice, color } from 'config'
const {width} = Dimensions.get('screen')
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
        let keyword = this.state.keyword || "";
        let keywordLower = keyword.toLocaleLowerCase(); // chuyển từ khóa tìm kiếm về chữ thường
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
                    <Image source={item.image && item.image != "" ? {uri: item.image} : images.logo } style={style.image}/>
                </TouchableOpacity>
                {/* {this._showName(item.name)} */}
                <Text style={style.name}>{item.name}</Text>
                <Text style={style.price}>{toPrice(item.price)}</Text>
            </View>
    }

    render(){
        return (
            <FlatList
                horizontal={this.props.horizontal || false}
                numColumns={this.props.numColumns || 3}
                data={this.state.data}
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
    box: { flex: 1, borderWidth: 1, borderColor: '#ddd', margin: 5, borderRadius: 10, maxWidth: '31%'},
    image: {width: 90,  height: 90, resizeMode: 'contain', margin: 10,},
    name: { fontSize: 15, padding: 10, textAlign: 'left',color: '#707070'},
    txt: { fontSize: 14, textAlign: 'left',color: '#707070', padding: 10},
    price: { fontSize: 13, padding: 10, textAlign: 'left', color , paddingTop: 0,},
    iconHeart: {alignSelf: 'flex-end', marginRight: 5,},
    keyword: {color, textAlign: 'left',}
})
