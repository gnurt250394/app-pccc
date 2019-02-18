import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, } from 'react-native'
import images from "public/images"

import { ScreenName, toPrice } from 'config'

export default class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        }
    }
    toggleLike = (index) => () => {
        let data = [...this.state.data];
        data[index].like = !data[index].like
        this.setState({data});
    }
    renderItem = ({item, index}) => {
        return <View style={style.box}>
                <TouchableOpacity onPress={this.toggleLike(index)}>
                    <Image source={ item.like ? images.heartRed : images.heartYellow} style={[styles.icon, {alignSelf: 'flex-end', marginRight: 5, width: 15}]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigate(ScreenName.ProductDetail)}>
                    <Image source={images.binhCuuHoa} style={style.image}/>
                </TouchableOpacity>
                <Text style={style.name}>{item.name}</Text>
                <Text style={style.price}>{toPrice(item.price)}</Text>
            </View>
    }

    render(){
        return (
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={this.state.data}
                renderItem={this.renderItem}
                style={this.props.style || {}}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }
}

const style = StyleSheet.create({
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'},
    box: { flex: 1, borderWidth: 1, borderColor: '#ddd', marginLeft: 10, borderRadius: 10, marginBottom: 0,},
    image: {height: 50, width: 50, margin: 10, alignSelf: 'center'},
    name: { fontSize: 13, padding: 10, textAlign: 'left', color: '#555555'},
    price: { fontSize: 13, padding: 10, textAlign: 'left', color: '#F55555', paddingTop: 0,},
})
