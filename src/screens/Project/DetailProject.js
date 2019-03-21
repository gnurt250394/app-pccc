import React, { Component } from 'react';
import { View, Text,Image,Dimensions,StyleSheet,TouchableOpacity,ScrollView,FlatList } from 'react-native';
import { Header } from 'components';
import images from "assets/images"
import { connect } from 'react-redux'
import Item from './Item';
import CustomText from './CustomText';
import { getListProject, FolowProject, FolowUser } from 'config/apis/Project';
import { Status, removeItem, formatNumber } from 'config/Controller';
import Toast from 'react-native-simple-toast';
import navigation from 'navigation/NavigationService';
import { SigninScreen } from 'config/screenNames';
import moment from 'moment';
const {width,height}= Dimensions.get('window')
 class DetailProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
        project:{},
        listPartner:[]
    };
  }


  showTitle=()=>{
      let name=''
      if(this.props.navigation.state&& this.props.navigation.state.params.name&&this.props.navigation.state.params.name.length > 30 ){
            name= this.props.navigation.state.params.name.substring(0, 29) + "..." 
      } else{
       name= this.props.navigation.state.params.name || 'Chi tiết dự án'
      }
    return name 
  }
  _folowUser=(item)=>{
      FolowUser({investor_id:item.id}).then(res=>{
          if(res.data.code == Status.SUCCESS){
            //   Toast.show('Bạn đã theo dõi dự án ' + item.name + ' thành công')
          } else if(res.data.code == Status.TOKEN_EXPIRED ||  res.data.code == Status.TOKEN_VALID){
            Toast.show('Phiên đăng nhập hết hạn')
            navigation.reset(SigninScreen)
            removeItem('token')
            this.props.dispatch({type: actionTypes.USER_LOGOUT})
          }
      })
  }
  _check=(item)=>()=>{
    let data = this.state.listPartner
    data.forEach(e=>{
        if(e.id == item.id){
            e.checked = true
            this._folowUser(item)
        }
    })
    this.setState({listPartner:data})
  }
  _uncheck=(item)=>()=>{
    let data = this.state.listPartner
    data.forEach(e=>{
        if(e.id == item.id){
            e.checked = false
        }
    })
    this.setState({listPartner:data})
  }
  _renderItem=({item})=>{
      return(
          <Item
            onPressUncheck={this._check(item)}
            item={item}
            onPressCheck={this._uncheck(item)}
          />
      )
  }
  _keyExtractor=(item,index)=>{
      return `${item.id|| index}`
  }
  _goBack=()=>{
      navigation.pop()
  }
  _folowProject=()=>{
      if(this.props.navigation.state&& this.props.navigation.state.params.id){
    FolowProject({project_id: this.props.navigation.state.params.id}).then(res=>{
        
        if(res.data.code == Status.SUCCESS){
            
            Toast.show('Bạn đã theo dõi dự án ' + this.props.navigation.state.params.name + ' thành công')
        } else if(res.data.code == Status.TOKEN_EXPIRED|| res.data.code == Status.TOKEN_VALID){
            Toast.show('Phiên đăng nhập hết hạn')
            navigation.reset(SigninScreen)
            removeItem('token')
            this.props.dispatch({type: actionTypes.USER_LOGOUT})
        } else if(res.data.code == Status.PROJECT_ID_NOT_FOUND){
            Toast.show('Dự án bạn theo dõi không tồn tại')
        }
    })
    }
  }
  render() {
      let {project,listPartner} = this.state
    return (
      <View style={{flex:1}}>
       <Header
            check={1}
            onPress={this._goBack}
            title={this.showTitle()}
        />
        <ScrollView>
        <View style={styles.container}>
        <Text style={styles.txtHeader}>{project.name}</Text>
        <View style={styles.dateFolow}>
        <View style={styles.buttonDate}>
        <Image
            source={images.calender}
            style={styles.imgCalenda}
            resizeMode="contain"
        />
            <Text>{moment(project.time,'YYYY-MM-DD hh:mm:ss').format('hh:mm - DD/MM/YYYY')}</Text>
        </View>
        <TouchableOpacity style={styles.folow}
        onPress={this._folowProject}
        >
            <Text style={styles.txtButton}>Theo dõi dự án</Text>
        </TouchableOpacity>
        </View>
        <CustomText value={"Giá trị"} name={formatNumber(project.value) +" "+ "đ"}/>
        <CustomText value={"Giai đoạn"} name={project.phase}/>
        <CustomText value={"Tình trạng"} name={project.status}/>
        <CustomText value={"Khởi công"} name={moment(project.time_start,'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')}/>
        <CustomText value={"Hoàn công"} name={moment(project.time_start,'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')}/>
        <CustomText value={"Hạng công trình xanh"} name={project.field_area}/>
        <CustomText value={"Địa điểm"} name={project.address}/>
        <CustomText value={"Diện tích sàn"} name={project.floor_area}/>
        <CustomText value={"Số tầng"} name={project.floor}/>
        <CustomText value={"Units"} name={project.unit}/>
        <CustomText value={"Loại hình dự án"} name={project.type_project}/>
            {/*  đang thiếu loại hình phụ */}
        <CustomText value={"Loại hình phụ"} name={''}/>
        <CustomText value={"Mã số dự án"} name={project.project_code}/>
        <CustomText value={"Loại quyền sở hữu"} name={project.ownership}/>
        <CustomText value={"Loại đầu tư"} name={project.type_invest}/>
        <CustomText value={"Mô tả dự án"} name={project.description}/>
        <CustomText value={"Các đối tác liên hệ"} name={' '}/>
        <Text style={styles.txtTicker}>(Tích chọn để theo dõi các thông tin của đối tác)</Text>
        <FlatList
            data={this.state.listPartner}
            renderItem={this._renderItem}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
        />
        </View>
        </ScrollView>
      </View>
    );
  }
  _getData=()=>{
      if(this.props.navigation.state&& this.props.navigation.state.params.id){
        getListProject({
            project_id:this.props.navigation.state.params.id
          }).then(res=>{
            if(res.data.code== Status.SUCCESS){
                this.setState({
                    project:res.data.data,
                    listPartner:res.data.data.partner
                })
                
            } else if(res.data.code == Status.TOKEN_EXPIRED|| res.data.code == Status.TOKEN_VALID){
                Toast.show('Phiên đăng nhập hết hạn')
                navigation.reset(SigninScreen)
                removeItem('token')
                this.props.dispatch({type: actionTypes.USER_LOGOUT})
            }
        })
      }
     
  }
  componentDidMount =  () => {
    this._getData()
  };
  
}

const data = [
    {
        id: 30,
        name: "Đào Cư Hà",
        phone: "84 24 33532855, 33530129",
        fax: null,
        email:'abcajkdasf@gmail.com',
        position:'Giám đốc',
        sub:'trung cư',
        address: "157 Ba La",
        company: "Công Ty CP Xây Dựng & Thương Mại Phú Cường Công Ty CP Xây Dựng & Thương Mại Phú Cường "
      },
    {
        id: 31,
        name: "Đào Cư Hà",
        phone: "84 24 33532855, 33530129",
        fax: null,
        email:'abcajkdasf@gmail.com',
        position:'Giám đốc',
        sub:'trung cư',
        address: "157 Ba La",
        company: "Công Ty CP Xây Dựng & Thương Mại Phú Cường"
      },
    {
        id: 32,
        name: "Đào Cư Hà",
        phone: "84 24 33532855, 33530129",
        fax: null,
        email:'abcajkdasf@gmail.com',
        position:'Giám đốc',
        sub:'trung cư',
        address: "157 Ba La",
        company: "Công Ty CP Xây Dựng & Thương Mại Phú Cường"
      },
    {
        id: 33,
        name: "Đào Cư Hà",
        phone: "84 24 33532855, 33530129",
        fax: null,
        email:'abcajkdasf@gmail.com',
        position:'Giám đốc',
        sub:'trung cư',
        address: "157 Ba La",
        company: "Công Ty CP Xây Dựng & Thương Mại Phú Cường"
      },
     
]
const styles= StyleSheet.create({
    container:{
        flex:1,
        padding: 10,
    },
    imgCalenda:{
        height:15,
        width:15,
        alignSelf:'center',
        tintColor:'#2166A2'
    },
    txtButton:{
        color:'#FFFFFF'
    },
    txtHeader:{
        color:'#333333',
        fontSize:16,
        fontWeight: '600',
    },
    txtTicker:{
        fontSize:11,
        color:'#CCCCCC',
        fontStyle: 'italic',
    },
    row:{
        flexDirection:'row',
        marginBottom:9
    },
    Square:{
        flexDirection:'row'
    },
    rowList:{
        flexDirection:'row',
        marginBottom:9
    },
    dateFolow:{
        flexDirection:'row',
        marginVertical: 13,
    },
    buttonDate:{
         height:40,
        //  width:width/2.5,
        paddingHorizontal: 10,
         borderColor: '#707070',
         borderWidth: 1,
         borderRadius: 5,
         alignItems: 'center',
         justifyContent: 'space-evenly',
         flexDirection:'row'
    },
    folow:{
         height:40,
        //  width:width/2.5,
        paddingHorizontal:35,
         marginLeft: 15,
         borderColor: '#707070',
         borderWidth: 1,
         borderRadius: 5,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor:'#2166A2'
    },
    image:{
        height:8,
        width:8,
        tintColor:'gray',
        alignSelf: 'center',
        marginRight: 8,
    },
})

export default connect()(DetailProject)