import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity, ScrollView, Animated, RefreshControl, SafeAreaView } from 'react-native';
import { Header } from 'components';
import { fontStyle, color, Status, typeScreen, removeItem } from 'config/Controller';
import images from 'assets/images'
import navigation from 'navigation/NavigationService';
import { DetailUserFollows, UnFolowUser } from 'config/apis/Project';
import { fontStyles } from 'config/fontStyles';
import { DetailProject, DetailBiddingScreen, SigninScreen } from 'config/screenNames';
import SimpleToast from 'react-native-simple-toast';
import { Btn } from 'components';
const { width, height } = Dimensions.get('window')

const HEADER_MAX_HEGHT = 120
const HEADER_MIN_HEGHT = 55
class Item extends Component {
    render() {
        return this.props.name ? <View style={styles.Square}>
            <Image source={this.props.source}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={{ flexWrap: 'wrap', flexShink: 7, paddingRight: 5 }}>
                <Text style={styles.txt} >
                    {this.props.name}</Text>
            </View>
        </View>
            : null
    }
}
export default class DetailContractor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            listFolowUser: [],
            UserObject: {},
            refreshing: true
        };
    }
    nextPage = (item) => () => {
        if (item.type == typeScreen.project) {
            navigation.navigate(DetailProject, { id: item.common_id })
        } else if (item.type == typeScreen.bidding) {
            navigation.navigate(DetailBiddingScreen,{id:item.common_id})
        } else if (item.type == typeScreen.user) {
            navigation.navigate(DetailContractor,{id:item.common_id})
        }
    }
    _renderItem = ({ item }) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={this.nextPage(item)}
                    style={styles.containerList}>
                    <Text style={[styles.titleList, fontStyles.Acumin_RPro_0]}>{item.message}</Text>
                    <Text style={[styles.timeList, fontStyles.Acumin_ItPro_0]}>{item.time}</Text>

                </TouchableOpacity>
                <View style={styles.end} />
            </View>
        )
    }
    _keyExtractor = (item, index) => {
        return `${item.id || index}`
    }
    _goBack = () => {
        navigation.pop()
    }
    _refresshing = () => {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.getData}
                colors={["#2166A2", 'white']}
                tintColor="#2166A2"
            />
        )
    }

    _UnfolowUser = ()=> {

          let {UserObject} =this.state
          UnFolowUser({ investor_id: UserObject.id, table: 'UserInvestor' }).then(res => {
            if (res.data.code == Status.SUCCESS) {
              
                SimpleToast.show('Bạn đã bỏ theo dõi nhà thầu ' + UserObject.name + ' thành công')
            } else if (res.data.code == Status.TOKEN_EXPIRED ) {
              SimpleToast.show('Phiên đăng nhập hết hạn')
              navigation.reset(SigninScreen)
              removeItem('token')
            } else if (res.data.code == Status.ID_NOT_FOUND) {
                SimpleToast.show('Dự án không tồn tại')
            }
          }).catch(err => {
            SimpleToast.show('Lỗi hệ thống' + ' ' + err.response.status)
          })
      }
    render() {
        let { UserObject } = this.state
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEGHT - HEADER_MIN_HEGHT],
            outputRange: [HEADER_MAX_HEGHT, HEADER_MIN_HEGHT],
            extrapolate: 'clamp'
        })
        const marginTop = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEGHT - HEADER_MIN_HEGHT],
            outputRange: [HEADER_MAX_HEGHT - 120, HEADER_MAX_HEGHT + 5],
            extrapolate: 'clamp'
        })
        const zIndex = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEGHT - HEADER_MIN_HEGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        return (
            <View style={styles.container}>
                {/* <SafeAreaView> */}
                {/* <Animated.View
                        style={[styles.header, {
                            height: headerHeight,
                            zIndex
                        }]}
                    >


                    </Animated.View> */}
                <View style={styles.header} />

                {/* <Animated.View
        style={[styles.header,{
            height:headerHeight,
            zIndex
            }]}
        >
      <Header
            check={1}
            style={styles.header}
            onPress={this._goBack}
            title={"Thông tin nhà thầu"}
        />

        </Animated.View> */}
                {/* </SafeAreaView> */}
                {/* <ScrollView
                    refreshControl={this._refresshing()}
                    style={{ flex: 1 }}
                    scrollEventThrottle={15}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                    )}
                > */}
                <Header
                    check={1}
                    // style={styles.header}
                    onPress={this._goBack}
                    title={"Thông tin nhà thầu"}
                />
                <View style={[styles.containerPosition]}>
                    <Text style={[styles.txtBold, fontStyles.Acumin_bold]}>{UserObject.name}</Text>
                    <Item source={images.proEmail} name={UserObject.email} />
                    <Item source={images.proPhone} name={UserObject.phone} />
                    <Item source={images.proLocation} name={UserObject.address} />
                    <Item source={images.proCompany} name={UserObject.company} />
                    <Btn name={"Bỏ theo dõi"}
                        onPress={this._UnfolowUser}
                        textStyle={styles.textUnFollow}
                        customStyle={styles.btnUnFollow} />
                </View>
                <View style={styles.containerFooter}>
                    <Text style={[styles.txtFooter, fontStyles.Acumin_bold]}>Tin tức nhà thầu</Text>
                    <FlatList
                        data={UserObject.content}
                        refreshControl={this._refresshing()}
                        keyboardShouldPersistTaps="always"
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
                {/* </ScrollView> */}
            </View>
        );
    }
    getData = () => {
        if (this.props.navigation.state && this.props.navigation.state.params.id) {
            console.log(this.props.navigation.state.params.id)
            DetailUserFollows(this.props.navigation.state.params.id).then(res => {
                console.log(res.data, 'ddd')
                if (res.data.code == Status.SUCCESS) {
                    this.setState({
                        UserObject: res.data.data,
                        refreshing: false
                    })
                } else if (res.data.code == Status.TOKEN_EXPIRED) {
                    SimpleToast.show('Phiên đăng nhập hết hạn')
                    navigation.navigate(SigninScreen)
                    this.setState({ refreshing: false })
                    removeItem('token')
                }
            }).catch(err => {
                this.setState({ refreshing: false })
                console.log(err.response, 'eeerrr')
            })
        }
    }
    componentDidMount = () => {
        this.getData()
    };

}

const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-start',
        height: HEADER_MAX_HEGHT,
        paddingTop: 15,
        position: 'absolute',
        backgroundColor: color,
        top: 0,
        left: 0,
        right: 0
    },
    textUnFollow:{
        color:'#2166A2'
    },
    btnUnFollow: {
        width: '40%',
        borderRadius: 5,
        marginBottom:0,
        marginTop:0,
        backgroundColor:'#FFFFFF'
    },
    containerList: {
        flex: 1,
        paddingHorizontal: 15
    },

    container: {
        flex: 1
    },
    titleList: {
        color: '#333333',
        // fontFamily: fontStyles.Acumin_RPro_0,
    },
    timeList: {
        // fontFamily: fontStyles.Acumin_ItPro_0,
        fontSize: 11,
        color: '#999999',
        marginTop: 5

    },
    end: {
        height: 1,
        backgroundColor: '#DEDEDE',
        width,
        marginVertical: 5,
    },
    containerPosition: {
        // position:'absolute',
        // top: 55,
        // height:height/4,
        shadowColor: '#999999',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 4,
        width: width - 20,
        borderRadius: 10,
        alignSelf: 'center',
        padding: 15,
        // marginTop:HEADER_MAX_HEGHT -70,
        // flex: 1,
        backgroundColor: '#FFFFFF',
    },
    txtBold: {
        // fontFamily: fontStyles.Acumin_bold,
        color: '#333333',
        marginBottom: 8,
        fontSize: 16
    },
    txtFooter: {
        // fontFamily: fontStyles.Acumin_bold,
        color: '#333333',
        marginBottom: 4,
        fontSize: 16,
        marginLeft: 11,
    },
    image: {
        height: 10,
        width: 10,
        // tintColor:'gray',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 4,
    },
    txt: {
        color: '#333131',
        fontSize: 13,
        // textAlign:'center'
    },
    Square: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'flex-start'
    },
    containerFooter: {
        marginTop: 10,
        flex: 1
    }
})