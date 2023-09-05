// SearchScreen.js
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import SearchBar from "../src/SearchBar/SearchBar";
import event_data from "../event_data.json";
import EventCard from "../src/EventCard/EventCard";
import moment from "moment";

const SearchScreen = () => {
  const [list, setlist] = useState(
    event_data.filter((x) =>
      moment(x.EtkinlikBaslamaTarihi).isSameOrAfter(moment())
    )
  );
  const [filteredlist, setfilteredlist] = useState(event_data);
  const [showPastEvents, setShowPastEvents] = useState(false);

  const renderEvent = ({ item }) => (
    <EventCard event={item} onVenuePress={handleVenuePress} />
  );

  useFocusEffect(
    React.useCallback(() => {
      setfilteredlist(list);
    }, [])
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

  const handleShowPastEvents = () => {
    // "Geçmiş Etkinlikler" düğmesine tıklanınca bu işlev çalışır
    setShowPastEvents(!showPastEvents); // Geçmiş etkinlikleri göster veya gizle
    if (!showPastEvents) {
      // Eğer geçmiş etkinlikleri gösteriyorsak
      const pastEvents = event_data.filter((event) =>
        moment(event.EtkinlikBitisTarihi).isBefore(moment())
      );
      setfilteredlist(pastEvents); // Geçmiş etkinlikleri listeye ekle
    } else {
      // Geçmiş etkinlikleri gizliyorsak, filtrelenmemiş listeyi kullan
      setfilteredlist(list);
    }
  };

  const handleVenuePress = (venueName) => {
    const vanueFilteredlist = event_data.filter(
      (event) =>
        event.Mekan === venueName &&
        moment(event.EtkinlikBaslamaTarihi).isSameOrAfter(moment())
    );
    setfilteredlist(vanueFilteredlist);
  };

  const handleSearch = (text) => {
    const textFilteredList = event_data.filter((event) => {
      const searchedText = text.toLowerCase();
      const currentTitle = event.Adi.toLowerCase();

      return (
        currentTitle.startsWith(searchedText) &&
        moment(event.EtkinlikBaslamaTarihi).isSameOrAfter(moment())
      );
    });
    setfilteredlist(textFilteredList);
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <TouchableOpacity
        onPress={handleShowPastEvents}
        style={[
          styles.showPastEventsButton,
          showPastEvents && styles.showPastEventsActiveButton,
        ]}
      >
        <Text
          style={{
            color: showPastEvents ? "#ffffff" : "black",
        
          }}
        >
          Geçmiş Etkinlikler
        </Text>
      </TouchableOpacity>
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

  showPastEventsButton: {
    backgroundColor: "#e5e5e5",
    padding: 10,
    borderRadius:10,
    width:140

  },
  showPastEventsActiveButton: {
    backgroundColor: "#0dcdaa",
    borderRadius:10,
    width:140
  },
});

export default SearchScreen;
