import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { styles } from './style';
import LandingPage from './screens/LandingPage';
import ForgetPassword from './screens/ForgetPassword';
import HomeRouter from './screens/HomeRouter';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      await AsyncStorage.setItem('@geoLatitude', location.coords.latitude.toString());
      await AsyncStorage.setItem('@geoLongitude', location.coords.longitude.toString());
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require('./assets/fonts/Roboto-Medium.ttf'),
    "Roboto-Regular": require('./assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Bold": require('./assets/fonts/Roboto-Bold.ttf'),
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