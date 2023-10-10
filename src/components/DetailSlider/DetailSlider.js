// DetailSlider.js
import React from "react";
import { View, Dimensions, Image } from "react-native";
import Swiper from "react-native-swiper";

const DetailSlider = ({ event }) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={{ flex: 1 }}>
      <Swiper autoplay showsButtons>
        {event.SliderPhotos.map((photo, index) => (
          <View
            key={index}
            style={{ width: screenWidth, flex: 1, height: 260 }}
          >
            <Image
              source={{ uri: photo }}
              style={{ width: screenWidth, height: 260, flex: 1 }}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default DetailSlider;
