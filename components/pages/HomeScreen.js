import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import Slider from "../src/SliderCard/Slider";
import EventCard from "../src/EventCard/EventCard";
import event_data from "../event_data.json";
import moment from "moment";

const HomeScreen = () => {
  
  const [list, setlist] = useState(event_data);
  const [filteredlist, setfilteredlist] = useState(event_data);
  
  const renderEvent = ({ item }) => (
    <EventCard event={item} />
  );
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
});
export default HomeScreen;
