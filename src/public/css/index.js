import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    slogan: {
        alignSelf: "center",
        fontSize: 25,
        fontWeight: 'bold',
        // marginTop: 10,
        color: 'white',
        marginBottom: "15%",
    },
    btnLogin: {
        backgroundColor: "#F55555",
        width: "80%",
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 25,
        borderRadius: 10,
        padding: 12,
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
        fontWeight: "500",
        fontSize: 16,
        color: 'white',
    },
    textSignup: {
        alignSelf: 'center',
        fontWeight: "400",
        fontSize: 18,
       
    },
    logo: {
        width: 80,
        alignSelf: 'center',
        resizeMode: 'contain'
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
        color: '#5B5B5B',
        fontSize: 18,
        textDecorationLine: 'underline'
    },
    input: {
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 10,
        color: '#393939',
        paddingLeft: 10,
        fontSize: 16,
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
    }

})