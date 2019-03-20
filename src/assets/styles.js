import { StyleSheet } from 'react-native'
import { color, defaultStyle, fonts, width, height, sreen4_7 } from 'config'


export default styles = StyleSheet.create({
    slogan: {
        alignSelf: "center",
        fontSize: width <= sreen4_7.width ? 15 : 19,
        fontWeight: 'bold',
        color: color,
        marginBottom: 50,
        // marginTop: -10
    },
    btnLogin: {
        backgroundColor: color,
        width: "80%",
        alignSelf: "center",
        marginTop: width <= sreen4_7.width ? 15 : 25,
        marginBottom: 25,
        borderRadius: 3,
        padding: defaultStyle.padding,
    },
    btnSignup: {
        backgroundColor: "white",
        width: "50%",
        alignSelf: "center",
        marginBottom: 20,
        borderRadius: 30,
        padding: 10
    },
    textLogin: {
        alignSelf: 'center',
        fontSize: defaultStyle.fontSize,
        color: 'white',
        fontFamily: fonts.bold,
    },
    textSignup: {
        alignSelf: 'center',
        fontWeight: "400",
        fontSize: 18,
       
    },
    logo: {
        height: defaultStyle.logoHeight,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: width <= sreen4_7.width ? -10 : 30,
        marginBottom: 18,
    },
    icon: {
        width: 18,
        resizeMode: 'contain',
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    forgot: {
        textAlign: 'center',
        color: color,
        fontSize: defaultStyle.fontSize,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    input: {
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 10,
        color: '#555555',
        paddingLeft: 10,
        fontSize: 14,
        backgroundColor: 'white',
        width: "80%",
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingBottom: 3
    },
    inputBox: {
        width: '80%', 
        alignSelf: 'center', 
        flexDirection: 'row', 
        borderBottomWidth: 1, 
        borderColor: '#ddd', 
        marginBottom: 20, 
        paddingBottom: 0
    },
    loginInput: {
        alignSelf: 'center',
        color: '#393939',
        fontSize: 16,
        padding: 0,
        paddingLeft: 10,
        flex: 1
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10
    },
    badge: {
        backgroundColor: '#FC6463', 
        borderRadius: 18, 
        width: 25, 
        height: 18, 
        textAlign: 'center',
        alignItems: 'center',
        alignContent: 'center',
        color: '#fff',
        marginLeft: -20,
        marginTop: 10,
        fontSize: 11
    },
    loading: {
        position: "absolute",
        top: '48%',
        left: '48%'
    },
    close: {
        width: width <= sreen4_7.width ? 10 : 15,
        resizeMode: 'contain',
    },
    btnClose: {
        alignSelf: 'flex-end',
        padding: 20,
    },
    

})