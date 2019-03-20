import React from 'react'
import { View,  StatusBar, StyleSheet, AsyncStorage, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { signup } from 'config/apis/users'
import {  color} from 'config'
import ListItem from './ListItem'
import { Header } from 'components'


class ListBidding extends React.Component {
    state = {
        loading: false
    }
    // set status bar
    async componentDidMount() {
        
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
                 {   this.state.loading ? 
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View> : null
                }
                <Header
                    check={1}
                    title="Thông tin đấu thầu" onPress={this._goBack}/>
                <ScrollView>

                    <ListItem 
                        data={data} 
                        keyword={this.keyword}
                        navigation={this.props.navigation} />
                </ScrollView>
                

                
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
export default connect()(ListBidding)

const style = StyleSheet.create({
    flex: {flex: 1},
})

let data = [
    {
        id: 1,
        name: 'Tư vấn thiết kế bản vẽ thi công và tổng dự án',
        version: 1,
        "time": "2019-03-16 10:36:00",
        partner: "Ông A",
        stage: 'Thiết kế kỹ thuật',
        code: '95821463',
        time_start: '25/01/2019',
        time_end: '25/01/2019'
    },
    {
        id: 2,
        name: 'Tư vấn thiết kế bản vẽ thi công và tổng dự án',
        version: 2,
        "time": "2019-03-16 10:36:00",
        partner: "Ông A",
        stage: 'Thiết kế kỹ thuật',
        code: '95821463',
        time_start: '25/01/2019',
        time_end: '25/01/2019'
    },
    {
        id: 3,
        name: 'Tư vấn thiết kế bản vẽ thi công và tổng dự án',
        version: 3,
        "time": "2019-03-16 10:36:00",
        partner: "Ông A",
        stage: 'Thiết kế kỹ thuật',
        code: '95821463',
        time_start: '25/01/2019',
        time_end: '25/01/2019'
    },
    {
        id: 4,
        name: 'Tư vấn thiết kế bản vẽ thi công và tổng dự án',
        version: 4,
        "time": "2019-03-16 10:36:00",
        partner: "Ông A",
        stage: 'Thiết kế kỹ thuật',
        code: '95821463',
        time_start: '25/01/2019',
        time_end: '25/01/2019'
    },
    {
        id: 5,
        name: 'Tư vấn thiết kế bản vẽ thi công và tổng dự án',
        version: 5,
        "time": "2019-03-16 10:36:00",
        partner: "Ông A",
        stage: 'Thiết kế kỹ thuật',
        code: '95821463',
        time_start: '25/01/2019',
        time_end: '25/01/2019'
    },
    
   
    
]