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

  const validateField = (field: string, value: string) => {
    let error = "";

    switch (field) {
      case "username":
        if (!value) error = "El nombre de usuario es obligatorio.";
        break;
      case "nombre":
        if (!value) error = "El nombre es obligatorio.";
        break;
      case "email":
        if (!value) error = "El correo es obligatorio.";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Correo inválido.";
        break;
      case "password":
        if (!value) error = "La contraseña es obligatoria.";
        break;
      case "confirmPassword":
        if (!value) error = "Confirma tu contraseña.";
        else if (value !== credentials.password) error = "Las contraseñas no coinciden.";
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: any = {};

    Object.entries(credentials).forEach(([field, value]) => {
      validateField(field, value);
      if (!value || errors[field as keyof typeof errors]) valid = false;
    });

    return valid;
  };

  const handleRegister = () => {
    if (!validateForm()) return;

    try {
      register(credentials);
      router.replace("/login");
    } catch (error: any) {
        if (error.message) {
            Alert.alert("Registro fallido", error.message);
            return;
        }
        if (error.response && error.response.data) {
            const data = error.response.data;
            if (data.errors) {
            const messages = Object.values(data.errors).flat().join("\n");
            Alert.alert("Registro fallido", messages);
            return;
            }
            Alert.alert("Registro fallido", data.message || "Error del servidor");
            return;
        }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/** Username */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.username && styles.inputError]}
          placeholder="User Name"
          value={credentials.username}
          onChangeText={(text) => handleChange("username", text)}
          autoCapitalize="words"
        />
        {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
      </View>

      {/** Nombre */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.nombre && styles.inputError]}
          placeholder="Name"
          value={credentials.nombre}
          onChangeText={(text) => handleChange("nombre", text)}
          autoCapitalize="words"
        />
        {errors.nombre ? <Text style={styles.errorText}>{errors.nombre}</Text> : null}
      </View>

      {/** Email */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Email"
          value={credentials.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      </View>

      {/** Password */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Password"
          value={credentials.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      </View>

      {/** Confirm Password */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          placeholder="Confirm Password"
          value={credentials.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
          secureTextEntry
        />
        {errors.confirmPassword ? (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        ) : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 4,
    fontSize: 13,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
