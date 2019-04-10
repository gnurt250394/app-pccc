import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View , Image, TextInput,SafeAreaView} from 'react-native'
import styles from "assets/styles" 
import images from "assets/images" 
import {  color } from 'config'

export default class Search extends React.PureComponent {
    state = {
        keyword: this.props.keyword || '',
        clear: false
    }

    componentWillReceiveProps(props){
        if(props.keyword != "") this.setState({value: props.keyword})
    }

    render(){
        return (
            <View style={style.head}>
                   
                

                <View style={style.boxSearch}>
            
                    <TouchableOpacity style={style.p8}  onPress={this.props.onSearch}  >
                        <Image 
                            style={[styles.icon, style.w15, style.iconSearch]}
                            source={images.search} />
                    </TouchableOpacity>
                    
                    <TextInput 
                        style={[style.flex, style.txtSearch]}
                        value={this.state.keyword}
                        returnKeyLabel="Tìm"
                        onFocus={this.showBtnClose}
                        onSubmitEditing={this.props.onSearch}
                        onChangeText={this.onChangeText}
                        placeholderTextColor={color}
                        placeholder="Tìm kiếm" />
                    
                    {this.state.clear && <TouchableOpacity style={style.p8}  onPress={this.onClear}  >
                        <Image 
                            style={[styles.icon, style.w15, style.iconClose]}
                            source={images.closeSearch} />
                    </TouchableOpacity>}
                </View >
                
            </View>
        )
    }

    showBtnClose = () => {
        this.setState({clear: true})
    }

    onClear = () => {
        this.setState({keyword: "", clear: false}, this.props.onClear || this.props.onSearch)
    }

    onChangeText =  keyword => {
        if(keyword.length == 0){
            this.setState({clear: false, keyword})
        }else{
            this.setState({clear: true, keyword})
        }
    }

    getValue = () => this.state.keyword
}

const style = StyleSheet.create({
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'},
    boxSearch: {flexDirection: 'row', justifyContent: 'space-between', flex: 1, borderRadius: 6,backgroundColor:'#FFFFFF', borderColor:'#8FBEDF',borderWidth:1, height: 40, marginLeft: 10, marginRight: 10,},
    head: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, paddingBottom: 10,},
    txtSearch: {color: "rgba(255, 255, 255, 0.6)"},
    w15: { width: 15},
    iconClose: {  width: 13, marginTop: 0,tintColor:color},
    iconSearch: {  marginTop: -2},
    p8: {padding: 8,alignItems:'center',justifyContent:'center'},
    flex: {flex: 1},
    cancel: {color: 'white', padding: 10},
    posR: {position: 'relative'},
    SafeAreaView:{backgroundColor:color},
    iconBack: {
        height: 18,
        width:18, 
        resizeMode: 'contain', 
        paddingLeft: 10,
    },
    cancel: {color: 'white', padding: 10}
})



