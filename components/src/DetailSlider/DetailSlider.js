// DetailSlider.js
import React, { useState } from 'react';
import { View, ScrollView, Dimensions,Image } from 'react-native';

const DetailSlider = ({ event }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffset / screenWidth);
    setCurrentPage(pageIndex);
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      >
        {event.SliderPhotos.map((slide, index) => (
          <View key={index} style={{ width: screenWidth, flex: 1, height:260}}>
            <Image source={{ uri: slide }} style={{width: screenWidth, height: 260, flex:1}} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DetailSlider;
