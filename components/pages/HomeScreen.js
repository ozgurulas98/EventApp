import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import Slider from "../src/SliderCard/Slider";
import EventCard from "../src/EventCard/EventCard";
import event_data from "../event_data.json";

const HomeScreen = () => {
  /*
  const [list, setlist] = useState(event_data);
  const [filteredlist, setfilteredlist] = useState(event_data);
  */
  const renderEvent = ({ item }) => (
    <EventCard event={item} /*onVenuePress={handleVenuePress} */ />
  );
  /*
  useFocusEffect(
    React.useCallback(() => {
      setfilteredlist(list);
    }, [])
  );

  const handleVenuePress = (venueName) => {
    const vanueFilteredlist = event_data.filter(
      (event) => event.Mekan === venueName
    );
    setfilteredlist(vanueFilteredlist);
  }; */
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Slider />}
        keyExtractor={(item) => item.Id.toString()}
        data={event_data}
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
