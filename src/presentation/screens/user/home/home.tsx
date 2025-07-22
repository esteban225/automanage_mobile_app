import { Text, View, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function UserHome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de inicio</Text>

      <Button
        title="Guías para
                aprender
                más de tu
                vehículo"
        onPress={() => router.push("/(user)/home/(screens)/LearningCar")}
      />
      <Button
        title="Ir a Productos"
        onPress={() => router.push("/(user)/home/(screens)/ViewProduct")}
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
