import React, { Component } from 'react'
import { Text, View, Modal, Image, StyleSheet,ActivityIndicator } from 'react-native'
import images from 'assets/images';
import { width } from 'config';

export default class Loading extends Component {
      render() {
            return (
                  <Modal
                        visible={this.props.visible}
                        transparent={true}
                        animationType={'slide'}
                        animated={true}
                  >
                        <View style={styles.container}>
                        <View style={styles.groupModal}>
                            <ActivityIndicator
                            size="large"
                            color="#2166A2"
                            />
                        </View>
                    </View>
                  </Modal>
            )
      }
}

const styles = StyleSheet.create({
      imageLoading: {
            height: '100%',
            width: '100%',
      },
      container: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-around',
            backgroundColor: '#00000040'
      },
      groupModal:{
            backgroundColor: 'transparent',
            height: 0,
            width: 0,
            // borderRadius: 25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
      }
})