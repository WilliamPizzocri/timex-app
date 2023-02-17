import {
  View,
  Text,
  Dimensions,
  PanResponder,
  Animated,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../style";
import { MAX_DOWNWORD_TRANSLATE_Y, MAX_UPWORD_TRANSLATE_Y } from "../constants";
import { queryNearTasks } from "../functions/database";
import MapScreen from "../components/MapScreen";
import SearchBar from "../components/SearchBar";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import TaskCard from "../components/TaskCard";

const SearchPage = () => {
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);
  const [nearestTasks, setNearestTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <MapScreen
        tasks={nearestTasks}
        latitude={latitude}
        longitude={longitude}
      />
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.draggableArea} {...panResponder.panHandlers}>
          <View style={styles.dragHandle} />
        </View>
        <View style={styles.SearchBarInput}>
          <EvilIcons
            name="search"
            size={24}
            color="#545454"
            style={{
              paddingHorizontal: 5,
            }}
          />
          <SearchBar
            placeholder="Cerca"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <FontAwesome
            name="filter"
            size={20}
            color="#545454"
            style={{
              paddingHorizontal: 5,
            }}
          />
        </View>
        <TaskCard task={nearestTasks[0]}/>
      </Animated.View>
    </View>
  );
};

export default SearchPage;
