export const UrlName = {
    base: 'localhost:8081',
    signup: 'signup'
}

export const ScreenName = {
    Auth: "Auth", 
    Signup: "Signup", 
    Signin: "Signin", 
    Register: "Register", 
    ForgotPassword: "ForgotPassword", 
    Otp: "Otp",
    ChangePassword: "ChangePassword",
    NextStep: "NextStep",
    Complete: "Complete",
    ViewProfile: "ViewProfile",
    EditProfile: "EditProfile",
    Profile: "Profile",
    Confirm: "Confirm",
    HomeScreen: "HomeScreen",
    More: "More",
    Cart: "Cart",
    Search: "Search",
}

export const toUpperCase = (str) => str.toUpperCase()
export const toPrice = (str) => {
    return  str ? str.toLocaleString("vi", {style: "currency", currency: "VND", minimumFractionDigits: 0}) : 0
}
export const removeItem = (arr, i) => arr.slice(0, i).concat(arr.slice(i + 1, arr.length))
export const totalByValue = (data, field) => data.length == 0 ? 0 : data.map(item => item[field]).reduce((prev, next) => prev + next);