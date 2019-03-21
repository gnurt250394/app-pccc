import React from 'react'
import { View,  StatusBar, StyleSheet, AsyncStorage, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import {  color, StatusCode} from 'config'
import ListItem from './ListItem'
import { Header } from 'components'


class ListBidding extends React.Component {
    state = {
        loading: false,
    }
    // set status bar
    async componentDidMount() {
        
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(color);
        });

    }
    
    componentWillUnmount() {
        this._navListener.remove();
    }

    /**
     * check thêm phần chuyển từ màn tracking qua => param type: tracking
     */

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
                        data={this.state.biddings} 
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
