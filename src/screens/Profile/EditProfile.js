import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, TouchableWithoutFeedback, Keyboard, RefreshControl, ScrollView, Platform, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import { updateUser, updateAvatar, getInfoAcount, updateProfile } from 'config/apis/users'
import { Input } from 'components'
import { validateName, popupOk, validateEmail, StatusCode, Gender, color, CodeToMessage } from 'config'
import { chooseImage } from 'config/uploadImage'
import { actionTypes } from 'actions'
import FastImage from 'react-native-fast-image'
import navigation from 'navigation/NavigationService';
import { SigninScreen } from 'config/screenNames';
import { removeItem, Status } from 'config/Controller';
import SimpleToast from 'react-native-simple-toast';
import { TextInput } from 'react-native-gesture-handler';
class InputItem extends React.Component {
    render() {
        return <View style={style.mb5}>
            <Image
                style={[style.icon, { marginBottom: Platform.OS == "ios" ? 6 : 0, }, this.props.styleIcon || {}]}
                source={this.props.icon} />
            <Input
                onChangeText={this.props.onChangeText}
                keyboardType={this.props.keyboardType}
                editable={this.props.editable}
                value={this.props.value}
                placeholder={this.props.placeholder} />
        </View>
    };
}
class GenderItem extends React.Component {
    state = {
        gender: this.props.gender
    }

    render() {
        return <View style={style.mb5}>
            <Image
                style={[style.icon, style.w20]}
                source={images.pGender} />
            <TouchableOpacity onPress={this.props.onSelectMale}>
                <View style={style.row}>

                    <Image
                        style={[style.icon, style.w19]}
                        source={this.state.gender == Gender.male ? images.selected : images.unselect} />
                    <Text style={style.gender}>Nam</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.onSelectFemale}>
                <View style={style.row}>
                    <Image
                        style={[style.icon, style.w19]}
                        source={this.state.gender == Gender.male ? images.unselect : images.selected} />
                    <Text style={style.gender}>Nữ</Text>
                </View>
            </TouchableOpacity>
        </View>
    };

    componentWillReceiveProps(props) {
        this.setState({ gender: props.gender })
    }
}

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        let user = this.props.navigation.getParam('user') || {}

        this.user = { ...user } // check old email
        this.state = {
            name: user.name ? user.name : "",
            company: user.company ? user.company : "",
            email: user.email ? user.email : "",
            phone: user.phone ? user.phone.toString() : "",
            address: user.address ? user.address : "",
            tax_code: user.tax_code ? user.tax_code : "",
            gender: user.gender != null ? user.gender : Gender.male,
            image: this.props.navigation.getParam('image'),
            loading: false
        }
    }

    // set status bar
    componentDidMount() {

        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor(color);
        });
    }


    componentWillUnmount() {
        this._navListener.remove();
    }
    _refress = () => {
        return (
            <RefreshControl
                refreshing={this.state.loading}
                colors={['#2166A2', '#FFFFFF']}
                tintColor="#2166A2"
            />
        )
    }
    // end set status bar

    render() {
        let { image, name, company, email, phone, address, tax_code } = this.state
        return (
            <TouchableWithoutFeedback style={style.flex} onPress={this._dismiss}>
 <View style={{ flex: 1 }}>
                <SafeAreaView style={style.SafeAreaView}>
                    <View style={style.header}>

                        <TouchableOpacity style={style.p10} onPress={this._goBack}>
                            <Image
                                style={style.iconBack}
                                source={images.backLight} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this._onSuccess}>
                            <Text style={style.textDone}>Xong</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
                <ScrollView style={{ flex: 1 }}
                    refreshControl={this._refress()}
                    bounces={true}
                >
                    <View style={{ flex: 1 }}>
                        <KeyboardAvoidingView behavior="padding"
                            keyboardVerticalOffset={64}
                            enabled>

                            <TouchableOpacity onPress={this._onUploadImage}
                                style={style.boxUser}>
                                <FastImage
                                    style={style.avatar}
                                    source={image ? { uri: image } : images.userBlue}
                                />
                                {/* <View style={style.groupImage}> */}
                                <Image source={images.groupCamera}
                                    style={style.image}
                                    resizeMode="contain"
                                />
                                <Image
                                    source={images.camera}
                                    style={style.editCamera}
                                    resizeMode="contain"
                                />
                                {/* </View> */}
                            </TouchableOpacity>

                            <View style={style.mt30}>
                                <InputItem icon={images.pUser}
                                    value={name}
                                    onChangeText={this.onChangeText('name')}
                                    placeholder="Họ và tên" />
                                <InputItem icon={images.pPhone}
                                    value={phone}
                                    styleIcon={style.iconPhone}
                                    editable={false}
                                    placeholder="Số điện thoại" />
                                <InputItem icon={images.pEmail}
                                    keyboardType='email-address'
                                    value={email}
                                    styleIcon={style.iconEmail}
                                    onChangeText={this.onChangeText('email')}
                                    placeholder="Email của bạn" />
                                <GenderItem
                                    onSelectMale={this._updateGender(Gender.male)}
                                    onSelectFemale={this._updateGender(Gender.female)}
                                    gender={this.state.gender} />
                                <InputItem icon={images.pLocation}
                                    value={address}
                                    styleIcon={style.iconLocation}
                                    onChangeText={this.onChangeText('address')}
                                    placeholder="Địa chỉ" />
                                <InputItem icon={images.pCompany}
                                    value={company}
                                    styleIcon={style.iconLocation}
                                    onChangeText={this.onChangeText('company')}
                                    placeholder="Tên công ty" />
                                <InputItem icon={images.pThue}
                                    value={tax_code}
                                    onChangeText={this.onChangeText('tax_code')}
                                    placeholder="Mã số thuế" />

                            </View>
                            {/* {this.state.loading ?
                                        <View style={style.loading}>
                                            <ActivityIndicator size="large" color="#2166A2" />
                                        </View> : null
                                    } */}
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _updateGender = gender => () => {
        this.setState({ gender: gender })
    }
    onChangeText = key => val => {
        this.setState({ [key]: val })
    }

    _navTo = screen => () => {
        navigation.navigate(screen)
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

    _dismiss = () => {
        Keyboard.dismiss()
    }

    _onUploadImage = async () => {
        this.setState({ loading: true })
        await chooseImage().then(url => {
            this.setState({ image: url.uri, loading: false })
        }).catch(err => {
            this.setState({ loading: false })

        })
    }

    _onSuccess = async () => {
        if (this.state.name && this.state.name.trim().length < 2) {
            popupOk('Họ và tên phải từ 2 ký tự')
        } else if (!validateName(this.state.name)) {
            popupOk('Họ và tên không được dùng ký tự đặc biệt')
        } else if (this.state.email && this.state.email.trim() != "" && !validateEmail(this.state.email)) {
            popupOk('Email không đúng')
        } else {
            // call api -> go back
            let data = {
                name: this.state.name,
                gender: this.state.gender,
                company: this.state.company,
                address: this.state.address,

            }
            this.setState({ loading: true })
            console.log(data, 'param')
            if (this.state.email && this.state.email != this.user.email) {

                data.email = this.state.email; // check để ko bị trùng email cũ
            }
            if (this.state.tax_code && this.state.tax_code != this.user.tax_code) {
                data.tax_code = this.state.tax_code
            }

            await updateAvatar(this.state.image).then(res => {
                if (res.data.code == Status.SUCCESS) {
                    console.log('ok')
                } else if (res.data.code == Status.TOKEN_EXPIRED) {
                    popupOk(CodeToMessage[res.data.code])
                    navigation.reset(SigninScreen)
                    removeItem('token')

                } else {

                }
            }).catch(err => {


            })

            await updateProfile(data).then(res => {
                console.log(res.data, 'errr')
                if (res.data.code == Status.SUCCESS) {
                    this.props.dispatch({ type: actionTypes.USER_UPDATE, data: res.data.data })
                    navigation.pop()
                    this.setState({ loading: false })
                    this.props.navigation.state.params.refress()
                } else if (res.data.code == Status.TOKEN_EXPIRED || res.data.code == Status.TOKEN_VALID) {
                    popupOk(CodeToMessage[res.data.code])
                    navigation.reset(SigninScreen)
                    this.setState({ loading: false })
                    removeItem('token')
                } else {
                    this.setState({ loading: false })
                    popupOk(CodeToMessage[res.data.code])
                }
            }).catch(err => {
                this.setState({ loading: false })
                popupOk('Cập nhật thông tin không thành công')
            })

        }
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.users && state.users.data ? state.users.data : null,
        token: state.users && state.users.token ? state.users.token : null,
    }
}

export default connect(mapStateToProps)(EditProfile)

const style = StyleSheet.create({
    SafeAreaView: {
        backgroundColor: color
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '35%',
        left: '45%'
    },
    icon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        marginLeft: 10,
        marginRight: 10,

        alignSelf: 'center'
    },
    w26: {
        width: 26
    },
    w20: {
        width: 20,
        marginTop: 4
    },
    // iconEmail: { marginTop: 5},
    // iconPhone: { marginTop: 5},
    // iconGender: { marginTop: 5},
    // iconLocation: { marginTop: 5},
    iconBack: {
        height: 15,
        resizeMode: 'contain'
    },
    textDone: {
        textAlign: 'right',
        color: '#fff',
        fontSize: 18,
        padding: 8
    },
    row: {
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    header: {
        backgroundColor: color,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    gender: {
        fontSize: 14,
        color: '#555555',
        paddingLeft: 10,
    },
    avatar: {
        height: 70,
        width: 70,
        borderRadius: 35
    },
    boxUser: {
        alignItems: 'center',
        height: 70,
        width: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10
    },
    p10: {
        padding: 10
    },
    mt30: {
        marginTop: 30
    },
    flex: {
        flex: 1
    },
    w19: {
        width: 19
    },
    mb5: {
        marginBottom: 0,
        flexDirection: 'row'
    },
    editCamera: {
        height: 16,
        width: 16,
        // tintColor:color,
        // opacity:0.4,
        position: 'absolute',
        bottom: 1,
    },
    image: {
        // backgroundColor:'#707070',
        height: 75,
        // opacity: 0.9,
        width: 90,
        // tintColor:'black',
        position: 'absolute',
        top: 35,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    }
})
