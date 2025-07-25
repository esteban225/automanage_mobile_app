import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CarLearning() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado */}
      <Text style={styles.title}>🚗 Aprende sobre tu Vehículo</Text>
      <Text style={styles.subtitle}>
        Información personalizada y consejos útiles según tu auto.
      </Text>

      {/* Imagen destacada */}
      <Image
        source={{ uri: "https://i.imgur.com/Wy7oOzy.jpeg" }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Último mantenimiento */}
      <View style={styles.infoBox}>
        <Ionicons name="build" size={24} color="#2980b9" />
        <View style={styles.infoText}>
          <Text style={styles.infoTitle}>Último mantenimiento:</Text>
          <Text style={styles.infoDesc}>Cambio de aceite - hace 2 meses</Text>
        </View>
      </View>

      {/* Próximo cambio */}
      <View style={styles.infoBox}>
        <Ionicons name="calendar" size={24} color="#27ae60" />
        <View style={styles.infoText}>
          <Text style={styles.infoTitle}>Próximo cambio recomendado:</Text>
          <Text style={styles.infoDesc}>Revisión de frenos - en 1 mes</Text>
        </View>
      </View>

      {/* Sección educativa */}
      <Text style={styles.sectionTitle}>📘 Secciones de aprendizaje</Text>

      {[
        {
          title: "Cómo funciona tu motor",
          desc: "Descubre cómo se genera la potencia y qué partes lo componen.",
          icon: "speedometer",
        },
        {
          title: "Sistema de frenos",
          desc: "Aprende sobre discos, pastillas y cómo cuidarlos.",
          icon: "car-sport",
        },
        {
          title: "Mantenimiento preventivo",
          desc: "Evita problemas antes de que ocurran.",
          icon: "construct",
        },
        {
          title: "Luces del tablero",
          desc: "¿Qué significan? Aprende a identificarlas.",
          icon: "alert-circle",
        },
      ].map((item, index) => (
        <View key={index} style={styles.lessonCard}>
          <Ionicons name={item.icon as any} size={26} color="#2c3e50" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.lessonTitle}>{item.title}</Text>
            <Text style={styles.lessonDesc}>{item.desc}</Text>
          </View>
        </View>
      ))}

      {/* Progreso */}
      <Text style={styles.sectionTitle}>🎯 Tu progreso</Text>
      <View style={styles.progressBox}>
        <Text style={styles.progressLabel}>Completado: 60%</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "60%" }]} />
        </View>
      </View>

      {/* Botón acción */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Seguir aprendiendo</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f6fa",
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#7f8c8d",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#ecf0f1",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
  },
  infoTitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#34495e",
  },
  infoDesc: {
    fontSize: 13,
    color: "#7f8c8d",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 10,
    color: "#2c3e50",
  },
  lessonCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    elevation: 2,
  },
  lessonTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#2c3e50",
  },
  lessonDesc: {
    fontSize: 13,
    color: "#7f8c8d",
  },
  progressBox: {
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 14,
    marginBottom: 6,
    color: "#34495e",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#dcdde1",
    borderRadius: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3498db",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#2980b9",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
