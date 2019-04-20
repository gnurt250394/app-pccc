import React, { Component } from 'react'
import { Text, View, Image, StyleSheet,FlatList,Dimensions,TouchableOpacity } from 'react-native'
import { fontStyles } from 'config/fontStyles';
import images from 'assets/images'
import { downFile } from 'config/Controller';
const {width,height} = Dimensions.get('window')
export default class FooterDetail extends Component {
      showImage = link => {
            let ext = link ? /[^\.]*$/.exec(link)[0] : 'txt'
            let source, uri;
            switch (ext) {
                case 'jpg':
                case 'jpeg':
                case 'gif':
                case 'png':
                    source = { uri: link }
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
                 />
        }
        _downFile = (item)=>() =>{
            downFile(item)
        }
      _renderItem = ({ item, index }) => {
            
            return(
                  <TouchableOpacity
                  onPress={this._downFile(item)}
                  style={styles.containerList}>
                  {this.showImage(item)}
                  </TouchableOpacity>
            )
     
         }
         _keyExtractor =(item,index) => `${index|| item}`
      render() {
            return (
                  <View style={styles.container}>
                        <Text style={[styles.txtTitle]}>Danh mục: <Text style={[styles.txtTitle, fontStyles.Acumin_bold]}>{this.props.category}</Text></Text>
                        <Text style={[styles.txtTitle]}>Địa chỉ: <Text style={[styles.txtTitle, fontStyles.Acumin_bold]}>{this.props.address}</Text></Text>
                        {this.props.file_attach.length >0?<Text style={[styles.txtTitle, fontStyles.Acumin_bold]}>File đính kèm</Text>:null}
                        <FlatList
                              data={this.props.file_attach}
                              horizontal={true}
                              showsHorizontalScrollIndicator={false}
                              // scrollIndicatorInsets
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
            height:80,
            width:80,
            paddingVertical:10,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#2166A2',
            borderWidth: 0.5,
        },
        imageList: {
            height: '100%',
            width: '100%',

      },
})