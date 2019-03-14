import {  Alert } from 'react-native'

export const StatusCode = {
    Success: 200,
}

export const Gender = {
    male: 0,
    female: 1,
}

export const MessageStatus = {
    unread: 0,
    read: 1,
}

export const color = "#2166A2"
export const fonts = {
    bold: 'MONTSERRAT-BOLD'
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
    439: "Số điện thoại đã được sử dụng",
    445: "Invalid token",
    446: "Email đã được sử dụng",
    447: "Lỗi hình ảnh",
    500: "Server Error",
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
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,3}$/;
    return re.test(String(str).toLowerCase());
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

