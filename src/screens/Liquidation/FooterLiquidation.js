import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import navigation from 'navigation/NavigationService';
import images from 'assets/images'
import ItemFooter from './ItemFooter';
import { fontStyles } from 'config/fontStyles';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
const { width } = Dimensions.get('window')

export default class FooterLiquidation extends Component {
    state = {
        listFile: [],
        id:1
    }

    _choseFile = () => {
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
        }, (error, res) => {
            // Android


            let dataName = []
            if (res) {
                res.id = res.fileName + new Date().getTime()
                console.log(res,'dddd')
                dataName.push(res)
                this.setState({ listFile: [...this.state.listFile, ...dataName] })
            }
        });
    }

    forrmatData = (data) => {
        if (data.length > 0) {
            let arr = []
            data.forEach(e => {
                arr.push({ fileName: e })
            })
            this.setState({ listFile: arr })
        }
    }
    _listFooter = () => {
        return (
            <TouchableOpacity style={styles.containerAdd}
                onPress={this._choseFile}
            >
                <Image
                    source={images.shopAdd}
                    style={styles.imageAdd}
                    resizeMode="contain"
                />
                <Text style={styles.txtAdd} numberOfLines={1}>Thêm file</Text>

            </TouchableOpacity>
        )
    }
    deleteItem=(item)=>()=>{
        let data = this.state.listFile.filter(e=> e.id != item.id)
        console.log(data,'ddddwwww')
        this.setState({listFile:data})
    }
    _renderItem = ({ item, index }) => {
        return (
            <ItemFooter
                index={index}
                deleteItem={this.deleteItem(item)}
                item={item}
                listFile={this.state.listFile}
            />
        )

    }
    _keyExtractor = (item, index) => `${item.id || index}`
    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.txtFile, fontStyles.Acumin_RPro_0]}>File đính kèm</Text>
                <FlatList
                    data={this.state.listFile.slice(0, 3)}
                    horizontal={true}
                    extraData={this.state}
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
    container: {
        flex: 1
    },
    txtAdd: {
        fontSize: 13,
        color: '#2166A2',
        marginTop: 4,
        fontWeight: '500'
    },
    txtFile: {
        color: '#333333',
        fontWeight: '600',
        fontSize: 15,
        marginLeft: 10
    },

    containerAdd: {
        marginVertical: 7,
        marginLeft: 10,
        height: 70,
        width: 80,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#2166A2',
        borderWidth: 0.6,
    },

    imageAdd: {
        height: 20,
        width: 20,
        tintColor: '#2166A2'
    },

})
const data = [
    {
        id: 1,
        image: 'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
    },
    {
        id: 2,
        image: 'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
    },
    {
        id: 3,
        image: 'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
    },
    {
        id: 4,
        image: 'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
    },
]