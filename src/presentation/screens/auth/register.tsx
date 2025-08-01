import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { useAuth } from "../../providers/AuthProvider";
import { BlurView } from "expo-blur";

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateField = (field: string, value: string) => {
    let error = "";

    switch (field) {
      case "username":
        if (!value.trim()) error = "El nombre de usuario es obligatorio.";
        break;
      case "nombre":
        if (!value.trim()) error = "El nombre es obligatorio.";
        break;
      case "email":
        if (!value.trim()) {
          error = "El correo es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Correo inválido.";
        }
        break;
      case "password":
        if (!value) error = "La contraseña es obligatoria.";
        else if (value.length < 6) error = "Debe tener al menos 6 caracteres.";
        break;
      case "confirmPassword":
        if (!value) error = "Confirma tu contraseña.";
        else if (value !== credentials.password)
          error = "Las contraseñas no coinciden.";
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors: { [key: string]: string } = {};

    for (const [field, value] of Object.entries(credentials)) {
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      Alert.alert("Error", "Corrige los errores en el formulario.");
      return;
    }

    try {
      await register(credentials);
      Alert.alert("Registro exitoso", "Ahora puedes iniciar sesión.", [
        {
          text: "OK",
          onPress: () => router.replace("/login"),
        },
      ]);
    } catch (error: any) {
      let errorMessage = "Ocurrió un error inesperado.";

      if (error.response?.data) {
        const data = error.response.data;
        errorMessage = data.errors
          ? Object.values(data.errors).flat().join("\n")
          : data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert("Registro fallido", errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BlurView intensity={90} tint="dark" style={styles.card}>
          <Text style={styles.title}>Crear una cuenta</Text>

          {[
            {
              label: "Nombre de Usuario",
              field: "username",
              placeholder: "Ej: juanperez",
            },
            {
              label: "Nombre Completo",
              field: "nombre",
              placeholder: "Ej: Juan Pérez",
            },
            {
              label: "Correo Electrónico",
              field: "email",
              placeholder: "Ej: correo@ejemplo.com",
            },
            {
              label: "Contraseña",
              field: "password",
              placeholder: "Mínimo 6 caracteres",
              secure: true,
            },
            {
              label: "Confirmar Contraseña",
              field: "confirmPassword",
              placeholder: "Repite tu contraseña",
              secure: true,
            },
          ].map(({ label, field, placeholder, secure }) => (
            <View key={field} style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{label}</Text>
              <TextInput
                style={[styles.input, errors[field] && styles.inputError]}
                placeholder={placeholder}
                placeholderTextColor="#aaa"
                value={(credentials as any)[field]}
                onChangeText={(text) => handleChange(field, text)}
                onBlur={() => validateField(field, (credentials as any)[field])}
                secureTextEntry={secure}
                autoCapitalize={
                  field === "email" || field === "username" ? "none" : "words"
                }
              />
              {errors[field] ? (
                <Text style={styles.errorText}>{errors[field]}</Text>
              ) : null}
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.loginLinkText}>
              ¿Ya tienes cuenta?{" "}
              <Text style={styles.loginLinkHighlight}>Inicia Sesión</Text>
            </Text>
          </TouchableOpacity>
        </BlurView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0d1b2a", // azul oscuro elegante
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    ...Platform.select({
      android: {
        backgroundColor: "rgba(255, 255, 255, 0.07)",
      },
    }),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: "#dbe9f4",
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    color: "#fff",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#ff6b6b",
    borderWidth: 2,
  },
  errorText: {
    color: "#ff6b6b",
    marginTop: 4,
    fontSize: 13,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#4da6ff", // azul mejorado
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
  loginLinkText: {
    fontSize: 15,
    color: "#b0cbe6",
  },
  loginLinkHighlight: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
