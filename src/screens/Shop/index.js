import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { Slide, ViewMore, BaseHeader, Header } from 'components'
import { ViewAllProductScreen, HomeScreen, SigninScreen, Liquidation } from 'config/screenNames'
import ListItem from './ListItem'
import TabShop from './TabShop';
import { popupCancel } from 'config';
import navigation from 'navigation/NavigationService';
import { NavigationEvents } from 'react-navigation';
import { typeScreen, Status, removeItem, getItem } from 'config/Controller';
import { getListLiquidation } from 'config/apis/liquidation';
class Shop extends React.Component {
    state = {
        routerName: this.props.navigation.getParam('routerName', ''),
        type: '',
        isLoading:false
    }
    // componentDidMount = () => {
    //     console.log(this.state.routerName, 'tab')
    //     // popupCancel('Tính năng đang phát triển. Vui lòng quay lại sau.', navigation.navigate(HomeScreen))
    // };
    _nextPage = () => {
        const { type } = this.state
        console.log(this.tabShop,'ref')
        navigation.navigate(Liquidation, { refress: this.loadData, type: type })
    }
    setTypeScreen = (type) => {
        this.setState({ type })
    }

    loadData=()=>{
        this.setState({isLoading:true})
    }

    stopGetData=()=>{
        this.setState({isLoading:false})
    }
    // getData = async (params) => {
        
    //     let data = []
    //     let token = await getItem('token')
    //     data = await getListLiquidation(params, token).then(res => {
    //         console.log(res.data, 'refres')
    //         switch (res.data.code) {
    //             case Status.SUCCESS: return res.data.data
    //             case Status.NO_CONTENT: return []
    //             case Status.TOKEN_EXPIRED:
    //                 return (
    //                     navigation.reset(SigninScreen),
    //                     removeItem('token')
    //                 )
    //                 default: return []
    //         }
            
    //     }).catch(err => {
    //             return []
    //     })
    //     return data
    // }
   
    render() {
        return (
            <View style={styles.flex}>
                <Header
                    title="Shop của tôi"
                    check={1}
                    finish={this.state.type == typeScreen.product ? null : 2}
                    onFinish={this._nextPage}
                    onPress={this._goBack}
                />
                <TabShop
                    screenProps={{ 
                        next: this.setTypeScreen,
                        stopGetData:this.stopGetData ,
                        isLoading:this.state.isLoading
                    }}
                    ref={ref => this.tabShop = ref}
                />
            </View>
        )
    }

    _navTo = (screen, params) => () => {
        this.props.navigation.navigate(screen, params)
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

}
export default connect()(Shop)

const styles = StyleSheet.create({
    heading: { flexDirection: 'row', justifyContent: 'space-between', padding: 8, alignItems: 'center', },
    hr: { width: '100%', height: 3, backgroundColor: '#ddd', marginTop: 8, marginBottom: 3 },
    headingLabel: { fontSize: 20, fontWeight: '500', color: '#333333', fontSize: 18 },
    flex: { flex: 1 },
    mb8: { marginBottom: 8 }
})

