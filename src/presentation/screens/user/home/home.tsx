import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function UserHome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Botón Emergencia (arriba izquierda) */}
      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => router.push("/(user)/emergency")}
        accessibilityLabel="Emergencia"
        accessibilityHint="Abrir opciones de emergencia"
      >
        <Ionicons name="alert-circle" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Pantalla de inicio</Text>

      {/* Guías para aprender más */}
      <TouchableOpacity
        style={styles.longActionBtn}
        onPress={() => router.push("/(user)/home/(screens)/LearningCar")}
      >
        <Text style={styles.longActionBtnText}>
          Guías para{"\n"}aprender más{"\n"}de tu vehículo
        </Text>
      </TouchableOpacity>

      {/* Productos (puedes dejar el Button nativo si prefieres) */}
      <Button
        title="Ir a Productos"
        onPress={() => router.push("/(user)/home/(screens)/ViewProduct")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  /* Emergencia: esquina superior izquierda */
  emergencyButton: {
    position: "absolute",
    top: Platform.select({ ios: 50, android: 30 }), // deja espacio para status bar
    left: 16,
    backgroundColor: "red",
    borderRadius: 999,
    padding: 10,
    elevation: 5,
    zIndex: 20,
  },

  /* Botón grande multilínea */
  longActionBtn: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "#eee",
    alignSelf: "stretch",
    alignItems: "center",
  },
  longActionBtnText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
  },


});