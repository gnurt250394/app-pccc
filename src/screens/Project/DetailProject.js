import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView, FlatList, Alert, RefreshControl } from 'react-native';
import { Header } from 'components';
import images from "assets/images"
import { connect } from 'react-redux'
import Item from './Item';
import CustomText from './CustomText';
import { getListProject, FolowProject, FolowUser, unFolowProject, UnFolowUser } from 'config/apis/Project';
import { Status, removeItem, formatNumber, getItem, popup, fontStyle } from 'config/Controller';
import Toast from 'react-native-simple-toast';
import navigation from 'navigation/NavigationService';
import { SigninScreen, HomeScreen } from 'config/screenNames';
import moment from 'moment';
import { popupOk } from 'config'
import { fontStyles } from 'config/fontStyles';
import { Messages } from 'config/Status';
import { logoutAction } from 'reduxs/actions/actionCreator';

class DetailProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      listPartner: [],
      id: this.props.navigation.getParam('id') || '',
      title: this.props.navigation.getParam('name') || '',
      loading: true,
      folow: this.props.navigation.getParam('follow') || false,
    };
    this.refress= this.props.navigation.getParam('refress','')
  }


  showTitle = () => {
    let name = ''
    if (this.state.title && this.state.title.length > 20) {
      name = this.state.title.substring(0, 19) + "..."
    } else {
      name = this.state.title || 'Chi tiết dự án'
    }
    return name
  }

  // theo dõi user
  _folowUser = async (item) => {
    let token = await getItem('token')
 
    if (token) {
      
      FolowUser({ investor_id: item.user_id, table: 'UserInvestor' }).then(res => {
        console.log('object',res)
        if (res.data.code == Status.SUCCESS) {
          let data = this.state.listPartner
          data.forEach(e => {
            if (e.user_id == item.user_id) {
              e.follow = Status.UNCHECKED
            }
          })

          this.setState({ listPartner: data })
          Toast.show('Bạn đã theo dõi nhà thầu ' + item.user_name + ' thành công')
        } else if (res.data.code == Status.TOKEN_EXPIRED) {
          Toast.show('Phiên đăng nhập hết hạn')
          navigation.reset(SigninScreen)
          removeItem('token')
          this.props.logout()
        } else if (res.data.code == Status.ID_NOT_FOUND) {
          Toast.show('Dự án không tồn tại')
        } else if (res.data.code == Status.USER_PERMISSION) {
          popup('Bạn phải mua gói để sử dụng tính năng này.', null, () => popupOk('Tính năng đang phát triển. Vui lòng quay lại sau.'))
        }else if(res.data.code == Status.TOKEN_VALID){
          popup(Messages.LOGIN_REQUIRE, null, () => navigation.navigate(SigninScreen))
        }
      }).catch(err => {
        Toast.show('Lỗi hệ thống' + ' ' + err.response.status)
      })
    } else {
      popup(Messages.LOGIN_REQUIRE, null, () => navigation.navigate(SigninScreen))
    }
  }

  // bỏ theo dõi user
  _UnfolowUser = async (item) => {
    let token = await getItem('token')
    if (token) {
      popup('Bạn có muốn bỏ theo dõi nhà thầu này không?', null, () => {
        UnFolowUser({ investor_id: item.user_id, table: 'UserInvestor' }).then(res => {
          if (res.data.code == Status.SUCCESS) {
            let data = this.state.listPartner
            data.forEach(e => {
              if (e.user_id == item.user_id) {
                e.follow = Status.CHECKED
              }
            })
            this.setState({ listPartner: data })
            Toast.show('Bạn đã bỏ theo dõi nhà thầu ' + item.user_name + ' thành công')
          } else if (res.data.code == Status.TOKEN_EXPIRED ) {
            Toast.show('Phiên đăng nhập hết hạn')
            navigation.reset(SigninScreen)
            removeItem('token')
            this.props.logout()
          } else if (res.data.code == Status.ID_NOT_FOUND) {
            Toast.show('Dự án không tồn tại')
          }else if(res.data.code == Status.TOKEN_VALID){
            popup(Messages.LOGIN_REQUIRE, null, () => navigation.navigate(SigninScreen))
          }
        }).catch(err => {
          Toast.show('Lỗi hệ thống' + ' ' + err.response.status)
        })
      })
      
    } else {
      popup(Messages.LOGIN_REQUIRE, null, () => navigation.navigate(SigninScreen))
    }
  }


  
  // 
  _check = (item) => () => {
    this._folowUser(item)

  }
  _uncheck = (item) => () => {
    this._UnfolowUser(item)

  }
  _renderItem = ({ item, index }) => {
    return (
      <Item
        onPressUncheck={this._check(item)}
        item={item}
        index={index}
        onPressCheck={this._uncheck(item)}
      />
    )
  }
  _keyExtractor = (item, index) => {
    return `${item.user_id || index}`
  }
  _goBack = () => {
    this.refress()
    navigation.pop()
  }
  _folowProject = async () => {
    if (this.state.id) {
      let token = await getItem('token')
      if (token) {
        FolowProject({
          project_id: this.state.id,
          table: 'UserProject',
        }).then(res => {
          
          if (res.data.code == Status.SUCCESS) {
            this.state.project.follow = Status.UNCHECKED
            this.setState({})
            Toast.show('Bạn đã theo dõi dự án ' + this.state.title + ' thành công')
          } else if (res.data.code == Status.TOKEN_EXPIRED ) {
            Toast.show('Phiên đăng nhập hết hạn')
            navigation.navigate(SigninScreen)
            removeItem('token')
            this.props.logout()
          } else if (res.data.code == Status.PROJECT_ID_NOT_FOUND) {
            Toast.show('Dự án không tồn tại')
          } else if (res.data.code == Status.USER_PERMISSION) {
            popup('Bạn phải mua gói để sử dụng tính năng này.', null, () => popupOk('Tính năng đang phát triển. Vui lòng quay lại sau.'))
            
          }else if(res.data.code == Status.TOKEN_VALID){
            popup(Messages.LOGIN_REQUIRE, null, () => navigation.navigate(SigninScreen))
          }
        }).catch(err => {
          Toast.show('Lỗi hệ thống' + ' ' + err.response.status)
          
        })
      } else {
        popup(Messages.LOGIN_REQUIRE, null, () => navigation.navigate(SigninScreen))

      }

    }
  }

  _UNfolowProject = async () => {
    if (this.state.id) {
      let token = await getItem('token')
      if (token) {
        popup('Bạn có muốn bỏ theo dõi dự án này không?', null, () => {
          unFolowProject({
            project_id: this.state.id,
            table: 'UserProject'
          }).then(res => {
  
            if (res.data.code == Status.SUCCESS) {
              Toast.show('Bạn đã bỏ theo dõi dự án ' + this.state.title + ' thành công')
              this.state.project.follow = Status.CHECKED
              this.setState({})
            } else if (res.data.code == Status.TOKEN_EXPIRED ) {
              Toast.show('Phiên đăng nhập hết hạn')
              navigation.navigate(SigninScreen)
              removeItem('token')
              this.props.logout()
            } else if (res.data.code == Status.ID_NOT_FOUND) {
              Toast.show('Dự án không tồn tại')
            }else if(res.data.code == Status.TOKEN_VALID){
              popup(Messages.LOGIN_REQUIRE, null, () => navigation.navigate(SigninScreen))
            }
          }).catch(err => {
            Toast.show('Lỗi hệ thống' + ' ' + err.response.status)
          })
        })
        
      } else {
        popup(Messages.LOGIN_REQUIRE, null, () => navigation.navigate(SigninScreen))

      }

    }
  }
  _refreshControl = () => {
    return <RefreshControl
      refreshing={this.state.loading}
      onRefresh={this._getData}
      colors={["#2166A2", 'white']}
      tintColor="#2166A2"
    />
  }
  render() {
    let { project, listPartner, folow } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Header
          check={1}
          onPress={this._goBack}
          title={this.showTitle()}
        />
        <ScrollView refreshControl={this._refreshControl()}>
          <View style={styles.container}>
            <Text style={styles.txtHeader}>{project.name}</Text>
            <View style={styles.dateFolow}>
              <View style={styles.buttonDate}>
                <Image
                  source={images.calender}
                  style={styles.imgCalenda}
                  resizeMode="contain"
                />
                <Text style={styles.time}>{moment(project.time, 'YYYY-MM-DD hh:mm:ss').format('hh:mm - DD/MM/YYYY')}</Text>
              </View>
              {project.follow && project.follow == Status.UNCHECKED ?
                <TouchableOpacity
                  style={styles.unFolow}
                  onPress={this._UNfolowProject}
                >
                  <Text style={[styles.txtButtonUnFolow, fontStyles.Acumin_RPro_0]}>Bỏ theo dõi</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.folow}
                  onPress={this._folowProject}
                >
                  <Text style={[styles.txtButton, fontStyles.Acumin_RPro_0]}>Theo dõi dự án</Text>
                </TouchableOpacity>
              }
            </View>
            <CustomText value={"Giá trị"} name={formatNumber(project.value) + " " + "đ"} />
            <CustomText value={"Giai đoạn"} name={project.phase} />
            <CustomText value={"Tình trạng"} name={project.status} />
            <CustomText value={"Khởi công"} name={moment(project.time_start, 'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')} />
            <CustomText value={"Hoàn công"} name={moment(project.time_start, 'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')} />
            <CustomText value={"Hạng công trình xanh"} name={project.field_area} />
            <CustomText value={"Địa điểm"} name={project.address} />
            <CustomText value={"Diện tích sàn"} name={project.floor_area + ' m2'} />
            <CustomText value={"Diện tích thực địa"} name={project.site_area} />
            <CustomText value={"Số tầng"} name={project.storeys} />
            <CustomText value={"Units"} name={project.unit} />
            <CustomText value={"Loại hình dự án"} name={project.type_project} />
            {/*  đang thiếu loại hình phụ */}
            <CustomText value={"Loại hình phụ"} name={project.dev_type} />
            <CustomText value={"Mã số dự án"} name={project.project_code} />
            <CustomText value={"Loại quyền sở hữu"} name={project.owner_type} />
            <CustomText value={"Diện tích thực địa"} name={project.site_area} />
            <CustomText value={"Loại đầu tư"} name={project.type_invest} />
            <CustomText value={"Mô tả dự án"} name={project.description} />
            <CustomText value={"Các đối tác liên hệ"} name={' '} />
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
  _getData = async () => {


    if (this.state.id) {
      
      console.log(this.state.id)
      let project = await getListProject(this.state.id).then(res => {


        return res.data.code == Status.SUCCESS ? res.data.data : []
      }).catch(err => {

        return []
      })
      console.log(project,'project')
      if (project) {
        this.setState({
          project,
          listPartner: project.partner,
          loading: false
        })
      } else {
        this.setState({ loading: false })
      }

    }


  }
  componentDidMount = () => {
    this._getData()
  };

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  time: {
    fontSize: 12,
    color: '#555555',
    padding: 5
  },
  imgCalenda: {
    height: 13,
    width: 13,
    alignSelf: 'center',
    tintColor: '#2166A2',
    marginRight: 2
  },
  txtButton: {
    color: '#FFFFFF',
    fontSize: 12,
    // fontFamily: fontStyles.Acumin_RPro_0
  },
  txtButtonUnFolow: {
    color: '#2166A2',
    fontSize: 12,
    // fontFamily: fontStyles.Acumin_RPro_0
  },
  txtHeader: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
  txtTicker: {
    fontSize: 12,
    color: '#999999',
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 9
  },
  Square: {
    flexDirection: 'row'
  },
  rowList: {
    flexDirection: 'row',
    marginBottom: 9
  },
  dateFolow: {
    flexDirection: 'row',
    marginVertical: 13,
  },
  buttonDate: {
    width: '47%',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 5,
    padding: 5,
    flexDirection: 'row',
  },
  folow: {
    marginLeft: 10,
    marginBottom: 5,
    padding: 5,
    width: '45%',
    backgroundColor: '#2166A2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0,
  },
  unFolow: {
    marginLeft: 10,
    marginBottom: 5,
    padding: 5,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#2166A2',
    borderWidth: 1,
  },
  image: {
    height: 8,
    width: 8,
    tintColor: 'gray',
    alignSelf: 'center',
    marginRight: 8,
  },
})
const mapDispatchToProps = (dispatch)=>{
  return{
    logout:()=>dispatch(logoutAction())
  }
}
export default connect(mapDispatchToProps)(DetailProject)