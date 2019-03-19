import React,{Component} from 'react'
import {Dimensions,NetInfo,StyleSheet,View,Image,Text} from 'react-native'
import images from "assets/images"

const { width, height } = Dimensions.get('window');

class NoInternetScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: true,
        };
    }

    componentDidMount() {
            NetInfo.isConnected.addEventListener(
                'connectionChange', 
                this.handleConnectivityChange
            );
    }

    handleConnectivityChange = isConnected => {
        if(this.state.isConnected !== isConnected){
            this.setState({ isConnected });
        }
    };

    render() {
        return (!this.state.isConnected ?
            <View style={styles.offlineContainer}>
                <Image
                    source={images.checkNetWorking}
                    style={styles.imageStyle}
                    resizeMode='contain'
                />

                <Text style={styles.textStyle}>Không có kết nối mạng</Text>
                <Text style={styles.textStyle}>Vui lòng kiểm tra lại!</Text>
            </View>
            :
            <View />)


    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height,
        position: 'absolute',
    },
    offlineText: { color: '#fff' },

    textStyle: {
        fontSize: 16,
        color: '#2166A2',
    },
    imageStyle: {
        width: width / 2,
        height: height / 3
    }
})

export default NoInternetScreen;