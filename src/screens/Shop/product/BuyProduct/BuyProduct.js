import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, FlatList, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import Item from '../Item';
import images from 'assets/images'
import { chooseImage } from 'config/uploadImage';
import { ListCategory } from 'config/screenNames';
import ModalCustom from '../../Component/Modal';
const { width } = Dimensions.get('window')
export default class BuyProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listImage: [],
            name: 'Sản phẩm',
            price: '',
            price_reduced: '',
            amount_sell: '',
            amount_remain: '',
            time_start: '',
            time_end: '',
            status: '',
            category_id: '',
            description: '',
            manufacturer: '',
            year_of_manufacture: '',
            user_id: '',
            city_id: '',
            district_id: '',
            address: '',
            file: '',
            visible: false,
            height: ''
        };
    }
    _goBack = () => {
        navigation.pop()
    }

    _sellProduct = () => {
        let params = {
            name: this.state.name,
            price: this.state.price,
            price_reduced: this.state.price_reduced,
            amount_sell: this.state.amount_sell,
            amount_remain: this.state.amount_remain,
            time_start: this.state.time_start,
            time_end: this.state.time_end,
            status: this.state.status,
            category_id: this.state.category_id,
            description: this.state.description,
            manufacturer: this.state.manufacturer,
            year_of_manufacture: this.state.year_of_manufacture,
            user_id: this.state.user_id,
            city_id: this.state.city_id,
            district_id: this.state.district_id,
            address: this.state.address,
            file: this.state.file,
        }
        console.log(params, 'aaa')
    }
    _renderItem = ({ item, index }) => {
        if (index >= 2 && this.state.listImage.length !== 3) {
            return (
                <View style={styles.containerList}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.imageList}
                    />
                    <View style={styles.viewOpacity}>
                        <Text style={{ color: '#FFFFFF' }}>{this.state.listImage.length - 3}++</Text>
                    </View>



                </View>
            )
        } else {
            return (
                <View style={styles.containerList}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.imageList}
                    />
                </View>
            )
        }

    }
    _choseImage = () => {
        chooseImage().then(url => {
            this.setState({ listImage: [...this.state.listImage, { image: url.uri }] })

        }).catch(err => {


        })
    }
    _listFooter = () => {
        return (
            <TouchableOpacity style={styles.containerAdd}
                onPress={this._choseImage}
            >
                <Image
                    source={images.mAdd}
                    style={styles.imageAdd}
                    resizeMode="contain"
                />
                <Text style={{ fontSize: 12, color: '#2166A2' }}
                >Thêm ảnh</Text>

            </TouchableOpacity>
        )
    }
    _keyExtractor = (item, index) => {
        return `${item.id || index}`
    }
    _nextCategory = () => {
        navigation.navigate(ListCategory)
    }

    onChangeText = (index) => (val) => {
        this.setState({ [index]: val })
    }
    _OpenModal = () => {
        this.setState({
            visible: true
        })
    }
    render() {
        return (
            <View>
                <Header
                    title="Bán sản phẩm"
                    check={1}
                    onPress={this._goBack}
                />
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container}>
                        <FlatList
                            data={this.state.listImage.slice(0, 3)}
                            horizontal={true}
                            ListFooterComponent={this._listFooter}
                            showsHorizontalScrollIndicator={false}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                        />

                        <View style={styles.end} />
                        <TouchableOpacity
                            style={styles.buttonText}
                            onPress={() => alert('aaa')}
                        >
                            <Text style={styles.buttonTextSelect}>{this.state.name}</Text>
                        </TouchableOpacity>
                        <View style={styles.end} />
                        <TextInput
                            onContentSizeChange={(event) => {
                                this.setState({ height: event.nativeEvent.contentSize.height });
                            }}
                            multiline={true}
                            style={[styles.TextInput, { height: Math.max(38, this.state.height) }]}
                            placeholder={"Mô tả sản phẩm"}
                            onChangeText={this.onChangeText('description')}
                        />
                        <View style={styles.end} />
                        <TextInput
                            onContentSizeChange={(event) => {
                                this.setState({ height: event.nativeEvent.contentSize.height });
                            }}
                            multiline={true}
                            style={[styles.TextInput, { height: Math.max(38, this.state.height) }]}
                            placeholder={"Thông tin chi tiết"}
                        />
                        <View style={styles.end2} />
                        <Item
                            edit={1}
                            style={styles.itemEnd}
                            source={images.menu}
                            onPress={this._nextCategory}
                            title={"Danh mục"}
                            name={''}
                            subName={">"}
                        />
                        <Item
                            source={images.proPrice}
                            title={"Giá sản phẩm"}
                            placeholder={"Thiết lập giá"}
                        />
                        <Item
                            source={images.proPriceAfter}
                            title={"Giá sau giảm"}
                            placeholder={"Thiết lập giá"}
                        />
                        <Item
                            source={images.proQuanlity}
                            title={"Số lượng đăng bán"}
                            placeholder={"Thiết lập số lượng"}
                        />
                        <Item
                            source={images.proSupplier}
                            title={"Nhà cung cấp"}
                            placeholder={"Tên nhà cung cấp"}
                        />
                        <Item
                            source={images.calender}
                            title={"Thời gian đăng bán"}
                            placeholder={"adbf"}
                        />
                        <Item
                            source={images.sLocation}
                            title={"Địa điểm bán"}
                            placeholder={"adbf"}
                            edit={1}
                            onPress={this._OpenModal}
                        />
                        <Item
                            source={images.proManufacturer}
                            title={"Hãng sản phẩm"}
                            placeholder={"Tên hãng sản phẩm"}
                        />
                        <Item
                            source={images.proYear}
                            title={"Năm sản xuất"}
                            placeholder={"Thiết lập năm"}
                        />
                        <Item
                            edit={1}
                            source={images.proStatus}
                            title={"Tình trạng sản phẩm"}
                            placeholder={"adbf"}
                            onPress={this._nextCategory}
                            name={''}
                            subName={">"}
                        />
                        <Item
                            source={images.proConfirm}
                            edit={1}
                            title={"APP xác nhận chất lượng"}
                            placeholder={"adbf"}
                            onPress={this._nextCategory}
                            name={''}
                            subName={">"}
                        />
                        <ModalCustom
                            // closeModal={this.onVisibleModal}
                            // getListCounty={this.getListCounty}
                            visible={this.state.visible}
                            // data={this.state.listCity}
                            // listCountry={this.state.listCountry}
                            onClose={() => {
                                this.setState({ visible: false });
                            }}
                        />
                        <TouchableOpacity style={styles.button}
                            onPress={this._sellProduct}
                        >
                            <Text style={styles.TextButton}>BÁN SẢN PHẨM</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemEnd: {
        height: 10,
        marginTop: 15
    },
    buttonText: {
        flex: 1,
        height: 40,
        width,
        justifyContent: 'center'
    },
    viewOpacity: {
        opacity: 0.6,
        backgroundColor: '#333333',
        flex: 1,
        position: "absolute",
        height: 80,
        width: width / 4.4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerAdd: {
        flex: 1,
        height: 80,
        width: width / 4.4,
        marginVertical: 7,
        marginLeft: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#2166A2',
        borderWidth: 1,
    },
    containerList: {
        flex: 1,
        height: 80,
        width: width / 4.4,
        marginVertical: 7,
        marginLeft: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#2166A2',
        borderWidth: 1,
    },
    imageList: {
        height: 65,
        width: 50,

    },
    imageAdd: {
        height: 20,
        width: 20,
        tintColor: '#2166A2'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2166A2',
        height: 45,
        width: width - 90,
        marginBottom: 60,
        marginTop: 20,
        borderRadius: 8,
        alignSelf: 'center',
    },
    TextButton: {
        color: '#FFFFFF'
    },
    end: {
        height: 1,
        width,
        backgroundColor: '#CCCCCC'
    },
    end2: {
        height: 9,
        marginTop: 5,
        width,
        backgroundColor: '#CCCCCC',
        marginBottom: 10,
    },
    TextInput: {
        flex:1,
        color: '#2166A2',
        paddingLeft: 10,
        paddingRight:5,
        paddingTop:10
    },
    buttonTextSelect: {
        color: '#2166A2',
        paddingLeft: 10,
    }
})