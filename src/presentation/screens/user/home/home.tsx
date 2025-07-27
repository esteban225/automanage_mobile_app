import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function UserHome() {
  const router = useRouter();
  const colorScheme = "light";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Botón Emergencia */}
      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => router.push("/(user)/emergency")}
        accessibilityLabel="Emergencia"
        accessibilityHint="Abrir opciones de emergencia"
        accessibilityRole="button"
      >
        <Ionicons name="alert-circle" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Encabezado */}
      <View style={styles.headerSection}>
        <Ionicons name="person-circle-outline" size={50} color="#666" />
        <Text style={styles.greetingText}>¡Hola de nuevo!</Text>
        <Text style={styles.mainTitle}>Tu portal de vehículo</Text>
      </View>

      {/* Acciones Principales */}
      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: Colors[colorScheme].tint }]}
          onPress={() => router.push("/(user)/home/(screens)/LearningCar")}
          accessible
          accessibilityLabel="Guías para aprender sobre tu vehículo"
        >
          <Ionicons name="book-outline" size={40} color="#fff" style={styles.cardIcon} />
          <Text style={styles.actionCardText}>Aprende sobre tu vehículo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: "#fff" }]}
          onPress={() => router.push("/(user)/home/(screens)/ViewProduct")}
          accessible
          accessibilityLabel="Explorar productos"
        >
          <Ionicons name="cart-outline" size={40} color={Colors[colorScheme].text} style={styles.cardIcon} />
          <Text style={[styles.actionCardText, { color: Colors[colorScheme].text }]}>Explorar Productos</Text>
        </TouchableOpacity>
      </View>


      {/* Recomendaciones */}
      <View style={styles.quickLinksSection}>
        <Text style={styles.sectionHeader}>📰 Recomendaciones</Text>

        <TouchableOpacity style={styles.quickLinkItem} onPress={() => console.log("Noticias del sector")}>
          <Ionicons name="newspaper-outline" size={20} color={Colors[colorScheme].text} />
          <Text style={styles.quickLinkText}>Últimas Noticias del Sector</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={Colors[colorScheme].text} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickLinkItem} onPress={() => console.log("Historial mantenimiento")}>
          <Ionicons name="build-outline" size={20} color={Colors[colorScheme].text} />
          <Text style={styles.quickLinkText}>Historial de Mantenimiento</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={Colors[colorScheme].text} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFAE0", // fondo suave
  },
  contentContainer: {
    padding: 20,
    paddingTop: Platform.select({ ios: 80, android: 60 }),
  },
  emergencyButton: {
    position: "absolute",
    top: Platform.select({ ios: 50, android: 30 }),
    right: 20,
    backgroundColor: "#dc3545", // se mantiene por ser alerta
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 20,
  },
  headerSection: {
    marginBottom: 30,
    alignItems: "center",
  },
  greetingText: {
    fontSize: 18,
    color: "#819067", // tono medio
    marginTop: 8,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0A400C",
    textAlign: "center",
    marginTop: 4,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 30,
    gap: 15,
  },
  actionCard: {
    width: "47%",
    aspectRatio: 1,
    borderRadius: 15,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#819067", // para resaltar con texto claro
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    marginBottom: 10,
  },
  actionCardText: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    color: "#FEFAE0", // texto claro sobre fondo verde
  },
  statusCard: {
    backgroundColor: "#B1AB86",
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A400C",
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  statusText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#333333", // buena visibilidad
  },
  quickLinksSection: {
    backgroundColor: "#B1AB86",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 30,
  },
  quickLinkItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#CFC9A5", // divisoria más acorde a paleta
    justifyContent: "space-between",
  },
  quickLinkText: {
    flex: 1,
    fontSize: 16,
    color: "#333333", // texto oscuro y legible
    marginLeft: 10,
  },
});
