import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, PanResponder, Image, TouchableOpacity, Animated } from 'react-native'
import { formatNumber } from 'config/Controller';
import { popupOk } from 'config';
import images from "assets/images"
class MenuItem extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.btnMenu}>
                <Image source={this.props.source}
                    style={[styles.imgMenu, { ...this.props.style }]}
                    resizeMode="contain"
                />
                <Text style={styles.txtMenu}>{this.props.name}</Text>
            </TouchableOpacity>
        )
    }
}
export default class ItemProduct extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showDraggable: true,     //Step 1
            dropZoneValues: null,
            pan: new Animated.ValueXY()
        };
        this.handleView()
    }


    _checkColor = (item, color) => {
        if (item.status == 1) {
            return {
                color: color
            }
        } else {
            return {
                color: '#999999'
            }
        }
    }


    _addItem = () => {
        let list = this.props.ListProduct
        if (list.length > 5) {
            Alert.alert(
                'Thông báo',
                'Bạn muốn mua thêm lượt không?',
                [
                    {
                        text: 'Cancel', style: 'cancel'
                    },
                    {
                        text: 'OK', onPress: () => {
                            navigation.navigate(HomeScreen)

                        }
                    },
                ],
                { cancelable: false },
            );
        } else {
            popupOk('Tính năng đang phát triển. Vui lòng quay lại sau.')
            // this.setState({ListProduct:[{id:10,full_path:'',price:100000000,product_name:'bình cứu hỏa 123'},...this.state.ListProduct]})
            // navigation.navigate(BuyProduct)
        }

    }

    handleView = () => {
        this.panResponder = PanResponder.create({
            //...
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { //Step 3
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease: (e, gesture) => {
                // if (this.isDropZone(gesture)) { //Step 1
                //     this.setState({
                //         showDraggable: false //Step 3
                //     });
                // } else {
                Animated.spring(
                    this.state.pan,
                    {
                        speed:15,
                        toValue: { x: 0, y: 0 } }
                ).start();
                // }
            } //Step 4
        });
    }
    isDropZone(gesture) {     //Step 2
        let dz = this.state.dropZoneValues;
        console.log(dz,'dzzz')




        return gesture.moveY > dz.y && gesture.moveY > dz.y + dz.height;
    }
    setDropZoneValues = (event) => {   
        let e =event.nativeEvent.layout
        console.log(e,'event')
        this.setState({
            dropZoneValues: event.nativeEvent.layout
        });
    }
    componentDidMount() {
    }
    
    renderDraggable(item) {
        if (this.state.showDraggable) {      //Step 2
            return (
                <View style={styles.container}
                    // onLayout={this.setDropZoneValues}
                >

                    {!this.state.showDraggable ? <View style={styles.containerAdd}

                    // onPress={this._addItem}
                    >
                        <Image source={images.shopAdd}
                            style={styles.imageAdd}
                        />
                        <Text style={styles.txtAdd}>Thêm sản phẩm</Text>
                    </View> : null}
                    
                    <Animated.View style={[this.state.pan.getLayout(),styles.containerList]}
                        {...this.panResponder.panHandlers}
                    >
                        <Image source={{ uri: item.full_path }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <TouchableOpacity onPress={this.props.showMenu}
                            style={styles.dots}
                        >
                            <Image source={images.dots}
                                style={styles.imgDots}
                                resizeMode="contain"
                            />

                        </TouchableOpacity>
                        {item.isShow ? <View style={styles.containerMenu}>
                            <MenuItem name={"Sửa"} style={styles.imgEdit} source={images.edit} />
                            <MenuItem name={"Xoá"} source={images.trash} />
                        </View> : null}
                        <Text numberOfLines={2} style={[styles.txtName, this._checkColor(item, '#555555')]}>{item.product_name}</Text>
                        <Text style={[styles.txtPrice, this._checkColor(item, '#2166A2')]}>{formatNumber(item.price)} đ</Text>
                        <Text style={[styles.time, this._checkColor(item, '#DE3232')]}>{item.time}</Text>
                        <View>

                        </View>
                    </Animated.View>
                </View>
            );
        }
    }
    render() {
        const { item } = this.props
        if (item.add == true) {
            return (
                    <View style={styles.containerAdd}
                    onLayout={(event)=>{
                        this.setState({dropZoneValues:event.nativeEvent.layout})
                        console.log(event.nativeEvent.layout,'layout')
                    }}
                    >

                    <TouchableOpacity
                        style={styles.btnAdd}
                        onPress={this._addItem}
                    >
                        <Image source={images.shopAdd}
                            style={styles.imageAdd}
                        />
                        <Text style={styles.txtAdd}>Thêm sản phẩm</Text>
                    </TouchableOpacity>
                    </View>
            )
        } else {
            return (
                this.renderDraggable(item)
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        margin:5,
        maxWidth: '30%',
        // padding: 10,
    },
    btnAdd:{
        alignItems:'center',
        justifyContent:'center'
    },
    containerMenu: {
        position: 'absolute',
        right: 10,
        elevation: 2,
        padding: 4,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        // zIndex:1,
        top: 8,
        flex: 1,
    },
    btnMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 6
    },
    txtMenu: {
        color: '#333333'
    },
    imgEdit: {
        height: 12,
        width: 12,
        marginLeft: 4
    },
    imgMenu: {
        height: 14,
        width: 14,
        marginRight: 5,
        tintColor: '#333333'
    },
    image: {
        height: 100,
        // width:100,
    },
    imageAdd: {
        height: 50,
        width: 50,
    },
    dots: {
        height: 25,
        width: 25,
        position: 'absolute',
        right: 5,
        top: 8,
    },
    imgDots: {
        height: 15,
        width: 15,
        alignSelf: 'flex-end',
    },
    containerList: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        // maxWidth: '30%',
        padding: 10,
        elevation: 1,
        flex: 1,
    },
    containerAdd: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        maxWidth: '30%',
        paddingVertical: 50,
        // paddingHorizontal:3,
        flex: 1,
        margin: 5,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    txtPrice: {
        color: '#2166A2',
        marginTop: 13,
        fontSize: 12,
    },
    txtAdd: {
        color: '#2166A2',
        marginTop: 13,
        fontSize: 12,
    },

    txtName: {
        marginTop: 5,
        fontSize: 12
    },
    time: {
        fontSize: 12,

    }
})