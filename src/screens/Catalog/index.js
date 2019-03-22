import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {  color, width, StatusCode} from 'config'
import { Header } from 'components'
import images from "assets/images"
import { listDocuments } from 'config/apis/Project'

class Catalog extends React.Component {
    state = {
        loading: false,
        keyword: '',
        type: this.props.navigation.getParam('type') || 'catalog',
        datas: []
    }
    // set status bar
    async componentDidMount() {
        console.log(this.state.type);
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor(color);

            this.setState({loading: true}, () => {
                listDocuments(this.state.type).then(res => {
                    console.log('res: ', res);
                    if(res.data.code == StatusCode.Success){
                        this.setState({
                            datas: res.data.data,
                            loading: false
                        })
                    }else{
                        this.setState({ loading: false })
                    }
                }).catch(err => {
                    console.log('err: ', err);
                    this.setState({ loading: false })
                })
            })
        
        });

    }
    
    componentWillUnmount() {
        this._navListener.remove();
    }

    /**
     * param type: document | catalog
     */

    render(){
        return (
            <View style={style.flex}>
                 {   this.state.loading ? 
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View> : null
                }
                <Header
                    check={1}
                    title={ this.state.type == 'catalog' ? "Catalog" : 'Tài liệu'} onPress={this._goBack}/>
               
                <ScrollView>
                    {
                        this.state.datas.length == 0 
                            ?
                        !this.state.loading && <Text style={style.notFound}>Không có dữ liệu</Text>
                            :
                        <FlatList
                            data={this.state.datas}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()} />
                    }
                </ScrollView>
            </View>
        )
    }

    renderItem = ({item, index}) => {
        return <View style={style.box}>
                <Image 
                    style={style.image}
                    source={this.state.type == 'catalog' ? images.pdf : images.document} />
                
                <View style={style.right}>
                    <Text style={style.name}>{item.name}</Text>
                    <Text style={style.description}>{item.description}</Text>
                    <View style={style.row}>

                        <TouchableOpacity >
                            <Text style={style.download}>tải xuống</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.btn}>
                            <Text style={style.textBtn}>Theo dõi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    }

    _onSearch = () => {

    }

    onChangeText = key => val => {
        this.setState({[key]: val})
    }

    _navTo = (screen, params = {} ) => () => {
        this.props.navigation.navigate(screen, params)
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }


}
export default connect()(Catalog)

const style = StyleSheet.create({
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'},
    boxSearch: {flexDirection: 'row', justifyContent: 'space-between', flex: 1, borderRadius: 8, backgroundColor: "rgba(0, 0, 0, 0.15)", height: 40, marginLeft: 10, marginRight: 10,},
    head: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: color, paddingTop: 10, paddingBottom: 10,},
    txtSearch: {color: "rgba(255, 255, 255, 0.6)"},
    w15: { width: 15},
    p8: {padding: 8},
    flex: {flex: 1},
    cancel: {color: 'white', padding: 10},
    box: {
        width: '100%',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 5,
        paddingLeft: 5,
        flexDirection: 'row'
    },
    image: {
        width: 100,
        height: 60,
        resizeMode: 'stretch',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
        paddingBottom: 5
    },
    btn: {
        padding: 8,
        borderWidth: 1,
        borderColor: color,
        alignItems: 'center',
        borderRadius: 5
    },
    textBtn: {
        color,
        fontSize: 12,
        textAlign: 'center'
    },
    time: {
        fontSize: 12,
        fontStyle: 'italic'
    },
    right: {
        flexDirection: 'column',
        paddingLeft: 10,
        flex: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        alignItems: 'center'
    },
    description: {
        fontSize: 12,
        paddingBottom: 8
    },
    download: {
        fontSize: 12,
        color
    },
    notFound: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    }
})

