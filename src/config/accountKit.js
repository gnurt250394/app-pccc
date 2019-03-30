import RNAccountKit from 'react-native-facebook-account-kit'
import { log } from 'config'
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

export const  getCurrentAccount = async (phone = "") => {
    RNAccountKit.configure({
        responseType: 'token',
        initialAuthState: '',
        initialPhoneCountryPrefix: phone != "" ? '+84' + phone.replace(/^0+/, "") : '+84', 
        defaultCountry: 'VN',
    })

    let phoneNumber;
    let token = await RNAccountKit.loginWithPhone().then((res) => res.token).catch(err => false)
    
    if (!token) return
    let account = await RNAccountKit.getCurrentAccount()
    if(account && account.phoneNumber){
        phoneNumber = '0'+account.phoneNumber.number
    }
    return phoneNumber
}