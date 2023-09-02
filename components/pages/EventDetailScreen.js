// EventDetailScreen.js
import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EventDetailScreen = ({ route }) => {
  const { event } = route.params;

  return (
    <SafeAreaView>
      <Text>{event.Adi}</Text>
     
    </SafeAreaView>
  );
};

export default EventDetailScreen;