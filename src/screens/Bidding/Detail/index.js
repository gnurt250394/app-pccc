import React from 'react'
import { View,  StatusBar, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { detailBidding } from 'config/apis/bidding'
import { addFolow, UnFolowUser } from 'config/apis/Project'
import {  color, ellipsis, popupOk, BiddingField, popupCancel, Follow, log } from 'config'
import { Header } from 'components'
import { getItem, Status, fontStyle } from 'config/Controller';
import images from "assets/images"
import styles from "assets/styles"
import { SigninScreen, BuyProduct } from 'config/screenNames'
import moment from 'moment';
import SimpleToast from 'react-native-simple-toast';
import { fontStyles } from 'config/fontStyles';

class LI extends React.Component {

    render(){
        return (
            <View style={style.row}>
                <Image source={images.dot} style={style.dot}/>
                <Text style={style.label}>{this.props.label}</Text>
            </View>
        )
    }
}


class DetailBidding extends React.Component {
    state = {
        loading: true,
        bidding_id: this.props.navigation.getParam('bidding_id'),
        bidding: {},
        follow: this.props.navigation.getParam('follow') || false,
    }
    token = null
    // set status bar
    async componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(color);
        });

        await this.getData()
        this.token = await getItem('token')
    }
    
    componentWillUnmount() {
        this._navListener.remove();
    }

    render(){
        let bidding = this.state.bidding || {}
        let {follow} = this.state
        return (
            <View style={[style.flex]}>
                {   this.state.loading ? 
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View> : null
                }
                <Header
                    check={1}
                    title={ellipsis(bidding.name_bidding || "")} onPress={this._goBack}/>
                
                <ScrollView >
                    <Text style={style.name}>{bidding.name_bidding}</Text>
                    <View style={style.rowCalender}>
                        <View style={[style.row, style.calender]}>
                            <Image source={images.calender} style={style.iconCalender}/>
                            <Text style={style.time}>{moment(bidding.time_action,'YYYY-MM-DD hh:mm:ss').format('HH:mm - DD/MM/YYYY') }</Text>
                        </View>
                        {!follow && (bidding.follow != undefined && bidding.follow == Follow.unfollow && <TouchableOpacity
                            onPress={this.onFollow(bidding.id)}
                            style={[style.row, style.calender, style.btn]}>
                            <Text style={[style.textBtn,fontStyles.Acumin_RPro_0]}>Theo dõi tin đấu thầu</Text>
                        </TouchableOpacity>)}
                        {!follow && (bidding.follow != undefined && bidding.follow == Follow.follow && <TouchableOpacity
                            onPress={this.onUnFollow(bidding.id)}
                            style={[style.row, style.calender, style.btnUnFolow]}>
                            <Text style={[style.textBtnUnFolow,fontStyles.Acumin_RPro_0]}>Bỏ theo dõi tin</Text>
                        </TouchableOpacity>)}
                    </View>
                    <View style={[style.pb10,style.pr10,]}>
                        <Text style={style.h3}>Thông tin liên quan đên đấu thầu:</Text>
                        {bidding.notification_form && <LI label={`Hình thức thông báo: ${bidding.notification_form}`} />}
                        {bidding.notification_type && <LI label={`Loại thông báo: ${bidding.notification_type}`} />}

                        <Text style={style.h3}>Thông tin chung:</Text>
                        {bidding.number_tbmt && <LI label={`Số TBMT: ${bidding.number_tbmt}`} />}
                        {bidding.number_khlcnt && <LI label={`Số hiệu KHLCNT: ${bidding.number_khlcnt}`} />}
                        {bidding.name_khlcnt && <LI label={`Tên KHLCNT: ${bidding.name_khlcnt}`} />}
                        <LI label={`Lĩnh vực: ${BiddingField(bidding.field)}`} />
                        {bidding.partner && <LI label={`Bên mời thầu: ${bidding.partner}`} />}
                        {bidding.name_project && <LI label={`Chủ đầu tư: ${bidding.name_project}`} />}
                        {bidding.type && <LI label={`Phân loại: ${bidding.type}`} />}
                        {bidding.source_detail && <LI label={`Chi tiết nguồn vốn: ${bidding.source_detail}`} />}
                        {bidding.type_contract && <LI label={`Loại hợp đồng: ${bidding.type_contract}`} />}
                        {bidding.contractor_form && <LI label={`Hình thức lựa chọn nhà thầu: ${bidding.contractor_form}`} />}
                        {bidding.method_lcnt && <LI label={`Phương thức LCNT: ${bidding.method_lcnt}`} />}
                        {bidding.perform_contract && <LI label={`Thời gian thực hiện hợp đồng: ${bidding.perform_contract}`} />}

                        <Text style={style.h3}>Tham gia dự thầu:</Text>
                        {/* {bidding.price && <LI label={`Hình thức mời thầu: ${bidding.price}`} />} // chưa rõ */}
                        {bidding.time_start_hsmt && <LI label={`Thời gian nhận E-HSDT từ ngày: ${moment(bidding.time_start_hsmt,'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY HH:mm')}`} />}
                        {bidding.time_end_hsmt && <LI label={`Đến ngày: ${bidding.time_end_hsmt}`} />}
                        {bidding.released && <LI label={`Phát hành E-HSMT: ${bidding.released}`} />}
                        {bidding.address_hsdt && <LI label={`Địa điểm nhận HSDT: ${bidding.address_hsdt}`} />}
                        {bidding.address_bidding && <LI label={`Địa điểm thực hiện gói thầu: ${bidding.address_bidding}`} />}

                        <Text style={style.h3}>Mở thầu:</Text>
                        {bidding.time_open_close && <LI label={`Thời điểm đóng/mở thầu: ${moment(bidding.time_open_close,'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY HH:mm')}`} />}
                        {bidding.address_open_bidding && <LI label={`Địa điểm mở thầu: ${bidding.address_open_bidding}`} />}
                        {bidding.estimates_bidding && <LI label={`Dự toán gói thầu: ${bidding.estimates_bidding}`} />}

                        <Text style={style.h3}>Đảm bảo dự thầu:</Text>
                        {bidding.amount_bidding && <LI label={`Số tiền bảo đảm dự thầu: ${bidding.amount_bidding}`} />}
                        {bidding.bidding_form && <LI label={`Hình thức bảo đảm dự thầu: ${bidding.bidding_form}`} />}
                        {bidding.bidding_document? <LI label={`Hồ sơ mời thầu: ${bidding.bidding_document}`} />:null}
                        {bidding.care && <LI label={`Quan tâm: ${bidding.care}`} />}
                    </View>
                    
                </ScrollView>

                
            </View>
        )
    }

    getData = async () => {
        let bidding = await detailBidding(this.state.bidding_id).then(res => {
            log('res: ', res);
            return res.data.code == Status.SUCCESS ? res.data.data : null
        }).catch(err => {
            log('err: ', err);
            return null
        })
console.log(bidding,'ddding')
        if(!bidding || (bidding && !bidding.id)){
            popupOk("Không tìm thấy dữ liệu.", this._goBack)
            this.setState({loading: false})
        }else{
            this.setState({bidding, loading: false})
        }
    }

    onFollow = (bidding_id ) => () => {
        if(!this.token){
            popupCancel('Bạn phải đăng nhập để sử dụng tính năng này.', () => this.props.navigation.navigate(SigninScreen))
        }else{
            addFolow({bidding_id , table: Follow.table_bidding}).then(res => {
                log('res: ', res);
                switch (res.data.code) {
                    case Status.TOKEN_EXPIRED:
                        popupCancel('Phiên đăng nhập đã hết hạn', () => this.props.navigation.navigate(SigninScreen))
                        break;
                    case Status.USER_PERMISSION:
                        popupCancel('Vui lòng mua gói để sử dụng tính năng này', () => popupOk('Tính năng đang phát triển. Vui lòng quay lại sau.'))
                        break;
                    case Status.SUCCESS:
                        SimpleToast.show('Theo dõi thành công.')
                        this.setState({bidding: {...this.state.bidding, follow: Follow.follow}})
                        break;
                
                    default:
                        SimpleToast.show('Theo dõi thất bại.')
                        break;
                }
            }).catch(err => {
                console.log('err: ', err);
                SimpleToast.show('Theo dõi thất bại.')
            })
        }
    }

    onUnFollow = (bidding_id ) => () => {
        if(!this.token){
            popupCancel('Bạn phải đăng nhập để sử dụng tính năng này.', () => this.props.navigation.navigate(SigninScreen))
        }else{
            UnFolowUser({bidding_id , table: Follow.table_bidding}).then(res => {
                switch (res.data.code) {
                    case Status.TOKEN_EXPIRED:
                        popupCancel('Phiên đăng nhập đã hết hạn', () => this.props.navigation.navigate(SigninScreen))
                        break;
                    case Status.SUCCESS:
                        SimpleToast.show('Bỏ theo dõi thành công.')
                        this.setState({bidding: {...this.state.bidding, follow: Follow.unfollow}})
                        break;
                    default:
                        SimpleToast.show('Bỏ theo dõi thất bại.')
                        break;
                }
            }).catch(err => {
                console.log('err: ', err);
                SimpleToast.show('Bỏ theo dõi thất bại.')
            })
        }
    }

    _navTo = (screen, params = {} ) => () => {
        this.props.navigation.navigate(screen, params)
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }


}
export default connect()(DetailBidding)

const style = StyleSheet.create({
    flex: {flex: 1},
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'},
    box: { flex: 1, borderBottomWidth: 5, borderBottomColor: '#ddd',padding: 10, },
    dot: {
        width: 6, 
        height: 6, 
        marginLeft: 10,
        marginRight: 10, 
        marginTop: 5
    },
    name: { fontSize: 16, padding: 10, paddingBottom: 15, textAlign: 'left', color: '#333333', fontWeight: 'bold',},
    h3: { fontSize: 16, padding: 10, textAlign: 'left', color: '#333333', fontWeight: 'bold',},
    txt: { fontSize: 14, textAlign: 'left',color: '#555555', padding: 10},
    time: { fontSize: 12, textAlign: 'left',color: '#555555', padding: 5},
    price: { fontSize: 13, padding: 10, textAlign: 'left', color , paddingTop: 0,},
    iconCalender: {width: 15, height: 15, resizeMode: 'stretch', margin: 5,tintColor:'#2166A2',},
    keyword: {color, textAlign: 'left',},
    row: {flexDirection: 'row', alignItems: 'flex-start'},
    calender: {width: '45%',  borderWidth: 1, borderColor: '#999',  borderRadius: 5, justifyContent: 'center',alignItems: 'center', marginLeft: 10, marginBottom: 5, padding: 5,},
    rowCalender: {flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start'},
    label: {color: '#555555', fontSize: 14, flex: 1, flexWrap: 'wrap', paddingBottom: 8},
    btn: {
        width: '40%',
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 0,
    },
    btnUnFolow: {
        width: '40%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor:color
    },
    textBtn: {
        color: 'white',
        fontSize: 13,
        textAlign: 'center',
        // fontFamily:fontStyles.Acumin_RPro_0
    },
    textBtnUnFolow: {
        color: color,
        fontSize: 13,
        textAlign: 'center',
        // fontFamily:fontStyles.Acumin_RPro_0
    },
    pb10: {
        paddingBottom: 10
    },
    pr10: {
        paddingRight: 6
    }
})

