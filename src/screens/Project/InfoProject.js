import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { BaseSearch } from 'components';
import navigation from 'navigation/NavigationService';
import { DetailProject } from 'config/screenNames';
import { getNewProject, searchProject, listFollows } from 'config/apis/Project';
import Toast from 'react-native-simple-toast';
import { Status, color } from 'config/Controller';
import ListItem from './ListItemInfoProject';
import { connect } from 'react-redux'
import { log, width, toParams } from 'config'
import { Header } from 'components';
class InfoProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProject: [],
            page: 1,
            Threshold: 0.1,
            refreshing: true,
            loading:false,
            keyword: '',
            follow: this.props.navigation.getParam('follow') || false,
        };
    }

    /**
     * check thêm phần chuyển từ màn tracking qua => param follow: true
     */

    _nextPage = (router, params) => () => {
        navigation.navigate(router, params)
    }
    _renderItem = count => ({ item, index }) => {
        return (
            <ListItem
                onPress={this._nextPage(DetailProject, { id: item.id, name: item.name, follow: this.state.follow })}
                item={item}
                follow={this.state.follow}
                count={count}
                index={index}
            />
        )
    }
    onEndReached = () =>  {
        console.log(this.state.loading,'lll')
       this.state.loading ? this.setState( { loading: true, page: this.state.page + 1 } , this.getData) : null}
    ListFooterComponent = () => {
        if(this.state.loading){
            console.log('11')
            return <ActivityIndicator size={"large"} color="#2166A2"/> 
       } else{ 
           console.log('222')
           return null
       }
    }
    
    handleRefresh = () => {
        this.setState({ refreshing: true, page: 1 }, this.getData)
    }
    _keyExtractor = (item, index) => {
        return `${item.id || index}`
    }
    _goBack = () => {
        navigation.pop()
    }
    onChangeText = key => val => {
        this.setState({ [key]: val })
    }
    _onSearch = () => {
        let keyword = this.search ? this.search.getValue() : ''
        searchProject(keyword, this.state.page).then(res => {
            if (res.data.code == Status.SUCCESS) {
                this.setState({ listProject: [...this.state.listProject,...res.data.data] })
            } else if (res.data.code == Status.NO_CONTENT) {
                this.setState({ listProject : [] ,loading:false,Threshold:0 })
            }
        }).catch(err => {
            
        })
    }
    _ListEmpty=()=>{
        return !this.state.refreshing && <Text style={styles.notFound}>Không có dữ liệu</Text>
    }
    render() {
        console.log(this.state.loading,'qqq')
        let count = this.state.listProject.length
        return (
            <View style={styles.container}>
                {this.state.follow ?
                    <Header
                        check={1}
                        onPress={this._goBack}
                        title={"Theo dõi dự án"}
                    />
                    :
                    <BaseSearch
                        onSearch={this._onSearch}
                        onClear={this.getData}
                        ref={val => this.search = val}
                        goBack={this._goBack}
                        keyword={this.state.keyword} />}

                {
                    // this.state.listProject.length == 0
                    //     ?
                        
                        // :
                        <FlatList
                            data={this.state.listProject}
                            renderItem={this._renderItem(count)}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                            keyExtractor={this._keyExtractor}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={this.state.Threshold}
                            ListEmptyComponent={this._ListEmpty}
                            ListFooterComponent={this.ListFooterComponent}
                        />
                }


            </View>
        );
    }
    getData = async () => {
        // check thêm api follow khi chuyển từ màn tracking qua
        let listProject = [];
        if (this.state.follow) {
            let params = toParams({
                page: this.state.page,
                type: 'project',
            })
            listProject = await listFollows(params).then(res => {
                return res.data.code == Status.SUCCESS ? res.data.data : []
            }).catch(err => {
                return []
            })
        } else {
            listProject = await getNewProject({ page: this.state.page }).then(res => {
                return res.data.code == Status.SUCCESS ? res.data.data : []
            }).catch(err => {
                return []
            })
            
                
        }
        
        if(listProject.length == 0){
           this.setState({loading:false,refreshing:false,Threshold:0})
            console.log('1')
        }else{
            if(this.state.page == 1){
               
                this.setState({ listProject :listProject, loading: true, refreshing: false,Threshold:0.1  })
            }else{
                this.setState({ listProject: [...this.state.listProject, ...listProject],  refreshing: false})
            }
        }

    }
    componentDidMount = () => {
        this.getData()
    };

}

const styles = StyleSheet.create({
    containerList: {
        flex: 1,
        padding: 10,
    },
    txtSearch: {
        flex: 1,
        color: '#FFFFFF'
    },
    imgSearch: {
        height: 15,
        width: 15
    },
    imgBack: {
        paddingLeft: 10
    },
    p8: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor:'#CCCCCC'
    },
    image: {
        height: 8,
        width: 8,
        tintColor: 'gray',
        alignSelf: 'center',
        marginRight: 8,
    },
    txtHeader: {
        fontWeight: '600',
        fontSize: 15,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5
    }, Header: {
        marginBottom: 15
    },
    end: {
        height: 8,
        backgroundColor: '#CCCCCC',
        width
    },
    iconBack: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        paddingLeft: 10,
    },
    head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: color, paddingTop: 10, paddingBottom: 10, },
    boxSearch: { flexDirection: 'row', justifyContent: 'space-between', flex: 1, borderRadius: 8, backgroundColor: "rgba(0, 0, 0, 0.15)", height: 40, marginLeft: 10, marginRight: 10, },
    notFound: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    }
})
export default connect()(InfoProject)