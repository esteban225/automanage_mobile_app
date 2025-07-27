import React from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import { MotiView } from "moti";

const car = require("@/assets/images/car.png");

const windowWidth = Dimensions.get("window").width;

export default function ImageCar() {
  return (
    <View style={styles.imageWrapper}>
      <View style={styles.decorativeBackground} />
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "timing",
          duration: 600,
          delay: 300,
        }}
      >
        <Image
          source={car}
          style={styles.image}
          resizeMode="contain"
        />
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    position: "relative",
    
  },
  decorativeBackground: {
    position: "absolute",
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
    borderRadius: 100,
    transform: [{ rotate: "8deg" }],
    opacity: 0.4,
    zIndex: 0,
  },
  image: {
    width: windowWidth * 0.6,
    height: undefined,
    aspectRatio: 371 / 188,
    zIndex: -9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    
  },
});
