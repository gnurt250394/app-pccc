import React from 'react'
import { View,  StatusBar, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import {  color, StatusCode, toParams, log} from 'config'
import { Header, BaseSearch } from 'components'
import { listBiddings, search } from 'config/apis/bidding'
import { listFollows } from 'config/apis/Project'
import { DetailBiddingScreen } from 'config/screenNames'
import images from "assets/images"
import moment from 'moment';
import { countBidding } from 'reduxs/actions/actionCreator';

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
        follow: this.props.navigation.getParam('follow') || false,
        loading: true,
        refreshing: true,
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
    _ListEmpty = () => {
        return !this.state.refreshing && <Text style={style.notFound}>Không có dữ liệu</Text>
      }
    /**
     * check thêm phần chuyển từ màn tracking qua => param follow: true
     */
    _keyExtractor=(item,index)=> `${item.id || index}`
    render(){
        let count = this.state.datas.length
        return (
            <View style={style.flex}>
                    {this.state.follow?
                    <Header
                    check={1}
                    onPress={this._goBack}
                    title={"Theo dõi đấu thầu"}
                    />
                    :<BaseSearch 
                        onSearch={this._onSearch}
                        onClear={this.getData}
                        ref={val => this.search = val}
                        goBack={this._goBack}
                        keyword={this.state.keyword} />}

                    
                        <FlatList
                            // ref='bidding'
                            data={this.state.datas}
                            renderItem={this.renderItem(count)}
                            keyExtractor={this._keyExtractor} 
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                            onEndReached={this.handleLoadmore}
                            ListEmptyComponent={this._ListEmpty}
                            onEndReachedThreshold={this.state.threshold}
                            ListFooterComponent={this.ListFooterComponent}  />
                    
                
            </View>
        )
    }

    _onSearch = () => {
        let keyword = this.search ? this.search.getValue() : ''
        // phải set lại state cho page: onEndReached đã += 1 cho page
        this.setState({loading: true, page: 1}, async () => {
            let params = toParams({
                table: 'news_biddings',
                keyword: keyword
            })
            let datas = await search(params).then(res => {
                return res.data.code == StatusCode.Success ? res.data.data : []
            }).catch(err => {
                return []
            })
            this.setState({ datas, loading: false , refreshing: false })
        })
    }

    _formatTimeAction = time => {
        return moment(time,'YYYY-MM-DD hh:mm:ss').format('HH:mm - DD/MM/YYYY')
    }

    renderItem = count => ({item, index}) => {
        return <TouchableOpacity 
                    onPress={this._navTo(DetailBiddingScreen, {id: item.id,follow:this.state.follow},index)}
                    style={index == count -1 ? [style.box, style.btw0] : style.box}>
                <Text style={style.name}>{item.name || item.name_bidding}  {this.state.follow&&(item.change ==1&& <Image  style={style.iconNotify} source={images.dotYellow} />)}</Text>
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
        log('ListFooterComponent: ', this.state.loading);
        return  this.state.loading&& this.state.datas.length >3 ? <ActivityIndicator size={"large"} color="#2166A2" /> : null
    }

    getData = async () => {
        // lần đầu chạy cả componentDidMount =>  handleLoadmore
        let datas = [];
        // log(this.state.follow);
        if(this.state.follow){
            let params = toParams({
                page: this.state.page,
                type: 'bidding'
            })
            datas = await listFollows(params).then(res => {
                return res.data.code == StatusCode.Success ? res.data.data : []
            }).catch(err => {
                return []
            })
            
        }else{
            datas = await listBiddings(this.state.page).then(res => {
                // log('res: ', res);
                return res.data.code == StatusCode.Success ? res.data.data : []
            }).catch(err => {
                // 
                return []
            })
            
        }
        log(datas);
        if(datas.length == 0){
            this.setState({
                loading: false,
                refreshing: false,
                threshold: 0,
            })
        }else{
            if(this.state.page == 1){
                this.setState({ datas, loading: true, refreshing: false,threshold:0.1  })
            }else{
                this.setState({ datas: [...this.state.datas, ...datas], loading: true, refreshing: false})
            }
        }

    }

    _navTo = (screen, params = {},index ) => () => {
        if (this.state.follow) {
            let datas = [...this.state.datas]
            datas[index].change = 1
            
           let listChange= datas.filter(item=>item.change ==0)
           
           if(listChange.length ==0){
            this.props.changeBidding(1)
           }else{
            this.props.changeBidding(0)
           }
            this.setState({datas})
        }
        this.props.navigation.navigate(screen, params)
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }


}
const mapStateToProps = (state) => {
    return {
        change: state.countReducer ? state.countReducer : {}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeBidding: (change) => dispatch(countBidding(change))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ListBidding)

const style = StyleSheet.create({
    flex: {flex: 1,backgroundColor:'#CCCCCC'},
    notFound: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    },
    iconNotify: {
        width: 12, 
        height: 12, 
        resizeMode: 'contain',
        marginLeft:15
    },
    btw0: {
        borderBottomWidth: 0,
        backgroundColor:'#FFFFFF'
    },
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'},
    box: { flex: 1, borderBottomWidth: 8, borderBottomColor: '#ddd',padding: 10,backgroundColor:'#FFFFFF'},
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
