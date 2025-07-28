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
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/src/presentation/providers/AuthProvider";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { useTheme } from "@/src/presentation/theme/ThemeContext"; // ✅ Importar el hook de tema

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

  const { logout } = useAuth();
  const { theme } = useTheme(); // ✅ Usamos el tema actual

  const handleLogout = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro de que quieres cerrar tu sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sí, Cerrar Sesión",
        onPress: async () => {
          try {
            await logout();
            router.replace("/(tabs)");
          } catch (error) {
            Alert.alert("Error", "No se pudo cerrar la sesión.");
            console.error("Error al cerrar sesión:", error);
          }
        },
      },
    ]);
  };

  const navigateTo = (screenName) => { // Eliminado 'string' type hint, ya que no es JS estándar
    console.log(`Navegar a: ${screenName}`);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text, borderBottomColor: theme.border }]}>
          Cuenta
        </Text>

        <TouchableOpacity style={[styles.option, { borderBottomColor: theme.border }]} onPress={() => navigateTo("profile-edit")}>
          <View style={styles.optionContent}>
            <Ionicons name="person-outline" size={24} color={theme.icon} />
            <Text style={[styles.optionText, { color: theme.text }]}>Editar Perfil</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color={theme.border} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.option, { borderBottomColor: theme.border }]} onPress={() => navigateTo("change-password")}>
          <View style={styles.optionContent}>
            <Ionicons name="lock-closed-outline" size={24} color={theme.icon} />
            <Text style={[styles.optionText, { color: theme.text }]}>Cambiar Contraseña</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color={theme.border} />
        </TouchableOpacity>

        {/* Última opción en la sección no debe tener borderBottomWidth si no hay más elementos */}
        <TouchableOpacity style={styles.optionLast} onPress={() => navigateTo("privacy-settings")}>
          <View style={styles.optionContent}>
            <Ionicons name="shield-checkmark-outline" size={24} color={theme.icon} />
            <Text style={[styles.optionText, { color: theme.text }]}>Privacidad</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color={theme.border} />
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text, borderBottomColor: theme.border }]}>
          Preferencias
        </Text>

        <View style={[styles.option, { borderBottomColor: theme.border }]}>
          <View style={styles.optionContent}>
            <Ionicons name="notifications-outline" size={24} color={theme.icon} />
            <Text style={[styles.optionText, { color: theme.text }]}>Notificaciones</Text>
          </View>
          <Switch
            trackColor={{ false: "#c4c4c4", true: "#00c851" }}
            thumbColor={notificationsEnabled ? "#ffffff" : "#f4f3f4"}
            ios_backgroundColor="#d3d3d3"
            onValueChange={setNotificationsEnabled}
            value={notificationsEnabled}
          />
        </View>

        <View style={[styles.option, { borderBottomColor: theme.border }]}>
          <View style={styles.optionContent}>
            <Ionicons name="moon-outline" size={24} color={theme.icon} />
            <Text style={[styles.optionText, { color: theme.text }]}>Modo Oscuro</Text>
          </View>
          <Switch
            trackColor={{ false: "#c4c4c4", true: "#3b3b98" }}
            thumbColor={darkModeEnabled ? "#ffffff" : "#f4f3f4"}
            ios_backgroundColor="#d3d3d3"
            onValueChange={setDarkModeEnabled}
            value={darkModeEnabled}
          />
        </View>

        {/* Última opción en la sección no debe tener borderBottomWidth si no hay más elementos */}
        <View style={styles.optionLast}>
          <View style={styles.optionContent}>
            <Ionicons name="location-outline" size={24} color={theme.icon} />
            <Text style={[styles.optionText, { color: theme.text }]}>Servicios de Ubicación</Text>
          </View>
          <Switch
            trackColor={{ false: "#c4c4c4", true: "#ffbb33" }}
            thumbColor={locationServicesEnabled ? "#ffffff" : "#f4f3f4"}
            ios_backgroundColor="#d3d3d3"
            onValueChange={setLocationServicesEnabled}
            value={locationServicesEnabled}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text, borderBottomColor: theme.border }]}>
          Temas
        </Text>
        {/* ThemeSwitcher no necesita borderBottomColor si es el único elemento o el último */}
        <View style={styles.optionLast}>
          <ThemeSwitcher />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text, borderBottomColor: theme.border }]}>
          Soporte
        </Text>

        <TouchableOpacity style={[styles.option, { borderBottomColor: theme.border }]} onPress={() => navigateTo("help-center")}>
          <View style={styles.optionContent}>
            <Ionicons name="help-circle-outline" size={24} color={theme.icon} />
            <Text style={[styles.optionText, { color: theme.text }]}>Centro de Ayuda</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color={theme.border} />
        </TouchableOpacity>

        {/* Última opción en la sección no debe tener borderBottomWidth si no hay más elementos */}
        <TouchableOpacity style={styles.optionLast} onPress={() => navigateTo("about-app")}>
          <View style={styles.optionContent}>
            <Ionicons name="information-circle-outline" size={24} color={theme.icon} />
            <Text style={[styles.optionText, { color: theme.text }]}>Acerca de</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color={theme.border} />
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: theme.danger }]} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
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
    padding: 15,
    borderBottomWidth: 1, // Se usará theme.borderBottomColor en línea
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1, // Se usará theme.borderBottomColor en línea
  },
  optionLast: { // Estilo para la última opción en una sección (sin borde inferior)
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 0, // No border for the last item
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
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
