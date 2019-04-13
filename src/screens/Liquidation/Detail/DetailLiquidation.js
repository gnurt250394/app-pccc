import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity,ScrollView,Linking } from 'react-native'
import { Header } from 'components';
import images from "assets/images"
import { fontStyles } from 'config/fontStyles';
import Button from './Button';
import navigation from 'navigation/NavigationService';
import HeaderDetail from './HeaderDetail';
import BodyDetail from './BodyDetail';
import FooterDetail from './FooterDetail';
import { getDetailLiquidation } from 'config/apis/liquidation';
import { Status, callNumber, typeScreen } from 'config/Controller';

export default class DetailLiquidation extends Component {
      state={
            id:this.props.navigation.getParam('id',''),
            Liquidation:{},
            loading:true,
            type:this.props.navigation.getParam('type',typeScreen.postPurchase)
      }
      _nextPage=()=>{
            alert('111')
      }
      _goBack=()=>{
            navigation.pop()
      }
      _CallPhone = (Liquidation)=>() =>{
            callNumber(Liquidation.user_phone)
      }
      render() {
            const {Liquidation,type} = this.state
            return (
                  <View style={styles.container}>
                        <Header
                              check={1}
                              onPress={this._goBack}
                              title={type == typeScreen.Liquidation?'Chi tiết thanh lý':'Chi tiết đăng mua'}
                        />
                        {this.state.loading?
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
                              address={Liquidation.district + " - " + Liquidation.city}
                              file_attach={Liquidation.file_attach}
                              />
                        </View>
                        </ScrollView>
                        : null}
                        <Button
                        onPressMsg={this._nextPage}
                        onPressPhone={this._CallPhone(Liquidation)}
                        />
                  </View>
            )
      }
      getDetail = () =>{
            
            getDetailLiquidation(this.state.id).then(res=>{
                  console.log(res.data,'dadads')
                  if(res.data.code == Status.SUCCESS){
                        this.setState({Liquidation:res.data.data})
                  }else if(res.data.code == Status.ID_NOT_FOUND){
                        this.setState({loading:false,Liquidation:{}})
                  }
            }).catch(err=>{
                  
            })
      }
      componentDidMount() {
        this.getDetail()
      }
      
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