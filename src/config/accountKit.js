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

export const  getCurrentAccount = async (phone = "") => {
    RNAccountKit.configure({
        responseType: 'token',
        initialAuthState: '',
        initialPhoneCountryPrefix: phone != "" ? '+84' + phone.replace(/^0+/, "") : '+84', 
        defaultCountry: 'VN',
    })

    await RNAccountKit.loginWithPhone().then((res) => res.token).catch(err => false)
    let phoneNumber;
    let account = await RNAccountKit.getCurrentAccount()
    if(account && account.phoneNumber){
        phoneNumber = '0'+account.phoneNumber.number
    }
    return phoneNumber
}