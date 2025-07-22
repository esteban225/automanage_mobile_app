import { Tabs } from "expo-router"; // Importa el componente Tabs de Expo Router para la navegación por pestañas.
import { AntDesign } from "@expo/vector-icons"; // Importa el conjunto de iconos AntDesign de @expo/vector-icons.
import { FontAwesome5 } from "@expo/vector-icons"; // Importa el conjunto de iconos FontAwesome 5 de @expo/vector-icons.
import { useColorScheme } from "@/components/useColorScheme"; // Hook personalizado para detectar el esquema de color del sistema (claro/oscuro).
import Colors from "@/constants/Colors"; // Importa un objeto que contiene definiciones de colores para temas claro y oscuro.

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
 * @function UserLayout
 * @description Componente principal que define la estructura de navegación por pestañas para el usuario.
 * Utiliza Expo Router para crear un navegador de pestañas inferior y gestiona las rutas visibles y ocultas.
 * @returns {JSX.Element} Un componente de navegación por pestañas.
 */
export default function UserLayout() {
  // Obtiene el esquema de color actual del sistema (light o dark).
  const colorScheme = useColorScheme();

  return (
    <Tabs
      // Opciones globales aplicadas a todas las pantallas dentro de este navegador de pestañas.
      screenOptions={{
        // Define el color de los iconos y etiquetas de las pestañas activas.
        // Utiliza el esquema de color detectado; si es nulo, por defecto usa 'light'.
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      {/* Pestaña "Vehículo" - Visible en la barra de pestañas */}
      <Tabs.Screen
        name="car/index" // Nombre de la ruta, mapeado a 'app/car/index.tsx'
        options={{
          title: "Vehículo", // Título de la pestaña que se muestra al usuario.
          // Función para renderizar el icono de la pestaña.
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
        }}
      />
      {/* Pestaña "Inicio" - Visible en la barra de pestañas */}
      <Tabs.Screen
        name="index" // Nombre de la ruta, mapeado a 'app/index.tsx'
        options={{
          title: "Inicio", // Título de la pestaña.
          // Renderiza un icono de casa de AntDesign.
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
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
      {/* Pestaña "Perfil" - Visible en la barra de pestañas */}
      <Tabs.Screen
        name="profile/index" // Ruta a la pantalla de perfil.
        options={{
          title: "Perfil", // Título de la pestaña.
          // Renderiza un icono de usuario.
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
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
