import { Platform} from 'react-native'
export const fontStyles = {
      SemiBoldItalic: Platform.OS === "android" ? {fontFamily:'Montserrat-SemiBoldItalic'}: {fontWeight:'500',fontStyle:'italic'},
      bold: Platform.OS === "android" ? {fontFamily:'Montserrat-ExtraBold'}: {fontWeight:'bold'},
      Montserrat_SemiBold: Platform.OS === "android" ? {fontFamily:'Montserrat-SemiBold'}: {fontWeight:'bold'},
      Montserrat_Regular: Platform.OS === "android" ?{fontFamily:'Montserrat-Regular'}: null,
      Acumin_bold: Platform.OS === "android" ?{fontFamily:'Acumin-BdPro_0'} : {fontWeight:'bold'},
      Acumin_thin: Platform.OS === "android" ?{fontFamily:'Acumin-BdItPro_0'}: null,
      Acumin_ItPro_0:Platform.OS === "android" ? {fontFamily:'Acumin-ItPro_0'}: null,
      Acumin_RPro_0:Platform.OS === "android" ?{fontFamily:'Acumin-RPro_0'}: null
  }