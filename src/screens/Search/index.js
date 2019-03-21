import React from 'react'
import { View, TextInput, Image, TouchableOpacity, StatusBar, StyleSheet, AsyncStorage, Text } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { signup } from 'config/apis/users'
import { Footer, ViewMore } from 'components'
import { ScreenName, color } from 'config'
import {SearchScreen } from 'config/screenNames'
import TabsSearch from './TabsSearch'

class Search extends React.Component {

    state = {
        keyword: ''
    }

    // set status bar
    async componentDidMount() {
        console.log(11,this.props);
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(color);
        });
        let keyword = await AsyncStorage.getItem('home_search') || ""
        console.log('keyword: ', keyword);
        this.props.navigation.setParams({keyword})
        this.setState({keyword})
    }
    
    componentWillUnmount() {
        this._navListener.remove();
    }
    // end set status bar

    render(){
        return (
            <View style={style.flex}>
                <View style={style.head}>
                    <View 
                        style={style.boxSearch}>
                        <TouchableOpacity style={style.p8} onPress={this._navTo(SearchScreen)} >
                            <Image 
                                style={[styles.icon, style.w15]}
                                source={images.iconSearch} />
                        </TouchableOpacity>
                        <TextInput 
                            style={[style.flex, style.txtSearch]}
                            value={this.state.keyword}
                            returnKeyLabel="Tìm"
                            onSubmitEditing={this._onSearch}
                            onChangeText={this.onChangeText('keyword')}
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            placeholder="Tìm kiếm" />
                        
                    </View >
                    <Text 
                        onPress={this._goBack}
                        style={style.cancel}>Hủy</Text>
                </View>
                <View style={style.flex}>
                    <TabsSearch keywords={this.state.keyword} />
                </View>
            
            </View>
        )
    }

    onChangeText = key => val => {
        if(key == "keyword")
            this.setState({[key]: val}, () => AsyncStorage.setItem([key], val))
        else
            this.setState({[key]: val})
    }

    _navTo = screen => () => {
        this.props.navigation.navigate(screen)
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

    _dismiss = () => {
        Keyboard.dismiss()
    }
}
export default connect()(Search)

const style = StyleSheet.create({
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'},
    boxSearch: {flexDirection: 'row', justifyContent: 'space-between', flex: 1, borderRadius: 8, backgroundColor: "rgba(0, 0, 0, 0.15)", height: 40, marginLeft: 10, marginRight: 10,},
    head: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: color, paddingTop: 10, paddingBottom: 10,},
    txtSearch: {color: "rgba(255, 255, 255, 0.6)"},
    w15: { width: 15},
    p8: {padding: 8},
    flex: {flex: 1},
    cancel: {color: 'white', padding: 10}
})
