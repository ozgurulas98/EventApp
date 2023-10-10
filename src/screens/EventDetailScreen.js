import React from "react";
import { View, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import DetailEventCard from "../components/DetailEventCard/DetailEventCard";
import DetailSlider from "../components/DetailSlider/DetailSlider";

const EventDetailScreen = ({ route }) => {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Swiper style={styles.swiper}>
        <DetailSlider event={event} />
      </Swiper>

      <View style={styles.detailEventCard}>
        <DetailEventCard event={event} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiper: {
    flex: 1.1,
  },
  detailEventCard: { flex: 3 },
});

export default EventDetailScreen;
