import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { AntDesign, Feather  } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming } from 'react-native-reanimated';
import { styles } from '../style';
import { Btn, BtnDivider, LogoBtn } from '../components/Btn';
import Field from '../components/Field';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../constants';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase';

export default LandingPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [sigInBtn, setSignInBtn] = useState(true);
  const [emailColorState, setEmailColorState] = useState('rgba(0, 0, 0, 0.3)');
  const [passwordColorState, setPasswordColorState] = useState('rgba(0, 0, 0, 0.3)');
  const [nameColorState, setNameColorState] = useState('rgba(0, 0, 0, 0.3)');
  const [passwordVisibility, setPasswordVisibility] = useState('eye-off');
  const [showNameField, setShowNameField] = useState(false);
  const [showLogComponents, setShowLogComponents] = useState(false);
  const [logText, setLogText] = useState('Welcome\nBack');
  const imagePosition = useSharedValue(1);
  const navigation = useNavigation();

  const loginHandler = () => {
    setEmail('');
    setPassword('');
    setName('');
    setShowNameField(false);
    setSignInBtn(true);
    setLogText('Welcome\nBack');
    setShowLogComponents(true);
    imagePosition.value = 0;
  }

  const registerHandler = () => {
    setEmail('');
    setPassword('');
    setName('');
    setShowNameField(true);
    setSignInBtn(false);
    setLogText('Create\nAccount');
    setShowLogComponents(true);
    imagePosition.value = 0;
  }

  const backHandler = () => {
    setEmail('');
    setPassword('');
    setName('');
    setShowLogComponents(false);
    imagePosition.value = 1;
  }

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [0, WINDOW_HEIGHT])
    return {
      transform: [{translateY: withTiming(interpolation, {duration: 600})}]
    }
  })

  const handleMailChange = text => {
    setEmailColorState((text.length === 0) ? 'rgba(0, 0, 0, 0.3)' : '#000');
    setEmail(text);
  }

  const handlePasswordChange = text => {
    setPasswordColorState((text.length === 0) ? 'rgba(0, 0, 0, 0.3)' : '#000');
    setPassword(text);
  }

  const handleNameChange = text => {
    setNameColorState((text.length === 0) ? 'rgba(0, 0, 0, 0.3)' : '#000');
    setName(text);
  }

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      })
  }

  const handleLogIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Logged In with: ', user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, [])

  return (
    <Animated.View style={styles.loginBg}>
      <View style={styles.svgContainer}>
        <Svg width="175" height="140" viewBox="0 0 175 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Circle cx="95" cy="78" r="48.75" stroke="#2D2D2D" stroke-width="2.5"/>
            <Circle cx="35.5" cy="18.5" r="34.25" stroke="#2D2D2D" stroke-width="2.5"/>
            <Circle cx="183" cy="32" r="100.75" stroke="#2D2D2D" stroke-width="2.5"/>
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M175 73.1803C162.688 69.1648 149.588 67 136 67C85.7265 67 42.1182 96.6347 20.4902 140H23.2876C44.7062 98.0385 87.1837 69.5 136 69.5C149.598 69.5 162.704 71.7143 175 75.8163V73.1803Z" fill="#2D2D2D"/>
        </Svg>
      </View>
      {showLogComponents &&
        <TouchableOpacity onPress={backHandler} style={{
          padding: 10,
          marginTop: 30,
          marginLeft: 10,
        }}>
          <AntDesign name="left" size={22} color="white" />
        </TouchableOpacity>
      }
      {showLogComponents &&
        <Text style={{
          color: 'white',
          fontFamily: 'Roboto-Medium',
          fontSize: 34,
          marginTop: 70,
          marginLeft: 20,
        }}>{logText}</Text>
      }
      <SafeAreaView style={styles.landingTextCnt}>
        <Text style={{fontFamily: 'Roboto-Medium', fontSize: 36, color: 'white', marginHorizontal: 23, marginBottom: 10}}>Timex</Text>
        <Text style={{fontFamily: 'Roboto-Medium', fontSize: 18, color: 'white', opacity: 0.6, marginHorizontal: 23, marginBottom: 65}}>Timex allows you to optimize your time, so you can truly focus on your hobbies and passions.</Text>
        <Btn text='Log In' textColor='black' btnColor='white' press={loginHandler}/>
        <Btn text='Sign Up' textColor='white' btnColor='black' borderColor='white' press={registerHandler}/>
        <Animated.View style={[styles.formInputContainer, imageAnimatedStyle]}>
          {showNameField &&
            <View style={[styles.TextInput, {marginBottom: 27, borderBottomColor: nameColorState}]}>
              <AntDesign name="user" size={18} color={nameColorState} />
              <Field placeholder="Name" keyboardType="email-address" value={name} onChangeText={text => handleNameChange(text)} />
              <AntDesign name="check" size={18} color={'rgba(0, 0, 0, 0)'} />
            </View>
          }
          <View style={[styles.TextInput, {marginBottom: 27, borderBottomColor: emailColorState}]}>
            <AntDesign name="mail" size={18} color={emailColorState} />
            <Field placeholder="email" keyboardType="email-address" value={email} onChangeText={text => handleMailChange(text)} />
            <AntDesign name="checksquareo" size={18} color={emailColorState} />
          </View>
          <View style={[styles.TextInput, {borderBottomColor: passwordColorState}]}>
            <AntDesign name="lock" size={18} color={passwordColorState} />
            <Field placeholder="password" secureTextEntry={(passwordVisibility === 'eye-off') ? true : false} value={password} onChangeText={text => handlePasswordChange(text)} />
            <TouchableOpacity onPress={() => {
              setPasswordVisibility((passwordVisibility === 'eye-off') ? 'eye' : 'eye-off');
            }}>
              <Feather name={passwordVisibility} size={18} color={passwordColorState} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgetPwd}>
            <Text style={{textAlign: 'right', fontFamily: 'Roboto-Medium', fontSize: 14, marginBottom: 25}}>forget password ?</Text>
          </TouchableOpacity>
          <LogoBtn text='Log in with Google' textColor='black' btnColor='white' borderColor='black'/>
          {sigInBtn ?
            <Btn text='Log In' textColor='white' btnColor='black' press={handleLogIn}/>
            :  <Btn text='Sign Up' textColor='white' btnColor='black' press={handleSignUp}/>
          }
          <BtnDivider text="or"/>
          {sigInBtn ?
            <Btn text='Sign Up' textColor='black' btnColor='white' borderColor='black' press={registerHandler}/>
            :  <Btn text='Log In' textColor='black' btnColor='white' borderColor='black' press={loginHandler}/>
          }
        </Animated.View>
      </SafeAreaView>
    </Animated.View>
  )
}