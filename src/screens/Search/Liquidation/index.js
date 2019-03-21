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
            loading: false
        }
    }


    // set status bar
    async componentDidMount() {
        this.setState({loading: true}, async () => {
            let keyword = await AsyncStorage.getItem('home_search') || ""

            let params = toParams({
                table: 'sell_products',
                type: 1,
                keyword: keyword
            })
            search(params).then(res => {
                console.log('res Liquidation : ', res.data.data);
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
                        keyword={this.keyword}
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

