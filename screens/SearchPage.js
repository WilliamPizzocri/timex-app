import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchPage = () => {
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);

  (async () => {
    const lat = parseFloat(await AsyncStorage.getItem("@geoLatitude"));
    const long = parseFloat(await AsyncStorage.getItem("@geoLongitude"));
    setLatitude(lat);
    setLongitude(long);
  })();

  return (
    <View>
      <MapView
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        }}
      />
    </View>
  );
};

export default SearchPage;
