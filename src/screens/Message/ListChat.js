import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView, TextInput, FlatList } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { signup } from 'config/apis/users'
import { Footer, ViewMore } from 'components'
import { HomeScreen, MessageScreen,  } from 'config/screenNames'
import { color, MessageStatus, popupOk } from 'config'
import { BaseSearch } from 'components';
import navigation from 'navigation/NavigationService';
import { withNavigation } from 'react-navigation';

class ListChat extends React.Component {
    state = {
        keyword: "",
        loading: true
    }

    // set status bar
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', async () => {
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(color);
        //  popupOk('Tính năng đang phát triển. Vui lòng quay lại sau.', () => this.props.navigation.navigate(HomeScreen))
        });
    }
    _nextPage=(item)=>()=>{
        navigation.navigate(MessageScreen,{id:item.id,title:item.name})
    }
    renderItem  = ({item, index}) => {
        return (
            <TouchableOpacity style={style.box}
            onPress={this._nextPage(item)}
            >
                <Text style={item.status == MessageStatus.unread ? style.timeUnread : style.time}>{item.createdAt}</Text>
                <View style={style.row}>
                    <View style={style.relative}>
                        <Image 
                            style={style.avatar}
                            source={images.logo} />
                        <Image 
                            style={style.dot}
                            source={item.online ? images.online : images.offline} />
                    </View>
                    <View style={style.boxLabel}>
                        <Text style={style.name}>{item.name}</Text>
                        <Text style={ item.status == MessageStatus.unread ? style.messageUnread : style.message}>{item.message}</Text>
                    </View>
                    
                </View>
                
            </TouchableOpacity>
        )
    }

    componentWillUnmount() {
        // this._navListener.remove();
    }
    // end status bar
    _keyExtractor = (item, index) => `${item.id||index}`
    render(){
        return (
            <View style={style.container}>
            <BaseSearch
                        onSearch={this._onSearch}
                        onClear={this.refressData}
                        ref={val => this.search = val}
                        // goBack={this._goBack}
                        keyword={this.state.keyword} />
                    

                    <FlatList
                        data={datas}
                        renderItem={this.renderItem}
                        keyExtractor={this._keyExtractor} />
            </View>
        )
    }
    
    _showLabel = (item) => {
        
    }
    

    _onSearch = async () => {
        console.log(1);
        this.props.navigation.navigate(MessengerScreen)
    }

    onChangeText = key => val => {
        this.setState({[key]: val})
    }

    _navTo = (screen, params = {} ) => () => {
        this.props.navigation.navigate(screen, params)
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

    _dismiss = () => {
        Keyboard.dismiss()
    }
}
export default connect()(ListChat)

const style = StyleSheet.create({
    boxSearch: {flexDirection: 'row', justifyContent: 'space-between', flex: 1, borderRadius: 8, backgroundColor: "rgba(0, 0, 0, 0.15)", height: 40, marginLeft: 10, marginRight: 10,},
    txtSearch: {color: "rgba(255, 255, 255, 0.6)"},
    head: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: color, paddingTop: 10, paddingBottom: 10,},
    w15: { width: 15},
    w20: { width: 20},
    p8: {padding: 8},
    flex: {flex: 1},
    avatar: {width: 60, height: 60, resizeMode: 'contain', borderRadius: 30},
    box: {borderBottomWidth: 1,padding: 10, borderBottomColor: '#ddd',},
    time: {position:'absolute',right:8,top:10, fontSize: 11},
    timeUnread: {position:'absolute',right:8,top:10, color: '#111111', fontSize: 11},
    name: {color: '#111111', fontSize: 14, fontWeight: 'bold', paddingBottom: 8},
    message: {fontSize: 12, color: '#999999' },
    messageUnread: {color: '#111111', fontSize: 12, fontWeight: 'bold'},
    dot: {width: 10, resizeMode: 'contain', position: 'absolute', right: 3, bottom: 2},
    boxLabel: { flexDirection: 'column', paddingLeft: 10,},
    row: {flexDirection: 'row',alignItems:'center'},
    relative: {position: 'relative'},
    container:{
        flex:1
    }
})

const datas = [
    {
        id: 1,
        name: 'Hoang Pear',
        message: 'Bên mình đang sale 30%...',
        online: true,
        status: 0,
        createdAt: 'Hôm nay 14:24'
    },
    {
        id: 2,
        name: 'Hoang Pear',
        message: 'Bên mình đang sale 30%...',
        online: false,
        status: 0,
        createdAt: 'Hôm nay 14:24'
    },
    {
        id: 3,
        name: 'Hoang Pear',
        message: 'Bên mình đang sale 30%...',
        online: true,
        status: 1,
        createdAt: 'Hôm nay 14:24'
    },
    {
        id: 4,
        name: 'Hoang Pear',
        message: 'Bên mình đang sale 30%...',
        online: true,
        status: 1,
        createdAt: 'Hôm nay 14:24'
    },
]
