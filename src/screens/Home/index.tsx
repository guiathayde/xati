import React from 'react';
import { Text, View } from 'react-native';

export const Home = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d2d2d2',
      }}
    >
      <Text
        style={{
          color: '#243443',
          fontFamily: 'Inter-Medium',
          fontSize: 64,
        }}
      >
        Home
      </Text>
    </View>
  );
};
