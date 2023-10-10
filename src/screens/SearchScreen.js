// SearchScreen.js
import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import SearchBar from "../components/SearchBar/SearchBar";
import EventCard from "../components/EventCard/EventCard";
import { useEventContext } from "../../EventContext";

const SearchScreen = ({ navigation }) => {
  const { filteredEvents, toggleShowPastEvents, showPastEvents, handleSearch, filterForPlaces, removeFilter } = useEventContext();

  const renderEvent = ({ item }) => (
    <EventCard event={item} onVenuePress={handleVenuePress} />
  );

  const handleVenuePress = (venueName) => {
    filterForPlaces(venueName);
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <View style={styles.header_container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FilterScreen")}
          style={styles.filter}
        >
          <Text style={styles.filterText}>Filtre</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleShowPastEvents}
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
        <TouchableOpacity
          onPress={removeFilter}
          style={styles.filter}
        >
          <Text style={styles.filterText}>Filtreleri Kaldır</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={(item) => item.Id.toString()}
        data={filteredEvents}
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  showPastEventsActiveButton: {
    backgroundColor: "#0dcdaa",
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  header_container: {
    flexDirection: "row",
    paddingBottom: 5,
  },
  filter: {
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    paddingHorizontal: 20,
  },
});

export default SearchScreen;
