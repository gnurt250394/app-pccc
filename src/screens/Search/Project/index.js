import React from 'react'
import { View,  StatusBar, StyleSheet, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { signup } from 'config/apis/users'
import {  color} from 'config'
import ListItem from './ListItem'
class SearchProject extends React.Component {

    // set status bar
    async componentDidMount() {
        console.log(this.props, 11);
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(color);
        });

        this.keyword = await AsyncStorage.getItem('keyword')
    }
    
    componentWillUnmount() {
        this._navListener.remove();
    }

    render(){
        return (
            <View style={style.flex}>
                <ListItem 
                    data={data} 
                    keyword={this.keyword}
                    navigation={this.props.navigation} />

                
            </View>
        )
    }

    _navTo = (screen, params = {} ) => () => {
        this.props.navigation.navigate(screen, params)
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }


}
export default connect()(SearchProject)

const style = StyleSheet.create({
    flex: {flex: 1, marginTop: 10,},
})

let data = [
    {
        id: 1,
        name: 'loại Máy bơm litaam 1',
        price: 220000,
        like: false
    },
    {
        id: 2,
        name: 'máy bơm litaam 2',
        price: 220000,
        like: true
    },
    {
        id: 3,
        name: 'Máy bơm litaam 3',
        price: 220000,
        like: false
    },
    {
        id: 4,
        name: 'Máy bơm litaam 4',
        price: 220000,
        like: false
    },
    {
        id: 5,
        name: 'Máy bơm litaam 5',
        price: 250000,
        like: false
    },
]