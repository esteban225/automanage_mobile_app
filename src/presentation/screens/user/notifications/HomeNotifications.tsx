import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Vibration } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  date: Date;
};

const defaultNotifications = [
  { title: "Cambio de Aceite", body: "Es hora de cambiar el aceite de tu vehículo para mantenerlo en óptimas condiciones.", hour: 9, minute: 0 },
  { title: "Revisión de Frenos", body: "No olvides revisar los frenos. La seguridad es primero. ¡Agenda una cita!", hour: 12, minute: 0 },
  { title: "Alineación y Balanceo", body: "Tu auto podría necesitar alineación y balanceo para un manejo suave y seguro.", hour: 15, minute: 0 },
  { title: "Inspección de Luces", body: "Verifica el funcionamiento de todas las luces de tu vehículo, ¡es crucial para la visibilidad!", hour: 17, minute: 0 },
  { title: "Nivel de Líquidos", body: "Revisa los niveles de líquidos del motor, frenos y dirección. ¡Prevén problemas mayores!", hour: 19, minute: 0 },
  { title: "Rotación de Llantas", body: "Para un desgaste uniforme y mayor durabilidad, considera rotar tus llantas.", hour: 10, minute: 30 },
  { title: "Revisión de Batería", body: "Asegúrate de que tu batería esté en buen estado, ¡especialmente antes de un viaje largo!", hour: 14, minute: 0 },
  { title: "Filtro de Aire", body: "Cambia el filtro de aire para mejorar el rendimiento y la eficiencia del combustible.", hour: 16, minute: 45 },
  { title: "Limpieza Interior", body: "Dale un buen mantenimiento al interior de tu auto. ¡Un espacio limpio es un espacio feliz!", hour: 18, minute: 15 },
  { title: "Lavado Exterior", body: "Mantén tu vehículo reluciente con un lavado regular.", hour: 11, minute: 0 },
];

export default function HomeNotifications() {
  const [receivedNotifications, setReceivedNotifications] = useState<NotificationItem[]>([]);

  // Request notification permissions
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Se necesitan permisos de notificación para mostrar las alertas.');
      }
    })();
  }, []);

  // 🧠 PROGRAMAR notificaciones diarias solo una vez
  useEffect(() => {
    const programarDiarias = async () => {
      const alreadyScheduled = await AsyncStorage.getItem("notificacionesProgramadas");

      if (!alreadyScheduled) {
        // Clear all existing scheduled notifications to avoid duplicates if the app was reloaded
        await Notifications.cancelAllScheduledNotificationsAsync(); 

        for (const item of defaultNotifications) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: item.title,
              body: item.body,
              sound: true,
              vibrate: [0, 250, 250, 250], // Vibrate pattern: wait, vibrate, wait, vibrate
              priority: Notifications.AndroidNotificationPriority.HIGH,
            },
            trigger: {
              hour: item.hour,
              minute: item.minute,
              repeats: true,
            },
          });
        }
        await AsyncStorage.setItem("notificacionesProgramadas", "true");
      }
    };

    programarDiarias();
  }, []);

  // 🚀 MOSTRAR notificaciones inmediatas una por una cada 5 segundos
  useEffect(() => {
    let index = 0;
    const interval = setInterval(async () => {
      if (index < defaultNotifications.length) {
        const item = defaultNotifications[index];

        await Notifications.scheduleNotificationAsync({
          content: {
            title: item.title,
            body: item.body,
            sound: true,
            vibrate: [0, 250, 250, 250], // Vibrate pattern for immediate notifications
            priority: Notifications.AndroidNotificationPriority.HIGH,
          },
          trigger: null, // Triggers immediately
        });

        // Add to the displayed list, keeping only the latest 5
        const newNotification: NotificationItem = {
          id: Math.random().toString(),
          title: item.title,
          body: item.body,
          date: new Date(),
        };

        setReceivedNotifications((prev) => [newNotification, ...prev.slice(0, 4)]);
        Vibration.vibrate(200); // Short vibration when an immediate notification is displayed
        index++;
      } else {
        clearInterval(interval);
      }
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, []);

  // 🗑️ Eliminar notificación de la lista
  const eliminarNotificacion = (id: string) => {
    setReceivedNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Notificaciones</Text>
      {receivedNotifications.length === 0 ? (
        <Text style={styles.noNotificationsText}>No hay notificaciones recientes.</Text>
      ) : (
        <FlatList
          data={receivedNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationCard}>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationBody}>{item.body}</Text>
                <Text style={styles.notificationTime}>
                  {item.date.toLocaleTimeString()} - {item.date.toLocaleDateString()}
                </Text>
              </View>
              <TouchableOpacity onPress={() => eliminarNotificacion(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e8f0f7", // Softer background
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50", // Darker title color
  },
  noNotificationsText: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    marginTop: 50,
  },
  notificationCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12, // More rounded corners
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationContent: {
    flex: 1,
    marginRight: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495e", // Darker text for title
    marginBottom: 4,
  },
  notificationBody: {
    fontSize: 14,
    color: "#7f8c8d", // Muted text for body
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: "#95a5a6", // Lighter text for time
    marginTop: 8,
    fontStyle: "italic",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#e74c3c", // Red color for delete
    justifyContent: "center",
    alignItems: "center",
    width: 35, // Fixed width for a circle-like button
    height: 35, // Fixed height
  },
  deleteButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});