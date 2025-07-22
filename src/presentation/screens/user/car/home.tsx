import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import ImageCar from "./components/ImageCar"; // Asegúrate de que este componente exista
import ActionCircle from "./components/ActionCircle"; // Asegúrate de que este componente exista y esté actualizado

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
      {/* Imagen con botones circulares alrededor */}
      <View style={styles.imageWrapper}>
        <ActionCircle visible={showCircles} onPress={handleCirclePress} />
        <TouchableOpacity onPress={toggleCircles}>
          <ImageCar />
        </TouchableOpacity>
      </View>

      {/* Botones de navegación estilizados - Mantenidos según tu solicitud */}
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
    // Eliminamos 'justifyContent: "center"' globalmente para que el contenido fluya
    // pero mantenemos 'alignItems' para centrar horizontalmente los elementos.
    alignItems: 'center', // Centra los elementos hijos horizontalmente
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
    // Alinear la imagen y los círculos en el centro superior.
    // 'alignSelf: "center"' para centrar el wrapper en el contenedor flexible.
    alignSelf: "center",
    alignItems: "center", // Centra la imagen dentro del wrapper
    justifyContent: "center", // Asegura que ActionCircle se ancle al centro de ImageCar
    marginBottom: 20, // Espacio entre la imagen/círculos y los botones de abajo
    position: "relative", // clave para posicionar círculos sobre imagen
    width: 200, // Ajusta el tamaño de tu ImageCar si no tiene un tamaño intrínseco
    height: 200, // Ajusta el tamaño de tu ImageCar
  },
  button: {
    backgroundColor: "#135D66", // fondo de botón
    padding: 14,
    borderRadius: 8,
    marginVertical: 6,
    width: '100%', // Para que los botones ocupen el ancho completo del padding del contenedor
  },
  buttonText: {
    color: "#FFFFFF", // texto blanco
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});