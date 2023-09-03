import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const EventDetailScreen = ({ route }) => {
  const { event } = route.params;

  if (!event.SliderPhotos || event.SliderPhotos.length === 0) {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=900",
          }}
          style={{ height: 250 }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Swiper>
        {event.SliderPhotos.map((photo, index) => (
          <View key={index}>
            <Image source={{ uri: photo }} style={{ height: 260 }} />
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  slideImage: {
    flex: 1,
    resizeMode: "contain",
  },
});

export default EventDetailScreen;
