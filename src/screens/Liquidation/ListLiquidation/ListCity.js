import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import { getOtherData } from 'config/apis/myShop';
import images from "assets/images"
import { Status } from 'config/Controller';
const { width } = Dimensions.get('window')
export default class ListCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCity: [{
        id: 0,
        name: "Toàn quốc"

      }],
      checking: true,
      refreshing: true,
      loading: true,
      page: 1,
      threshold:0.1
    };
  }
  _goBack = () => {
    navigation.pop()
  }
  _selectList = (item) => () => {
    if (this.state.checking) {
      this.setState({ checking: false })
      if (this.props.navigation.state && this.props.navigation.state.params.fun) {

        this.props.navigation.state.params.fun(item)
        navigation.pop()
      }
    } else {
      return null
    }


  }

  _renderItem = ({ item, index }) => {

    return (
      <TouchableOpacity
        onPress={this._selectList(item)}
        style={styles.containerListUnChecked}>
        <View style={styles.containerBtn}>
          <Text style={styles.txt}>{item.name}</Text>

        </View>
        <View style={styles.end} />
      </TouchableOpacity>
    )

  }
  _keyExtractor = (item, index) => {
    return `${item.id || index}`
  }
  handleRefress = () => this.setState({ refreshing: true,page:1 }, this.getData)
  loadMore = () => this.state.loading ? this.getData() : null
  _listFooter = () => {
    

    return this.state.loading && this.state.listCity.length > 8 ? <ActivityIndicator size={"large"} color={"#2166A2"} /> : null
  }
  _refreshControl = () => {
    return <RefreshControl
      refreshing={true }
      style={styles.refreshControl}
      onRefresh={this.handleRefress}
      colors={["#2166A2", 'white']}
      tintColor="#2166A2"
    />
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          title="Tỉnh/Thành phố"
          check={1}
          onPress={this._goBack}
        //     finish={1}
        //     onFinish={this._selectList}
        />
        <FlatList
          data={this.state.listCity}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefress}
          onEndReached={this.loadMore}
          onEndReachedThreshold={this.state.threshold}
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
  getData =async () => {
   let data=await getOtherData({ table: 'taxonomies', page: this.state.page }).then(res => {
      switch(res.data.code){
        case Status.SUCCESS: {
          let data= res.data.data.filter(e => e.type == "city").sort(this.sortData)
          return data
          }
        case Status.NO_CONTENT: return []
        default: return []
      }
      
    }).catch(err => {
      return []
    })
    
    this.formatData(data)
  }

  formatData = (data)=>{
    if(data.length == 0){
      this.setState({ refreshing: false,loading:false,threshold:0,page:1 })
      
    }else{
      
      this.setState({
        listCity: [...this.state.listCity, ...data],
        refreshing: false,
        loading:true,
        threshold:0.1,
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
  refreshControl:{
    top:30
  },
  ticker: {
    height: 14,
    width: 14,
  },
  txt: {
    marginLeft: 15,
    fontWeight: '500',
    color: 'black'
  },
  containerListChecked: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#2166A2'
  },
  containerListUnChecked: {
    flex: 1,
    height: 50,
    justifyContent: 'center',

    backgroundColor: '#FFFFFF'
  },
  containerBtn: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  end: {
    height: 2,
    backgroundColor: '#CCCCCC',
    width,
  }
})