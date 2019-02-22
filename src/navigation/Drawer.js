import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity,TouchableWithoutFeedback } from 'react-native';
import {TextBold} from 'layout';
import images from "public/images"
import navigation from '../navigation/NavigationService'
import { ScreenName, toUpperCase } from 'config';
import { connect } from 'react-redux'
class DrawerItem extends React.Component {
    state = {
        showMore: this.props.showMore || undefined
    }

    render(){
        return <TouchableOpacity 
                    onPress={this.props.onPress || null}
                    style={{ marginBottom: 30, flexDirection: 'row', alignItems: 'center',}}>
                    <Image 
                        style={[styles.icon, {marginRight: 5}]}
                        source={this.props.icon} />
                    <View style={{  flex: 1, flexDirection: 'row', alignItems: 'center',}}>
                        <Text style={styles.txt}>{toUpperCase(this.props.title)}</Text>
                        {this.state.showMore != undefined ? 
                                <TouchableOpacity style={{padding: 10}} onPress={this.props.handleShowMore}>
                                    <Image  style={[styles.icon, {width: 15}]} source={this.state.showMore == true ? images.mAdd : images.mSub}  /> 
                                </TouchableOpacity> 
                            : null}
                    </View>
                </TouchableOpacity>
    }

    componentWillReceiveProps(props){
        this.setState({showMore: props.showMore})
    }
}

class Drawer extends Component {
    state = {
        showMore: true
    }
    render() {
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>this.props.navigation.closeDrawer()}>
            
            <View style={styles.container}>
                {/* <StatusBar backgroundColor="#FFAF26" barStyle="light-content" /> */}
                <View style={styles.containerHeader}>
                        <Image 
                            source={images.userLight}
                            style={styles.image} />
                        <TextBold style={styles.txt}
                            value={this.props.user && this.props.user.name ? this.props.user.name : "Khách" } />
                        {   this.props.user && this.props.user.name 
                            ? <Text style={{padding: 10, textAlign: 'center', color: '#fff', fontSize: 14, fontWeight:'300'}}>(Thành viên thường)</Text>
                            : <View style={{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(ScreenName.Signin)}>
                                <Text style={{color: '#fff', fontSize: 14, fontWeight:'300'}}>Đăng nhập/</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(ScreenName.Register)}>
                                    <Text style={{color: '#fff', fontSize: 14, fontWeight:'300'}}>Đăng ký</Text>
                                </TouchableOpacity>
                            </View>}
                        
                </View>
            
                <DrawerItem 
                    onPress={() => this.props.navigation.navigate(ScreenName.HomeScreen)}
                    title='Cửa hàng' 
                    icon={images.mShop} />
                <DrawerItem 
                    title='Danh mục' 
                    icon={images.mCategory} 
                    handleShowMore={() => {this.setState({showMore: !this.state.showMore});}}
                    showMore={this.state.showMore}/>
                { !this.state.showMore ? <View style={{marginLeft: 30, marginTop: -20}}>
                    <Text 
                        onPress={() => this.props.navigation.navigate(ScreenName.ViewAllProduct, {title: "Báo chay UNIPOS"})}
                        style={{color: '#fff', fontSize: 14, fontWeight:'300', padding: 5}}>{toUpperCase('Báo chay UNIPOS')}</Text>
                    <Text 
                        onPress={() => this.props.navigation.navigate(ScreenName.ViewAllProduct, {title: "Sản phẩm nổi bật"})}
                        style={{color: '#fff', fontSize: 14, fontWeight:'300', padding: 5}}>{toUpperCase('Sản phẩm nổi bật')}</Text>
                    <Text 
                        onPress={() => this.props.navigation.navigate(ScreenName.ViewAllProduct, {title: "Sản phẩm bán chạy"})}
                        style={{color: '#fff', fontSize: 14, fontWeight:'300', padding: 5}}>{toUpperCase('Sản phẩm bán chạy')}</Text>
                    <Text 
                        onPress={() => this.props.navigation.navigate(ScreenName.ViewAllProduct, {title: "Báo cháy HOCHIKI"})}
                        style={{color: '#fff', fontSize: 14, fontWeight:'300', padding: 5}}>{toUpperCase('Báo cháy HOCHIKI')}</Text>
                </View> : null}
                <DrawerItem 
                    title='Liên hệ' 
                    onPress={()=>navigation.navigate(ScreenName.Contacts)}
                    icon={images.mContact} />
                <DrawerItem 
                    title='Giới thiệu' 
                    onPress={()=> navigation.navigate(ScreenName.Introduce)}
                    icon={images.mIntro} />
                {   this.props.user && this.props.user.name 
                    ?  <DrawerItem 
                        onPress={() => {
                            this.props.dispatch({type: 'LOGOUT'})
                            this.props.navigation.navigate(ScreenName.Signin)}
                        }
                        title='Đăng xuất' 
                        icon={images.mSignout} /> : null}

            </View>
            </TouchableWithoutFeedback>
        );
    }

}

const mapStateToProps = (state) =>{
    return {
        user: state.users ? state.users.data : null,
        token: state.users ? state.users.token : null,
    }
}

export default connect(mapStateToProps)(Drawer)

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingLeft: 10,
        backgroundColor: '#FFAF26',
    },
    image:{
        height:60,
        width:60,
        borderRadius: 30,
    },
    containerHeader:{
        flexDirection:'column',
        alignItems:'center',
        // height:140,
        paddingTop: 20,
        paddingBottom: 10,
        marginRight: 8,
        borderBottomWidth: 0.6,
        borderBottomColor: '#fff',
        marginBottom: 40,
    },
    button:{
        justifyContent:'center',
        height:60
    },
    icon: {width: 18, resizeMode: 'contain', },
    label: {color: '#585858', fontSize: 16, flex: 1, paddingTop: 5},
    title: {color: '#fff', fontSize: 18, alignSelf: 'center', fontWeight: "300", paddingTop: 15 },
    txt:{
        flex: 1,
        color:'white',
        fontSize:16,
        marginLeft: 10,
        fontWeight:'300'
    },
})