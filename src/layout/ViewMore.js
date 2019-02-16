import React from 'react'
import { TouchableOpacity, Text, Image } from 'react-native'
import styles from "public/css" 
import images from "public/images"
export default class ViewMore extends React.Component {
    render(){
        return (
            <TouchableOpacity 
                onPress={this.props.onPress || null}
                style={[styles.row, {alignContent: 'center', paddingTop: 5}]}>

                <Text style={{fontSize: 12, color: 'red'}}>{this.props.title || 'Xem thêm'}</Text>
                <Image 
                    style={{width: 20, height: 20, marginLeft: 5, marginRight: 5, }}
                    source={images.viewMore} />
            </TouchableOpacity>
        )
    }
}

