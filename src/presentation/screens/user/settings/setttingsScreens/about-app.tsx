import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/src/presentation/theme/ThemeContext'; // Asegúrate de que esta ruta sea correcta
import { Feather } from '@expo/vector-icons'; // Importa Feather para los iconos

// Mapeo de los primeros caracteres del título a iconos de Feather
const stepIcons = {
  '📝': 'edit',
  '🚗': 'truck',
  '🔔': 'bell',
  '📅': 'calendar',
  '✨': 'star',
  '📋': 'clipboard',
  '📞': 'phone',
};

export default function AboutApp() {
  const { theme } = useTheme();

  return (
    <ScrollView contentContainerStyle={[modernStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[modernStyles.title, { color: theme.primary }]}>Descubre Automanage</Text>
      <Text style={[modernStyles.subtitle, { color: theme.text }]}>
        Tu aliado para el cuidado y gestión de tu vehículo.
      </Text>

      {steps.map((step, index) => (
        <View key={index} style={modernStyles.stepWrapper}>
          <View style={[modernStyles.iconCircle, { backgroundColor: theme.primary + '1A' }]}>
            <Feather name={stepIcons[step.title.split(' ')[0]]} size={30} color={theme.primary} />
          </View>
          <View style={modernStyles.textBlock}>
            <Text style={[modernStyles.stepTitle, { color: theme.primary }]}>
              {step.title.substring(4)}
            </Text>
            <Text style={[modernStyles.stepDescription, { color: theme.text }]}>
              {step.description}
            </Text>
          </View>
        </View>
      ))}

      <Text style={[modernStyles.footer, { color: theme.secondary }]}>
        ¡Gracias por elegirnos! Tu vehículo, nuestra prioridad. <Feather name="shield" size={16} color={theme.secondary} />
      </Text>
    </ScrollView>
  );
}

// Datos de los pasos (sin cambios)
const steps = [
  {
    title: '📝 1. Crea tu cuenta',
    description: 'Regístrate con tu correo y contraseña para comenzar a gestionar el mantenimiento de tu vehículo. También puedes usar tu cuenta de Google si está disponible.',
  },
  {
    title: '🚗 2. Registra tu vehículo',
    description: 'Añade los datos de tu carro o moto (placa, modelo, marca, año) para recibir alertas personalizadas y llevar el historial de mantenimiento.',
  },
  {
    title: '🔔 3. Recibe alertas',
    description: 'Te notificamos cuando sea momento de hacer mantenimiento preventivo, cambiar aceite, renovar el SOAT y más, según el kilometraje o el tiempo.',
  },
  {
    title: '📅 4. Agenda tus citas',
    description: 'Elige el servicio (mecánico, técnico, revisión, estética) y agenda en la fecha y hora que prefieras directamente desde la app.',
  },
  {
    title: '✨ 5. Personaliza tu vehículo',
    description: 'Solicita servicios estéticos como limpieza, polarizado, pintura o accesorios. Consulta catálogos y cotiza fácilmente desde tu celular.',
  },
  {
    title: '📋 6. Historial y facturas',
    description: 'Consulta los servicios realizados, técnicos asignados, repuestos utilizados y valores pagados. Todo queda guardado en tu perfil.',
  },
  {
    title: '📞 7. Contacta al taller',
    description: 'Si necesitas ayuda, puedes comunicarte con nuestro equipo de soporte directamente desde la sección de contacto dentro de la app.',
  },
];

const modernStyles = StyleSheet.create({
  container: {
    paddingVertical: 30, // Más padding vertical
    paddingHorizontal: 25, // Un poco más de padding horizontal
  },
  title: {
    fontSize: 32, // Título más grande y dominante
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40, // Más espacio debajo del subtítulo
    lineHeight: 25,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Alinea el icono y el texto al inicio
    marginBottom: 30, // Espacio entre cada paso
  },
  iconCircle: {
    width: 60, // Tamaño fijo para el círculo del icono
    height: 60,
    borderRadius: 30, // Hace que sea un círculo perfecto
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20, // Espacio a la derecha del círculo
    // El backgroundColor viene del theme.primary con 10% de opacidad
  },
  textBlock: {
    flex: 1, // Permite que el bloque de texto ocupe el resto del espacio
  },
  stepTitle: {
    fontSize: 22, // Título de paso más prominente
    fontWeight: '600',
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 16,
    lineHeight: 24,
    // El color viene del theme.text
  },
  footer: {
    marginTop: 50, // Mucho más espacio arriba del pie de página
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500', // Un poco más de peso para el texto del pie de página
  },
});