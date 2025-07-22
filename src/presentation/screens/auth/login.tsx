import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useAuth } from "../../../presentation/providers/AuthProvider";
import { Link, useRouter, usePathname } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const currentPath = usePathname();
  const { login, user } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // Función de redirección por rol
  const redirectByRole = (role: string): string => {
    switch (role) {
      case "user":
        return "/(user)";
      case "admin":
        return "/(admin)";
      default:
        return "/";
    }
  };

  // Redirección automática cuando el usuario cambia
  useEffect(() => {
    if (!user || !user.role) return;

    try {
      const destination = redirectByRole(user.role);
      const baseRoute = "/" + destination.split("/")[1]; // Ej: /admin

      // Si ya estás en la sección base (como /admin), no redirige
      if (!currentPath.startsWith(baseRoute)) {
        router.replace(destination as any);
      }
    } catch (error) {
      console.error("Error al redirigir:", error);
    }
  }, [user]);
  // Manejo del botón de login
  const handleLogin = async () => {
    try {
      if (!credentials.email || !credentials.password) {
        Alert.alert("Error", "Por favor, completa todos los campos.");
        return;
      }
      await login(credentials);
    } catch (response: any) {
      if (response.message) {
        Alert.alert("Error", response.message);
      } else {
        Alert.alert("Error", "Ocurrió un error inesperado. Intenta de nuevo.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        value={credentials.email}
        onChangeText={(text) =>
          setCredentials((prev) => ({ ...prev, email: text }))
        }
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={credentials.password}
        onChangeText={(text) =>
          setCredentials((prev) => ({ ...prev, password: text }))
        }
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <Link href="/register" asChild>
        <TouchableOpacity>
          <Text style={styles.linkText}>
            ¿No tienes cuenta? <Text style={styles.linkBold}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
    color: "#666",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007aff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  linkText: {
    marginTop: 20,
    textAlign: "center",
    color: "#444",
  },
  linkBold: {
    color: "#007aff",
    fontWeight: "600",
  },
});
