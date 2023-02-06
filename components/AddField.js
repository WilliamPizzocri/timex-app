import { Text, StyleSheet, View, TextInput } from 'react-native'
import React, { Component } from 'react'
import { styles } from '../style';

const AddField = props => {
    return (
        <TextInput {...props} style={styles.AddField} placeholderTextColor={'rgba(0, 0, 0, 0.3)'}>

        </TextInput>
    )
}

export default AddField;