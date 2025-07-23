import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import ImageCar from "./components/ImageCar";
import ActionCircle from "./components/ActionCircle"; // nuevo componente

export default function UserCarHome() {
  const router = useRouter();
  const [showCircles, setShowCircles] = useState(false);

  const toggleCircles = () => {
    setShowCircles((prev) => !prev);
  };

  const handleCirclePress = (index: number) => {
    const routes = [
      "/(user)/car/(screens)/CarScreens/Papers",
      "/(user)/car/(screens)/CarScreens/Maintenancie",
      "/(user)/car/(screens)/CarScreens/Appointments",
      "/(user)/car/(screens)/CarScreens/Detailing",
    ];
    if (index >= 0 && index < routes.length) {
      router.push(routes[index] as any);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de carros</Text>

      {/* Imagen con botones circulares alrededor */}
      <View style={styles.imageWrapper}>
        <ActionCircle visible={showCircles} onPress={handleCirclePress} />
        <TouchableOpacity onPress={toggleCircles}>
          <ImageCar />
        </TouchableOpacity>
      </View>

      {/* Botones de navegación estilizados */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/(user)/car/(screens)/CarScreens/Papers")}>
        <Text style={styles.buttonText}>Pagar todos los papeles del carro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/(user)/car/(screens)/CarScreens/Maintenancie")}>
        <Text style={styles.buttonText}>Mantenimiento del vehículo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/(user)/car/(screens)/CarScreens/Appointments")}>
        <Text style={styles.buttonText}>Citas para el vehículo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/(user)/car/(screens)/CarScreens/Detailing")}>
        <Text style={styles.buttonText}>Arreglos estéticos para el vehículo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 20,
    backgroundColor: "#E3FEF7", // fondo claro
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "#003C43", // color oscuro del título
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative", // clave para posicionar círculos sobre imagen
  },
  button: {
    backgroundColor: "#135D66", // fondo de botón
    padding: 14,
    borderRadius: 8,
    marginVertical: 6,
  },
  buttonText: {
    color: "#FFFFFF", // texto blanco
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
