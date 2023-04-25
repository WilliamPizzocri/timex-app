import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';

const AbilityCard = ({text, customStyle}) => {
  return (
    <View style={[{
        position: 'relative',
        flexDirection: 'row',
        backgroundColor: '#D9D9D9',
        borderRadius: 5,
        alignItems: 'center',
        padding: 9,
        margin: 3,
        justifyContent: 'center'
    }, customStyle]}>
      <AntDesign style={{
        position: 'absolute',
        left: 10
      }} name="close" size={15} color="black" />
      <Text style={{
        fontSize: 16,
        fontFamily: 'Roboto-Medium'
      }}>{text}</Text>
    </View>
  )
}

export default AbilityCard