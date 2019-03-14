import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView, TextInput, FlatList } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { signup } from 'config/apis/users'
import { Footer, ViewMore } from 'components'
import { SearchScreen, MessengerScreen } from 'config/screenNames'
import { color, MessageStatus } from 'config'


class ListChat extends React.Component {
    state = {
        keyword: ""
    }

    // set status bar
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(color);
        });
    }
    
    componentWillUnmount() {
        this._navListener.remove();
    }
    // end status bar

    render(){
        return (
            <View style={{}}>
                <ScrollView>
                     <View style={style.head}>
                        <View 
                            style={style.boxSearch}>
                            <TouchableOpacity style={style.p8} onPress={this._navTo(MessengerScreen)} >
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
                    </View>

                    <FlatList
                        data={datas}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()} />
                </ScrollView>
            </View>
        )
    }

    renderItem  = ({item, index}) => {
        return (
            <TouchableOpacity style={style.box}>
                <Text style={item.status == MessageStatus.unread ? style.timeUnread : style.time}>{item.createdAt}</Text>
                <View style={{flexDirection: 'row', position: 'relative'}}>
                    <View>
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

    _showLabel = (item) => {
        
    }
    

    _onSearch = async () => {
        // AsyncStorage.setItem('keyword', this.state.keyword)
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
    head: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: color, paddingTop: 10, paddingBottom: 10,},
    w15: { width: 15},
    w20: { width: 20},
    p8: {padding: 8},
    flex: {flex: 1},
    avatar: {width: 50, height: 50, resizeMode: 'contain', borderRadius: 50},
    box: {borderBottomWidth: 1,padding: 10, borderBottomColor: '#ddd',},
    time: {textAlign: 'right', fontSize: 11},
    timeUnread: {textAlign: 'right', color: '#111111', fontSize: 11},
    name: {color: '#111111', fontSize: 14, fontWeight: 'bold', paddingBottom: 8},
    message: {fontSize: 12, color: '#999999' },
    messageUnread: {color: '#111111', fontSize: 12, fontWeight: 'bold'},
    dot: {width: 10, resizeMode: 'contain', position: 'absolute', right: 5, bottom: 4},
    boxLabel: { flexDirection: 'column', paddingLeft: 10,}
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
