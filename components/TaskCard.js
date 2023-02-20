import { View, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { getUserAvatar } from "../functions/database";
import { getDataString } from "../functions/utilitys";
import { styles } from "../style";

const TaskCard = ({ task, onPress }) => {
  const [avatarUri, setAvatarUri] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAvatar() {
      const uri = await getUserAvatar(task.uid);
      setAvatarUri(uri);
      console.log(uri);
      setLoading(false);
    }
    fetchAvatar();
  }, [task.uid]);

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.cardRow}>
        {loading ? (
          <ActivityIndicator size="small" color="#999999" />
        ) : (
          <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
        )}
        <View style={styles.cardText}>
          <Text style={{ fontFamily: "Roboto-Medium", fontSize: 16 }}>
            {task.jobName}
          </Text>
          <Text style={{ fontFamily: "Roboto-Regular", fontSize: 14 }}>
            {task.description}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.cardRow,
          {
            marginTop: 7,
          },
        ]}
      >
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            color: "#434343",
            fontSize: 14,
          }}
        >
          {getDataString(task.date)}
        </Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              color: "#434343",
              fontSize: 14,
            }}
          >
            {task.payment}
          </Text>
          <Image
            source={require("../assets/currencyCoin.png")}
            style={{ height: 17, width: 17, marginLeft: 3 }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;
