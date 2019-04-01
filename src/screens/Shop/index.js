import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { Slide, ViewMore, BaseHeader,Header } from 'components'
import { ViewAllProductScreen, HomeScreen } from 'config/screenNames'
import ListItem from './ListItem'
import TabShop from './TabShop';
import { popupCancel } from 'config';
import navigation from 'navigation/NavigationService';
class Shop extends React.Component {
   componentDidMount = () => {
    popupCancel('Tính năng đang phát triển. Vui lòng quay lại sau.', navigation.navigate(HomeScreen))
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

