import { Tabs, useRouter } from "expo-router"; // Importa Link y useRouter de expo-router para la navegación.
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons"; // Importa Ionicons para el icono de campana.
// import { useColorScheme } => "@/components/useColorScheme"; // Comentado: Este componente no está disponible.
import Colors from "@/constants/Colors";
import { Pressable } from "react-native"; // Importa Pressable y View para hacer el icono interactivo.

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
 * @param {string} props.colorScheme - El esquema de color actual (light/dark).
 * @param {object} props.router - El objeto router de Expo Router para la navegación.
 * @returns {JSX.Element} Un componente Pressable con el icono de notificación.
 */
function NotificationBell({ colorScheme, router }) {
  return (
    <Pressable onPress={() => router.push("/notifications")}>
      {({ pressed }) => (
        <Ionicons
          name="notifications-outline" // Icono de campana de Ionicons
          size={25}
          color={Colors[colorScheme ?? "light"].text} // Color del icono basado en el tema
          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} // Estilo para el icono, con opacidad al presionar
        />
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
  // Se ha eliminado la importación de useColorScheme.
  // Se establece un esquema de color por defecto a 'light'.
  // Si necesitas soporte para dark mode, deberás implementar tu propio useColorScheme o usar una biblioteca.
  const colorScheme = "light";
  // Inicializa el hook useRouter para la navegación programática.
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderTopColor: Colors[colorScheme ?? "light"].tabIconDefault,
        },
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        headerTitleStyle: {
          color: Colors[colorScheme ?? "light"].text,
        },
        headerTintColor: Colors[colorScheme ?? "light"].text,
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
          headerRight: () => (
            <NotificationBell colorScheme={colorScheme} router={router} />
          ),
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
          headerRight: () => (
            <NotificationBell colorScheme={colorScheme} router={router} />
          ),
        }}
      />
      {/* Pestaña "Emergencias" - Oculta de la barra de pestañas (`href: null`) */}
      <Tabs.Screen
        name="emergency/index" // Ruta a la pantalla de emergencias.
        options={{
          headerShown: true, // Muestra el encabezado de la pantalla cuando está activa.
          headerTitle: "Emergencias", // Título a mostrar en el encabezado.
          href: null, // Oculta esta pestaña de la barra de navegación inferior.
        }}
      />
      {/* Pestaña "Notificaciones" - Oculta de la barra de pestañas */}
      <Tabs.Screen
        name="notifications/index" // Ruta a la pantalla de notificaciones.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Notificaciones", // Título del encabezado.
          href: null, // Oculta la pestaña.
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
          headerRight: () => (
            <NotificationBell colorScheme={colorScheme} router={router} />
          ),
        }}
      />
      {/* Pestaña "Configuración" - Oculta de la barra de pestañas */}
      <Tabs.Screen
        name="settings/index" // Ruta a la pantalla de configuración.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Configuración", // Título del encabezado.
          href: null, // Oculta la pestaña.
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
        }}
      />
      <Tabs.Screen
        name="car/(screens)/CarScreens/Appointments" // Ruta a la pantalla de citas del vehículo.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Citas", // Título del encabezado.
          href: null, // Oculta la pestaña.
        }}
      />
      <Tabs.Screen
        name="car/(screens)/CarScreens/Maintenancie" // Ruta a la pantalla de mantenimiento del vehículo.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Mantenimiento", // Título del encabezado.
          href: null, // Oculta la pestaña.
        }}
      />
      <Tabs.Screen
        name="car/(screens)/CarScreens/Papers" // Ruta a la pantalla de documentos del vehículo.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Documentos", // Título del encabezado.
          href: null, // Oculta la pestaña.
        }}
      />
      <Tabs.Screen
        name="car/(screens)/CarScreens/Invoice" // Ruta a la pantalla de factura del vehículo.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Factura", // Título del encabezado.
          href: null, // Oculta la pestaña.
        }}
      />
      <Tabs.Screen
        name="car/(screens)/CarScreens/ModalActionCircle" // Ruta a la pantalla de factura del vehículo.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Info", // Título del encabezado.
          href: null, // Oculta la pestaña.
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
        }}
      />
      <Tabs.Screen
        name="home/(screens)/ViewProduct" // Ruta a la pantalla de visualización de productos.
        options={{
          headerShown: true, // Muestra el encabezado.
          headerTitle: "Ver Productos", // Título del encabezado.
          href: null, // Oculta la pestaña.
        }}
      />
    </Tabs>
  );
}
