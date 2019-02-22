import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView, Dimensions, FlatList } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { ScreenName, toPrice , toUpperCase} from 'config'
class ViewAllProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data || data
        }
    }
    render(){
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <ScrollView>
                    <StatusBar backgroundColor="#F55555" barStyle="light-content" />

                    <View style={style.head}>
                        <TouchableOpacity style={style.p8} onPress={() =>  this.props.navigation.goBack()} >
                            <Image 
                                style={[styles.icon,  style.w10]}
                                source={images.backLight} />
                        </TouchableOpacity>
                        
                        <View  style={style.row}>
                            <TouchableOpacity style={style.p8} onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                                <Image 
                                    style={[styles.icon, style.w15]}
                                    source={images.iconSearch} />
                            </TouchableOpacity>
                            <TouchableOpacity style={style.p8} onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                                <Image 
                                    style={[styles.icon, style.w15]}
                                    source={images.filterL} />
                            </TouchableOpacity>
                           
                        </View >
                    </View>
                    <Text style={style.title}>{this.props.navigation.state.params.title || "Sản phẩm nổi bật"}</Text>
                   
                    <FlatList
                        data={this.state.data}
                        numColumns="3"
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()} />
                </ScrollView>
            </View>
        )
    }

    toggleLike = (index) => () => {
        let data = [...this.state.data];
        data[index].like = !data[index].like
        this.setState({data});
    }

    renderItem = ({item, index}) => {
        return <View style={style.box}>
                <TouchableOpacity onPress={this.toggleLike(index)}>
                    <Image source={ item.like ? images.heartRed : images.heartYellow} style={[styles.icon, {alignSelf: 'flex-end', marginRight: 5,}]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(ScreenName.ProductDetail)}>
                    <Image source={images.binhCuuHoa} style={style.image}/>
                </TouchableOpacity>
                <Text style={style.name}>{item.name}</Text>
            </View>
    }
}
export default connect()(ViewAllProduct)

const style = StyleSheet.create({
    head: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F55555'},
    w10: { width: 10},
    w15: { width: 15},
    w20: { width: 20},
    p8: {padding: 8},
    flex: {flex: 1},
    title: {color: "rgba(255, 255, 255, 1)", padding: 10, fontSize: 18},
    row: {flexDirection: 'row', alignItems: 'center'},
    title: {color: '#333333', padding: 10, fontSize: 18, fontWeight: 'bold',},
    box: { flex: 1, flexWrap: 'wrap', borderWidth: 1, borderColor: '#ddd', margin: 5, borderRadius: 10, marginBottom: 10,},
    image: {width: "90%", height: 90, alignSelf: 'center'},
    name: { fontSize: 15, padding: 10, textAlign: 'left',color: '#707070'},
    price: { fontSize: 15, padding: 10, textAlign: 'left', color: '#FB3C30', paddingTop: 0,},
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