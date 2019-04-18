import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
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
      listCity: [],
      loading: true,
      refreshing:true,
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

        </View>
        <View style={styles.end} />
      </TouchableOpacity>
    )

  }
  _keyExtractor = (item, index) => {
    return `${item.id || index}`
  }
  handleRefress=()=> this.setState({ refreshing: true}, this.getData)
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
        />
      </View>
    );
  }

  getData = () => {
    getOtherData({ table: 'taxonomies' }).then(res => {
      console.log(res.data, 'ddd')
      if (res.data.code == Status.SUCCESS) {
        let obj = {
          id: 0,
          name: "Toàn quốc",
        }
        let data = res.data.data.filter(e => e.type == "city")
        this.setState({
          listCity: [obj,...data],
          refreshing:false
        })
      }else{
        this.setState({refreshing:false})
      }
    }).catch(err => {
      this.setState({refreshing:false})
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
  txt: {
    marginLeft: 15,
    fontWeight: '500',
    color: '#333333'
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