import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { Slide, ViewMore, BaseHeader } from 'components'
import { ViewAllProductScreen } from 'config/screenNames'
import ListItem from './ListItem'

class Shop extends React.Component {
   
    render(){
        return (
            <TouchableWithoutFeedback style= { style.flex }>
                <ScrollView>
                    <BaseHeader title="Cửa hàng" goBack={this._goBack}/>
                    <Slide />
                   
                    <View style={style.heading}>
                        <Text style={style.headingLabel}>Sản phẩm nổi bật</Text>
                        <ViewMore onPress={this._navTo(ViewAllProductScreen, {title: "Sản phẩm nổi bật"})}/>
                    </View>
                    <ListItem data={data} navigate={this.props.navigation.navigate} />
                    <View style={style.hr}></View>

                    <View style={style.heading}>
                        <Text style={style.headingLabel}>Sản phẩm mới nhất</Text>
                        <ViewMore  onPress={this._navTo(ViewAllProductScreen, {title: "Sản phẩm mới nhất"})}/>
                    </View>
                    <ListItem data={data} navigate={this.props.navigation.navigate} />
                    <View style={style.hr}></View>

                    <View style={style.heading}>
                        <Text style={style.headingLabel}>Sản phẩm bán chạy</Text>
                        <ViewMore onPress={this._navTo(ViewAllProductScreen, {title: "Sản phẩm bán chạy"})} />
                    </View>
                    <ListItem data={data} navigate={this.props.navigation.navigate} style={style.mb8} />
                </ScrollView>
            </TouchableWithoutFeedback>
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

const style = StyleSheet.create({
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