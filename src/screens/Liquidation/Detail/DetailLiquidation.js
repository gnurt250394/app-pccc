import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity,ScrollView } from 'react-native'
import { Header } from 'components';
import images from "assets/images"
import { fontStyles } from 'config/fontStyles';
import Button from './Button';
import navigation from 'navigation/NavigationService';
import HeaderDetail from './HeaderDetail';
import BodyDetail from './BodyDetail';
import FooterDetail from './FooterDetail';
import { getDetailLiquidation } from 'config/apis/liquidation';

export default class DetailLiquidation extends Component {
      state={
            id:this.props.navigation.getParam('id',''),
            Liquidation:data
      }
      _nextPage=()=>{
            alert('111')
      }
      _goBack=()=>{
            navigation.pop()
      }
      render() {
            const {Liquidation} = this.state
            return (
                  <View style={styles.container}>
                        <Header
                              check={1}
                              onPress={this._goBack}
                              title={'Chi tiết thanh lý'}
                        />
                        <ScrollView>
                        <View style={styles.Group}>
                              <HeaderDetail
                              image={Liquidation.user_image}
                              name={Liquidation.user_name}
                              address={Liquidation.user_address}
                              />
                              <View style={styles.end}/>
                              <BodyDetail
                              title={Liquidation.title}
                              description={Liquidation.description}
                              time={Liquidation.time}
                              />
                              <View style={styles.end}/>
                              <FooterDetail
                              category={Liquidation.category}
                              address={Liquidation.district + " " + Liquidation.city}
                              file_attach={Liquidation.file_attach}
                              />
                        </View>
                        </ScrollView>
                        <Button
                        onPressMsg={this._nextPage}
                        onPressPhone={this._nextPage}
                        />
                  </View>
            )
      }
      getDetail = () =>{
            getDetailLiquidation(this.state.id).then(res=>{
                  console.log(res.data,'dsdsds')
            }).catch(err=>{
                  console.log(err.response,'err')
            })
      }
      componentDidMount() {
      //   this.getDetail()
      }
      
}
const data = {
      "title": "Hang thanh ly",
      "description": "hang con moi",
      "user_name": "Lê Văn Hoàng",
      "user_address": "Thành phố Hà Nội",
      "user_image": "http://pccc.loilv/public/users/IMG-YZBC-09787891779999999.png",
      "district": "Tỉnh Hà Nam",
      "city": "Thành phố Hà Nội",
      "file_attach": [
        "https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png",
        "https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png"
      ],
      "category": "Trang phục",
      "time": "1 giờ trước"
    }
const styles = StyleSheet.create({
      container: {
            flex: 1,
      },
      Group: {
            flex: 1,
            padding:10
      },
      end: {
            height: 0.6,
            backgroundColor: 'gray',
            width: '100%',
            marginVertical:15
      },
})