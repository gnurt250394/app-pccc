import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Image, TextInput, SafeAreaView } from 'react-native'
import styles from "assets/styles"
import images from "assets/images"
import { color } from 'config'
import DropDown from '../Dropdown';
import navigation from 'navigation/NavigationService';
import { ListCity, ListCategory, CategoryFilter } from 'config/screenNames';
import { postLiquidation, getListLiquidation } from 'config/apis/liquidation';
import SimpleToast from 'react-native-simple-toast';
import { removeItem, popup, Status } from 'config/Controller';
import { Messages } from 'config/Status';

export default class Search extends React.PureComponent {
    state = {
        keyword: this.props.keyword || '',
        clear: false,
        city: { name: 'Chọn tỉnh' },
        category: { name: 'Danh mục' },
        type: this.props.type || ''
    }

    componentWillReceiveProps(props) {
        if (props.keyword != "") this.setState({ value: props.keyword })
    }
    handleFilterCity = (value) => {
        this.setState({ city: value })
        
        this.filter(value, this.state.category)
    }
    resetFilter = () => {
        this.setState({ city: { name: 'Chọn tỉnh', id: '' }, category: { name: 'Danh mục', id: '' } })
    }
    filter = (city, category) => {
        this.props.filterStart()
       let cityId =city.id
       let categoryId =category.id
        if(city.id == 0){
            cityId = ''
        }
        if(category.id == 0){
            categoryId = ''
        }
        let params = {
            'city_id': cityId,
            'type': this.state.type,
            'category_id': categoryId,
        }

        getListLiquidation(params).then(res => {
            console.log(res.data, 'filter')
            if (res.data.code == Status.SUCCESS) {
                this.props.filter(res.data.data)
            } else if (res.data.code == Status.TOKEN_EXPIRED) {
                SimpleToast.show('Phiên đăng nhập hết hạn')
                navigation.reset(SigninScreen)
                removeItem('token')
            } else if (res.data.code == Status.TOKEN_VALID) {
                popup(Messages.LOGIN_REQUIRE, null, () => navigation.navigate(SigninScreen))
            } else if (res.data.code == Status.NO_CONTENT) {
                this.props.filter([])
            } else {
                SimpleToast.show("Lỗi hệ thống")
                this.props.filter([])
            }
        }).catch(err => {
            SimpleToast.show("Server ERROR")
            this.props.filter([])

        })
    }
    _nextPageCity = () => {
        navigation.navigate(ListCity, { fun: this.handleFilterCity })
    }
    _handleCategory = (value) => {
        this.setState({ category: value })
        this.filter(this.state.city, value)
    }
    _nextPageCategory = () => {
        navigation.navigate(CategoryFilter, { fun: this._handleCategory })
    }
    render() {
        return (
            <View style={[style.head,]}>



                <View style={style.boxSearch}>

                    <TouchableOpacity style={style.p8} onPress={this.props.onSearch}  >
                        <Image
                            style={[styles.icon, style.w15, style.iconSearch]}
                            source={images.search} />
                    </TouchableOpacity>

                    <TextInput
                        style={[style.flex, style.txtSearch]}
                        value={this.state.keyword}
                        returnKeyLabel="Tìm"
                        onFocus={this.showBtnClose}
                        onSubmitEditing={this.props.onSearch}
                        onChangeText={this.onChangeText}
                        placeholderTextColor={'#8FBEDF'}
                        placeholder="Tìm kiếm" />

                    {this.state.clear && <TouchableOpacity style={style.p8} onPress={this.onClear}  >
                        <Image
                            style={[styles.icon, style.w15, style.iconClose]}
                            source={images.closeSearch} />
                    </TouchableOpacity>}
                </View >
                {this.props.checkFilter == 1 ? null : <View style={style.rowFilter}>

                    <TouchableOpacity style={style.btnFiler}
                        onPress={this._nextPageCity}
                    >
                        <Text numberOfLines={1} style={style.txtBtn}>{this.state.city.name}</Text>
                        <Image style={style.images} source={images.drop} />
                    </TouchableOpacity>
                    <View style={style.betwen} />
                    <TouchableOpacity style={style.btnFiler}
                        onPress={this._nextPageCategory}
                    >
                        <Text numberOfLines={1} style={style.txtBtn}>{this.state.category.name}</Text>
                        <Image style={style.images} source={images.drop} />
                    </TouchableOpacity>
                </View>}
                {/* {this.props.checkFilter == 1?null:<View style={style.endFilter}/>} */}
            </View>
        )
    }

    showBtnClose = () => {
        this.setState({ clear: true })
    }

    onClear = () => {
        this.setState({ keyword: "", clear: false }, this.props.onClear || this.props.onSearch)
    }

    onChangeText = keyword => {
        if (keyword.length == 0) {
            this.setState({ clear: false, keyword })
        } else {
            this.setState({ clear: true, keyword })
        }
    }

    getValue = () => this.state.keyword
}

const style = StyleSheet.create({
    heading: { 
        justifyContent: 'space-between', 
        padding: 10, 
        alignContent: 'center' 
    },
    boxSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        backgroundColor: '#FFFFFF',
        borderColor: '#8FBEDF',
        borderWidth: 1,
        height: 40,
        marginLeft: 10,
        marginRight: 10,
    },
    head: { 
        marginBottom: 5,
         alignItems: 'center',
          backgroundColor: '#FFFFFF', 
          paddingTop: 10 },
    txtSearch: { color: "#2166A2" },
    w15: { width: 15 },
    iconClose: { width: 13, marginTop: 0, tintColor: color },
    iconSearch: { marginTop: -2, tintColor: '#2166A2' },
    p8: { padding: 8, alignItems: 'center', justifyContent: 'center' },
    flex: { flex: 1 },
    cancel: { color: 'white', padding: 10 },
    posR: { position: 'relative' },
    SafeAreaView: { backgroundColor: color },
    iconBack: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        paddingLeft: 10,
    },
    cancel: { color: 'white', padding: 10 },
    rowFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },
    btnFiler: {
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '50%',

    },
    betwen: {
        width: 1,
        height: '60%',
        alignSelf: 'center',
        backgroundColor: '#cccccc'

    },
    endFilter: {
        height: 5,
        width: '100%',
        backgroundColor: '#cccccc'
    },
    images: {
        height: 13,
        width: 13,
        resizeMode: 'contain',
    },
    txtBtn: {
        color: '#333333',
        textAlign: 'center',
        maxWidth: '80%',
        marginRight: 5,
        fontWeight: '500',
        fontSize: 15
    }
})



