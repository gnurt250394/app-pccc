import {  Alert } from 'react-native'

export const StatusCode = {
    Success: 200,
}

export const Gender = {
    male: 0,
    female: 1,
}

export const color = "#2166A2"

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
    427: "Số điện thoại đã được sử dụng",
    439: "Số điện thoại đã được sử dụng",
    500: "Server Error",
}

export const toUpperCase = str => str.toUpperCase()
export const toPrice = str => {
    return  str ? str.toLocaleString("vi", {style: "currency", currency: "VND", minimumFractionDigits: 0}) : 0
}
export const removeItem = (arr, i) => arr.slice(0, i).concat(arr.slice(i + 1, arr.length))
export const totalByValue = (data, field) => data.length == 0 ? 0 : data.map(item => item[field]).reduce((prev, next) => prev + next);
export const calTotalPrice = data => data.length == 0 ? 0 : data.map(item => item['price']*item['total']).reduce((prev, next) => prev + next);

export const validateEmail = str => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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