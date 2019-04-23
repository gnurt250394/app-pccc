import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { data } from './data'
class Title extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.btnSelect}
      onPress={this.props.onPress}
      >
        <Text style={{ fontSize: 26 }}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}
export default class Emoji extends Component {
  state = {
    listEmoji: data.PEOPLE_EMOJIS
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.btnEmoji}>
      <Text style={styles.textEmoji}>{item}</Text>
      </TouchableOpacity>
      )
  }

  _keyExtractor = (item, index) => `${item || index}`
  render() {
    return (
      <View style={styles.container}>
      
        <FlatList
          data={this.state.listEmoji}
          numColumns={7}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
  _showPeople=()=>{
    this.setState({
      listEmoji:data.PEOPLE_EMOJIS
    })
  }
  _showAnimal =()=>{
this.setState({
  listEmoji:data.ANIMALS_NATURE_EMOJIS
})
  }
  _showFood=()=>{
    this.setState({
      listEmoji:data.FOOD_SPORTS_EMOJIS
    })
  }
  _showHeart=()=>{
    this.setState({
      listEmoji:data.SYMBOLS_FLAGS_EMOJIS
    })
  }
  _showObject=()=>{
    this.setState({
      listEmoji:data.OBJECTS_EMOJIS
    })
  }
  _showTravel=()=>{
    this.setState({
      listEmoji:data.TRAVEL_PLACES_EMOJIS
    })
  }
  
}
const styles = StyleSheet.create({
  textEmoji: {
    fontSize: 20,
    marginBottom: 6
  },
  btnSelect: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '15%'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
    height:300,
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  },
  end: {
    width: '100%',
    height: 3,
    backgroundColor: '#cccccc',
    marginBottom: 5
  },
  btnEmoji:{
    alignItems:'center',
    justifyContent:'center',
    width:'14%',

  }
})