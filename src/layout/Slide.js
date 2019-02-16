import React from 'react'
import {  Dimensions } from 'react-native'
import FastImage  from 'react-native-fast-image'
import Swiper from 'react-native-swiper'
let {height} = Dimensions.get('window')
const listImages = [{image:'https://i.imgur.com/FxBPgGV.jpg',id:1},
    {image:'https://c1.staticflickr.com/2/1847/44150042641_985d8586b0_b.jpg',id:2},
    {image:'https://s3.anhdep24.net/images/2018/04/13/83584059240aa42353c_afebb6b58f984022a134a3fd49e11fac.jpg',id:3},
    {image:'http://cms.sao360.vn/Uploads/tranquyen/06-03-2018/06032018-055046-043-1.jpg',id:4}]
export default class Slide extends React.Component {
    mapImage=()=>{
        var list = this.props.listImages ? this.props.listImages : listImages
        return(
            list.map((data)=>{
                return(
                    <FastImage key={data.id} source={{uri:data.image}}
                        style={{height:'100%',width:'100%'}}
                    />
                )
            })
        )
      
    }

    render(){
        return (
             <Swiper 
                autoplay={true}
                showsButtons={false}
                height={height/3}>
                    {this.mapImage()}
            </Swiper>
        )
    }
}