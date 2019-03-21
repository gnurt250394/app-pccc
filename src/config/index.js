import {  Alert, Dimensions } from 'react-native'
export const  { width, height } = Dimensions.get('window')
// fontSize: height < smallScreen ? 10 : 14,
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
// export const toPrice = str => {
//     return  str ? str.toLocaleString("vi", {style: "currency", currency: "VND", minimumFractionDigits: 0}) : 0
// }
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

export const popupOk = msg =>{
    Alert.alert(
        'Thông báo',
        msg,
        [
          { text: 'ok',style: 'cancel' }
        ],
        {cancelable: false},
    );
}

export const validateName = str => {
    var re =  /^[ A-Za-z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
    return re.test(str);
}

export const ellipsis = (str, max = 30) => {
    return (str.length > max)? str.substring(0, max) + "...": str;
}

