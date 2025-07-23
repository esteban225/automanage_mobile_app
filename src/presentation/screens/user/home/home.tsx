import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView, // Usar ScrollView para permitir desplazamiento si hay más contenido
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Para iconos de emergencia y otros
import Colors from "@/constants/Colors"; // Asumiendo que Colors define tus colores de tema

export default function UserHome() {
  const router = useRouter();
  // Asumimos un esquema de color 'light' por defecto si no hay un hook useColorScheme
  const colorScheme = 'light'; 

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Botón Emergencia (arriba derecha) - Posicionado en el header de la pantalla si se desea globalmente
          o dentro de la vista si es específico de esta pantalla. Aquí lo mantenemos en el layout de la pantalla. */}
      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => router.push("/(user)/emergency")} // Asegúrate de que la ruta sea correcta
        accessibilityLabel="Emergencia"
        accessibilityHint="Abrir opciones de emergencia"
      >
        <Ionicons name="alert-circle" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Saludo y Título Principal */}
      <View style={styles.headerSection}>
        <Text style={styles.greetingText}>¡Hola de nuevo!</Text>
        <Text style={styles.mainTitle}>Tu portal de vehículo</Text>
      </View>

      {/* Sección de Acciones Principales */}
      <View style={styles.actionsGrid}>
        {/* Guías para aprender más */}
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: Colors[colorScheme].tint }]} // Usar color del tema
          onPress={() => router.push("/(user)/home/(screens)/LearningCar")}
        >
          <Ionicons name="car-sport-outline" size={40} color="#fff" style={styles.cardIcon} />
          <Text style={styles.actionCardText}>
            Guías para{"\n"}aprender más{"\n"}de tu vehículo
          </Text>
        </TouchableOpacity>

        {/* Ir a Productos */}
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: Colors[colorScheme].background }]} // Otro color del tema o blanco
          onPress={() => router.push("/(user)/home/(screens)/ViewProduct")}
        >
          <Ionicons name="cart-outline" size={40} color={Colors[colorScheme].text} style={styles.cardIcon} />
          <Text style={[styles.actionCardText, { color: Colors[colorScheme].text }]}>
            Explorar{"\n"}Productos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sección de Enlaces Rápidos o Noticias (ejemplo) */}
      <View style={styles.quickLinksSection}>
        <Text style={styles.sectionHeader}>Novedades y Enlaces Rápidos</Text>
        <TouchableOpacity style={styles.quickLinkItem} onPress={() => console.log('Ver últimas noticias')}>
          <Ionicons name="newspaper-outline" size={20} color={Colors[colorScheme].text} />
          <Text style={styles.quickLinkText}>Últimas Noticias del Sector</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={Colors[colorScheme].text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickLinkItem} onPress={() => console.log('Ver historial de mantenimiento')}>
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
    backgroundColor: "#f8f8f8", // Fondo más suave
  },
  contentContainer: {
    padding: 20,
    paddingTop: Platform.select({ ios: 80, android: 60 }), // Ajuste para el botón de emergencia y el header
  },
  // Botón de emergencia - Posición absoluta para flotar
  emergencyButton: {
    position: "absolute",
    top: Platform.select({ ios: 50, android: 30 }), // Deja espacio para status bar
    right: 20, // Posicionado a la derecha
    backgroundColor: "#dc3545", // Rojo de emergencia
    borderRadius: 30, // Más redondeado
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
  // Sección del encabezado con saludo y título
  headerSection: {
    marginBottom: 30,
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  // Contenedor para las tarjetas de acción principales
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 30,
    gap: 15, // Espacio entre las tarjetas
  },
  // Estilo base para las tarjetas de acción
  actionCard: {
    width: '47%', // Casi la mitad del ancho para 2 columnas con espacio
    aspectRatio: 1, // Hace la tarjeta cuadrada
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-between', // Espacio entre icono y texto
    alignItems: 'center',
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
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff", // Texto blanco por defecto para fondo de color
  },
  // Sección de enlaces rápidos
  quickLinksSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  quickLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  quickLinkText: {
    flex: 1, // Permite que el texto ocupe el espacio restante
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
});
