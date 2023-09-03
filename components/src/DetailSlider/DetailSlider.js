// DetailSlider.js
import React, { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';

const DetailSlider = ({ slides }) => {
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
        {slides.map((slide, index) => (
          <View key={index} style={{ width: screenWidth, flex: 1 }}>
            {slide}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DetailSlider;
