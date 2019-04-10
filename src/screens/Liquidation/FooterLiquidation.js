import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import navigation from 'navigation/NavigationService';
import images from 'assets/images'
import ItemFooter from './ItemFooter';
import { fontStyles } from 'config/fontStyles';
const { width } = Dimensions.get('window')

export default class FooterLiquidation extends Component {
      state={
            listFile:[]
      }

      _choseFile = ()=>{
            
      }
      _listFooter = () => {
            return (
                <TouchableOpacity style={styles.containerAdd}
                    onPress={this._choseFile}
                >
                    <Image
                        source={images.mAdd}
                        style={styles.imageAdd}
                        resizeMode="contain"
                    />
                    <Text style={styles.txtAdd}
                    numberOfLines={1}
                    >Thêm file</Text>
    
                </TouchableOpacity>
            )
        }
        _renderItem = ({ item, index }) => {
           return(
                 <ItemFooter
                 index={index}
                 item={item}
                 listFile={this.state.listFile}
                 />
           )
    
        }
      render() {
            return (
                  <View style={styles.container}>
                         <Text style={[styles.txtFile,fontStyles.Acumin_RPro_0]}>File đính kèm</Text>
                        <FlatList
                              data={data.slice(0, 3)}
                              horizontal={true}
                              ListFooterComponent={this._listFooter}
                              showsHorizontalScrollIndicator={false}
                              renderItem={this._renderItem}
                              keyExtractor={this._keyExtractor}
                        />
                  </View>
            )
      }
}
const styles = StyleSheet.create({
      container:{
            flex:1
      },
      txtAdd:{
            fontSize: 12, 
            color: '#2166A2', 
            marginTop:4
      },
      txtFile:{
            color: '#333333',
            fontWeight: '600',
            fontSize: 15,
            marginLeft:10
      },
     
      containerAdd: {
          marginVertical: 7,
          marginLeft: 7,
          height:'30%',
          width:width/5,
          paddingVertical:10,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: '#2166A2',
          borderWidth: 1,
      },
      
      imageAdd: {
          height: 20,
          width: 20,
          tintColor: '#2166A2'
      },
     
  })
  const data = [
      {
          id:1,
          image:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
      },
      {
          id:2,
          image:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
      },
      {
          id:3,
          image:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
      },
      {
            id:4,
            image:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        },
  ]