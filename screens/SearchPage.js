import { View, Text, Dimensions, PanResponder, Animated } from "react-native";
import React, { useRef, useState } from "react";
import MapView from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../style";
import { MAX_DOWNWORD_TRANSLATE_Y, MAX_UPWORD_TRANSLATE_Y } from "../constants";
import { queryNearTasks } from '../functions/database';

const SearchPage = () => {
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        lastGestureDy.current += gesture.dy;
      },
    })
  ).current;

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWORD_TRANSLATE_Y, MAX_DOWNWORD_TRANSLATE_Y],
          outputRange: [MAX_UPWORD_TRANSLATE_Y, MAX_DOWNWORD_TRANSLATE_Y],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  (async () => {
    const lat = parseFloat(await AsyncStorage.getItem("@geoLatitude"));
    const long = parseFloat(await AsyncStorage.getItem("@geoLongitude"));
    setLatitude(lat);
    setLongitude(long);

    queryNearTasks(latitude, longitude, 100);
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
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
        }}
      />
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.draggableArea} {...panResponder.panHandlers}>
          <View style={styles.dragHandle} />
        </View>
      </Animated.View>
    </View>
  );
};

export default SearchPage;
