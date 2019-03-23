import React from 'react'
import { View,  StyleSheet, AsyncStorage, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux'
import { search } from 'config/apis/bidding'
import {  StatusCode, toParams } from 'config'
import ListItem from './ListItem'
class SearchLiquidation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            loading: true,
            keyword: ''
        }
    }


    // set status bar
    async componentDidMount() {
        this.props.navigation.addListener('willFocus', () => this.loadData())
    }

    componentWillReceiveProps(props){
        if(props.screenProps && props.screenProps.isSearch) this.loadData()
    }

    loadData = () => {
        let keyword = this.props.screenProps ? this.props.screenProps.keyword : ""
        console.log('Focus Liquidation: ', keyword);
        if(keyword != "")
        this.setState({loading: true, keyword: keyword}, async () => {
            let params = toParams({
                table: 'sell_products',
                type: 1,
                keyword: keyword
            })
            search(params).then(res => {
                if(res.data.code == StatusCode.Success){
                    this.setState({
                        datas: res.data.data,
                        loading: false
                    })
                }else{
                    this.setState({ loading: false })
                }
            }).catch(err => {
                console.log('err: ', err);
                this.setState({ loading: false })
            })
        })
    }
    


    render(){
        return (
            <View style={style.flex}>
                {   this.state.loading ? 
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View> : null
                }
                {
                    this.state.datas.length == 0 
                        ?
                    !this.state.loading && <Text style={style.notFound}>Không có dữ liệu</Text>
                        :
                    <ListItem 
                        data={this.state.datas} 
                        keyword={this.state.keyword}
                        navigation={this.props.navigation} />
                }
            </View>
        )
    }

}
export default connect()(SearchLiquidation)

const style = StyleSheet.create({
    flex: {flex: 1, marginTop: 10,},
    notFound: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    }
})

