import {  Alert, Dimensions } from 'react-native'
import { Switch } from 'react-native-gesture-handler';
export const  { width, height } = Dimensions.get('window')

export const StatusCode = {
    Success: 200,
    NoContent: 204,
    Tokenvalid:445,
    TokenExpire:440,
    PhoneExists: 439
}

export const Gender = {
    male: 0,
    female: 1,
}

export const BiddingField = field => {
    let name = ""
    switch (field){
        case 0:
        case "0":
            name = 'Hàng hóa'
            break
        case 1:
        case "1":
            name = 'Xây lắp'
            break
        case 2:
        case "2":
            name = 'Tư vấn'
            break
        case 3:
        case "3":
            name = 'Phi tư vấn'
            break
        case 4:
        case "4":
            name = 'Hỗn hợp'
            break
        default:
            name = 'Hỗn hợp'
            break
    }

    return name
}

export const Follow = {
    unfollow: 0,
    follow: 1,
    table_project: 'UserProject',
    table_user: 'UserInvestor',
    table_document: 'UserDocument',
    table_bidding: 'UserBidding',
}

export const MessageStatus = {
    unread: 0,
    read: 1,
}

export const smallScreen = 550
export const sreen4_7 = {
    width:  384,
    height:  592
}
export const color = "#2166A2"
export const fonts = {
    bold: 'MONTSERRAT-BOLD',
    SemiBoldItalic:'Montserrat-SemiBoldItalic',
    AcuminBdItPro_0:'Acumin-BdItPro_0',
    MontserratExtraBold:'Montserrat-ExtraBold'
}

export const youtubeLink = "https://www.youtube.com/watch?v="
export const youtubeApiKey = "AIzaSyBmLjdQjvSDmAEeF6lDqQD5Fe3ICkrytZY"

export const defaultStyle = {
    fontSize: width <= sreen4_7.width ? 13 : 14,
    padding: width <= sreen4_7.width ? 8 : 11,
    logoHeight: width <= sreen4_7.width ? 150 : 150,
}


export const ShowGender = gender => {
    if(gender == null) return gender
    else return gender == Gender.male ? "Nam" : "nữ"
}

export const LoginType  = {
    facebook: 1,
    google: 2,
}


export const CodeToMessage = {
    404: "Sai tài khoản hoặc mật khẩu",
    438: 'Không tìm thấy tài khoản',
    439: "Số điện thoại đã được sử dụng",
    445: "Invalid token",
    446: "Email đã được sử dụng",
    447: "Lỗi hình ảnh",
    500: "Server Error",
    440:'Phiên đăng nhập hết hạn',
    448:'Mật khẩu cũ không chính xác'
}

export const toUpperCase = str => str.toUpperCase()
export const toPrice = str => {
    return str ? str.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " đ" : 0 + " đ"
}
export const removeItem = (arr, i) => arr.slice(0, i).concat(arr.slice(i + 1, arr.length))
export const totalByValue = (data, field) => data.length == 0 ? 0 : data.map(item => item[field]).reduce((prev, next) => prev + next);
export const calTotalPrice = data => data.length == 0 ? 0 : data.map(item => item['price']*item['total']).reduce((prev, next) => prev + next);

export const validateEmail = str => {
    // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let re = /^([^<>()\[\]\\.,;:\s@"]+((?:\.[a-zA-Z0-9_]+)*))@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,3}$/;
    let check = re.test(str.toString());
    return check
}

export const validatePhone = str => {
    var re =  /^[0-9\+]{9,11}$/;
    return re.test(str);
}

export const popupOk = (msg, onPress = null) =>{
    Alert.alert(
        'Thông báo',
        msg,
        [
          { text: 'ok',style: 'ok', onPress: onPress ? onPress : () => null }
        ],
        {cancelable: false},
    );
}


export const validateName = str => {
    var re =  /^[ A-Za-z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
    return re.test(str);
}

export const ellipsis = (str = "", max = 30) => {
    return (str.length > max)? str.substring(0, max) + "...": str;
}

export const toParams = (obj, first = '?') => {
    return  first + Object.entries(obj).map(e => e.join('=')).join('&');
}


export const MIME = {
    // list: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
    'aac': 'audio/aac',
    'abw': 'application/x-abiword',
    'csv': 'text/csv',
    'bin': 'application/octet-stream',
    'bmp': 'image/bmp',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'gif': 'image/gif',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'mp3': 'audio/mpeg',
    'mpeg': 'video/mpeg',
    'pdf': 'application/pdf',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'rar': 'application/x-rar-compressed',
    'wav': 'audio/wav',
    'weba': 'audio/webm',
    'webm': 'video/webm',
    'webp': 'image/webp',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'zip': 'application/zip',
    '3gp': 'video/3gpp',
    '3g2': 'video/3gpp2',
    '7z': 'application/x-7z-compressed',
    'swf': 'application/x-shockwave-flash',
    'tar': 'application/x-tar',
    'tif': 'image/tiff',
    'tiff': 'image/tiff',
    'txt': 'text/plain',
}