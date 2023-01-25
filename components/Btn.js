import { Text, TouchableOpacity, Image, View } from 'react-native'
import React from 'react'

export const Btn = ({text, textColor, btnColor, press, borderColor, style}) => {
  return (
    <TouchableOpacity onPress={press} style={[{
        backgroundColor: btnColor,
        marginHorizontal: 23,
        borderRadius: 7,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: borderColor,
        borderWidth: 1,
        marginVertical: 6,
    }, style]}>
        <Text style={{
            color: textColor,
            fontFamily: 'Roboto-Medium',
            fontSize: 18,
        }}>{text}</Text>
    </TouchableOpacity>
  )
}

export const LogoBtn = ({text, textColor, btnColor, press, borderColor}) => {
  return (
    <TouchableOpacity onPress={press} style={{
        position: 'relative',
        backgroundColor: btnColor,
        marginHorizontal: 23,
        borderRadius: 7,
        height: 48,
        borderColor: borderColor,
        borderWidth: 1,
        marginVertical: 5.5,
        flexDirection: 'row',
        alignItems: 'center',
    }}>
        <Image 
            style={{
                width: 31,
                height: 31,
                marginHorizontal: 10,
            }}
            source={require('../assets/GoogleLogo.png')}
        />
        <View style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
              color: textColor,
              fontFamily: 'Roboto-Medium',
              fontSize: 18,
              alignSelf: 'center',
          }}>{text}</Text>
        </View>
    </TouchableOpacity>
  )
}

export const BtnDivider = ({text}) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '88%',
      alignSelf: 'center',
      marginTop: 18,
      marginBottom: 12,
    }}>
      <View style={{
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        marginRight: 6,
      }}/>
      <Text style={{
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        lineHeight: 18,
        color: 'rgba(0, 0, 0, 0.5)',
      }}>{text}</Text>
      <View style={{
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        marginLeft: 6,
      }}/>
    </View>
  )
}