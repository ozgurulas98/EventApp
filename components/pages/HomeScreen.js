import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import Slider from "../src/SliderCard/Slider";
import EventCard from "../src/EventCard/EventCard";
import event_data from "../event_data.json";
import moment from "moment";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

const HomeScreen = () => {
  const [list, setlist] = useState(event_data);
  const [filteredlist, setfilteredlist] = useState(event_data);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("2023/02/08");

  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );

  const renderEvent = ({ item }) => <EventCard event={item} />;

  const handleOnPress = () => {
    setOpen(!open);
  };

  const handleChange = (propDate) => {
    console.log(propDate);
    setDate(propDate);
  };

  useEffect(() => {
    // Şu anki tarih ve saat
    const currentDate = moment();

    // Etkinlikleri güncel tarih ve saate göre filtrele
    const filteredEvents = event_data.filter((event) =>
      moment(event.EtkinlikBaslamaTarihi).isSameOrAfter(currentDate)
    );

    setfilteredlist(filteredEvents);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOnPress} style={{ borderRadius: 5,
    width: 60,alignItems: "center"}}>
        <Text style={{fontSize:20, textDecorationLine:"underline"}}>Date</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={date}
              onDateChange={handleChange}
            />

            <TouchableOpacity onPress={handleOnPress}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        ListHeaderComponent={<Slider />}
        keyExtractor={(item) => item.Id.toString()}
        data={filteredlist}
        renderItem={renderEvent}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    color: "#FFFFFF",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
});
export default HomeScreen;
