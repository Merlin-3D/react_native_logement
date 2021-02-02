import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export function SplashScreen() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    left: 0,
    right: 0,
    top: 350,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});