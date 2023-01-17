import { StyleSheet, Text, View } from 'react-native';
import LandingPage from './screens/LandingPage';
import { useFonts } from 'expo-font';
import { styles } from './style';

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require('./assets/fonts/Roboto-Medium.ttf'),
    "Roboto-Regualar": require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) return undefined;

  return (
    <View style={styles.container}>
      <LandingPage />
    </View>
  );
};