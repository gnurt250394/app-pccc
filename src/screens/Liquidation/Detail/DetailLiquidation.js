import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, Linking, RefreshControl } from 'react-native'
import { Header } from 'components';
import images from "assets/images"
import { fontStyles } from 'config/fontStyles';
import Button from './Button';
import navigation from 'navigation/NavigationService';
import HeaderDetail from './HeaderDetail';
import BodyDetail from './BodyDetail';
import FooterDetail from './FooterDetail';
import { getDetailLiquidation } from 'config/apis/liquidation';
import { Status, callNumber, typeScreen, getItem, popup } from 'config/Controller';
import { MessageScreen, SigninScreen } from 'config/screenNames';
import { Messages } from 'config/Status';

export default class DetailLiquidation extends Component {
      constructor(props){
            super(props);
            this.state = {
                  id: this.props.navigation.getParam('id', ''),
                  Liquidation: {},
                  user_id:'',
                  loading: true,
                  address: '',
                  type: this.props.navigation.getParam('type', typeScreen.postPurchase)
            }
      }
     
      _nextPage = async () => {
            let token = await getItem('token')
            let { Liquidation } = this.state
            if (token) {
                  navigation.navigate(MessageScreen, { id: Liquidation.user_id, title: Liquidation.user_name })
            } else {
                  popup(Messages.LOGIN_REQUIRE, null, () => navigation.navigate(SigninScreen))
            }

      }
      _goBack = () => {
            navigation.pop()
      }
      _CallPhone = (Liquidation) => () => {
            callNumber(Liquidation.user_phone)
      }
      refress = () => {
            return (
                  <RefreshControl
                        refreshing={this.state.loading}
                        onRefresh={this.getDetail}
                        colors={['#2166A2', '#FFFFFF']}
                  />
            )
      }
      render() {
            const { Liquidation, type ,user_id} = this.state
            return (
                  <View style={styles.container}>
                        <Header
                              check={1}
                              onPress={this._goBack}
                              title={type == typeScreen.Liquidation ? 'Chi tiết thanh lý' : 'Chi tiết đăng mua'}
                        />

                        <ScrollView
                              refreshControl={this.refress()}
                        >
                              {!this.state.loading ?
                                    <View style={styles.Group}>
                                          <HeaderDetail
                                                image={Liquidation.user_image}
                                                name={Liquidation.user_name}
                                                address={Liquidation.user_address}
                                          />
                                          <View style={styles.end} />
                                          <BodyDetail
                                                title={Liquidation.title}
                                                description={Liquidation.description}
                                                time={Liquidation.time}
                                          />
                                          <View style={styles.end} />
                                          <FooterDetail
                                                category={Liquidation.category}
                                                address={this.state.address}
                                                file_attach={Liquidation.file_attach? Liquidation.file_attach:''}
                                          />
                                    </View>
                                    : null}
                        </ScrollView>

                        {user_id == Liquidation.user_id?null:<Button
                              onPressMsg={this._nextPage}
                              onPressPhone={this._CallPhone(Liquidation)}
                        />}
                  </View>
            )
      }
      getDetail =async () => {
            let user_id= await getItem('user_id')
            console.log(user_id,'id')
            
            getDetailLiquidation(this.state.id).then(res => {
                  console.log(res.data,'rrrr')
                  if (res.data.code == Status.SUCCESS) {
                       const data = res.data.data;
                       
                        this.setState({
                              user_id,
                              Liquidation: data,
                              loading: false,
                              address: data.address + " - " + data.district + " - " + data.city
                        })
                  } else if (res.data.code == Status.ID_NOT_FOUND) {
                        this.setState({ loading: false, Liquidation: {}})
                  }
            }).catch(err => {
                  this.setState({ loading: false })
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
            padding: 10
      },
      end: {
            height: 0.6,
            backgroundColor: '#CCCCCC',
            width: '100%',
            marginVertical: 15
      },
})