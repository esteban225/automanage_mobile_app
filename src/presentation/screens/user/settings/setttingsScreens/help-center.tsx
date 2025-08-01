import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/src/presentation/theme/ThemeContext'; // Ensure this path is correct
import { Feather } from '@expo/vector-icons'; // Import Feather for icons

// Mapping of the first character of the title to Feather icons
const stepIcons = {
  '📝': 'user-plus',    // More specific for account creation
  '🚗': 'plus-circle',  // For adding a vehicle
  '🔔': 'bell',        // Notifications
  '📅': 'calendar',     // Scheduling appointments
  '✨': 'zap',          // For customization/aesthetics (implies a spark)
  '📋': 'file-text',    // For history and invoices
  '📞': 'phone',        // For contact
};

export default function AboutApp() {
  const { theme } = useTheme();

  return (
    <ScrollView contentContainerStyle={[modernCleanStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[modernCleanStyles.title, { color: theme.primary }]}>¡Bienvenido a Automanage!</Text>
      <Text style={[modernCleanStyles.subtitle, { color: theme.text }]}>
        Tu guía completa para mantener tu vehículo en óptimas condiciones.
      </Text>

      {steps.map((step, index) => (
        <View
          key={index}
          style={[
            modernCleanStyles.stepCard,
            { backgroundColor: theme.card, borderColor: theme.border }
          ]}
        >
          <View style={[modernCleanStyles.iconWrapper, { backgroundColor: theme.secondary + '10' }]}>
            <Feather name={stepIcons[step.title.split(' ')[0]]} size={26} color={theme.primary} />
          </View>
          <View style={modernCleanStyles.stepContent}>
            <Text style={[modernCleanStyles.stepTitle, { color: theme.primary }]}>
              {step.title.substring(4)}
            </Text>
            <Text style={[modernCleanStyles.stepDescription, { color: theme.text }]}>
              {step.description}
            </Text>
          </View>
        </View>
      ))}

      <Text style={[modernCleanStyles.footer, { color: theme.secondary }]}>
        Confía en Automanage para cuidar de tu viaje. ¡Siempre contigo! <Feather name="check-circle" size={16} color={theme.secondary} />
      </Text>
    </ScrollView>
  );
}

// Step data (unchanged from your original code, as requested)
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

const modernCleanStyles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 30, // Slightly smaller than previous iteration, but still prominent
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 35, // More space after subtitle
    lineHeight: 24,
    // Color dynamically assigned by theme.text
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically centers icon and text
    padding: 18,
    marginBottom: 18, // Consistent spacing between cards
    borderRadius: 12,
    borderWidth: 1, // Subtle border from theme.border
    // No explicit shadowOffset/shadowOpacity/shadowRadius here for a flatter look
    elevation: 2, // Minimal elevation for Android
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25, // Perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    // Background color dynamically assigned using theme.secondary with 10% opacity
  },
  stepContent: {
    flex: 1, // Allows text content to take up remaining space
  },
  stepTitle: {
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 4, // Less space for a tighter look
    // Color dynamically assigned by theme.primary
  },
  stepDescription: {
    fontSize: 15, // Slightly smaller font for description for better hierarchy
    lineHeight: 22,
    // Color dynamically assigned by theme.text
  },
  footer: {
    marginTop: 40, // Increased margin for the footer
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    // Color dynamically assigned by theme.secondary
  },
});