import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import Field from '../components/Field';
import { styles } from '../style';
import { Btn } from '../components/Btn'
import { WINDOW_HEIGHT } from '../constants';
import { auth } from '../firebase';
import { handleResetPassword } from '../functions/authentication';

const ForgetPassword = () => {

  const [email, setEmail] = useState('');
  const [emailColorState, setEmailColorState] = useState('rgba(0, 0, 0, 0.3)');
  const navigation = useNavigation();
  const text = 'Forgot\nPassword?';

  const handleMailChange = text => {
    setEmailColorState((text.length === 0) ? 'rgba(0, 0, 0, 0.3)' : '#000');
    setEmail(text);
  }

  const backHandler = () => {
    if (navigation.canGoBack())
        navigation.goBack();
  }

  const mailHandler = () => {
    error = handleResetPassword(auth, email);
  }

  return (
    <View style={{
        height: WINDOW_HEIGHT,
    }}>
      <TouchableOpacity onPress={backHandler} style={{
          padding: 10,
          marginTop: 30,
          marginLeft: 10,
        }}>
        <AntDesign name="left" size={22} color="black" />
      </TouchableOpacity>
      <Text style={{
        color: 'rgba(0, 0, 0, 0.5)',
        textTransform: 'uppercase',
        letterSpacing: 2,
        padding: 10,
        marginLeft: 10,
      }}>Timex</Text>
      <Text style={{
        fontFamily: 'Roboto-Medium',
        fontSize: 30,
        padding: 10,
        marginLeft: 10,
      }}>{text}</Text>
      <View style={[styles.TextInput, {marginBottom: 27, marginTop: 90, borderBottomColor: emailColorState}]}>
        <AntDesign name="mail" size={18} color={emailColorState} />
        <Field placeholder="email" keyboardType="email-address" value={email} onChangeText={text => handleMailChange(text)} />
        <AntDesign name="checksquareo" size={18} color={emailColorState} />
      </View>
      <KeyboardAvoidingView behavior='position' style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingBottom: 10,
        }}>
        <Btn style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
        }} text='Send email' textColor='white' btnColor='black' press={mailHandler}/>
      </KeyboardAvoidingView>
    </View>
  )
}

export default ForgetPassword