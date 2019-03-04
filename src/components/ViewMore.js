import React from 'react'
import { TouchableOpacity, Text, Image } from 'react-native'
import images from "assets/images"
import styles from "assets/styles" 
import { color } from 'config'
export default class ViewMore extends React.Component {
    render(){
        return (
            <TouchableOpacity 
                onPress={this.props.onPress || null}
                style={[styles.row, {alignItems: 'center'}]}>

                <Text style={{fontSize: 12, color: color}}>{this.props.title || 'Xem thêm'}</Text>
                <Image 
                    style={{width: 20, resizeMode: 'center', marginLeft: 5, marginRight: 5, }}
                    source={images.viewMore} />
            </TouchableOpacity>
        )
    }
}

