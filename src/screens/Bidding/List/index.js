import React from 'react'
import { View,  StatusBar, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import {  color, StatusCode} from 'config'
import ListItem from './ListItem'
import { Header } from 'components'
import { listBiddings } from 'config/apis/bidding'
import { listFollows } from 'config/apis/Project'

class ListBidding extends React.Component {
    state = {
        loading: true,
        biddings: [],
        type: this.props.navigation.getParam('type')
    }
    // set status bar
    async componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(color);
        });
        let type = this.state.type,
            biddings = [];
        if(type && type == 'tracking'){
            biddings = await listFollows().then(res => {
                return res.data.code == StatusCode.Success ? res.data.data : []
            }).catch(err => {
                console.log('err: ', err);
                return []
            })
        }else{
            biddings = await listBiddings().then(res => {
                return res.data.code == StatusCode.Success ? res.data.data : []
            }).catch(err => {
                console.log('err: ', err);
                return []
            })
        }
        
        this.setState({biddings, loading: false})

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
                    title={this.state.type && this.state.type == 'tracking' ? "Theo dõi đấu thầu" : "Thông tin đấu thầu"} onPress={this._goBack}/>
                <ScrollView>

                    {
                        this.state.biddings.length == 0 
                            ?
                        !this.state.loading && <Text style={style.notFound}>Không có dữ liệu</Text>
                            :
                        <ListItem 
                            biddings={this.state.biddings} 
                            navigation={this.props.navigation} />
                    }
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
    notFound: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    }
})
