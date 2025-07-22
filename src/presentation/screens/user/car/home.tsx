import { Text, View, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function UserCarHome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de carros</Text>

      <Button
        title="Ir a Citas"
        onPress={() => router.push("/(user)/car/(screens)/CarScreens/Appointments")}
      />
      <Button
        title="Ir a Detallado"
        onPress={() => router.push("/(user)/car/(screens)/CarScreens/Detailing")}
      />
      <Button
        title="Ir a Mantenimiento"
        onPress={() => router.push("/(user)/car/(screens)/CarScreens/Maintenancie")}
      />
      <Button
        title="Ir a Documentos"
        onPress={() => router.push("/(user)/car/(screens)/CarScreens/Papers")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
