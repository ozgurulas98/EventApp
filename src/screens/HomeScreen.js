import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import Slider from "../components/SliderCard/Slider";
import EventCard from "../components/EventCard/EventCard";
import event_data from "../event_data.json";
import moment from "moment";
import DatePicker from "react-native-modern-datepicker";

const HomeScreen = () => {
  const [filteredlist, setFilteredlist] = useState(event_data);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(moment().format("YYYY/MM/DD"));
  const [endDate, setEndDate] = useState(null);

  const renderEvent = ({ item }) => <EventCard event={item} onVenuePress={() => { }} />;

  const handleOnPress = () => {
    setOpen(!open);
  };

  const handleStartDateChange = (propDate) => {
    setStartDate(propDate);
    filterEventsByDateRange(moment(propDate, "YYYY/MM/DD"), moment(endDate, "YYYY/MM/DD"));
  };

  const handleEndDateChange = (propDate) => {
    setEndDate(propDate);
    filterEventsByDateRange(moment(startDate, "YYYY/MM/DD"), moment(propDate, "YYYY/MM/DD"));
  };

  const filterEventsByDateRange = (startDate, endDate) => {
    const filteredEvents = event_data.filter((event) => {
      const eventDate = moment(event.EtkinlikBaslamaTarihi, "YYYY/MM/DD");
      return eventDate.isSameOrAfter(startDate) && eventDate.isSameOrBefore(endDate);
    });
    setFilteredlist(filteredEvents);
  };

  useEffect(() => {
    // Şu anki tarih ve saat
    const currentDate = moment();
    // Etkinlikleri güncel tarih ve saate göre filtrele
    const filteredEvents = event_data.filter((event) =>
      moment(event.EtkinlikBitisTarihi, "YYYY/MM/DD").isSameOrAfter(currentDate)
    );
    setFilteredlist(filteredEvents);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleOnPress}
        style={{ borderRadius: 5, width: 60, alignItems: "center" }}
      >
        <Text style={{ fontSize: 17, textDecorationLine: "underline" }}>
          Date
        </Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              mode="calendar"
              minimumDate={moment().format("YYYY/MM/DD")}
              selected={startDate}
              onDateChange={handleStartDateChange}
            />

            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={endDate}
              onDateChange={handleEndDateChange}
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
