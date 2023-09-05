import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import DetailEventCard from "../src/DetailEventCard/DetailEventCard";
import DetailSlider from "../src/DetailSlider/DetailSlider";

const EventDetailScreen = ({ route }) => {
  const { event } = route.params;
  /*
  if (!event.SliderPhotos || event.SliderPhotos.length === 0) {
    return (
      <View style={styles.container}>
        <Swiper>
          <Image
            source={{
              uri: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=900",
            }}
            style={{ height: 250 }}
          />
        </Swiper>
        <View>
          <DetailEventCard event={event} />
        </View>
      </View>
    );
  }
*/

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
