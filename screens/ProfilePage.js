import { View, Text, RefreshControl, SafeAreaView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { getUserAvatar, getUserData } from "../functions/database";
import { auth } from '../firebase';
import { BurgerMenuBtn, Btn } from '../components/Btn';
import { styles } from "../style";
import { Pattern, Use, Circle, Defs, Svg, Mask, Path } from 'react-native-svg';
import AbilityCard from '../components/AbilityCard';
import { WINDOW_WIDTH } from '../constants';
import { WINDOW_HEIGHT } from '../constants';

const ProfilePage = () => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [userName, setUserName] = useState(null);
  const [refresh, setRefresh] = useState(false);

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

  useEffect(() => {
    async function loadData() {
      await refreshPage();
    }

    loadData();
  }, []);

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
      <SafeAreaView
        style={styles.homeContainer}
      >
        <BurgerMenuBtn color="white" />

        <View style={{position: 'relative'}}>
          <Svg width={WINDOW_WIDTH} height={WINDOW_HEIGHT} viewBox="0 0 390 622" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Mask id="path-1-inside-1_71_14" fill="white">
              <Path fill-rule="evenodd" clip-rule="evenodd" d="M291 96.5C291 107.139 289.278 117.376 286.098 126.948C284.97 130.343 287.403 134 290.981 134H340C367.614 134 390 156.386 390 184V648V683V728C390 730.761 387.761 733 385 733H340H50H5C2.23858 733 0 730.761 0 728V683V648V184C0 156.386 22.3858 134 50 134H98.0193C101.597 134 104.03 130.343 102.902 126.948C99.7217 117.376 98 107.139 98 96.5C98 43.2045 141.205 0 194.5 0C247.795 0 291 43.2045 291 96.5Z" />
            </Mask>
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M291 96.5C291 107.139 289.278 117.376 286.098 126.948C284.97 130.343 287.403 134 290.981 134H340C367.614 134 390 156.386 390 184V648V683V728C390 730.761 387.761 733 385 733H340H50H5C2.23858 733 0 730.761 0 728V683V648V184C0 156.386 22.3858 134 50 134H98.0193C101.597 134 104.03 130.343 102.902 126.948C99.7217 117.376 98 107.139 98 96.5C98 43.2045 141.205 0 194.5 0C247.795 0 291 43.2045 291 96.5Z" fill="white" />
            <Path d="M286.098 126.948L285.149 126.632L286.098 126.948ZM287.047 127.263C290.261 117.591 292 107.248 292 96.5H290C290 107.031 288.296 117.161 285.149 126.632L287.047 127.263ZM340 133H290.981V135H340V133ZM391 184C391 155.833 368.167 133 340 133V135C367.062 135 389 156.938 389 184H391ZM391 648V184H389V648H391ZM389 648V683H391V648H389ZM389 683V728H391V683H389ZM385 732H340V734H385V732ZM340 732H50V734H340V732ZM50 732H5V734H50V732ZM1 728V683H-1V728H1ZM1 683V648H-1V683H1ZM-1 184V648H1V184H-1ZM50 133C21.8335 133 -1 155.833 -1 184H1C1 156.938 22.9381 135 50 135V133ZM98.0193 133H50V135H98.0193V133ZM97 96.5C97 107.248 98.7394 117.591 101.953 127.263L103.851 126.632C100.704 117.161 99 107.031 99 96.5H97ZM194.5 -1C140.652 -1 97 42.6522 97 96.5H99C99 43.7568 141.757 1 194.5 1V-1ZM292 96.5C292 42.6522 248.348 -1 194.5 -1V1C247.243 1 290 43.7568 290 96.5H292ZM98.0193 135C102.337 135 105.175 130.619 103.851 126.632L101.953 127.263C102.884 130.067 100.857 133 98.0193 133V135ZM5 732C2.79086 732 1 730.209 1 728H-1C-1 731.314 1.68629 734 5 734V732ZM389 728C389 730.209 387.209 732 385 732V734C388.314 734 391 731.314 391 728H389ZM285.149 126.632C283.825 130.619 286.663 135 290.981 135V133C288.143 133 286.116 130.067 287.047 127.263L285.149 126.632Z" fill="#8D99AE" mask="url(#path-1-inside-1_71_14)" />
          </Svg>
          <Image source={{ uri: userAvatar }} style={{
            zIndex: 100,
            position: 'absolute',
            top: 0,
            width: 173,
            height: 173,
            alignSelf: 'center',
            top: 90
          }}/>

          <View style={styles.userWrapper}>
            <View style={styles.userHeader}>
              <View style={styles.userRank}>
                <AntDesign name="star" size={16} color="black" />
                <AntDesign name="star" size={16} color="black" />
                <AntDesign name="star" size={16} color="black" />
                <AntDesign name="star" size={16} color="black" />
                <AntDesign name="staro" size={16} color="black" />
              </View>
              <Ionicons name="settings-sharp" size={32} color="black" />
            </View>

            <Text style={{fontFamily: 'Roboto-Medium', fontSize: 30, alignSelf: 'center'}}>{userName}</Text>
            <Text style={{fontFamily: 'Roboto-Medium', fontSize: 16, alignSelf: 'center', textAlign: 'center', width: '85%', marginBottom: 25 }}>Sono un professore di matematica, offro ripetizioni, i miei hobby sono il giardinaggio e le auto, mi diletto anche in cucina</Text>

            <View style={{flex: 3, width: '86%', alignSelf: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <AbilityCard text="Pulizie" customStyle={{flex: 1}} />
                <AbilityCard text="Aggiusto Auto" customStyle={{flex: 2}}/>
              </View>
              <View style={{flexDirection: 'row'}}>
                <AbilityCard text="Ripetizioni di matematica" customStyle={{flex: 1}}/>
              </View>
              <View style={{flexDirection: 'row'}}>
                <AbilityCard text="Giardinaggio" customStyle={{flex: 2}}/>
                <AbilityCard text="Cucina" customStyle={{flex: 1}}/>
              </View>
            </View>

            <Btn style={{
              position: 'absolute',
              bottom: -130,
              width: '85%',
              alignSelf: 'center'
            }} text='Modifica Profilo' textColor='black' btnColor='#D9D9D9' borderColor='#D9D9D9' press={() => {}}/>
          </View>
        </View>

      </SafeAreaView>
    </ScrollView>
  )
}

export default ProfilePage