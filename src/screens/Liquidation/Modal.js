import React, { Component } from 'react'
import { Text, View ,ScrollView} from 'react-native'
import CustomDialog from 'components/CustomDialog';
import DropDown from 'components/Dropdown';

export default class Modal extends Component {
    state={
        visible:this.props.visible,
        data:[{id:1,name:'abc'}]
    }
    componentWillReceiveProps(props){
        if(props.visible && props.visible != "") this.setState({visible: props.visible})
    }
  render() {
    return (
        <ScrollView
        keyboardShouldPersistTaps="handled"
        >
        <CustomDialog

        visible={this.state.visible}
        onClose={()=>this.setState({visible:false})}
        title={"địa chỉ mua"}
        >
        <DropDown
        ref={val =>this.city = val}
        placeholder={"Chọn tỉnh/Thành phố"}
        value={'aaa'}
        onItemSelect={(item)=>console.log(item,'item')}
        data={this.state.data}
        />
        <DropDown
        ref={val =>this.district = val}
        placeholder={"Chọn quận/huyện"}
        value={'aaa'}
        onItemSelect={(item)=>console.log(item,'item')}
        data={this.state.data}
        />
        </CustomDialog>
        </ScrollView>
    )
  }
}
