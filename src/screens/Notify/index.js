import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { signup } from 'config/apis/users'
import { NavigationEvents } from 'react-navigation';
import { Footer, ViewMore } from 'components'
import { HomeScreen, SigninScreen } from 'config/screenNames'
import { color, MessageStatus, popupOk } from 'config'
import TabNotifi from './TabNotifi';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import { getItem, popup, Status, removeItem } from 'config/Controller';
import Icon from './Icon';
import { Count_Notification } from 'config/apis/Notifi';
import SimpleToast from 'react-native-simple-toast';
import { countNotificationAction } from 'reduxs/actions/actionCreator';

class Notify extends React.Component {
    state = {
        count: ''
    }
    static navigationOptions = ({ navigation }) => {
        const { routeName } = navigation.state;
        
        return {
            tabBarIcon: ({ focused }) => {
                // You can return any component that you like here! 
                // We usually create an icon component rendering some svg        
                return <Icon type={routeName} focused={focused} source={focused ? images.notify : images.notifyDark} />;
            }
        }
    }



    // set status bar
    componentDidMount = async () => {
        this._navListener = this.props.navigation.addListener('didFocus', async () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor(color);
            let token = await getItem('token')
            if (!token) {
                this.setState({ refresing: false, Thresold: 0 })
                popup('Bạn phải đăng nhập để xử dụng tính năng này', () => navigation.navigate(HomeScreen), () => navigation.navigate(SigninScreen))
            } else {
                return null
            }
        });

    }

    componentWillUnmount() {
        this._navListener.remove();
    }
    // end status bar
    _handleCountNotifi = () =>{
        this.props.countNotifi(0)
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    title={"Thông báo"}
                />
                <NavigationEvents
                    onDidFocus={this._handleCountNotifi}
                />
                <TabNotifi />
            </View>
        )
    }
    // set status bar



}
const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        countNotifi: (count) => dispatch(countNotificationAction(count))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notify)

const style = StyleSheet.create({
    heading: { justifyContent: 'space-between', padding: 10, alignContent: 'center' }
})
