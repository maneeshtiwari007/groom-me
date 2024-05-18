import React, { Component } from "react";
import { string,any } from 'prop-types';
import { Image } from "expo-image";

export default class ImageComponent extends Component<{style?:any,src?:any,blurhash?:any,isHash?:boolean},{}> {
    static propTypes = {
        src:any,
        title:string,
        type:string,
        style:any
    }
    static defaultProps = {
        title:'Image',
        type:'avatar',
        blurhash:'LbQSl1x]_NjZS~xayXM{+^tRIURj',
        isHash:true
    }
    constructor(props){
        super(props);
    }
    render (){
        return (
            <Image transition={1000} placeholder={this.props?.blurhash} style={this.props?.style} source={this.props.src} cachePolicy="memory"/>
        );
    }
}