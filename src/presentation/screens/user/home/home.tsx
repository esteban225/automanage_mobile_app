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
import { useTheme } from '@/src/presentation/theme/ThemeContext'; // Importar el hook de tema

export default function UserHome() {
  const router = useRouter();
  const { theme } = useTheme(); // Usamos el tema actual

  // Definir los estilos dentro del componente para acceder al objeto 'theme'
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background, // Usa el color de fondo del tema
    },
    contentContainer: {
      padding: 20,
      paddingTop: Platform.select({ ios: 80, android: 60 }),
    },
    emergencyButton: {
      position: "absolute",
      top: Platform.select({ ios: 50, android: 30 }),
      right: 20,
      backgroundColor: theme.danger, // Usa el color de peligro del tema
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
      color: theme.icon, // Usa el color de icono para un tono medio
      marginTop: 8,
    },
    mainTitle: {
      fontSize: 26,
      fontWeight: "bold",
      color: theme.text, // Usa el color de texto principal del tema
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
      backgroundColor: theme.primary, // Usa el color primario del tema
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    actionCardSecondary: { // Estilo para la segunda tarjeta de acción si es diferente
      width: "47%",
      aspectRatio: 1,
      borderRadius: 15,
      padding: 20,
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.card, // Usa el color de tarjeta del tema
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
      color: theme.buttonText, // Usa el color de texto del botón del tema
    },
    actionCardTextSecondary: { // Texto para la segunda tarjeta si el fondo es claro
      fontSize: 15,
      fontWeight: "600",
      textAlign: "center",
      color: theme.text, // Usa el color de texto principal del tema
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text, // Usa el color de texto principal del tema
      marginBottom: 12,
    },
    quickLinksSection: {
      backgroundColor: theme.card, // Usa el color de tarjeta del tema
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
      borderBottomColor: theme.border, // Usa el color de borde del tema
      justifyContent: "space-between",
    },
    quickLinkItemLast: { // Para el último item sin borde inferior
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 0,
      justifyContent: "space-between",
    },
    quickLinkText: {
      flex: 1,
      fontSize: 16,
      color: theme.text, // Usa el color de texto principal del tema
      marginLeft: 10,
    },
  });

  return (
    <ScrollView
      style={dynamicStyles.container}
      contentContainerStyle={dynamicStyles.contentContainer}
    >
      {/* Botón Emergencia */}
      <TouchableOpacity
        style={dynamicStyles.emergencyButton}
        onPress={() => router.push("/(user)/emergency")}
        accessibilityLabel="Emergencia"
        accessibilityHint="Abrir opciones de emergencia"
        accessibilityRole="button"
      >
        <Ionicons name="alert-circle" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Encabezado */}
      <View style={dynamicStyles.headerSection}>
        <Ionicons name="person-circle-outline" size={50} color={theme.icon} /> {/* Usa color de icono */}
        <Text style={dynamicStyles.greetingText}>¡Hola de nuevo!</Text>
        <Text style={dynamicStyles.mainTitle}>Tu portal de vehículo</Text>
      </View>

      {/* Acciones Principales */}
      <View style={dynamicStyles.actionsGrid}>
        <TouchableOpacity
          style={dynamicStyles.actionCard}
          onPress={() => router.push("/(user)/home/(screens)/LearningCar")}
          accessible
          accessibilityLabel="Guías para aprender sobre tu vehículo"
        >
          <Ionicons name="book-outline" size={40} color={theme.buttonText} style={dynamicStyles.cardIcon} />
          <Text style={dynamicStyles.actionCardText}>Aprende sobre tu vehículo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={dynamicStyles.actionCardSecondary} // Usar el nuevo estilo para la segunda tarjeta
          onPress={() => router.push("/(user)/home/(screens)/ViewProduct")}
          accessible
          accessibilityLabel="Explorar productos"
        >
          <Ionicons name="cart-outline" size={40} color={theme.text} style={dynamicStyles.cardIcon} />
          <Text style={dynamicStyles.actionCardTextSecondary}>Explorar Productos</Text>
        </TouchableOpacity>
      </View>

      {/* Recomendaciones */}
      <View style={dynamicStyles.quickLinksSection}>
        <Text style={dynamicStyles.sectionHeader}>📰 Recomendaciones</Text>

        <TouchableOpacity style={dynamicStyles.quickLinkItem} onPress={() => console.log("Noticias del sector")}>
          <Ionicons name="newspaper-outline" size={20} color={theme.icon} /> {/* Usa color de icono */}
          <Text style={dynamicStyles.quickLinkText}>Últimas Noticias del Sector</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={theme.icon} /> {/* Usa color de icono */}
        </TouchableOpacity>

        <TouchableOpacity style={dynamicStyles.quickLinkItemLast} onPress={() => console.log("Historial mantenimiento")}>
          <Ionicons name="build-outline" size={20} color={theme.icon} /> {/* Usa color de icono */}
          <Text style={dynamicStyles.quickLinkText}>Historial de Mantenimiento</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={theme.icon} /> {/* Usa color de icono */}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
