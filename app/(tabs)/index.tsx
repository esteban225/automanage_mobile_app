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

export default function TabOneScreen() {

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          console.log(
            "[TabOneScreen] Usuario encontrado en AsyncStorage:",
            JSON.parse(user)
          );
        } else {
          console.log("[TabOneScreen] No hay usuario en AsyncStorage");
        }
      } catch (error) {
        console.error("[TabOneScreen] Error al obtener usuario:", error);
      }
    };

    checkUser();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.subtitle}>Tu taller organizado, siempre.</Text>

      <View style={styles.buttonContainer}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 240,
    height: 240,
    marginBottom: 30,
    resizeMode: "contain",
    borderRadius: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  buttonPrimary: {
    backgroundColor: "#007aff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#fff",
    borderColor: "#007aff",
    borderWidth: 1.5,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDanger: {
    backgroundColor: "#ff3b30",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextAlt: {
    color: "#007aff",
    fontSize: 16,
    fontWeight: "600",
  },
});
