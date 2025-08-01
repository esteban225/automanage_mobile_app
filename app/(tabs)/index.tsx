import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { BlurView } from "expo-blur";

export default function TabOneScreen() {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          console.log("[TabOneScreen] Usuario encontrado:", JSON.parse(user));
        } else {
          console.log("[TabOneScreen] No hay usuario");
        }
      } catch (error) {
        console.error("[TabOneScreen] Error:", error);
      }
    };

    checkUser();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
      
      <Text style={styles.subtitle}>Tu taller organizado, siempre.</Text>

      <BlurView intensity={70} tint="dark" style={styles.card}>
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.buttonPrimary}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/register" asChild>
          <TouchableOpacity style={styles.buttonSecondary}>
            <Text style={styles.buttonTextAlt}>Registrarse</Text>
          </TouchableOpacity>
        </Link>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // Azul oscuro elegante
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
    borderRadius: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#e2e8f0", // Texto claro sobre azul oscuro
    textAlign: "center",
    marginBottom: 30,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    padding: 24,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.06)", // Glass
    borderColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    gap: 16,
  },
  buttonPrimary: {
    backgroundColor: "#3b82f6", // Azul moderno
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    borderColor: "#7dd3fc", // Borde azul claro
    borderWidth: 1.5,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextAlt: {
    color: "#7dd3fc", // Azul claro
    fontSize: 16,
    fontWeight: "600",
  },
});
