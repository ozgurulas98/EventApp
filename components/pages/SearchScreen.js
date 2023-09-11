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

const SearchScreen = ({ navigation }) => {
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
    let vanueFilteredlist;

    if (showPastEvents) {
      // Eğer "Geçmiş Etkinlikler" gösteriliyorsa, tüm etkinlikleri mekan adına göre filtrele
      vanueFilteredlist = event_data.filter(
        (event) => event.Mekan === venueName
      );
    } else {
      // "Geçmiş Etkinlikler" gösterilmiyorsa, sadece gelecekteki etkinlikleri mekan adına göre filtrele
      vanueFilteredlist = event_data.filter(
        (event) =>
          event.Mekan === venueName &&
          moment(event.EtkinlikBaslamaTarihi).isSameOrAfter(moment())
      );
    }

    setfilteredlist(vanueFilteredlist);
  };

  const handleSearch = (text) => {
    const textFilteredList = event_data.filter((event) => {
      const searchedText = text.toLowerCase();
      const currentTitle = event.Adi.toLowerCase();
      const isFutureEvent = moment(event.EtkinlikBaslamaTarihi).isSameOrAfter(
        moment()
      );
      const isPastEvent = moment(event.EtkinlikBitisTarihi).isBefore(moment());

      return (
        currentTitle.startsWith(searchedText) &&
        (showPastEvents ? isPastEvent : isFutureEvent)
      );
    });
    setfilteredlist(textFilteredList);
  };
  const handleGoToFilterScreen = () => {};

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <View style={styles.header_container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FilterScreen")}
          style={styles.filter}
        >
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>

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
      </View>

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
    borderRadius: 10,
    width: 140,
  },
  showPastEventsActiveButton: {
    backgroundColor: "#0dcdaa",
    padding: 10,
    borderRadius: 10,
    width: 140,
  },
  header_container: {
    flexDirection: "row",
    paddingBottom: 5,
  },
  filter: {
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
});

export default SearchScreen;
