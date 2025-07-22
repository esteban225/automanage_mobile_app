import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function ImageCar() {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: "https://via.placeholder.com/120" }} // Cambia esto por una imagen real más adelante
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "#E3FEF7", // Fondo claro
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
});
