import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { Slide, ViewMore, BaseHeader,Header } from 'components'
import { ViewAllProductScreen, HomeScreen } from 'config/screenNames'
import ListItem from './ListItem'
import TabShop from './TabShop';
import { popupOk } from 'config';
class Shop extends React.Component {
   componentDidMount = () => {
    popupOk('Tính năng đang phát triển. Vui lòng quay lại sau.', this.props.navigation.navigate(HomeScreen))
   };
   
    render(){
        return (
            <View style={styles.flex}>
            <Header
                title="Shop của tôi"
                check={1}
                onPress={this._goBack}
            />
            <TabShop/>
            </View>
        )
    }

    _navTo = (screen, params ) => () => {
        this.props.navigation.navigate(screen, params)
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

}
export default connect()(Shop)

const styles = StyleSheet.create({
    heading: {flexDirection: 'row', justifyContent: 'space-between', padding: 8, alignItems:'center', },
    hr: {width: '100%', height: 3, backgroundColor: '#ddd', marginTop: 8, marginBottom: 3},
    headingLabel: {fontSize: 20, fontWeight: '500', color: '#333333', fontSize: 18},
    flex: { flex: 1},
    mb8: {marginBottom: 8}
})

let data = [
    {
        id: 1,
        name: 'Bình chữa cháy 1',
        price: 220000,
        like: false
    },
    {
        id: 2,
        name: 'Bình chữa cháy 2',
        price: "liên hệ",
        like: true
    },
    {
        id: 3,
        name: 'Bình chữa cháy 3',
        price: 220000,
        like: false
    },
    {
        id: 4,
        name: 'Bình chữa cháy 4',
        price: 220000,
        like: false
    },
]