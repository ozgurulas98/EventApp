import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, Share } from "react-native";
import styles from "./Slider.style";
import event_data from "../../event_data.json";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";

const Slider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const shareEvent = async () => {
   
    try {
      await Share.share({
        message: `Check out this event: ${slides[currentSlideIndex].Adi} at ${slides[currentSlideIndex].Mekan}.`,
      });
    } catch (error) {
      console.error("Error sharing event:", error);
    }
  };

  const defaultImageURL =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=900";

  const slides = event_data.map((event) => ({
    image: event.KucukAfis || defaultImageURL,
    text: event.Adi,
    etkinlikBaslamaTarihi: event.EtkinlikBaslamaTarihi,
    mekan: event.Mekan,
    lokasyon: event.Lokasyon

  }));

  const changeSlide = () => {
    setCurrentSlideIndex((currentSlideIndex + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(changeSlide, 5000); // 5 saniyede bir slayt değişimi
    return () => clearInterval(interval);
  }, [currentSlideIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.topTitle}>Popüler Etkinlikler</Text>
      <View style={styles.upper_container}></View>
      <View style={styles.slider_container}>
        <View>
          <Image
            style={styles.banner_image}
            source={{ uri: slides[currentSlideIndex].image }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.bottom_container}>
          <View style={styles.time_container}>
            <Text style={styles.startDate}>
              {moment(slides[currentSlideIndex].etkinlikBaslamaTarihi).format(
                "ddd, MMM D · HH:mm A"
              )}
            </Text>
          </View>

          <Text style={styles.nameTitle}>{slides[currentSlideIndex].text}</Text>
          <Text style={styles.lokasyonTitle}>{slides[currentSlideIndex].mekan} - {slides[currentSlideIndex].lokasyon}</Text>
          <View style={styles.iconContainer}>
            <FontAwesome
              name={liked ? "heart" : "heart-o"}
              size={20}
              color={liked ? "red" : "#7c7c7c"}
              onPress={toggleLike}
              style={styles.icon}
            />
            <FontAwesome
              name="share-alt"
              size={20}
              color="#7c7c7c"
              onPress={shareEvent}
              style={styles.icon}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Slider;
