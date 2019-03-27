import React, { Component } from 'react';
import { View, Text,Image,Dimensions,StyleSheet,TouchableOpacity,ScrollView,FlatList,Alert } from 'react-native';
import { Header } from 'components';
import images from "assets/images"
import { connect } from 'react-redux'
import Item from './Item';
import CustomText from './CustomText';
import { getListProject, FolowProject, FolowUser, unFolowProject, UnFolowUser } from 'config/apis/Project';
import { Status, removeItem, formatNumber, getItem, popup } from 'config/Controller';
import Toast from 'react-native-simple-toast';
import navigation from 'navigation/NavigationService';
import { SigninScreen, HomeScreen } from 'config/screenNames';
import moment from 'moment';
import { popupOk } from 'config'

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

  // theo dõi user
  _folowUser= async(item)=>{
      let token = await getItem('token')
      if(token){
console.log(item,'ggg')
      FolowUser({investor_id:item.users_id,table:'UserInvestor'}).then(res=>{
          if(res.data.code == Status.SUCCESS){
            let data = this.state.listPartner
            data.forEach(e=>{
                if(e.users_id == item.users_id){
                    e.follow = Status.UNCHECKED
                }
            })
            
            this.setState({listPartner:data})
              Toast.show('Bạn đã theo dõi dự án ' + item.user_name + ' thành công')
          } else if(res.data.code == Status.TOKEN_EXPIRED ||  res.data.code == Status.TOKEN_VALID){
            Toast.show('Phiên đăng nhập hết hạn')
            navigation.reset(SigninScreen)
            removeItem('token')
            this.props.dispatch({type: actionTypes.USER_LOGOUT})
          }else if(res.data.code == Status.DELETE_ID_NOT_FOUND){
            Toast.show('Dự án không tồn tại')
          }else if(res.data.code == Status.USER_PERMISSION){
            popup('Bạn phải mua gói để sử dụng tính năng này.', HomeScreen)
          }
      }).catch(err=>{
        Toast.show('Lỗi hệ thống'+ ' '+err.response.status)
      })
    }else{
        popup('Bạn phải đăng nhập để sử dụng tính năng này.', SigninScreen)
    }
  }

  // bỏ theo dõi user
  _UnfolowUser= async(item)=>{
    let token = await getItem('token')
    if(token){
      console.log(item,'eee')
      UnFolowUser({investor_id:item.users_id,table:'UserInvestor'}).then(res=>{
          if(res.data.code == Status.SUCCESS){
            let data = this.state.listPartner
              data.forEach(e=>{
            if(e.users_id == item.users_id){
            e.follow = Status.CHECKED
          }
          })
    this.setState({listPartner:data})
              Toast.show('Bạn đã bỏ theo dõi dự án ' + item.user_name + ' thành công')
          } else if(res.data.code == Status.TOKEN_EXPIRED ||  res.data.code == Status.TOKEN_VALID){
            Toast.show('Phiên đăng nhập hết hạn')
            navigation.reset(SigninScreen)
            removeItem('token')
            this.props.dispatch({type: actionTypes.USER_LOGOUT})
          } else if(res.data.code == Status.DELETE_ID_NOT_FOUND){
            Toast.show('Dự án không tồn tại')
          }
      }).catch(err=>{
        Toast.show('Lỗi hệ thống'+ ' '+err.response.status)
      })
    }else{
        popup('Bạn phải đăng nhập để sử dụng tính năng này.', SigninScreen)
    }
  }

  // 
  _check=(item)=>()=>{
    this._folowUser(item)
   
  }
  _uncheck=(item)=>()=>{
    this._UnfolowUser(item)
   
  }
  _renderItem=({item,index})=>{
      return(
          <Item
            onPressUncheck={this._check(item)}
            item={item}
            index={index}
            onPressCheck={this._uncheck(item)}
          />
      )
  }
  _keyExtractor=(item,index)=>{
      return `${item.user_id|| index}`
  }
  _goBack=()=>{
      navigation.pop()
  }
  _folowProject=async()=>{
      if(this.props.navigation.state&& this.props.navigation.state.params.id){
          let token = await getItem('token')
          if(token){
            FolowProject({
              project_id: this.props.navigation.state.params.id,
              table:'UserProject',
            }).then(res=>{
              console.log(res.data,'hhh')
                if(res.data.code == Status.SUCCESS){
                    this.state.project.follow = Status.UNCHECKED
                    this.setState({})
                    Toast.show('Bạn đã theo dõi dự án ' + this.props.navigation.state.params.name + ' thành công')
                } else if(res.data.code == Status.TOKEN_EXPIRED|| res.data.code == Status.TOKEN_VALID){
                    Toast.show('Phiên đăng nhập hết hạn')
                    navigation.navigate(SigninScreen)
                    removeItem('token')
                    this.props.dispatch({type: actionTypes.USER_LOGOUT})
                } else if(res.data.code == Status.PROJECT_ID_NOT_FOUND){
                    Toast.show('Dự án không tồn tại')
                }else if(res.data.code == Status.USER_PERMISSION){
                  popup('Bạn phải mua gói để sử dụng tính năng này.', HomeScreen)
                  console.log(res.data)
                }
            }).catch(err=>{
              Toast.show('Lỗi hệ thống'+ ' '+err.response.status)
              console.log(err.response)
              })
          } else{
            popup('Bạn phải đăng nhập để sử dụng tính năng này.', SigninScreen)
            
          }
    
    }
  }
  
  _UNfolowProject=async()=>{
      if(this.props.navigation.state&& this.props.navigation.state.params.id){
          let token = await getItem('token')
          if(token){
            unFolowProject({
              project_id: this.props.navigation.state.params.id,
              table:'UserProject'
            }).then(res=>{
                
                if(res.data.code == Status.SUCCESS){
                    Toast.show('Bạn đã bỏ theo dõi dự án ' + this.props.navigation.state.params.name + ' thành công')
                    this.state.project.follow = Status.CHECKED
                    this.setState({})
                } else if(res.data.code == Status.TOKEN_EXPIRED|| res.data.code == Status.TOKEN_VALID){
                    Toast.show('Phiên đăng nhập hết hạn')
                    navigation.navigate(SigninScreen)
                    removeItem('token')
                    this.props.dispatch({type: actionTypes.USER_LOGOUT})
                } else if(res.data.code == Status.DELETE_ID_NOT_FOUND){
                    Toast.show('Dự án không tồn tại')
                }
            }).catch(err=>{
              Toast.show('Lỗi hệ thống'+ ' '+err.response.status)
              })
          } else{
            popupOk('Bạn phải đăng nhập để sử dụng tính năng này.', () => this.props.navigation.navigate(SigninScreen))
            
          }
    
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
            <Text style={{color:'#333131'}}>{moment(project.time,'YYYY-MM-DD hh:mm:ss').format('hh:mm - DD/MM/YYYY')}</Text>
        </View>
        {project.follow&& project.follow== Status.UNCHECKED? 
        <TouchableOpacity
          style={styles.folow}
          onPress={this._UNfolowProject}
          >
            <Text style={styles.txtButton}>Bỏ theo dõi</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.folow}
        onPress={this._folowProject}
        >
            <Text style={styles.txtButton}>Theo dõi dự án</Text>
        </TouchableOpacity>
        }
        </View>
        <CustomText value={"Giá trị"} name={formatNumber(project.value) +" "+ "đ"}/>
        <CustomText value={"Giai đoạn"} name={project.phase}/>
        <CustomText value={"Tình trạng"} name={project.status}/>
        <CustomText value={"Khởi công"} name={moment(project.time_start,'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')}/>
        <CustomText value={"Hoàn công"} name={moment(project.time_start,'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')}/>
        <CustomText value={"Hạng công trình xanh"} name={project.field_area}/>
        <CustomText value={"Địa điểm"} name={project.address}/>
        <CustomText value={"Diện tích sàn"} name={project.floor_area+ ' m2'}/>
        <CustomText value={"Diện tích thực địa"} name={project.site_area}/>
        <CustomText value={"Số tầng"} name={project.storeys}/>
        <CustomText value={"Units"} name={project.unit}/>
        <CustomText value={"Loại hình dự án"} name={project.type_project}/>
            {/*  đang thiếu loại hình phụ */}
        <CustomText value={"Loại hình phụ"} name={project.dev_type}/>
        <CustomText value={"Mã số dự án"} name={project.project_code}/>
        <CustomText value={"Loại quyền sở hữu"} name={project.owner_type}/>
        <CustomText value={"Diện tích thực địa"} name={project.site_area}/>
        <CustomText value={"Loại đầu tư"} name={project.type_invest}/>
        <CustomText value={"Mô tả dự án"} name={project.description}/>
        <CustomText value={"Các đối tác liên hệ"} name={' '}/>
        <Text style={styles.txtTicker}>(Tích chọn để theo dõi các thông tin của đối tác)</Text>
        <FlatList
            data={listPartner}
            renderItem={this._renderItem}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
        />
        </View>
        </ScrollView>
      </View>
    );
  }
  _getData= async () => {
    

      if(this.props.navigation.state&& this.props.navigation.state.params.id){
        

        let project = await getListProject(this.props.navigation.state.params.id ).then(res=>{
         
            
            return res.data.code == Status.SUCCESS ? res.data.data : []
        }).catch(err => {
            
           return err.response
        })
        console.log(project,'aaa')
        this.setState({
            project,
            listPartner: project.partner
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
        tintColor:'#2166A2',
        marginRight:5
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
        fontSize:13,
        color:'#999999',
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
         borderColor: '#333131',
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