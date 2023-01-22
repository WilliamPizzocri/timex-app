import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../style'
import { Btn } from '../components/Btn'
import { auth } from '../firebase'
import { signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/core';

const HomePage = () => {

  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
        .then(() => {
            navigation.replace('Login');
        })
        .catch(error => {
            console.log(error.message);
        })
  }

  return (
    <View style={[styles.container, {width: '100%', flex: 1}]}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Btn text='Sign Out' textColor='black' btnColor='white' borderColor='black' press={handleSignOut}/>
    </View>
  )
}

export default HomePage