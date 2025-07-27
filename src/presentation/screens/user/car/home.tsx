import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import ImageCar from "./components/ImageCar";
import ActionCircle from "./components/ActionCircle";

export default function UserCarHome() {
  const router = useRouter();
  const [showCircles, setShowCircles] = useState(false);

  const carInfo = {
    make: "Nissan",
    model: "GT-R",
    year: 2023,
    licensePlate: "ABC-123",
  };

  const toggleCircles = () => setShowCircles((prev) => !prev);

  const maintenancePoints = [
    {
      name: "Sistema de frenos, llantas y luces",
      lastChange: "2024-12-01",
      nextChange: "2025-08-30",
      description:
        "Revisión y mantenimiento de componentes críticos de seguridad.",
    },
    {
      name: "Aceites, correa de distribución, filtros y refrigerante",
      lastChange: "2025-05-01",
      nextChange: "2025-07-28",
      description:
        "Mantenimiento preventivo para el buen funcionamiento del motor.",
    },
    {
      name: "Citas y revisiones programadas",
      lastChange: "2025-06-15",
      nextChange: "2025-08-01",
      description: "Calendario de citas importantes para tu vehículo.",
    },
    {
      name: "Arreglos estéticos y limpieza",
      lastChange: "2025-04-10",
      nextChange: "2025-08-15",
      description: "Detalles y limpieza para mantener tu carro impecable.",
    },
  ];

  const handleCirclePress = (index: number) => {
    const item = maintenancePoints[index];
    router.push({
      pathname: "/(user)/car/(screens)/CarScreens/ModalActionCircle",
      params: {
        name: item.name,
        lastChange: item.lastChange,
        nextChange: item.nextChange,
        description: item.description,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Tarjeta de información del vehículo */}
        <View style={styles.card}>
          <Text
            style={styles.carTitle}
          >{`${carInfo.make} ${carInfo.model}`}</Text>
          <Text
            style={styles.carSubtitle}
          >{`${carInfo.year} • ${carInfo.licensePlate}`}</Text>
        </View>

        <TouchableOpacity
          onPress={toggleCircles}
          activeOpacity={0.9}
          style={styles.imageWrapper}
        >
          <ImageCar />
          <ActionCircle visible={showCircles} onPress={handleCirclePress} />
        </TouchableOpacity>

        {/* Botones de acción */}
        <View style={styles.buttonsContainer}>
          {[
            { text: "Pagar Papeles del Carro", route: "Papers" },
            { text: "Mantenimiento del Vehículo", route: "Maintenancie" },
            { text: "Citas para el Vehículo", route: "Appointments" },
          ].map((btn, i) => (
            <TouchableOpacity
              key={i}
              style={styles.button}
              onPress={() =>
                router.push(`/(user)/car/(screens)/CarScreens/${btn.route}`)
              }
            >
              <Text style={styles.buttonText}>{btn.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F4F8", // fondo neutro
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 30 : 10,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  carTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937", // gris oscuro
    marginBottom: 6,
  },
  carSubtitle: {
    fontSize: 16,
    color: "#6B7280", // gris claro
    fontWeight: "500",
  },
  imageWrapper: {
    marginTop: 44,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    marginTop: 44,
    gap: 16,
  },
  button: {
    backgroundColor: "#2563EB", // azul moderno
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
