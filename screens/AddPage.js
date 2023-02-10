import {
  View,
  Text,
  Button,
  Platform,
  TouchableOpacity,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { styles } from "../style";
import TextInputHeader from "../components/TextInputHeader";
import AddField from "../components/AddField";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from "@expo/vector-icons";
import { Btn } from "../components/Btn";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { writeUserTask } from '../functions/database';

const AddPage = () => {
  //form states
  const [jobName, setJobName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [description, setDescription] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [dateText, setDateText] = useState("");
  const [timeText, setTimeText] = useState("");

  //route api state
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const resetForm = () => {
    setJobName('');
    setAddress('');
    setPayment('');
    setDescription('');
    setData(new Date());
    setTime(new Date());
    setDateText('');
    setTimeText('');
    setSelectedItem(null);
    setData([]);
    setIsVisible(false);
  }

  const saveTask = async () => {
    if (
      jobName === "" ||
      selectedItem == null ||
      date == null ||
      time == null ||
      payment === '' ||
      description === ""
    ) {
      alert('Si è verificato un errore nell\'inserimento!');
      return;
    }

    const res = await writeUserTask(jobName, selectedItem, date, time, payment, description);

    console.log(res);

    if (res) {
      resetForm();
      alert('Task inserito correttamente!');
    } else {
      alert('Si è verificato un errore nell\'inserimento!');
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleAddressChange = async (text) => {
    setAddress(text);
    if (text.length > 2) {
      const url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${process.env.OPENROUTE_API_KEY}&text=${address}&size=5`;

      await fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data.features))
        .catch((error) => console.error(error));

      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleAddressSelection = (item) => {
    setAddress(item.properties.label);
    setSelectedItem(item);
    setIsVisible(false);
  };

  const handleDateConfirm = (date) => {
    const dt = new Date(date);
    setDate(dt);
    const tdt = dt.toISOString().split("T")[0].split("-");
    setDateText(tdt[2] + "/" + tdt[1] + "/" + tdt[0]);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTImePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (date) => {
    const dt = new Date(date);
    setTime(dt);
    const tdt = dt.toLocaleTimeString().split(":");
    setTimeText(tdt[0] + ":" + tdt[1]);
    hideTImePicker();
  };

  const handlePaymentChange = (text) => {
    const n = parseInt(text);
    n < 1 ? setPayment(1) : setPayment(n);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ alignSelf: "center", width: "100%" }}>
        <View
          style={[
            styles.svgContainer,
            {
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              position: "absolute",
              top: 0,
            },
          ]}
        >
          <Svg
            width="132"
            height="121"
            viewBox="0 0 132 121"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M70 80.7822C51.7739 103.762 23.6081 118.5 -8 118.5C-62.9523 118.5 -107.5 73.9523 -107.5 19C-107.5 -35.9523 -62.9523 -80.5 -8 -80.5C46.9523 -80.5 91.5 -35.9523 91.5 19C91.5 29.0877 89.9988 38.8248 87.2076 48H89.8185C92.5394 38.8079 94 29.0745 94 19C94 -37.333 48.333 -83 -8 -83C-64.333 -83 -110 -37.333 -110 19C-110 75.333 -64.333 121 -8 121C23.6321 121 51.9011 106.601 70.6102 84H70V80.7822Z"
              fill="#2D2D2D"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M79.1555 -42.3707C88.1244 -47.6716 99.4609 -48.6284 109.64 -43.9394C126.117 -36.3489 133.322 -16.8378 125.731 -0.360225C118.141 16.1174 98.6295 23.3217 82.1519 15.7312C65.6743 8.14064 58.47 -11.3704 66.0605 -27.848C67.5272 -31.0318 69.4389 -33.8695 71.6878 -36.321L69.311 -37.4159C67.1217 -34.9171 65.2507 -32.0651 63.7899 -28.894C55.6216 -11.1624 63.3743 9.83361 81.1059 18.0018C98.8376 26.1701 119.834 18.4174 128.002 0.685773C136.17 -17.0459 128.417 -38.0419 110.686 -46.2101C100.729 -50.7967 89.7432 -50.3634 80.5771 -45.9622L80.7692 -45.8737L79.1555 -42.3707Z"
              fill="#2D2D2D"
            />
          </Svg>
          <Svg
            width="105"
            height="92"
            viewBox="0 0 105 92"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M82.2461 -68.1195C95.7211 -59.8529 105.265 -45.5553 106.821 -28.6019C109.44 -0.0598084 88.4252 25.2014 59.8831 27.8206C31.341 30.4398 6.07973 9.42504 3.46056 -19.1171C0.841389 -47.6592 21.8561 -72.9205 50.3982 -75.5396C55.762 -76.0318 61.01 -75.6894 66.0135 -74.6192L65.7747 -77.2217C60.7604 -78.2188 55.5201 -78.5201 50.1698 -78.0292C20.2527 -75.2838 -1.77432 -48.8057 0.971018 -18.8886C3.71636 11.0284 30.1945 33.0555 60.1115 30.3101C90.0286 27.5648 112.056 1.08667 109.31 -28.8304C107.769 -45.6294 98.7441 -59.9407 85.8295 -68.7752L85.8592 -68.451L82.2461 -68.1195Z"
              fill="#2D2D2D"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M116.246 -44.1195C129.721 -35.8529 139.265 -21.5553 140.821 -4.60194C143.44 23.9402 122.425 49.2014 93.8831 51.8206C65.341 54.4398 40.0797 33.425 37.4606 4.8829C34.8414 -23.6592 55.8561 -48.9205 84.3982 -51.5396C89.762 -52.0318 95.01 -51.6894 100.014 -50.6192L99.7747 -53.2217C94.7604 -54.2188 89.5201 -54.5201 84.1698 -54.0292C54.2527 -51.2838 32.2257 -24.8057 34.971 5.11136C37.7164 35.0284 64.1945 57.0555 94.1115 54.3101C124.029 51.5648 146.056 25.0867 143.31 -4.8304C141.769 -21.6294 132.744 -35.9407 119.83 -44.7752L119.859 -44.451L116.246 -44.1195Z"
              fill="#2D2D2D"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M127.913 41.8373C126.598 27.5017 118.437 15.442 106.953 8.58972L110.658 8.24975L110.633 7.97685C121.507 15.4151 129.105 27.4647 130.403 41.6088C132.714 66.7979 114.168 89.0915 88.9794 91.4029C72.8867 92.8797 57.9758 85.8432 48.7024 74.0001H51.9361C60.7597 84.2613 74.2477 90.2443 88.751 88.9134C112.565 86.7281 130.099 65.6514 127.913 41.8373ZM41.6984 50.0001C41.6904 49.9171 41.6825 49.8341 41.6749 49.751C39.4896 25.9369 57.0232 4.86018 80.8373 2.67488C85.3557 2.26024 89.7755 2.55549 93.9865 3.46883L93.7476 0.865149C89.5258 0.0256595 85.1136 -0.228045 80.6088 0.185335C55.4198 2.49681 36.8739 24.7904 39.1853 49.9794C39.186 49.9863 39.1866 49.9932 39.1872 50.0001H41.6984Z"
              fill="#2D2D2D"
            />
          </Svg>
        </View>
        <FlatList
          style={styles.AddContainer}
          data={[
            {
              key: "Titolo della form",
              component: (
                <View>
                  <Text
                    style={{
                      fontFamily: "Roboto-Medium",
                      fontSize: 30,
                      color: "#696E75",
                      marginBottom: 13,
                    }}
                  >
                    Aggiungi richiesta
                  </Text>
                </View>
              ),
            },
            {
              key: "Sottotitolo della form",
              component: (
                <View>
                  <Text
                    style={{
                      fontFamily: "Roboto-Regular",
                      fontSize: 14,
                      color: "#696E75",
                    }}
                  >
                    Compila il form per pubblicare la tua{"\n"}richiesta!
                  </Text>
                </View>
              ),
            },
            {
              key: "Lavoro da svolgere",
              component: (
                <View>
                  <TextInputHeader text="Lavoro da svolgere" />
                  <AddField
                    placeholder="Inserisci il lavoro da svolgere"
                    keyboardType="default"
                    value={jobName}
                    onChangeText={(text) => setJobName(text)}
                  />
                </View>
              ),
            },
            {
              key: "Luogo del lavoro",
              component: (
                <View>
                  <TextInputHeader text="Luogo del lavoro" />
                  <AddField
                    placeholder="Inserisci l'indirizzo"
                    keyboardType="default"
                    value={address}
                    onChangeText={(text) => handleAddressChange(text)}
                  />
                  {(data.length > 0 && isVisible) && (
                    <FlatList
                      data={data}
                      renderItem={({ item, index }) => {
                        return (
                          <Pressable
                            onPress={() => handleAddressSelection(item)}
                          >
                            <Text style={styles.selectItem}>{item.properties.label}</Text>
                          </Pressable>
                        );
                      }}
                      keyExtractor={(item) => item.properties.id}
                    />
                  )}
                </View>
              ),
            },
            {
              key: "Data e ora",
              component: (
                <View>
                  <TextInputHeader text="Inserisci data e ora" />
                  <View style={styles.TimeDateContainer}>
                    <TouchableOpacity
                      style={[styles.TimeDataLabel, { marginRight: 2 }]}
                      onPress={showDatePicker}
                    >
                      <Text style={{ flex: 1 }}>{dateText}</Text>
                      <AntDesign name="calendar" size={20} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.TimeDataLabel, { marginLeft: 2 }]}
                      onPress={showTimePicker}
                    >
                      <Text style={{ flex: 1 }}>{timeText}</Text>
                      <AntDesign name="clockcircleo" size={20} color="black" />
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleDateConfirm}
                      onCancel={hideDatePicker}
                    />
                    <DateTimePickerModal
                      isVisible={isTimePickerVisible}
                      mode="time"
                      onConfirm={handleTimeConfirm}
                      onCancel={hideTImePicker}
                    />
                  </View>
                </View>
              ),
            },
            {
              key: "Offerta di pagamento",
              component: (
                <View>
                  <TextInputHeader text="Offerta di pagamento" />
                  <AddField
                    placeholder="Inserisci la tua offerta"
                    keyboardType="numeric"
                    value={payment}
                    onChangeText={(text) => handlePaymentChange(text)}
                  />
                </View>
              ),
            },
            {
              key: "Descrizione",
              component: (
                <View>
                  <TextInputHeader text="Descrizione" />
                  <AddField
                    placeholder="Inserisci una descrizione (opzionale)"
                    keyboardType="default"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                  />
                </View>
              ),
            },
            {
              key: "Bottone",
              component: (
                <View>
                  <Btn
                    text="Aggiungi"
                    textColor="white"
                    btnColor="black"
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      marginTop: 20,
                      marginBottom: 25,
                    }}
                    press={saveTask}
                  />
                </View>
              ),
            },
          ]}
          renderItem={({ item }) => (
            <View style={styles.listItem}>{item.component}</View>
          )}
          keyExtractor={(item) => item.key}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddPage;
