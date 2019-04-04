import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet,RefreshControl} from 'react-native'
import images from "assets/images"
import { ProductDetailScreen } from 'config/screenNames'
import { toPrice, color, log } from 'config'
import { fontStyles } from 'config/fontStyles';

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
    SubName=(item)=>{
        let name=''
        if(item&& item.length > 24 ){
              name= item.substring(0, 23) + "..." 
        } else{
         name= item 
        }
      return name 
    }
    renderItem = ({item, index}) => {
        return <View style={style.box}>
                <TouchableOpacity onPress={this._navTo(ProductDetailScreen)}>
                    <Image source={item.image && item.image.full_path!= "" &&(''+item.image.full_path).toLowerCase().includes('jpeg'||'png'||'jpg') ? {uri: item.image.full_path} : images.logo } style={style.image}/>
                </TouchableOpacity>
                {/* {this._showName(item.name)} */}
                <Text style={[style.name,fontStyles.Acumin_bold]}>{this.SubName(item.name)}</Text>
                <Text style={style.price}>{toPrice(item.price)}</Text>
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
                horizontal={this.props.horizontal || false}
                numColumns={this.props.numColumns || 3}
                refreshControl={
                <RefreshControl
                    refreshing={this.props.loading}
                    colors={["#2166A2",'white']}
                />}
                data={this.state.datas}
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
    box: { flex: 1, borderWidth: 1, borderColor: '#ddd', margin: 5, borderRadius: 10, maxWidth: '31%'},
    image: {width: 90,  height: 90, resizeMode: 'contain', margin: 10,},
    name: { fontSize: 14, padding: 10, textAlign: 'left',color: '#333333'},
    txt: { fontSize: 14, textAlign: 'left',color: '#707070', padding: 10},
    price: { fontSize: 12, padding: 10, textAlign: 'left', color , paddingTop: 0,},
    iconHeart: {alignSelf: 'flex-end', marginRight: 5,},
    keyword: {color, textAlign: 'left',},
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
