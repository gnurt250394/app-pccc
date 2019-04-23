import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity,ActivityIndicator, Image } from 'react-native';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import { getOtherData } from 'config/apis/myShop';
import images from "assets/images"
import Search from 'screens/Liquidation/ListLiquidation/search';
import { searchLiquidation } from 'config/apis/Project';
import { typeScreen, Status } from 'config/Controller';
const { width } = Dimensions.get('window')
export default class ListCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategory: [],
      page: 1,
      refreshing: true,
      loading: false,
      Thresold: 0.1,
      listIdCheck:this.props.navigation.getParam('id',[])
    };
  }
  _goBack = () => {
    navigation.pop()
  }
  _selectList = () => {
    let listFinal = this.state.listCategory.filter(item => item.checked == true)
    let listIdFinish = [],
      listName = []
    listFinal.forEach(item => {
      listIdFinish.push(item.id)
      listName.push(item.name)
    })

    if (this.props.navigation.state && this.props.navigation.state.params.fun) {

      this.props.navigation.state.params.fun(listName.join(','), listIdFinish)
      navigation.pop()
    }

  }
  reduce = (a, b) => a + b
  _checked = (index) => () => {
    let listCategory = [...this.state.listCategory]
    listCategory[index].checked = false
    this.setState({ listCategory })
  }
  _unChecked = (index) => () => {
    let listCategory = [...this.state.listCategory]

    listCategory[index].checked = true
    this.setState({ listCategory })
  }
  _renderItem = ({ item, index }) => {
    if (item.checked) {
      return (
        <TouchableOpacity
          onPress={this._checked(index)}
          style={styles.containerListChecked}>
          <View style={styles.containerBtn}>
            <Text style={styles.txtCheck}>{item.name}</Text>
            <Image source={images.tickerOk}
              style={styles.ticker}
              resizeMode="contain"
            />
          </View>
          <View style={styles.end} />
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          onPress={this._unChecked(index)}
          style={styles.containerListUnChecked}>
          <View style={styles.containerBtn}>
            <Text style={styles.txtUnCheck}>{item.name}</Text>

          </View>
          <View style={styles.end} />
        </TouchableOpacity>
      )
    }

  }
  _onSearch = () => {
    let keyword = this.search ? this.search.getValue() : ''
    if (keyword == '') {
      return null
    } else {
      this.setState({ refreshing: true }, async () => {

        let params = {
          keyword: keyword,
          table: 'categories'
        }

        let datas = await searchLiquidation(params).then(res => {
          return res.data.code == Status.SUCCESS ? res.data.data : []
        }).catch(err => {
          
        })
        
        if (datas.length == 0) {
          this.setState({
            refreshing: false,
            listCategory: []
          })
        } else {

            this.setState({ listCategory: datas.filter(e=>e.parent_id==0),  refreshing: false })
          
        }
      })
    }

  }
  _keyExtractor = (item, index) => {
    return `${item.id || index}`
  }
  handleRefress = () => this.setState({ refreshing: true }, this.getData)
  _listEmpty = () => !this.state.refreshing && <Text style={styles.notFound}>Không có dữ liệu</Text>
  loadMore = () => this.state.loading ? this.getData() : null
  _listFooter = () => this.state.loading && this.state.listCategory.length > 8 ? <ActivityIndicator size={"large"} color={"#2166A2"} /> : null
  
  render() {
    return (
      <View style={styles.container}>
        <Header
          title="Chọn danh mục sản phẩm"
          check={1}
          onPress={this._goBack}
          finish={1}
          onFinish={this._selectList}
        />
        <Search
          onSearch={this._onSearch}
          checkFilter={1}
          onClear={this.getData}
          ref={val => this.search = val}
          filter={this.filter}
          goBack={this._goBack}
          keyword={this.state.keyword}
        />
        <FlatList
          data={this.state.listCategory}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefress}
          ListEmptyComponent={this._listEmpty}
          onEndReached={this.loadMore}
          onEndReachedThreshold={this.state.Thresold}
          ListFooterComponent={this._listFooter}
        />
      </View>
    );
  }
  sortData = (a, b) => {
    if (a.name < b.name) return 1;
    if (a.name > b.name) return -1;
    return 0;
  }
  getData = async () => {
    let data = await getOtherData({ table: 'categories', page: this.state.page }).then(res => {
      switch (res.data.code) {
        case Status.SUCCESS: {
          console.log(res.data,'ddd')
          let data = res.data.data.data.filter(e => e.parent_id == 0).sort(this.sortData)
          if(this.state.listIdCheck.length >0){
            this.state.listIdCheck.forEach(item=>{
                data.forEach(e=>{
                  if(item == e.id ){
                    e.checked = true
                  }
                })
            })
          }
          return data
        }
        case Status.NO_CONTENT: return []
        default: return []
      }
    }).catch(err => {
      return []
    })
    console.log(data,'data')
    this.formatData(data)
  }
  formatData = (data) => {
    if (data.length == 0) {
      this.setState({ refreshing: false, loading: false, threshold: 0, page: 1 })

    } else {
      
      this.setState({
        listCategory: [...this.state.listCategory, ...data],
        refreshing: false,
        loading: true,
        threshold: 0.1,
        page: this.state.page + 1
      })
    }
  }
  
  componentDidMount = () => {
    this.getData()
  };

}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ticker: {
    height: 14,
    width: 14,
    marginRight: 10
  },
  notFound: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  txtCheck: {
    color: '#2166A2',
    marginLeft: 15,
    fontWeight: '600'
  },
  txtUnCheck: {
    marginLeft: 15,
    fontWeight: '600',
    color:'black'
  },
  containerListChecked: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
  },
  containerListUnChecked: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  containerBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  end: {
    height: 1,
    backgroundColor: '#CCCCCC',
    width,
  }
})