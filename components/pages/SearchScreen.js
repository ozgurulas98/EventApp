// SearchScreen.js
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import SearchBar from "../src/SearchBar/SearchBar";
import event_data from "../event_data.json";
import EventCard from "../src/EventCard/EventCard";
import moment from "moment";


const SearchScreen = () => {
  const [list, setlist] = useState(event_data.filter(x => moment(x.EtkinlikBaslamaTarihi).isSameOrAfter(moment())));
  const [filteredlist, setfilteredlist] = useState(event_data);

  const renderEvent = ({ item }) => (
    <EventCard event={item} onVenuePress={handleVenuePress} />
  );

  useFocusEffect(
    React.useCallback(() => {
      setfilteredlist(list);
      
    }, [])
  );

  // useEffect(() => {
  //   setfilteredlist(list);
  
  // }, [list]);

  useEffect(() => {
    // Şu anki tarih ve saat
    const currentDate = moment();

    // Etkinlikleri güncel tarih ve saate göre filtrele
    const filteredEvents = event_data.filter((event) =>
      moment(event.EtkinlikBaslamaTarihi).isSameOrAfter(currentDate)
    );

    setfilteredlist(filteredEvents);
  
  }, []);

  const handleVenuePress = (venueName) => {
    const vanueFilteredlist = event_data.filter(
      (event) => event.Mekan === venueName && moment(event.EtkinlikBaslamaTarihi).isSameOrAfter(moment())
    );
    setfilteredlist(vanueFilteredlist);
  };

  const handleSearch = (text) => {
    const textFilteredList = event_data.filter((event) => {
      const searchedText = text.toLowerCase();
      const currentTitle = event.Adi.toLowerCase();

      return currentTitle.startsWith(searchedText);
    });
    setfilteredlist(textFilteredList);
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
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
    color: "#ffffff",
  },
});

export default SearchScreen;
