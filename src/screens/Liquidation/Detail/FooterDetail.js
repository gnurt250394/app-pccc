import React, { Component } from 'react'
import { Text, View, Image, StyleSheet,FlatList,Dimensions } from 'react-native'
import { fontStyles } from 'config/fontStyles';
const {width,height} = Dimensions.get('window')
export default class FooterDetail extends Component {
      _renderItem = ({ item, index }) => {
            console.log(item,'item')
            return(
                  <View style={styles.containerList}>
                  <Image style={styles.imageList} source={{uri:item}} resizeMode="contain"/>
                  </View>
            )
     
         }
      render() {
            return (
                  <View style={styles.container}>
                        <Text style={[styles.txtTitle, fontStyles.Acumin_bold]}>Danh mục: {this.props.category}</Text>
                        <Text style={[styles.txtTitle, fontStyles.Acumin_bold]}>Địa chỉ: {this.props.address}</Text>
                        <Text style={[styles.txtTitle, fontStyles.Acumin_bold]}>File đính kèm</Text>
                        <FlatList
                              data={this.props.file_attach}
                              horizontal={true}
                              showsHorizontalScrollIndicator={false}
                              renderItem={this._renderItem}
                              keyExtractor={this._keyExtractor}
                        />
                  </View>
            )
      }
}

const styles = StyleSheet.create({
      container: {
            flex: 1
      },
      txtTitle: {
            fontSize: 14,
            color: '#333333',
            marginBottom: 15
      },
      containerList: {
            marginVertical: 7,
            marginLeft: 7,
            height:70,
            width:80,
            paddingVertical:10,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#2166A2',
            borderWidth: 1,
        },
        imageList: {
            height: 40,
            width: 40,

      },
})