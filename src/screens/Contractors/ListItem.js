import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import images from "assets/images"
import moment from 'moment';
import { fontStyle } from 'config/Controller';
import { fontStyles } from 'config/fontStyles';

const { width } = Dimensions.get('window')
class Item extends Component {
    render() {
        return this.props.name ? <View style={styles.Square}>
            <Image source={this.props.source}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={{ flexWrap: 'wrap', flexShink: 5 }}>
                <Text style={styles.txt} >
                    {this.props.name}</Text>
            </View>
        </View>
            : null
    }
}
export default class ListItem extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={styles.container}>
                {this.props.index == 0 ? null : <View style={styles.end} />}
                
                <View style={styles.containerList}>
                    {/* <Text style={styles.txtBold}>abc</Text> */}
                    <View style={styles.Square}>
                        <Image source={images.ProfileDark}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <View style={{ flexWrap: 'wrap', flexShink: 5 }}>
                            <Text style={[styles.txtName,fontStyles.Acumin_bold]} >{this.props.item.name} <Image style={styles.iconNotify} source={this.props.item.status == 1 ? images.dotYellow : null} />
                            </Text>
                        </View>
                    </View>
                    <Item source={images.proEmail} name={this.props.item.email} />
                    <Item source={images.proPhone} name={this.props.item.phone} />
                    <Item source={images.proLocation} name={this.props.item.fax} />
                    <Item source={images.proLocation} name={this.props.item.address} />
                    <Item source={images.proCompany} name={this.props.item.company} />
                    <Item source={images.proPosition} name={this.props.item.position} />
                </View>
                
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    containerList: {
        flex: 1,
        paddingLeft: 15,
        paddingTop: 10,
    },
    txtName: {
        fontSize: 16,
        // fontFamily: fontStyles.Acumin_bold,
        color: '#333131'
    },
    txtColor: {
        color: '#333131'
    },
    container: {
        flex: 1,
    },
    image: {
        height: 5,
        width: 5,
        tintColor: 'gray',
        marginRight: 8,
    },
    txtHeader: {
        fontWeight: '600',
        fontSize: 15,
        color: '#333333'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5
    }, Header: {
        marginBottom: 15
    },
    end: {
        height: 8,
        backgroundColor: '#CCCCCC',
        width
    },
    Square: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'flex-start'
    },
    image: {
        height: 10,
        width: 10,
        // tintColor:'gray',
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
    },
    txt: {
        color: '#333131',
        fontSize: 13,
        // textAlign:'center'
    },
    iconNotify: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
    },
})
