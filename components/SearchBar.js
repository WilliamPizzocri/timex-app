import { Text, StyleSheet, View, TextInput } from 'react-native'
import React, { Component } from 'react'
import { styles } from '../style';

const SearchBar = props => {
    return (
        <TextInput {...props} style={styles.searchBar} placeholderTextColor={'#545454'}>

        </TextInput>
    )
}

export default SearchBar