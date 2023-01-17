import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { styles } from '../style';
import Btn from '../components/Btn';

export default LandingPage = () => {
  return (
    <View style={styles.loginBg}>
      <View style={styles.svgContainer}>
        <Svg width="175" height="140" viewBox="0 0 175 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Circle cx="95" cy="78" r="48.75" stroke="#2D2D2D" stroke-width="2.5"/>
            <Circle cx="35.5" cy="18.5" r="34.25" stroke="#2D2D2D" stroke-width="2.5"/>
            <Circle cx="183" cy="32" r="100.75" stroke="#2D2D2D" stroke-width="2.5"/>
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M175 73.1803C162.688 69.1648 149.588 67 136 67C85.7265 67 42.1182 96.6347 20.4902 140H23.2876C44.7062 98.0385 87.1837 69.5 136 69.5C149.598 69.5 162.704 71.7143 175 75.8163V73.1803Z" fill="#2D2D2D"/>
        </Svg>
      </View>
      <SafeAreaView style={styles.landingTextCnt}>
        <Text style={{fontFamily: 'Roboto-Medium', fontSize: 36, color: 'white', marginHorizontal: 23, marginBottom: 10}}>Timex</Text>
        <Text style={{fontFamily: 'Roboto-Medium', fontSize: 18, color: 'white', opacity: 0.6, marginHorizontal: 23, marginBottom: 65}}>Timex allows you to optimize your time, so you can truly focus on your hobbies and passions.</Text>
        <Btn text='Log In' textColor='black' btnColor='white'/>
        <Btn text='Sign Up' textColor='white' btnColor='black' borderColor='white'/>
      </SafeAreaView>
    </View>
  )
};