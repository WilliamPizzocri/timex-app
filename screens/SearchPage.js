import { View, Text, Dimensions, PanResponder, Animated, Button, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../style";
import { MAX_DOWNWORD_TRANSLATE_Y, MAX_UPWORD_TRANSLATE_Y } from "../constants";
import { queryNearTasks } from '../functions/database';
import MapScreen from "../components/MapScreen";

const SearchPage = () => {
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);
  const [nearestTasks, setNearestTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      const lat = parseFloat(await AsyncStorage.getItem("@geoLatitude"));
      const long = parseFloat(await AsyncStorage.getItem("@geoLongitude"));
      setLatitude(lat);
      setLongitude(long);
      const tasks = await queryNearTasks(lat, long, 40);
      setNearestTasks(tasks);
      setLoading(false);
    };
  
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <MapScreen tasks={nearestTasks} latitude={latitude} longitude={longitude} />
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.draggableArea} {...panResponder.panHandlers}>
          <View style={styles.dragHandle} />
        </View>
      </Animated.View>
    </View>
  );
};

export default SearchPage;
