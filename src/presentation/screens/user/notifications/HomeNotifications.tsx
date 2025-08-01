import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Vibration, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from '@/src/presentation/theme/ThemeContext'; // Importa useTheme
import { Feather } from '@expo/vector-icons'; // Para íconos de "X" o "papelera"

// ✅ NECESARIO: Configurar handler global para mostrar notificaciones incluso en foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  date: Date;
};

const defaultNotifications = [
  { title: "Cambio de Aceite", body: "Es hora de cambiar el aceite de tu vehículo.", hour: 9, minute: 0 },
  { title: "Revisión de Frenos", body: "No olvides revisar los frenos. ¡Agenda una cita!", hour: 12, minute: 0 },
  { title: "Alineación y Balanceo", body: "Tu auto podría necesitar alineación.", hour: 15, minute: 0 },
  { title: "Inspección de Luces", body: "Verifica todas las luces de tu vehículo.", hour: 17, minute: 0 },
  { title: "Nivel de Líquidos", body: "Revisa los niveles del motor y frenos.", hour: 19, minute: 0 },
];

export default function HomeNotifications() {
  const { theme } = useTheme(); // Usa el hook useTheme
  const [receivedNotifications, setReceivedNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    (async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Se necesitan permisos de notificación para continuar.');
        return;
      }

      // ✅ Crear canal para Android
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Notificaciones Generales",
          importance: Notifications.AndroidImportance.HIGH,
          sound: true,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C", // Color de luz para notificaciones (puede ser temático si quieres)
        });
      }
    })();
  }, []);

  // ✅ Programar notificaciones diarias (solo una vez)
  useEffect(() => {
    const programarDiarias = async () => {
      const alreadyScheduled = await AsyncStorage.getItem("notificacionesProgramadas");

      if (!alreadyScheduled) {
        await Notifications.cancelAllScheduledNotificationsAsync();

        for (const item of defaultNotifications) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: item.title,
              body: item.body,
              sound: true,
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

  // ✅ Mostrar notificaciones inmediatas una por una cada 5 segundos
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
            priority: Notifications.AndroidNotificationPriority.HIGH,
          },
          trigger: { seconds: 1 }, // ✅ Mostrar inmediatamente (más confiable que trigger: null)
        });

        const newNotification: NotificationItem = {
          id: Math.random().toString(),
          title: item.title,
          body: item.body,
          date: new Date(),
        };

        setReceivedNotifications((prev) => [newNotification, ...prev.slice(0, 4)]);
        Vibration.vibrate(200);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const eliminarNotificacion = (id: string) => {
    setReceivedNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <View style={[modernNotificationStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[modernNotificationStyles.title, { color: theme.primary }]}>Tu Buzón de Automanage</Text>
      <Text style={[modernNotificationStyles.subtitle, { color: theme.text }]}>
        Aquí verás tus notificaciones importantes y recordatorios.
      </Text>

      {receivedNotifications.length === 0 ? (
        <View style={modernNotificationStyles.emptyState}>
          <Feather name="bell-off" size={60} color={theme.icon} style={{ marginBottom: 15 }} />
          <Text style={[modernNotificationStyles.noNotificationsText, { color: theme.text }]}>
            No hay notificaciones recientes en este momento.
          </Text>
          <Text style={[modernNotificationStyles.noNotificationsText, { color: theme.text, fontSize: 14 }]}>
            ¡Te avisaremos cuando haya algo nuevo!
          </Text>
        </View>
      ) : (
        <FlatList
          data={receivedNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[modernNotificationStyles.notificationCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={modernNotificationStyles.notificationContent}>
                <Text style={[modernNotificationStyles.notificationTitle, { color: theme.primary }]}>{item.title}</Text>
                <Text style={[modernNotificationStyles.notificationBody, { color: theme.text }]}>{item.body}</Text>
                <Text style={[modernNotificationStyles.notificationTime, { color: theme.secondary }]}>
                  {item.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {item.date.toLocaleDateString()}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => eliminarNotificacion(item.id)}
                style={[modernNotificationStyles.deleteButton, { backgroundColor: theme.danger }]}
              >
                <Feather name="x" size={20} color={theme.buttonText} />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={modernNotificationStyles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

// 🎨 Estilos con ThemeContext integrado
const modernNotificationStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, // Padding lateral consistente
    paddingTop: 30, // Más padding superior
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50, // Ajusta según el espacio deseado
  },
  noNotificationsText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 25,
  },
  flatListContent: {
    paddingBottom: 20, // Espacio al final de la lista
  },
  notificationCard: {
    padding: 18,
    marginBottom: 15,
    borderRadius: 15, // Bordes más redondeados
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1, // Borde sutil del tema
    shadowColor: '#000', // Sombra suave para un efecto flotante
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  notificationContent: {
    flex: 1,
    marginRight: 15,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  notificationBody: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    marginTop: 5,
    fontStyle: "italic",
    opacity: 0.8, // Ligeramente más opaco
  },
  deleteButton: {
    padding: 10,
    borderRadius: 10, // Bordes redondeados
    justifyContent: "center",
    alignItems: "center",
    width: 40, // Tamaño fijo
    height: 40, // Tamaño fijo
  },
});