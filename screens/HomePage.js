import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../style";
import { Btn } from "../components/Btn";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { Svg, Circle, Path } from "react-native-svg";
import { getUserAvatar, getUserData, countConfirmedTasks, getConfirmedTasks, countBookedTasks } from "../functions/database";
import { BurgerMenuBtn } from "../components/Btn";
import { AntDesign } from '@expo/vector-icons';
import TaskCard from "../components/TaskCard";

const HomePage = () => {
  const navigation = useNavigation();

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [userName, setUserName] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [confirmedCount, setConfirmedCount] = useState([]);
  const [bookedCount, setBookedCount] = useState ([]);

  useEffect(() => {
    async function fetchUserAvatar() {
      const avatarUrl = await getUserAvatar(auth.currentUser?.uid);
      const userData = await getUserData(auth.currentUser?.uid);
      setUserBalance(userData.balance);
      setUserName(userData.name);
      setUserAvatar(avatarUrl);
      const count = await countConfirmedTasks(); // gestione del valore null o undefined
      const countBooked = await countBookedTasks(); // gestione del valore null o undefined
      setConfirmedCount(count);
      setBookedCount (countBooked);
      setIsImageLoading(false);
    }
    fetchUserAvatar();
  }, []);

  const refreshPage = async () => {
    setIsImageLoading(true);
    setRefresh(true);
    const avatarUrl = await getUserAvatar(auth.currentUser?.uid);
    const userData = await getUserData(auth.currentUser?.uid);
    setUserBalance(userData.balance);
    setUserName(userData.name);
    setUserAvatar(avatarUrl);
    setIsImageLoading(false);
    setRefresh(false);
  }

  if (isImageLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'black',
        height: '100%',
      }}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => refreshPage()}
        />
      }
    >
      <View style={[styles.svgContainer, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <Svg width="175" height="140" viewBox="0 0 175 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Circle cx="95" cy="78" r="48.75" stroke="#2D2D2D" stroke-width="2.5" />
          <Circle cx="35.5" cy="18.5" r="34.25" stroke="#2D2D2D" stroke-width="2.5" />
          <Circle cx="183" cy="32" r="100.75" stroke="#2D2D2D" stroke-width="2.5" />
          <Path fill-rule="evenodd" clip-rule="evenodd" d="M175 73.1803C162.688 69.1648 149.588 67 136 67C85.7265 67 42.1182 96.6347 20.4902 140H23.2876C44.7062 98.0385 87.1837 69.5 136 69.5C149.598 69.5 162.704 71.7143 175 75.8163V73.1803Z" fill="#2D2D2D" />
        </Svg>
        <Image
          source={{ uri: userAvatar }}
          style={{
            width: 54,
            height: 54,
            position: 'absolute',
            top: 51,
            left: 68,
          }}
        />
      </View>
      <SafeAreaView
        style={styles.homeContainer}
      >
        <BurgerMenuBtn color="white" />
        <View style={{
          marginLeft: 34,
          marginTop: 80
        }}>
          <Text style={{
            fontFamily: 'Roboto-Medium',
            color: 'white',
            fontSize: 14,
            lineHeight: 14,
            marginBottom: 15
          }}>Bilancio</Text>
          <View style={{
            flexDirection: 'row',
          }}>
            <Image
              source={require('../assets/currency.png')}
              style={{
                width: 37,
                height: 37,
                opacity: 0.77
              }}
            />
            <Text style={{
              fontFamily: 'Roboto-Bold',
              color: 'white',
              fontSize: 36,
              opacity: 0.77,
              lineHeight: 39,
              marginLeft: 5,
            }}>{userBalance}</Text>
          </View>
          <Text style={{
            fontFamily: 'Roboto-Medium',
            color: 'white',
            fontSize: 14,
            opacity: 0.65,
            lineHeight: 14,
            marginTop: 15
          }}>{userName}</Text>
        </View>
        <View style={styles.homeCardContainer}>

          <ScrollView>
            <View style={styles.homeCardHeader}>
              <Text style={{ color: '#686868', opacity: 0.6, fontFamily: 'Roboto-Regular' }}>Prossimi lavori</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#686868', opacity: 0.6, fontFamily: 'Roboto-Regular', marginHorizontal: 5 }}>{confirmedCount.length}</Text>
                <AntDesign name="right" size={14} color="#686868" style={{ opacity: 0.6 }} />
              </View>
            </View>

            {confirmedCount.slice(0, 3).map((item, index) => (
                <TaskCard
                  key={index}
                  task={item}
                  onPress={() => {}}
                />
            ))}

            <View style={styles.homeCardHeader}>
              <Text style={{ color: '#686868', opacity: 0.6, fontFamily: 'Roboto-Regular' }}>Lavori prenotati</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#686868', opacity: 0.6, fontFamily: 'Roboto-Regular', marginHorizontal: 5 }}>{bookedCount.length}</Text>
                <AntDesign name="right" size={14} color="#686868" style={{ opacity: 0.6 }} />
              </View>
            </View>

            {bookedCount.slice(0, 3).map((item, index) => (
                <TaskCard
                  key={index}
                  task={item}
                  onPress={() => {}}
                />
            ))}

          </ScrollView>


        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomePage;
