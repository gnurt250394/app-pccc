import React from 'react'
import { View,  StatusBar, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import {  color, StatusCode, toParams, toPrice} from 'config'
import { Header, BaseSearch } from 'components'
import { listBiddings, search } from 'config/apis/bidding'
import { listFollows } from 'config/apis/Project'
import { DetailBiddingScreen } from 'config/screenNames'
import images from "assets/images"
import moment from 'moment';

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

class ListBidding extends React.Component {
    state = {
        datas: [],
        type: this.props.navigation.getParam('type'),
        loading: true,
        refreshing: false,
        datas: [],
        page: 1,
        threshold: 0.1,
        keyword: ''
    }
    // set status bar
    async componentDidMount() {
        await this.getData()
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(color);
        });
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
                {/* <Header
                    check={1}
                    title={this.state.type && this.state.type == 'tracking' ? "Theo dõi đấu thầu" : "Thông tin đấu thầu"} onPress={this._goBack}/> */}
                    <BaseSearch 
                        onSearch={this._onSearch}
                        onClear={this.getData}
                        ref={val => this.search = val}
                        goBack={this._goBack}
                        keyword={this.state.keyword} />

                    {
                        this.state.datas.length == 0 
                            ?
                        !this.state.loading && <Text style={style.notFound}>Không có dữ liệu</Text>
                            :
                        <FlatList
                            data={this.state.datas}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()} 
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                            onEndReached={this.handleLoadmore}
                            onEndReachedThreshold={this.state.threshold}
                            ListFooterComponent={this.ListFooterComponent}  />
                    }
                
            </View>
        )
    }

    _onSearch = () => {
        let keyword = this.search ? this.search.getValue() : ''
        this.setState({loading: true}, async () => {
            let params = toParams({
                table: 'news_biddings',
                keyword: keyword
            })
            search(params).then(res => {
                if(res.data.code == StatusCode.Success){
                    this.setState({
                        datas: res.data.data,
                        loading: false
                    })
                }else{
                    this.setState({ loading: false })
                }
            }).catch(err => {
                this.setState({ loading: false })
            })
        })
    }

    _formatTimeAction = time => {
        return moment(time,'YYYY-MM-DD hh:mm:ss').format('HH:mm - DD/MM/YYYY')
    }

    renderItem = ({item, index}) => {
        let count = this.state.datas.length
        return <TouchableOpacity 
                    onPress={this._navTo(DetailBiddingScreen, {bidding_id: item.id})}
                    style={index == count -1 ? [style.box, style.btw0] : style.box}>
                <Text style={style.name}>{item.name || item.name_bidding}</Text>
                {/* <View style={[style.row, style.calender]}>
                    <Image source={images.calender} style={style.iconCalender}/>
                    <Text style={style.time}>{this._formatTimeAction(item.time_action || item.time)}</Text>
                </View> */}
                {/* {item.version && <LI label={`Phiên bản: ${item.version}`} />} */}
                {/* {item.price && <LI label={`Giá trị: ${toPrice(item.price)}`} />}
                {item.phase && <LI label={`Giai đoạn: ${item.phase}`} />} */}
                <LI label={`Số TBMT: ${item.code || item.number_tbmt }`} />
                {item.partner && <LI label={`Bên mời thầu: ${item.partner}`} />}
                {/* {item.address && <LI label={`Địa điểm: ${item.address}`} />} */}
                {item.project_code && <LI label={`Mã dự án: ${item.project_code}`} />}
                {item.time_start && <LI label={`Thời gian mời thầu: ${moment(item.time_start,'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')}`} />}
                {item.time_end && <LI label={`Thời gian đóng thầu: ${moment(item.time_end,'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')}`} />}
            </TouchableOpacity>
    }

    handleRefresh = () => {
        this.setState( { refreshing: true, page:  1 }  , this.getData)
    }

    handleLoadmore = () => {
        this.state.loading ? this.setState( { loading: true, page: this.state.page + 1 } , this.getData) : null
    }

    ListFooterComponent = () => {
        return  this.state.loading ? <ActivityIndicator size={"large"} color="#2166A2" /> : null
    }

    getData = async () => {
        // lần đầu chạy cả componentDidMount =>  handleLoadmore
        let type = this.state.type,
            datas = [];
        if(type && type == 'tracking'){
            datas = await listFollows(this.state.page).then(res => {
                return res.data.code == StatusCode.Success ? res.data.data : []
            }).catch(err => {
                // console.log('err: ', err);
                return []
            })
        }else{
            datas = await listBiddings(this.state.page).then(res => {
                return res.data.code == StatusCode.Success ? res.data.data : []
            }).catch(err => {
                // console.log('err: ', err);
                return []
            })
        }

        if(datas.length == 0){
            this.setState({
                loading: false,
                refreshing: false,
                threshold: 0
            })
        }else{
            if(this.state.page == 1){
                this.setState({ datas, loading: true, refreshing: false  })
            }else{
                this.setState({ datas: [...this.state.datas, ...datas], loading: true, refreshing: false})
            }
        }

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
    },
    btw0: {
        borderBottomWidth: 0,
    },
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'},
    box: { flex: 1, borderBottomWidth: 8, borderBottomColor: '#ddd',padding: 10},
    dot: {
        width: 6, 
        height: 6, 
        marginLeft: 10,
        marginRight: 10, 
        marginTop: 5
    },
    name: { fontSize: 16, padding: 10, paddingTop: 0, textAlign: 'left', color: '#333333', fontWeight: 'bold',},
    txt: { fontSize: 14, textAlign: 'left',color: '#555555', padding: 10},
    time: { fontSize: 12, textAlign: 'left',color: '#555555', padding: 5},
    price: { fontSize: 13, padding: 10, textAlign: 'left', color , paddingTop: 0,},
    iconCalender: { width: 15,  resizeMode: 'contain', margin: 5,},
    imgCalenda:{
        height:15,
        width:15,
        alignSelf:'center',
        tintColor:'#2166A2',
        marginRight:5
    },
    keyword: {color, textAlign: 'left',},
    row: {
        flexDirection: 'row', 
        alignItems: 'flex-start', 
    },
    calender: {
        width: '45%', 
        alignSelf: 'flex-start', 
        borderWidth: 1, 
        borderColor: '#555555', 
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5, 
        justifyContent: 'center', 
        marginLeft: 10, 
        //  marginBottom: 5,
    },
    label: {color: '#555555', fontSize: 14, flex: 1, flexWrap: 'wrap', paddingBottom: 8, paddingRight: 10}
})
