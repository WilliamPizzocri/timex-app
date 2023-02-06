import { View, Text } from 'react-native'
import React from 'react'

const TextInputHeader = ({text}) => {
  return (
    <Text style={{
        fontSize: 16,
        marginTop: 20,
    }}>{text}<Text style={{
        color: '#FF0000',
        fontSize: 16,
    }}>*</Text></Text>
  )
}

export default TextInputHeader