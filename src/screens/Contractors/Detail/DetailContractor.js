import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, ScrollView, Animated, SafeAreaView } from 'react-native';
import { Header } from 'components';
import { fontStyle, color, Status } from 'config/Controller';
import images from 'assets/images'
import navigation from 'navigation/NavigationService';
import { DetailUserFollows } from 'config/apis/Project';
const { width, height } = Dimensions.get('window')

const HEADER_MAX_HEGHT = 120
const HEADER_MIN_HEGHT = 55
class Item extends Component {
    render() {
        return this.props.name ? <View style={styles.Square}>
            <Image source={this.props.source}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={{ flexWrap: 'wrap', flexShink: 7, paddingRight: 5 }}>
                <Text style={styles.txt} >
                    {this.props.name}</Text>
            </View>
        </View>
            : null
    }
}
export default class DetailContractor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            listFolowUser: [],
            UserObject: {}
        };
    }

    _renderItem = ({ item }) => {
        return (
            <View>
                <View style={styles.containerList}>
                    <Text style={styles.titleList}>{item.message}</Text>
                    <Text style={styles.timeList}>{item.time}</Text>

                </View>
                <View style={styles.end} />
            </View>
        )
    }
    _keyExtractor = (item, index) => {
        return `${item.id || index}`
    }
    _goBack = () => {
        navigation.pop()
    }
    render() {
        let { UserObject } = this.state
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEGHT - HEADER_MIN_HEGHT],
            outputRange: [HEADER_MAX_HEGHT, HEADER_MIN_HEGHT],
            extrapolate: 'clamp'
        })
        const marginTop = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEGHT - HEADER_MIN_HEGHT],
            outputRange: [HEADER_MAX_HEGHT - 120, HEADER_MAX_HEGHT + 5],
            extrapolate: 'clamp'
        })
        const zIndex = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEGHT - HEADER_MIN_HEGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <Animated.View
                        style={[styles.header, {
                            height: headerHeight,
                            zIndex
                        }]}
                    >


                    </Animated.View>
                    <Header
                        check={1}
                        // style={styles.header}
                        onPress={this._goBack}
                        title={"Thông tin nhà thầu"}
                    />
                    {/* <Animated.View
        style={[styles.header,{
            height:headerHeight,
            zIndex
            }]}
        >
      <Header
            check={1}
            style={styles.header}
            onPress={this._goBack}
            title={"Thông tin nhà thầu"}
        />

        </Animated.View> */}
                </SafeAreaView>
                <ScrollView
                    style={{ flex: 1 }}
                    scrollEventThrottle={15}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                    )}
                >
                    <Animated.View style={[styles.containerPosition, { marginTop }]}>
                        <Text style={styles.txtBold}>{UserObject.name}</Text>
                        <Item source={images.proEmail} name={UserObject.email} />
                        <Item source={images.proPhone} name={UserObject.phone} />
                        <Item source={images.proLocation} name={UserObject.address} />
                        <Item source={images.proCompany} name={UserObject.company} />

                    </Animated.View>
                    <View style={styles.containerFooter}>
                        <Text style={styles.txtFooter}>Tin tức nhà thầu</Text>
                        <FlatList
                            data={UserObject.content}
                            keyboardShouldPersistTaps="always"
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
    getData = () => {
        if (this.props.navigation.state && this.props.navigation.state.params.id) {
            console.log(this.props.navigation.state.params.id)
            DetailUserFollows(this.props.navigation.state.params.id).then(res => {
                console.log(res.data, 'ddd')
                if (res.data.code == Status.SUCCESS) {
                    this.setState({
                        UserObject: res.data.data
                    })
                } else if (res.data.code == Status.TOKEN_EXPIRED) {

                }
            }).catch(err => console.log(err.response, 'eeerrr'))
        }
    }
    componentDidMount = () => {
        this.getData()
    };

}

const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-start',
        // paddingTop:10,
        position: 'absolute',
        backgroundColor: color,
        top: 0,
        left: 0,
        right: 0
    },
    containerList: {
        flex: 1,
        paddingHorizontal: 15
    },
    container: {
        flex: 1
    },
    titleList: {
        color: '#333333',
        fontFamily: fontStyle.Acumin_RPro_0,
    },
    timeList: {
        fontFamily: fontStyle.Acumin_ItPro_0,
        fontSize: 11,
        color: '#999999',
        marginTop: 5

    },
    end: {
        height: 1,
        backgroundColor: '#DEDEDE',
        width,
        marginVertical: 5,
    },
    containerPosition: {
        // position:'absolute',
        // top: 55,
        // height:height/4,
        shadowColor: '#999999',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 4,
        width: width - 20,
        borderRadius: 10,
        alignSelf: 'center',
        padding: 15,
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    txtBold: {
        fontFamily: fontStyle.Acumin_bold,
        color: '#333333',
        marginBottom: 8,
        fontSize: 16
    },
    txtFooter: {
        fontFamily: fontStyle.Acumin_bold,
        color: '#333333',
        marginBottom: 4,
        fontSize: 16,
        marginLeft: 11,
    },
    image: {
        height: 10,
        width: 10,
        // tintColor:'gray',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 4,
    },
    txt: {
        color: '#333131',
        fontSize: 13,
        // textAlign:'center'
    },
    Square: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'flex-start'
    },
    containerFooter: {
        marginTop: 10,
        flex: 1
    }
})