import React from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { BaseSearch } from 'components'
import { color } from 'config'
import TabsSearch from './TabsSearch'


class Search extends React.Component {

    state = {
        keyword: this.props.navigation.getParam('keyword') || "",
        isSearch: false
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
    // end set status bar

    render(){
        return (
            <View style={style.flex}>
                <BaseSearch 
                    onSearch={this._onSearch}
                    onCancel={this._goBack}
                    ref={val => this.search = val}
                    keyword={this.state.keyword} />
                <View style={style.flex}>
                    <TabsSearch screenProps={{ keyword: this.state.keyword, isSearch: this.state.isSearch, navigation: this.props.navigation }} />
                </View>
            
            </View>
        )
    }

    _onSearch = () => {
        let keyword = this.search ? this.search.getValue() : ''
        this.setState({isSearch: true, keyword})
    }

    onChangeText = key => val => {
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
    flex: {flex: 1},
})
