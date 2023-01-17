import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Btn = ({text, textColor, btnColor, press, borderColor}) => {
  return (
    <TouchableOpacity onPress={press} style={{
        backgroundColor: btnColor,
        marginHorizontal: 23,
        borderRadius: 7,
        paddingVertical: 13,
        borderColor: borderColor,
        borderWidth: 1,
        marginVertical: 6,
    }}>
        <Text style={{
            color: textColor,
            fontFamily: 'Roboto-Medium',
            fontSize: 18,
            alignSelf: 'center',
        }}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Btn