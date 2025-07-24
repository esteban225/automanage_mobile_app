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
  Platform, // Import Platform for platform-specific styles
  ScrollView // Use ScrollView for better handling of content on smaller screens
} from "react-native";
import { useAuth } from "../../providers/AuthProvider";

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
        else if (value.length < 6) error = "La contraseña debe tener al menos 6 caracteres.";
        break;
      case "confirmPassword":
        if (!value) {
          error = "Confirma tu contraseña.";
        } else if (value !== credentials.password) {
          error = "Las contraseñas no coinciden.";
        }
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
      Alert.alert("Error de validación", "Por favor, corrige los errores en el formulario.");
      return;
    }

    try {
      await register(credentials);
      Alert.alert(
        "Registro exitoso",
        "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/login"),
          },
        ]
      );
    } catch (error: any) {
      console.error("Error during registration:", error);
      let errorMessage = "Ocurrió un error inesperado al registrarte.";

      if (error.response && error.response.data) {
        const data = error.response.data;
        if (data.errors) {
          const messages = Object.values(data.errors).flat().join("\n");
          errorMessage = messages;
        } else if (data.message) {
          errorMessage = data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      Alert.alert("Registro fallido", errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Crear una cuenta</Text>

        {/* Username */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nombre de Usuario</Text>
          <TextInput
            style={[styles.input, errors.username && styles.inputError]}
            placeholder="Ej: juanperez"
            value={credentials.username}
            onChangeText={(text) => handleChange("username", text)}
            onBlur={() => validateField("username", credentials.username)}
            autoCapitalize="none"
            textContentType="username" // Added for autofill on iOS
          />
          {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
        </View>

        {/* Nombre */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nombre Completo</Text>
          <TextInput
            style={[styles.input, errors.nombre && styles.inputError]}
            placeholder="Ej: Juan Pérez"
            value={credentials.nombre}
            onChangeText={(text) => handleChange("nombre", text)}
            onBlur={() => validateField("nombre", credentials.nombre)}
            autoCapitalize="words"
            textContentType="name" // Added for autofill on iOS
          />
          {errors.nombre ? <Text style={styles.errorText}>{errors.nombre}</Text> : null}
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Correo Electrónico</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Ej: correo@ejemplo.com"
            value={credentials.email}
            onChangeText={(text) => handleChange("email", text)}
            onBlur={() => validateField("email", credentials.email)}
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress" // Added for autofill on iOS
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Contraseña</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Mínimo 8 caracteres"
            value={credentials.password}
            onChangeText={(text) => handleChange("password", text)}
            onBlur={() => validateField("password", credentials.password)}
            secureTextEntry
            textContentType="newPassword" // Added for autofill on iOS
          />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirmar Contraseña</Text>
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            placeholder="Repite tu contraseña"
            value={credentials.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            onBlur={() => validateField("confirmPassword", credentials.confirmPassword)}
            secureTextEntry
            textContentType="newPassword" // Added for autofill on iOS
          />
          {errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginLink} onPress={() => router.replace("/login")}>
          <Text style={styles.loginLinkText}>
            ¿Ya tienes una cuenta? <Text style={styles.loginLinkHighlight}>Inicia Sesión</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F8FA", // A very light grey background for a clean look
  },
  scrollContainer: {
    flexGrow: 1, // Allows content to grow and be scrollable
    justifyContent: "center",
    padding: 24,
    paddingTop: Platform.OS === 'android' ? 50 : 24, // More top padding for Android devices
  },
  title: {
    fontSize: 28, // Larger title
    fontWeight: "700", // Bolder
    color: "#2C3E50", // Darker text for better contrast
    marginBottom: 30, // More space below the title
    textAlign: "center", // Center the title
  },
  inputContainer: {
    marginBottom: 20, // Increased space between input fields
  },
  inputLabel: {
    fontSize: 15,
    color: "#5C6A7A", // A softer grey for labels
    marginBottom: 8, // Space between label and input
    fontWeight: "500", // Slightly bolder label
  },
  input: {
    height: 50, // Slightly taller inputs
    borderColor: "#D1D8DF", // Lighter border color
    borderWidth: 1,
    borderRadius: 10, // More rounded corners
    paddingHorizontal: 15, // Increased padding inside input
    fontSize: 16,
    backgroundColor: "#FFFFFF", // White background for inputs
    color: "#333333", // Darker text inside input
    shadowColor: "#000", // Subtle shadow for depth
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2, // Android shadow
  },
  inputError: {
    borderColor: "#E74C3C", // Red border for errors
    borderWidth: 2, // Thicker border for errors
  },
  errorText: {
    color: "#E74C3C", // Red color for error messages
    marginTop: 6, // Space above error text
    fontSize: 13,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#3498DB", // A vibrant blue for the button
    paddingVertical: 15, // Slightly more vertical padding
    borderRadius: 10, // More rounded corners
    alignItems: "center",
    marginTop: 20, // Space above the button
    shadowColor: "#000", // Shadow for button
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3, // Android shadow
  },
  buttonText: {
    color: "#FFFFFF", // White text
    fontSize: 18,
    fontWeight: "700", // Bolder text
  },
  loginLink: {
    marginTop: 25, // Space above the login link
    alignItems: "center",
  },
  loginLinkText: {
    fontSize: 15,
    color: "#5C6A7A", // Soft grey for the link text
  },
  loginLinkHighlight: {
    color: "#3498DB", // Blue highlight for the "Inicia Sesión" part
    fontWeight: "600",
  },
});