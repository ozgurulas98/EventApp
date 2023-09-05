import React from "react";
import { View, Text } from "react-native";
import styles from "./DetailEventCard.style";
import moment from "moment";
import MapView, { Marker } from "react-native-maps";

const DetailEventCard = ({ event }) => {
  const startDate = moment(event.EtkinlikBaslamaTarihi).format(
    "ddd, MMM D · HH:mm A"
  );
  const endDate = moment(event.EtkinlikBitisTarihi).format("HH:mm A");
  const latitude = event.Location.latitude; // Event nesnesinin içindeki latitude kullanılıyor
  const longitude = event.Location.longitude;
  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <Text style={styles.title_adi}>{event.Adi}</Text>
      </View>
      <View style={styles.inner_container}>
        <View style={styles.date_container}>
          <Text style={styles.startDate}>{startDate}</Text>
          <Text style={styles.space}>-</Text>
          <Text style={styles.endDate}>{endDate}</Text>
        </View>
      </View>
      <View style={styles.info_container}>
        <Text style={styles.descripTitle}>AÇIKLAMA</Text>
        <Text style={styles.infoTitle}>{event.KisaAciklama}</Text>
      </View>
      <View style={styles.map_container}>
         
      </View>
       {/* Harita eklemesi */}
       <MapView
        style={styles.map} // Harita stilini ayarlayın
        initialRegion={{
          // Başlangıç konumu (örneğin İzmir'e merkezlenmiş bir başlangıç konumu)
          latitude: latitude, // Event nesnesinin içindeki latitude kullanılıyor
          longitude: longitude, // Event nesnesinin içindeki longitude kullanılıyor
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Harita üzerine işaretçi eklemesi */}
        <Marker
          coordinate={{
            latitude: latitude, // Event nesnesinin içindeki latitude kullanılıyor
            longitude: longitude, // Event nesnesinin içindeki longitude kullanılıyor
          }}
          title={event.Mekan}
          description={event.EtkinlikMerkezi}
        />
      </MapView>
     
    </View>
  );
};

export default DetailEventCard;
