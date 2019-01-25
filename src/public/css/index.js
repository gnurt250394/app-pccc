import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    slogan: {
        alignSelf: "center",
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'white',
        marginBottom: "15%",
    },
    btnLogin: {
        backgroundColor: "#DA0006",
        width: "80%",
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 25,
        borderRadius: 10,
        padding: 10,
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
        fontSize: 18,
        color: 'white',
    },
    textSignup: {
        alignSelf: 'center',
        fontWeight: "400",
        fontSize: 18,
       
    },
    logo: {
        width: 80,
        height: 100,
        alignSelf: 'center'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    forgot: {
        textAlign: 'center',
        color: '#DA0006',
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
        width: "80%"
    },
    inputBox: {
        width: '80%', 
        alignSelf: 'center', 
        flexDirection: 'row', 
        borderBottomWidth: 1, 
        borderColor: '#ddd', 
        marginBottom: 20, 
        paddingBottom: 5
    },
    loginInput: {
        alignSelf: 'center',
        color: '#393939',
        fontSize: 16,
        padding: 0,
        flex: 1
    }
})