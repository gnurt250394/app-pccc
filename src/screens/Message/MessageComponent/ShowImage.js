import React, { Component } from 'react'
import { Text, View, Image, Dimensions, StyleSheet, TouchableOpacity,Platform ,StatusBar} from 'react-native'
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import images from 'assets/images'
const { width, height } = Dimensions.get('window')
export default class ShowImage extends Component {
      state = {
            image: this.props.navigation.getParam('image', '')
      }
      _goback = () => {
            navigation.pop()
      }
      render() {
            return (
                  <View style={styles.container}>
                       {/* <StatusBar backgroundColor={"#333333"} barStyle="light-content" /> */}
                        <Image
                              source={{ uri: this.state.image }}
                              style={styles.conatinerImage}
                              resizeMode="contain"
                        />
                         <TouchableOpacity onPress={this._goback} style={[styles.btn,{top:Platform.OS == 'ios'?23:10}]}>
                              <Image
                                    style={styles.image}
                                    resizeMode="contain"
                                    source={images.backLight} />
                        </TouchableOpacity>
                  </View>
            )
      }
}
const styles = StyleSheet.create({
      conatinerImage: {
            height,
            width,

      },
      image: {
            height: 20,
            width:20,
      
      },
      header: {
            // backgroundColor:'transparent',
            

      },
      container: {
            flex: 1,
            backgroundColor:'#333333'
      },
      btn: {
            paddingLeft: 12,
            paddingBottom: 8,
            paddingTop: 0,
            marginTop: 7,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            
            left:5
        },
})