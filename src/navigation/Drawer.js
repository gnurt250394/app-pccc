import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity,TouchableWithoutFeedback } from 'react-native';
import {TextBold, DrawerItem} from 'layout';
import images from "public/images"
import { ScreenName } from 'config';
export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
                        value={"Khách"} />
                    <View style={{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(ScreenName.Signin)}>
                           <Text style={{color: '#fff', fontSize: 14, fontWeight:'300'}}>Đăng nhập/</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(ScreenName.Register)}>
                            <Text style={{color: '#fff', fontSize: 14, fontWeight:'300'}}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                    
            </View>
        
            <DrawerItem 
                onPress={() => this.props.navigation.navigate(ScreenName.HomeScreen)}
                title='Cửa hàng' 
                icon={images.mShop} />
            <DrawerItem 
                title='Danh mục' 
                icon={images.mCategory} 
                showMore={true}/>
            <DrawerItem 
                title='Liên hệ' 
                icon={images.mContact} />
            <DrawerItem 
                title='Giới thiệu' 
                icon={images.mIntro} />
            <DrawerItem 
                onPress={() => this.props.navigation.navigate(ScreenName.Signin)}
                title='Đăng xuất' 
                icon={images.mSignout} />

        </View>
        </TouchableWithoutFeedback>
    );
  }

  _renderItem = () => {

  }
}

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
    txt:{
        color:'white',
        fontSize:16,
        textAlign: 'center',
        fontWeight:'400',
        paddingTop: 15
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
    }
})