import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, } from 'react-native'
import images from "assets/images"
import { ProductDetailScreen } from 'config/screenNames'

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
                    <Image source={ item.like ? images.heartRed : images.heartYellow} style={[styles.icon, style.iconHeart]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._navTo(ProductDetailScreen)}>
                    <Image source={images.binhCuuHoa} style={style.image}/>
                </TouchableOpacity>
                <Text style={style.name}>{item.name}</Text>
            </View>
    }

    render(){
        return (
            <FlatList
                horizontal={true}
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }

    _navTo = (screen, params = {} ) => () => {
        this.props.navigation.navigate(screen, params)
    }

}

const style = StyleSheet.create({
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'},
    box: { flex: 1, borderWidth: 1, borderColor: '#ddd', marginLeft: 10, borderRadius: 10, marginBottom: 10,},
    image: {width: 120, height: 120, margin: 10,},
    name: { fontSize: 15, padding: 10, textAlign: 'left',color: '#707070'},
    price: { fontSize: 15, padding: 10, textAlign: 'left', color: '#FB3C30', paddingTop: 0,},
    iconHeart: {alignSelf: 'flex-end', marginRight: 5,}
    
})
