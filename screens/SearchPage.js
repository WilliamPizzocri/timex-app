import {
  View,
  Text,
  Dimensions,
  PanResponder,
  Animated,
  Button,
  ActivityIndicator,
  Modal,
  Image,
  RefreshControl,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../style";
import { MAX_DOWNWORD_TRANSLATE_Y, MAX_UPWORD_TRANSLATE_Y } from "../constants";
import { queryNearTasks, acceptTask } from "../functions/database";
import MapScreen from "../components/MapScreen";
import SearchBar from "../components/SearchBar";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import TaskCard from "../components/TaskCard";
import { getDataString, getTimeString } from "../functions/utilitys";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Btn } from "../components/Btn";

const SearchPage = () => {
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);
  const [nearestTasks, setNearestTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);

  //task modal information
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [payment, setPayment] = useState("");
  const [taskId, setTaskId] = useState("");
  const [userId, setUserId] = useState("");

  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);

  const handleTaskPress = async (task) => {
    setLatitude(task.location.latitude);
    setLongitude(task.location.longitude);
    setTaskTitle(task.jobName);
    setDescription(task.description);
    setDate(getDataString(task.date));
    setTime(getTimeString(task.time));
    setLocation(task.address);
    setPayment(task.payment);
    setTaskId(task.id);
    setUserId(task.userId);
    setModalVisible(true);
  };

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

  const refreshPage = async () => {
    setLoading(true);
    setRefresh(true);
    const tasks = await queryNearTasks(latitude, longitude, 40);
    setNearestTasks(tasks);
    setRefresh(false);
    setLoading(false);
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

  const handleAcceptTask = () => {
    const ris = acceptTask(taskId, userId);

    if (ris) {
      alert("Il task è stato accettato correttamente!");
    } else {
      alert("Errore nell'accettare i task!");
    }
  };

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
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => refreshPage()}
            />
          }
        >
          {nearestTasks.map((item, index) => (
            <TaskCard
              key={index}
              task={item}
              onPress={() => handleTaskPress(item)}
            />
          ))}
        </ScrollView>
      </Animated.View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("Modale chiuso!");
        }}
      >
        <TouchableWithoutFeedback
          style={styles.modalContaiener}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Image
              source={require("../assets/task.png")}
              style={{ width: 270, height: 270 }}
            />
            <Text
              style={{
                fontFamily: "Roboto-Medium",
                fontSize: 26,
                marginBottom: 15,
              }}
            >
              {taskTitle}
            </Text>
            <Text
              style={{
                color: "#434343",
                fontFamily: "Roboto-Regular",
                fontSize: 18,
                marginBottom: 10,
              }}
            >
              {description}
            </Text>
            <Text>
              quando: {date} - {time}
            </Text>
            <Text>dove: {location}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>pagamento: {payment}</Text>
              <Image
                source={require("../assets/currencyCoin.png")}
                style={{ height: 17, width: 17, marginLeft: 3 }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Btn
                text="Annulla"
                style={{ flex: 1, marginHorizontal: 2, marginTop: 40 }}
                press={() => setModalVisible(false)}
              />
              <Btn
                text="Accetta"
                style={{ flex: 1, marginHorizontal: 2, marginTop: 40 }}
                press={() => handleAcceptTask()}
                btnColor="#1A73E8"
                textColor="white"
                borderColor="#1A73E8"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default SearchPage;
