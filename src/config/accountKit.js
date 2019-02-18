import RNAccountKit from 'react-native-facebook-account-kit'


export const  accountKit = (phone = "") => {
    RNAccountKit.configure({
        responseType: 'code',
        // titleType: 'login',
        initialAuthState: '',
        initialPhoneCountryPrefix: phone != "" ? '+84' + phone.replace(/^0+/, "") : '+84', 
        defaultCountry: 'VN',
    })
    return RNAccountKit
}