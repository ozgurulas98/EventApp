import React from "react";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity, Share } from "react-native";
import styles from "./EventCard.style";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const EventCard = ({ event, onVenuePress }) => {
  const [liked, setLiked] = useState(false);
  const navigation = useNavigation();

  const handleEventPress = () => {
    // EventDetay sayfasına yönlendir
    navigation.navigate("EventDetail", { event }); // event'i Detay sayfasına iletiyoruz
  };

  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const shareEvent = async () => {
    try {
      await Share.share({
        message: `Check out this event: ${event.Adi} at ${event.Mekan}.`,
      });
    } catch (error) {
      console.error("Error sharing event:", error);
    }
  };

  const imageSource = event.KucukAfis
    ? { uri: event.KucukAfis }
    : {
        uri: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=900",
      };

  const startDate = moment(event.EtkinlikBaslamaTarihi).format(
    "ddd, MMM D · HH:mm A"
  );
  const endDate = moment(event.EtkinlikBitisTarihi).format("HH:mm A");

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleEventPress}>
        <Image style={styles.image} source={imageSource} />
      </TouchableOpacity>

      <View style={styles.inner_container}>
        <View style={styles.dateContainer}>
          <Text style={styles.startDate}>{startDate}</Text>
          <Text style={styles.space}>-</Text>
          <Text style={styles.endDate}>{endDate}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleEventPress}>
            <Text style={styles.eventName}>{event.Adi}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionsContainer}>
          <View style={styles.location_container}>
            <FontAwesome
              name="map-marker"
              size={20}
              color="#7c7c7c"
              style={styles.icon}
            />
            <Text style={styles.location}>{event.Lokasyon}</Text>
          </View>

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
        <View style={styles.place_container}>
          <FontAwesome
            name="map-o"
            size={15}
            color="#7c7c7c"
            style={styles.mapo_icon}
          />
          <TouchableOpacity onPress={() => onVenuePress(event.Mekan)}>
            <Text style={styles.placeText}>{event.Mekan}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EventCard;
