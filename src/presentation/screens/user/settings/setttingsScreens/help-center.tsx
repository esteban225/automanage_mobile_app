import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

export default function HelpCenter() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Centro de Ayuda</Text>

      <View style={styles.card}>
        <Text style={styles.stepTitle}>📲 ¿Cómo funciona la app?</Text>
        <Text style={styles.stepDescription}>
          Automanage te permite registrar tu vehículo, recibir alertas de mantenimiento, agendar servicios mecánicos o estéticos, y consultar el historial completo de tu auto.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.stepTitle}>🛠 Soporte técnico</Text>
        <Text style={styles.stepDescription}>
          ¿Tienes problemas con la app? Escríbenos o llámanos para ayudarte con cualquier inconveniente que tengas al usar Automanage.
        </Text>
        <Text style={styles.contact}>📧 support@automanage.com</Text>
        <Text style={styles.contact}>📞 +57 300 123 4567</Text>
        <Text style={styles.subNote}>Lunes a Viernes de 8am a 6pm</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.stepTitle}>💬 Chat en línea</Text>
        <Text style={styles.stepDescription}>
          Puedes comunicarte con nosotros directamente desde la sección de configuración de la app. Te responderemos lo antes posible.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.stepTitle}>❓ Preguntas frecuentes</Text>
        <Text style={styles.stepDescription}>
          Consulta nuestra base de conocimiento donde respondemos las preguntas más comunes de nuestros usuarios.
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://automanage.com/faq')}>
          <Text style={styles.link}>Ir a preguntas frecuentes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.stepTitle}>🤝 ¿Tienes un taller o vendes repuestos?</Text>
        <Text style={styles.stepDescription}>
          Puedes unirte a nuestro equipo como taller aliado o proveedor. Gestiona tus servicios desde nuestra plataforma y llega a más clientes.
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://automanage.com')}>
          <Text style={styles.link}>Visita www.automanage.com</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        ¡Gracias por confiar en nosotros! Estamos aquí para ayudarte siempre que lo necesites. 🚗🔧
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
    textAlign: 'justify',
  },
  contact: {
    fontSize: 16,
    marginTop: 6,
    color: '#003C43',
  },
  subNote: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  link: {
    fontSize: 16,
    color: '#0077cc',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: '#0077cc',
  },
});
