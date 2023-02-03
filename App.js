import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { styles } from './style';
import LandingPage from './screens/LandingPage';
import ForgetPassword from './screens/ForgetPassword';
import HomeRouter from './screens/HomeRouter';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require('./assets/fonts/Roboto-Medium.ttf'),
    "Roboto-Regualar": require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) return undefined;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LandingPage} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeRouter} />
        <Stack.Screen options={{headerShown: false}} name="ForgetPassword" component={ForgetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};