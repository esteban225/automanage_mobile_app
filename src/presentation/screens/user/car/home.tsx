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

  const handleCirclePress = (index: number) => {
    const maintenancePoints = [
      {
        name: "Sistema de frenos, llantas y luces",
        lastChange: "2024-12-01",
        nextChange: "2025-08-30",
        description: "Revisión y mantenimiento de componentes críticos de seguridad.",
      },
      {
        name: "Aceites, correa de distribución, filtros y refrigerante",
        lastChange: "2025-05-01",
        nextChange: "2025-07-28",
        description: "Mantenimiento preventivo para el buen funcionamiento del motor.",
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

    const item = maintenancePoints[index];

    router.push({
      pathname: "/(user)/car/(screens)/CarScreens/ModalActionCircle",
      params: {
        name: item.name,
        lastChange: item.lastChange,
        nextChange: item.nextChange,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Car Info Card */}
        <View style={styles.card}>
          <Text style={styles.carTitle}>{`${carInfo.make} ${carInfo.model}`}</Text>
          <Text style={styles.carSubtitle}>{`${carInfo.year} • ${carInfo.licensePlate}`}</Text>
        </View>

        {/* Image + Circles */}
        <View style={styles.imageWrapper}>
          <ActionCircle visible={showCircles} onPress={handleCirclePress} />
          <TouchableOpacity onPress={toggleCircles} activeOpacity={0.85}>
            <ImageCar />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          {[
            { text: "Pagar Papeles del Carro", route: "Papers" },
            { text: "Mantenimiento del Vehículo", route: "Maintenancie" },
            { text: "Citas para el Vehículo", route: "Appointments" },
            { text: "Arreglos Estéticos y Limpieza", route: "Detailing" },
          ].map((btn, i) => (
            <TouchableOpacity
              key={i}
              style={styles.button}
              onPress={() =>
                router.push(`../(user)/car/(screens)/CarScreens/${btn.route}`)
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
    backgroundColor: "#E3FDFD", // azul clarito
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 30 : 10,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  carTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#134E4A",
    marginBottom: 4,
  },
  carSubtitle: {
    fontSize: 16,
    color: "#3F8781",
    fontWeight: "500",
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 28,
  },
  buttonsContainer: {
    gap: 16,
  },
  button: {
    backgroundColor: "#135D66",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
