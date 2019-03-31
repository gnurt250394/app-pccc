import React, { Component } from 'react';
import { View, Text } from 'react-native';

export const TextBold =(props)=> {
  

    return (
        <Text 
            style={[{

            },props.style]}
        >
            {props.value}
        </Text>
    );
}



export const TextItalic =(props)=> {
    return (
        <Text 
            style={[{

            },props.style]}
        >
            {props.value}
        </Text>
    );
}


