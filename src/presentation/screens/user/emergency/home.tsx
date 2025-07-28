import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/presentation/theme/ThemeContext'; // Importar el hook de tema

export default function Home() {
  const { theme } = useTheme(); // Usamos el tema actual

  const handleCallAssistance = () => {
    Alert.alert("Llamando a asistencia...", "Conectando con el centro de emergencias 🚨");
    // Aquí podrías integrar linking a teléfono o navegación
  };

  // Definir los estilos dentro del componente para acceder al objeto 'theme'
  const dynamicStyles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.background, // Usa el color de fondo del tema
      flexGrow: 1, // Asegura que el ScrollView ocupe todo el espacio disponible
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.text, // Usa el color de texto principal del tema
      marginBottom: 20,
      textAlign: "center",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 8,
      color: theme.text, // Usa el color de texto principal del tema
    },
    text: {
      fontSize: 14,
      color: theme.icon, // Usa el color de icono para un tono medio
      marginBottom: 20,
      lineHeight: 20,
    },
    button: {
      backgroundColor: theme.danger, // Usa el color de peligro del tema para el botón de emergencia
      padding: 12,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginBottom: 30,
      shadowColor: "#000", // Sombras fijas para consistencia
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonText: {
      color: theme.buttonText, // Usa el color de texto del botón del tema
      fontWeight: "600",
      fontSize: 16,
    },
    card: {
      backgroundColor: theme.card, // Usa el color de tarjeta del tema
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000", // Sombras fijas para consistencia
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
      color: theme.text, // Usa el color de texto principal del tema
    },
    cardSubtitle: {
      fontSize: 13,
      color: theme.icon, // Usa el color de icono para un tono medio
      marginTop: 4,
    },
  });

  return (
    <ScrollView contentContainerStyle={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>🚨 Emergencias Vehiculares</Text>

      <Text style={dynamicStyles.sectionTitle}>¿Qué hacer en caso de emergencia?</Text>
      <Text style={dynamicStyles.text}>
        1. Mantén la calma.{"\n"}
        2. Detén el vehículo en un lugar seguro.{"\n"}
        3. Enciende las luces de emergencia.{"\n"}
        4. Llama a asistencia si es necesario.
      </Text>

      <TouchableOpacity style={dynamicStyles.button} onPress={handleCallAssistance}>
        <Ionicons name="call" size={20} color={theme.buttonText} /> {/* Usa el color de texto del botón del tema */}
        <Text style={dynamicStyles.buttonText}>Llamar a asistencia</Text>
      </TouchableOpacity>

      <View style={dynamicStyles.card}>
        <Ionicons name="car-sport" size={30} color={theme.primary} /> {/* Usa el color primario del tema */}
        <View style={dynamicStyles.cardContent}>
          <Text style={dynamicStyles.cardTitle}>Estado del vehículo</Text>
          <Text style={dynamicStyles.cardSubtitle}>Revisa si hay códigos de error o alertas activas.</Text>
        </View>
      </View>

      <View style={dynamicStyles.card}>
        <Ionicons name="medkit" size={30} color={theme.primary} /> {/* Usa el color primario del tema */}
        <View style={dynamicStyles.cardContent}>
          <Text style={dynamicStyles.cardTitle}>Botiquín de primeros auxilios</Text>
          <Text style={dynamicStyles.cardSubtitle}>Verifica que tu botiquín esté completo y accesible.</Text>
        </View>
      </View>

      <View style={dynamicStyles.card}>
        <Ionicons name="flash" size={30} color={theme.primary} /> {/* Usa el color primario del tema */}
        <View style={dynamicStyles.cardContent}>
          <Text style={dynamicStyles.cardTitle}>Revisión de batería</Text>
          <Text style={dynamicStyles.cardSubtitle}>Si tu carro no enciende, podría ser la batería.</Text>
        </View>
      </View>
    </ScrollView>
  );
}
