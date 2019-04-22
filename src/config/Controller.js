import { AsyncStorage, Alert, Platform, Linking } from 'react-native'
import navigation from 'navigation/NavigationService';

export const getItem = async (token) => {
    let e = ''
    try {
        e = await AsyncStorage.getItem(token)

    } catch (error) {
        // Error retrieving data
    }

    return e
}
export const saveItem = (token) => {
    AsyncStorage.setItem(token)
}
export const removeItem = async (token) => {
    let e = await AsyncStorage.removeItem(token)
    return e
}
export const Status = {
    SUCCESS: 200,
    TOKEN_VALID: 445,
    TOKEN_EXPIRED: 440,
    NO_CONTENT: 204,
    PASS_FAIL: 448,
    PROJECT_ID_NOT_FOUND: 406,
    ID_NOT_FOUND: 404,
    CHECKED: 0,
    UNCHECKED: 1,
    USER_PERMISSION: 449,
    TAX_CODE_EXIST: 450
}
export const formatNumber = (num) => {
    return num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") : 0;
}
export const fontStyle = {
    SemiBoldItalic: Platform.OS === "android" ? 'Montserrat-SemiBoldItalic' : null,
    bold: Platform.OS === "android" ? 'Montserrat-ExtraBold' : null,
    Montserrat_SemiBold: Platform.OS === "android" ? 'Montserrat-SemiBold' : null,
    Montserrat_Regular: Platform.OS === "android" ? 'Montserrat-Regular' : null,
    Acumin_bold: Platform.OS === "android" ? 'Acumin-BdPro_0' : null,
    Acumin_thin: Platform.OS === "android" ? 'Acumin-BdItPro_0' : null,
    Acumin_ItPro_0: Platform.OS === "android" ? 'Acumin-ItPro_0' : null,
    Acumin_RPro_0: Platform.OS === "android" ? 'Acumin-RPro_0' : null
}
export const color = "#2166A2"
export const popup = (txt, onPress, fun) => {
    Alert.alert(
        'Thông báo',
        txt,
        [
            {
                text: 'Cancel', style: 'cancel', onPress: onPress ? onPress : () => null
            },
            { text: 'OK', onPress: fun ? fun : () => null }
        ],
        { cancelable: false },
    );
}

export const getMimeType = (type) => {

    switch (type) {
        case "doc":
            return "application/msword";
        case "docx":
            return "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        case "ppt":
            return "application/vnd.ms-powerpoint";
        case "pptx":
            return "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        case "xls":
            return "application/vnd.ms-excel";
        case "xlsx":
            return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        case "pdf":
            return "application/pdf";
        case "png":
            return "image/png";
        case "bmp":
            return "application/x-MS-bmp";
        case "gif":
            return "image/gif";
        case "jpg":
            return "image/jpeg";
        case "jpeg":
            return "image/jpeg";
        case "avi":
            return "video/x-msvideo";
        case "aac":
            return "audio/x-aac";
        case "mp3":
            return "audio/mpeg";
        case "mp4":
            return "video/mp4";
        case "apk":
            return "application/vnd.Android.package-archive";
        case "txt":
        case "log":
        case "h":
        case "cpp":
        case "js":
        case "html":
            return "text/plain";
        default:
            return "*/*";
    }
}
export const callNumber = phone => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
        phoneNumber = `telprompt:${phone}`;
    }
    else {
        phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
        .then(supported => {
            if (!supported) {
                Alert.alert('Phone number is not available');
            } else {
                return Linking.openURL(phoneNumber);
            }
        })
        .catch(err => console.log(err));
};

export const typeScreen = {
    Liquidation: 'liquidation',
    postPurchase: 'buy',
    product:'product',
    catalog: 'catalog',
    document: 'document',
    project: "project",
    bidding: "bidding",
    user: "user",
    editLiquidation: 'editLiquidation'
}

export const downFile = (link) => {
    Linking.canOpenURL(link)
        .then((supported) => {
            if (!supported) {
                console.log("Can't handle url: " + link);
            } else {
                Linking.openURL(link).then(res => {
                    console.log(supported, 'res')
                });
            }
        })
        .catch((err) => console.log('An error occurred', err.response));
}
export const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const sortData = (a, b) => {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
}