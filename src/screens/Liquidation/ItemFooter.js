import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import navigation from 'navigation/NavigationService';
import images from 'assets/images'
const { width } = Dimensions.get('window')

export default class ItemFooter extends Component {
      showImage = (link) => {
            let ext = link.fileName ? /[^\.]*$/.exec(link.fileName)[0] : 'txt'
            let source, uri
            switch (ext.toLowerCase()) {
                case 'jpg':
                case 'jpeg':
                case 'gif':
                case 'png':
                    source = { uri: link.uri }
                    uri = true
                    break;
    
                case 'doc':
                case 'docx':
                    source = images.document
                    break;
                case 'pdf':
                    source = images.pdf
                    break;
                case 'csv':
                case 'xlsx':
                case 'xlsm':
                case 'xlsb':
                case 'xltx':
                case 'xltm':
                case 'xls':
                case 'xml':
                case 'xlt':
                case 'xla':
                case 'xlw':
                case 'xlr':
                    source = images.excel
                    break;
    
                default:
                    source =  images.pdf 
                    break;
            }
            return <Image
                style={styles.imageList}
                source={source} 
                resizeMode="contain"
                />
        }
      render() {
            if (this.props.index >= 2 && this.props.listFile.length != 3) {
                  return (
                        <View style={styles.containerList}>
                              
                              {this.showImage(this.props.item)}
                              <View style={styles.viewOpacity}>
                                    <Text style={styles.txtAdd}>+ {this.props.listFile.length - 3}</Text>
                              </View>
                        </View>
                  )
            } else {
                  return (
                        <View style={styles.containerList}>
                              
                              {this.showImage(this.props.item)}
                        </View>
                  )
            }
      }
}
const styles = StyleSheet.create({
      txtAdd: {
            color: '#333333',
            fontSize:16,
            fontWeight:'bold'
      },
      viewOpacity: {
            opacity: 0.6,
            marginVertical: 7,
            marginLeft: 7,
            flex:1,
            // backgroundColor: '#333333',
            position: "absolute",
            height: '100%',
            width:'100%',
            alignItems: 'center',
            justifyContent: 'center'
      },
      containerList: {
            marginVertical: 7,
            marginLeft: 7,
            height:70,
            width:80,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#2166A2',
            borderWidth: 1,
            flex:1
      },
      
      imageList: {
            height: 65,
            width: 65,

      },
})