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
import { useTheme } from '@/src/presentation/theme/ThemeContext'; // Importar el hook de tema

export default function CarLearning() {
  const { theme } = useTheme(); // Usamos el tema actual

  // Definir los estilos dentro del componente para acceder al objeto 'theme'
  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: theme.background, // Usa el color de fondo del tema
      padding: 20,
      flexGrow: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.text, // Usa el color de texto principal del tema
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 15,
      color: theme.icon, // Usa el color de icono para un tono medio
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
      backgroundColor: theme.card, // Usa el color de tarjeta del tema
      padding: 12,
      borderRadius: 10,
      alignItems: "center",
      marginBottom: 10,
      shadowColor: "#000", // Sombras fijas para consistencia
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    infoText: {
      marginLeft: 10,
    },
    infoTitle: {
      fontWeight: "bold",
      fontSize: 14,
      color: theme.text, // Usa el color de texto principal del tema
    },
    infoDesc: {
      fontSize: 13,
      color: theme.icon, // Usa el color de icono para un tono medio
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginTop: 25,
      marginBottom: 10,
      color: theme.text, // Usa el color de texto principal del tema
    },
    lessonCard: {
      flexDirection: "row",
      backgroundColor: theme.card, // Usa el color de tarjeta del tema
      padding: 12,
      borderRadius: 10,
      alignItems: "center",
      marginBottom: 10,
      elevation: 2,
      shadowColor: "#000", // Sombras fijas para consistencia
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    lessonTitle: {
      fontWeight: "bold",
      fontSize: 15,
      color: theme.text, // Usa el color de texto principal del tema
    },
    lessonDesc: {
      fontSize: 13,
      color: theme.icon, // Usa el color de icono para un tono medio
    },
    progressBox: {
      marginBottom: 20,
    },
    progressLabel: {
      fontSize: 14,
      marginBottom: 6,
      color: theme.text, // Usa el color de texto principal del tema
    },
    progressBar: {
      height: 10,
      backgroundColor: theme.border, // Usa el color de borde del tema
      borderRadius: 8,
    },
    progressFill: {
      height: "100%",
      backgroundColor: theme.primary, // Usa el color primario del tema
      borderRadius: 8,
    },
    button: {
      backgroundColor: theme.primary, // Usa el color primario del tema
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 10,
      shadowColor: "#000", // Sombras fijas para consistencia
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonText: {
      color: theme.buttonText, // Usa el color de texto del botón del tema
      fontSize: 15,
      fontWeight: "600",
    },
  });

  return (
    <ScrollView contentContainerStyle={dynamicStyles.container}>
      {/* Encabezado */}
      <Text style={dynamicStyles.title}>🚗 Aprende sobre tu Vehículo</Text>
      <Text style={dynamicStyles.subtitle}>
        Información personalizada y consejos útiles según tu auto.
      </Text>

      {/* Imagen destacada */}
      <Image
        source={{ uri: "https://i.imgur.com/Wy7oOzy.jpeg" }}
        style={dynamicStyles.image}
        resizeMode="cover"
      />

      {/* Último mantenimiento */}
      <View style={dynamicStyles.infoBox}>
        <Ionicons name="build" size={24} color={theme.primary} /> {/* Usa el color primario del tema */}
        <View style={dynamicStyles.infoText}>
          <Text style={dynamicStyles.infoTitle}>Último mantenimiento:</Text>
          <Text style={dynamicStyles.infoDesc}>Cambio de aceite - hace 2 meses</Text>
        </View>
      </View>

      {/* Próximo cambio */}
      <View style={dynamicStyles.infoBox}>
        <Ionicons name="calendar" size={24} color={theme.primary} /> {/* Usa el color primario del tema */}
        <View style={dynamicStyles.infoText}>
          <Text style={dynamicStyles.infoTitle}>Próximo cambio recomendado:</Text>
          <Text style={dynamicStyles.infoDesc}>Revisión de frenos - en 1 mes</Text>
        </View>
      </View>

      {/* Sección educativa */}
      <Text style={dynamicStyles.sectionTitle}>📘 Secciones de aprendizaje</Text>

      {([
        {
          title: "Cómo funciona tu motor",
          desc: "Descubre cómo se genera la potencia y qué partes lo componen.",
          icon: "speedometer" as keyof typeof Ionicons.glyphMap,
        },
        {
          title: "Sistema de frenos",
          desc: "Aprende sobre discos, pastillas y cómo cuidarlos.",
          icon: "car-sport" as keyof typeof Ionicons.glyphMap,
        },
        {
          title: "Mantenimiento preventivo",
          desc: "Evita problemas antes de que ocurran.",
          icon: "construct" as keyof typeof Ionicons.glyphMap,
        },
        {
          title: "Luces del tablero",
          desc: "¿Qué significan? Aprende a identificarlas.",
          icon: "alert-circle" as keyof typeof Ionicons.glyphMap,
        },
      ]).map((item, index) => (
        <View key={index} style={dynamicStyles.lessonCard}>
          <Ionicons name={item.icon} size={26} color={theme.text} /> {/* Usa el color de texto principal del tema */}
          <View style={{ marginLeft: 12 }}>
            <Text style={dynamicStyles.lessonTitle}>{item.title}</Text>
            <Text style={dynamicStyles.lessonDesc}>{item.desc}</Text>
          </View>
        </View>
      ))}

      {/* Progreso */}
      <Text style={dynamicStyles.sectionTitle}>🎯 Tu progreso</Text>
      <View style={dynamicStyles.progressBox}>
        <Text style={dynamicStyles.progressLabel}>Completado: 60%</Text>
        <View style={dynamicStyles.progressBar}>
          <View style={[dynamicStyles.progressFill, { width: "60%" }]} />
        </View>
      </View>

      {/* Botón acción */}
      <TouchableOpacity style={dynamicStyles.button}>
        <Text style={dynamicStyles.buttonText}>Seguir aprendiendo</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
