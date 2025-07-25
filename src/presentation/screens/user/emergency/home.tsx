import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tenerlo instalado

export default function Home() {
  const handleCallAssistance = () => {
    Alert.alert("Llamando a asistencia...", "Conectando con el centro de emergencias 🚨");
    // Aquí podrías integrar linking a teléfono o navegación
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚨 Emergencias Vehiculares</Text>

      <Text style={styles.sectionTitle}>¿Qué hacer en caso de emergencia?</Text>
      <Text style={styles.text}>
        1. Mantén la calma.{"\n"}
        2. Detén el vehículo en un lugar seguro.{"\n"}
        3. Enciende las luces de emergencia.{"\n"}
        4. Llama a asistencia si es necesario.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleCallAssistance}>
        <Ionicons name="call" size={20} color="#fff" />
        <Text style={styles.buttonText}>Llamar a asistencia</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Ionicons name="car-sport" size={30} color="#007AFF" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Estado del vehículo</Text>
          <Text style={styles.cardSubtitle}>Revisa si hay códigos de error o alertas activas.</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Ionicons name="medkit" size={30} color="#FF3B30" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Botiquín de primeros auxilios</Text>
          <Text style={styles.cardSubtitle}>Verifica que tu botiquín esté completo y accesible.</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Ionicons name="flash" size={30} color="#FFA500" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Revisión de batería</Text>
          <Text style={styles.cardSubtitle}>Si tu carro no enciende, podría ser la batería.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F8F9FB",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#34495E",
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    marginLeft: 15,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
});
