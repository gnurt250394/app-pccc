import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { fontStyles } from 'config/fontStyles';

export default class Item extends Component {

      render() {
            return (
                  <View style={styles.container}>
                        <Text style={[styles.txtNameItem,fontStyles.Acumin_RPro_0]}>{this.props.name}</Text>
                        <TextInput
                              multiline={this.props.multiline}
                              style={[styles.inputItem,{...this.props.style}]}
                              placeholder={this.props.placeholder}
                              onChangeText={this.props.onChangeText}
                        />
                  </View>
            )
      }
}
const styles = StyleSheet.create({
      container: {
            // flex: 1,
            padding:10
      },
      txtNameItem: {
            color: '#333333',
            fontWeight: '600',
            fontSize: 15
      },
      inputItem: {
            marginTop:7,
            width: '100%',
            height:37,
            padding: 10,
            borderRadius:5,
            borderColor:'#707070',
            borderWidth:0.7
      }
})