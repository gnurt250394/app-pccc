import React, { Component } from 'react';
import { View, Text,Modal,Image } from 'react-native';

export default class CustomDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Modal
      
      >
        <Text> textInComponent </Text>
      </Modal>
    );
  }
}
