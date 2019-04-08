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
      visible={this.props.visible}
      transparent={true}
      animationType="fade"
      >
        <Text> textInComponent </Text>
      </Modal>
    );
  }
}
