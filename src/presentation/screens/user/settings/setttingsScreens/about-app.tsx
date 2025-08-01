import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';

export default function AboutApp() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cómo usar la app del taller</Text>

      <View style={styles.card}>
        <Text style={styles.stepTitle}>1. Crea tu cuenta</Text>
        <Text style={styles.stepDescription}>
          Regístrate con tu correo y contraseña para comenzar a gestionar el mantenimiento de tu vehículo. También puedes usar tu cuenta de Google si está disponible.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.stepTitle}>2. Registra tu vehículo</Text>
        <Text style={styles.stepDescription}>
          Añade los datos de tu carro o moto (placa, modelo, marca, año) para que la app pueda brindarte alertas personalizadas y llevar el historial de mantenimiento.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.stepTitle}>3. Recibe alertas de mantenimiento</Text>
        <Text style={styles.stepDescription}>
          La app te notificará cuando sea momento de cambiar aceite, revisar frenos, renovar el SOAT o hacer mantenimiento preventivo según el kilometraje o tiempo.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.stepTitle}>4. Agenda tus citas</Text>
        <Text style={styles.stepDescription}>
          Elige el tipo de servicio que necesitas (mecánico, técnico, revisión, estética) y reserva directamente desde la app en la fecha y hora que prefieras.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.stepTitle}>5. Personaliza tu vehículo</Text>
        <Text style={styles.stepDescription}>
          Accede a servicios de estética como limpieza profunda, polarizado, pintura o accesorios. Puedes ver catálogos y solicitar presupuestos fácilmente.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.stepTitle}>6. Consulta historial y facturas</Text>
        <Text style={styles.stepDescription}>
          Visualiza los mantenimientos realizados, técnicos asignados, repuestos utilizados y los valores pagados. Toda la información queda guardada en tu perfil.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.stepTitle}>7. Contacta al taller</Text>
        <Text style={styles.stepDescription}>
          Si necesitas asistencia o tienes dudas, puedes comunicarte con nuestro equipo de soporte directamente desde la app.
        </Text>
      </View>

      <Text style={styles.footer}>
        ¡Gracias por confiar en nosotros para el cuidado de tu vehículo! 🚗🔧
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F9FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#003C43',
  },
  card: {
    backgroundColor: '#E3FEF7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#135D66',
  },
  stepDescription: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
  footer: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: '#0077cc',
  },
});
