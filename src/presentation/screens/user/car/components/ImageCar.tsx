import React from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";

// Imagen local
const car = require("@/assets/images/car.jpg"); // O usa ruta relativa si no te funciona el alias

const windowWidth = Dimensions.get("window").width;

export default function ImageCar() {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={car} // Imagen local cargada con require
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "#F0FDFB",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    width: windowWidth * 0.45,
    height: windowWidth * 0.45,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#CCEAE7",
  },
});
