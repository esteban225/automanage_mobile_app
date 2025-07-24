import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Para los iconos, asumiendo que usas Expo o tienes @expo/vector-icons instalado.
import { router } from "expo-router";
import { useAuth } from "@/src/presentation/providers/AuthProvider";

export default function Settings() {
  // Estados para los toggles de configuración
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false); // Podrías integrar esto con useColorScheme si lo tuvieras
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

  const { logout } = useAuth(); // ✅ Importante: obtenemos logout del contexto

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar tu sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí, Cerrar Sesión",
          onPress: async () => {
            try {
              await logout(); // ✅ usamos la función del contexto
              router.replace("/(tabs)"); // Redirige a la pantalla de login
            } catch (error) {
              Alert.alert("Error", "No se pudo cerrar la sesión.");
              console.error("Error al cerrar sesión:", error);
            }
          },
        },
      ]
    );
  };

  // Función genérica para manejar la navegación a otras secciones (ej. usando Expo Router o React Navigation)
  const navigateTo = (screenName) => {
    console.log(`Navegar a: ${screenName}`);
    // Aquí usarías router.push(screenName) si usas Expo Router,
    // o navigation.navigate(screenName) si usas React Navigation.
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigateTo("profile-edit")}
        >
          <View style={styles.optionContent}>
            <Ionicons name="person-outline" size={24} color="#555" />
            <Text style={styles.optionText}>Editar Perfil</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigateTo("change-password")}
        >
          <View style={styles.optionContent}>
            <Ionicons name="lock-closed-outline" size={24} color="#555" />
            <Text style={styles.optionText}>Cambiar Contraseña</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigateTo("privacy-settings")}
        >
          <View style={styles.optionContent}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#555" />
            <Text style={styles.optionText}>Privacidad</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencias</Text>
        <View style={styles.option}>
          <View style={styles.optionContent}>
            <Ionicons name="notifications-outline" size={24} color="#555" />
            <Text style={styles.optionText}>Notificaciones</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setNotificationsEnabled}
            value={notificationsEnabled}
          />
        </View>
        <View style={styles.option}>
          <View style={styles.optionContent}>
            <Ionicons name="moon-outline" size={24} color="#555" />
            <Text style={styles.optionText}>Modo Oscuro</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={darkModeEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setDarkModeEnabled}
            value={darkModeEnabled}
          />
        </View>
        <View style={styles.option}>
          <View style={styles.optionContent}>
            <Ionicons name="location-outline" size={24} color="#555" />
            <Text style={styles.optionText}>Servicios de Ubicación</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={locationServicesEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setLocationServicesEnabled}
            value={locationServicesEnabled}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Soporte</Text>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigateTo("help-center")}
        >
          <View style={styles.optionContent}>
            <Ionicons name="help-circle-outline" size={24} color="#555" />
            <Text style={styles.optionText}>Centro de Ayuda</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigateTo("about-app")}
        >
          <View style={styles.optionContent}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#555"
            />
            <Text style={styles.optionText}>Acerca de</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5", // Un gris claro para el fondo
    paddingVertical: 10,
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: "#ff4d4d", // Rojo para el botón de cerrar sesión
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
