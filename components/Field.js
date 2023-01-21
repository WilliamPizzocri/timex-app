import { Text, StyleSheet, View, TextInput } from 'react-native'
import React, { Component } from 'react'
import { styles } from '../style';

const field = props => {
    return (
        <TextInput {...props} style={styles.field} placeholderTextColor={'rgba(0, 0, 0, 0.3)'}>

        </TextInput>
    )
}

export default field;