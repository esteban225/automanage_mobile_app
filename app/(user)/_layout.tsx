import { Tabs, useRouter } from "expo-router"; // Importa Link y useRouter de expo-router para la navegación.
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons"; // Importa Ionicons para el icono de campana.
import { Pressable } from "react-native"; // Importa Pressable y View para hacer el icono interactivo.
import { useTheme } from "@/src/presentation/theme/ThemeContext"; // Importar el hook de tema
import HeaderBackButton from "@/components/HeaderBackButton";
import { View } from "react-native";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";

/**
 * @function TabBarIcon
 * @description Un componente auxiliar para renderizar iconos de FontAwesome5 en la barra de pestañas.
 * @param {object} props - Las propiedades pasadas al componente.
 * @param {React.ComponentProps<typeof FontAwesome5>["name"]} props.name - El nombre del icono de FontAwesome5 a mostrar (ej. "car", "user").
 * @param {string} props.color - El color del icono, proporcionado por el navegador de pestañas.
 * @returns {JSX.Element} Un componente de icono FontAwesome5.
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return (
    // Renderiza un icono de FontAwesome5 con un tamaño y estilo específicos, y pasa el resto de las props.
    <FontAwesome5 size={20} style={{ marginBottom: -4 }} solid {...props} />
  );
}

/**
 * @function NotificationBell
 * @description Componente para el icono de campana de notificaciones en el encabezado.
 * Al presionarlo, navega a la pantalla de notificaciones.
 * @param {object} props - Las propiedades del componente.
 * @param {object} props.theme - El objeto de tema actual.
 * @param {object} props.router - El objeto router de Expo Router para la navegación.
 * @returns {JSX.Element} Un componente Pressable con el icono de notificación.
 */
export function NotificationBell({ theme, router }) {
  const [hasNewNotification, setHasNewNotification] = useState(false);

  useEffect(() => {
    // Escuchar notificaciones entrantes mientras la app está en primer plano
    const subscription = Notifications.addNotificationReceivedListener(() => {
      setHasNewNotification(true);
    });

    return () => {
      subscription.remove(); // Limpieza al desmontar
    };
  }, []);

  const handlePress = () => {
    setHasNewNotification(false); // Marcar como leída
    router.push("/notifications");
  };

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <View style={{ position: "relative", marginRight: 15 }}>
          <Ionicons
            name="notifications-outline"
            size={25}
            color={theme.icon}
            style={{ opacity: pressed ? 0.5 : 1 }}
          />
          {hasNewNotification && (
            <View
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#ff5930ff",
              }}
            />
          )}
        </View>
      )}
    </Pressable>
  );
}

/**
 * @function UserLayout
 * @description Componente principal que define la estructura de navegación por pestañas para el usuario.
 * Utiliza Expo Router para crear un navegador de pestañas inferior y gestiona las rutas visibles y ocultas.
 * Incluye un icono de notificaciones en el encabezado de las pestañas "Inicio", "Vehículo" y "Perfil".
 * @returns {JSX.Element} Un componente de navegación por pestañas.
 */
export default function UserLayout() {
  // Inicializa el hook useRouter para la navegación programática.
  const router = useRouter();
  const { theme } = useTheme(); // Usamos el tema actual

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary, // Color activo de la pestaña con el tema
        tabBarInactiveTintColor: theme.icon, // Color inactivo de la pestaña con el tema
        tabBarStyle: {
          backgroundColor: theme.background, // Fondo de la barra de pestañas con el tema
          borderTopColor: theme.border, // Color del borde superior de la barra de pestañas con el tema
        },
        headerStyle: {
          backgroundColor: theme.background, // Fondo del encabezado con el tema
        },
        headerTitleStyle: {
          color: theme.text, // Color del título del encabezado con el tema
        },
        headerTintColor: theme.text, // Color de los botones de navegación del encabezado con el tema
      }}
    >
      {/* Pestaña "Vehículo" - Visible en la barra de pestañas con icono de notificaciones */}
      <Tabs.Screen
        name="car/index" // Nombre de la ruta, mapeado a 'app/car/index.tsx'
        options={{
          title: "Vehículo", // Título de la pestaña que se muestra al usuario.
          headerShown: true, // Asegura que el encabezado esté visible para mostrar el icono.
          // Función para renderizar el icono de la pestaña.
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
          // Define el componente a renderizar en el lado derecho del encabezado.
          // Ahora usa el componente NotificationBell refactorizado.
          headerRight: () => <NotificationBell theme={theme} router={router} />,
        }}
      />
      {/* Pestaña "Inicio" - Visible en la barra de pestañas con icono de notificaciones */}
      <Tabs.Screen
        name="index" // Nombre de la ruta, mapeado a 'app/index.tsx'
        options={{
          title: "Inicio", // Título de la pestaña.
          headerShown: true, // Asegura que el encabezado esté visible.
          // Renderiza un icono de casa de AntDesign.
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          // Define el componente a renderizar en el lado derecho del encabezado.
          // Ahora usa el componente NotificationBell refactorizado.
          headerRight: () => <NotificationBell theme={theme} router={router} />,
        }}
      />
      {/* Pestaña "Emergencias" - Oculta de la barra de pestañas (`href: null`) */}
      <Tabs.Screen
        name="emergency/index" // Ruta a la pantalla de emergencias.
        options={{
          headerShown: true, // Muestra el encabezado de la pantalla cuando está activa.
          headerTitle: "Emergencias", // Título a mostrar en el encabezado.
          href: null, // Oculta esta pestaña de la barra de navegación inferior.
          headerLeft: () => <HeaderBackButton />,
        }}
      />
      {/* Pestaña "Notificaciones" - Oculta de la barra de pestañas */}
      <Tabs.Screen
        name="notifications/index" // Ruta a la pantalla de notificaciones.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Notificaciones", // Título del encabezado.
          href: null, // Oculta la pestaña.
          headerLeft: () => <HeaderBackButton />,
        }}
      />
      {/* Pestaña "Perfil" - Visible en la barra de pestañas con icono de notificaciones */}
      <Tabs.Screen
        name="profile/index" // Ruta a la pantalla de perfil.
        options={{
          title: "Perfil", // Título de la pestaña.
          headerShown: true, // Asegura que el encabezado esté visible.
          // Renderiza un icono de usuario.
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          // Define el componente a renderizar en el lado derecho del encabezado.
          // Ahora usa el componente NotificationBell refactorizado.
          headerRight: () => <NotificationBell theme={theme} router={router} />,
        }}
      />
      {/* Pestaña "Configuración" - Oculta de la barra de pestañas */}
      <Tabs.Screen
        name="settings/index" // Ruta a la pantalla de configuración.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Configuración", // Título del encabezado.
          href: null, // Oculta la pestaña.
          headerLeft: () => <HeaderBackButton />,
        }}
      />
      {/* Pestaña "Acerca de la App" - Oculta de la barra de pestañas */}
      <Tabs.Screen
        name="settings/(screens)/about-app" // Ruta a la pantalla de información de la app.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Acerca de la App", // Título del encabezado.
          href: null, // Oculta la pestaña.
          headerLeft: () => <HeaderBackButton />,
        }}
      />
      {/* Pestaña "Centro de ayuda" - Oculta de la barra de pestañas */}
      <Tabs.Screen
        name="settings/(screens)/help-center" // Ruta a la pantalla de información de la app.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Centro de ayuda", // Título del encabezado.
          href: null, // Oculta la pestaña.
          headerLeft: () => <HeaderBackButton />,
        }}
      />
      {/* ------------------------------------------
        Pestañas del módulo de carro (rutas anidadas y ocultas)
        Estas pantallas son accesibles dentro del flujo del módulo 'car'
        pero no aparecen directamente en la barra de pestañas principal.
        ------------------------------------------
      */}
      <Tabs.Screen
        name="car/(screens)/CarScreens/Detailing" // Ruta a la pantalla de detalles del vehículo.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Detalle del Vehículo", // Título del encabezado.
          href: null, // Oculta la pestaña.
          headerLeft: () => <HeaderBackButton />,
        }}
      />
      <Tabs.Screen
        name="car/(screens)/CarScreens/Appointments" // Ruta a la pantalla de citas del vehículo.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Citas", // Título del encabezado.
          href: null, // Oculta la pestaña.
          headerLeft: () => <HeaderBackButton />,
        }}
      />
      <Tabs.Screen
        name="car/(screens)/CarScreens/Maintenancie" // Ruta a la pantalla de mantenimiento del vehículo.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Mantenimiento", // Título del encabezado.
          href: null, // Oculta la pestaña.
          headerLeft: () => <HeaderBackButton />,
        }}
      />
      <Tabs.Screen
        name="car/(screens)/CarScreens/Papers" // Ruta a la pantalla de documentos del vehículo.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Documentos", // Título del encabezado.
          href: null, // Oculta la pestaña.
          headerLeft: () => <HeaderBackButton />,
        }}
      />
      <Tabs.Screen
        name="car/(screens)/CarScreens/Invoice" // Ruta a la pantalla de factura del vehículo.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Factura", // Título del encabezado.
          href: null, // Oculta la pestaña.
          headerLeft: () => <HeaderBackButton />,
        }}
      />
      <Tabs.Screen
        name="car/(screens)/CarScreens/ModalActionCircle" // Ruta a la pantalla de factura del vehículo.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Info", // Título del encabezado.
          href: null, // Oculta la pestaña.
          headerLeft: () => <HeaderBackButton />,
        }}
      />
      {/* ------------------------------------------
        Pestañas del módulo de inicio (rutas anidadas y ocultas)
        Estas pantallas son accesibles dentro del flujo del módulo 'home'
        pero no aparecen directamente en la barra de pestañas principal.
        ------------------------------------------
      */}
      <Tabs.Screen
        name="home/(screens)/LearningCar" // Ruta a la pantalla de aprendizaje sobre el vehículo.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Aprender sobre tu vehículo", // Título del encabezado.
          href: null, // Oculta la pestaña.
          headerLeft: () => <HeaderBackButton />,
        }}
      />
      <Tabs.Screen
        name="home/(screens)/ViewProduct" // Ruta a la pantalla de visualización de productos.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Ver Productos", // Título del encabezado.
          href: null, // Oculta la pestaña.
          headerLeft: () => <HeaderBackButton />,
        }}
      />
    </Tabs>
  );
}
