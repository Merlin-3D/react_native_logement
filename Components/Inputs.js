import React, { Component } from 'react'
import { View,  StyleSheet } from 'react-native'
import { TextInput } from "react-native-paper";

export default class Inputs extends Component {
    render() {
        return (
          <View>
            <TextInput
              label={this.props.label}
              keyboardType={this.props.keyboard}
              onChangeText={this.props.onChangeText}
              placeholder={this.props.placeholder}
              style={styles.inputBox}
              mode='outlined'
            />
          </View>
        );
    }
}
const styles = StyleSheet.create({
    
    inputBox: {
        margin: 5,
        padding: 5,
        fontSize: 16,
        borderColor: '#d3d3d3',
        textAlign: 'center'
    },
 
})