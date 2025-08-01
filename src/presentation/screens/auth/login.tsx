import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import { useAuth } from "../../../presentation/providers/AuthProvider";
import { Link, useRouter, usePathname } from "expo-router";
import { BlurView } from "expo-blur";

export default function LoginScreen() {
  const router = useRouter();
  const currentPath = usePathname();
  const { login, user } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

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

  useEffect(() => {
    if (!user || !user.role) return;
    try {
      const destination = redirectByRole(user.role);
      const baseRoute = "/" + destination.split("/")[1];
      if (!currentPath.startsWith(baseRoute)) {
        router.replace(destination as any);
      }
    } catch (error) {
      console.error("Error al redirigir:", error);
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      if (!credentials.email || !credentials.password) {
        Alert.alert("Error", "Por favor, completa todos los campos.");
        return;
      }
      await login(credentials);
    } catch (response: any) {
      Alert.alert("Error", response.message || "Ocurrió un error inesperado.");
    }
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={90} tint="dark" style={styles.card}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#94a3b8"
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
          placeholderTextColor="#94a3b8"
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
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // Azul noche elegante
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 20,
    padding: 24,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    ...Platform.select({
      android: {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
      },
    }),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#e2e8f0",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#cbd5e1",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#e2e8f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#3b82f6", // Azul brillante
    paddingVertical: 14,
    borderRadius: 12,
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
    color: "#7dd3fc", // Azul claro
  },
  linkBold: {
    color: "#7dd3fc",
    fontWeight: "700",
  },
});
