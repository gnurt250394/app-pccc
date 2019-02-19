import {  Alert } from 'react-native'
export const UrlName = {
    base: 'localhost:8081',
    signup: 'signup'
}

export const StatusCode = {
    Success: 200,
}

export const ScreenName = {
    Signup: "Signup", 
    Signin: "Signin", 
    Register: "Register", 
    ForgotPassword: "ForgotPassword", 
    ChangePassword: "ChangePassword",
    Register: "Register",
    Complete: "Complete",
    ViewProfile: "ViewProfile",
    EditProfile: "EditProfile",
    Profile: "Profile",
    Confirm: "Confirm",
    HomeScreen: "HomeScreen",
    News: "News",
    Cart: "Cart",
    Search: "Search",
    ProductDetail: "ProductDetail",
    SplashScreen:"SplashScreen",
    ScreenHello:"ScreenHello",
    Contacts:"Contacts",
    Introduce:"Introduce"
}

export const toUpperCase = (str) => str.toUpperCase()
export const toPrice = (str) => {
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
          {
            text: 'ok',style: 'cancel',
          },
          
        ],
        {cancelable: false},
    );
}

export const validateName = str => {
    var re =  /^[ A-Za-z0-9]+$/;
    return re.test(str);
}