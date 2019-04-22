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
        this.props.navigation.addListener('willFocus', () => this.loadData(this.props.screenProps.keyword))
    }

    componentWillReceiveProps(props){
        if(props.screenProps && props.screenProps.isSearch) this.loadData(props.screenProps.keyword)
    }

    loadData = (keywordProps) => {
        console.log('Focus Liquidation: ', keywordProps);
        if(keywordProps != "")
        this.setState({loading: true, keyword: keywordProps}, async () => {
            let params = toParams({
                table: 'news_products',
                type: 1,
                keyword: keywordProps
            })
            console.log(params,'params')
            search(params).then(res => {
                console.log('res: LIQUIDATION', res.data);
                if(res.data.code == StatusCode.Success){
                    this.setState({
                        datas: res.data.data,
                        loading: false
                    })
                }else{

                    this.setState({ loading: false,datas:[] })
                }
            }).catch(err => {
                console.log('err: LIQUIDATION ', err.response);
                this.setState({ loading: false })
            })
        })
    }
    


    render(){
        return (
            <View style={style.flex}>
                {/* {   this.state.loading ? 
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View> : null
                } */}
                {/* {
                    this.state.datas.length == 0 
                        ?
                    !this.state.loading && <Text style={style.notFound}>Không có dữ liệu</Text>
                        : */}
                    <ListItem 
                        datas={this.state.datas} 
                        loading={this.state.loading}
                        keyword={this.state.keyword}
                        navigation={this.props.screenProps.navigation} />
                {/* } */}
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

