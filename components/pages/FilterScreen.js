import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useEventContext } from '../../EventContext';
import { useNavigation } from '@react-navigation/native';

import events from '../event_data.json'

var sehirler = events.map(function (etkinlik) {
  return etkinlik.Lokasyon ? etkinlik.Lokasyon : null;
}).filter(function (sehir) {
  return sehir !== null;
});

// Tekrar eden şehirleri kaldır
var cities = Array.from(new Set(sehirler));

var mekanlar = events.map(function (etkinlik) {
  return etkinlik.Mekan ? etkinlik.Mekan : null;
}).filter(function (mekan) {
  return mekan !== null;
});

// Tekrar eden şehirleri kaldır
var places = Array.from(new Set(mekanlar));

var turler = events.map(function (etkinlik) {
  return etkinlik.Tur ? etkinlik.Tur : null;
}).filter(function (tur) {
  return tur !== null;
});

// Tekrar eden şehirleri kaldır
var genres = Array.from(new Set(turler));

const FilterScreen = () => {
  const navigation = useNavigation();
  const {
    selectedCities,
    selectedPlaces,
    selectedGenres,
    handleCityToggle,
    handlePlaceToggle,
    handleGenreToggle,
  } = useEventContext();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>Şehirler</Text>
        {cities.map((city, index) => (
          <View key={index} style={styles.cityItem}>
            <Checkbox
              style={styles.checkbox}
              value={selectedCities.includes(city)}
              onValueChange={() => handleCityToggle(city)}
              color="#4630EB"
            />
            <Text style={styles.cityName}>{city}</Text>
          </View>
        ))}
        <Text style={styles.header}>Mekanlar</Text>
        {places.map((place, index) => (
          <View key={index} style={styles.cityItem}>
            <Checkbox
              style={styles.checkbox}
              value={selectedPlaces.includes(place)}
              onValueChange={() => handlePlaceToggle(place)}
              color="#4630EB"
            />
            <Text style={styles.cityName}>{place}</Text>
          </View>
        ))}
        <Text style={styles.header}>Türler</Text>
        {genres.map((genre, index) => (
          <View key={index} style={styles.cityItem}>
            <Checkbox
              style={styles.checkbox}
              value={selectedGenres.includes(genre)}
              onValueChange={() => handleGenreToggle(genre)}
              color="#4630EB"
            />
            <Text style={styles.cityName}>{genre}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.submitButtonText}>Filtrele</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    marginRight: 12,
  },
  cityName: {
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#4630EB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
