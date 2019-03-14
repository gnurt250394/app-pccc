import React from 'react'
import { View,  StatusBar, StyleSheet, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { signup } from 'config/apis/users'
import {  color} from 'config'
import ListItem from './ListItem'
class SearchBinding extends React.Component {

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
export default connect()(SearchBinding)

const style = StyleSheet.create({
    flex: {flex: 1, marginTop: 10,},
})

let data = [
    {
        id: 1,
        name: 'Tư vấn thiết kế bản vẽ thi công và tổng dự án',
        version: 1,
        price: 500000000,
        stage: 'Thiết kế kỹ thuật',
        localtion: 'Số 8, Phan Văn Trường, Cầu Giấy, Hà Nội',
        projectCode: '95821463',
        createdAt: '25/01/2019'
    },
    {
        id: 2,
        name: 'Tư vấn thiết kế bản vẽ thi công và tổng dự án',
        version: 2,
        price: 500000000,
        stage: 'Thiết kế kỹ thuật',
        localtion: 'Số 8, Phan Văn Trường, Cầu Giấy, Hà Nội',
        projectCode: '95821463',
        createdAt: '25/01/2019'
    },
    {
        id: 3,
        name: 'Tư vấn thiết kế bản vẽ thi công và tổng dự án',
        version: 3,
        price: 500000000,
        stage: 'Thiết kế kỹ thuật',
        localtion: 'Số 8, Phan Văn Trường, Cầu Giấy, Hà Nội',
        projectCode: '95821463',
        createdAt: '25/01/2019'
    },
    
   
    
]