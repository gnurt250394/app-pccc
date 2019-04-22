import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import { getOtherData } from 'config/apis/myShop';
import images from "assets/images"
import { Status } from 'config/Controller';
const { width } = Dimensions.get('window')
export default class CategoryFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategory: [],
      loading: true,
      refreshing: true
    };
  }
  _goBack = () => {
    navigation.pop()
  }
  _selectList = (item) => () => {

    if (this.state.loading) {
      this.setState({ loading: false })
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
          {/* <Image source={images.icon_ticker}
                  style={styles.ticker}
          /> */}
        </View>
        <View style={styles.end} />
      </TouchableOpacity>
    )


  }
  handleRefress = () => this.setState({ refreshing: true }, this.getData)
  _keyExtractor = (item, index) => {
    return `${item.id || index}`
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          title="Chọn danh mục sản phẩm"
          check={1}
          onPress={this._goBack}
        // finish={1}
        // onFinish={this._selectList}
        />
        <FlatList
          data={this.state.listCategory}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefress}
        />
      </View>
    );
  }

  sortData = (a, b) => {
    if (a.name < b.name) return 1;
    if (a.name > b.name) return -1;
    return 0;
  }
  getData = () => {
    getOtherData({ table: 'categories' }).then(res => {
      
      if (res.data.code == Status.SUCCESS) {
        let data = res.data.data.filter(e=>e.parent_id==0).sort(this.sortData)
        let obj = {
          id: 0,
          name: "Tất cả danh mục"

        }
        this.setState({
          listCategory: [obj,...data],
          refreshing: false
        })
      } else {
        this.setState({ refreshing: false })
      }

    }).catch(err => {
      this.setState({ refreshing: false })
    })
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
  },
  containerListChecked: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#2166A2'
  },
  txt: {
    marginLeft: 15,
    fontWeight: '500',
    color: 'black'
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
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  end: {
    height: 2,
    backgroundColor: '#CCCCCC',
    width,
  }
})