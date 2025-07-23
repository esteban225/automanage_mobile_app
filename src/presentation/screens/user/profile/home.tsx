import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Si usas Expo, o @fortawesome/react-native-fontawesome para otros
import { router } from 'expo-router';

export default function Profile() {
  const user = {
    name: 'Nombre del Usuario',
    username: '@usuarioejemplo',
    bio: '¡Hola! Soy un desarrollador de React Native apasionado por crear experiencias de usuario increíbles.',
    profilePicture: 'https://via.placeholder.com/150', // Reemplaza con una URL de imagen real o una imagen local
    followers: 1234,
    following: 567,
    posts: 42,
  };

  const handleEditProfile = () => {
    // Lógica para navegar a la pantalla de edición de perfil
    console.log('Editar perfil presionado');
  };

  const handleSettings = () => {
 
    router.push('/(user)/settings')
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>

        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <Text style={styles.bio}>{user.bio}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.posts}</Text>
            <Text style={styles.statLabel}>Publicaciones</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.followers}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.following}</Text>
            <Text style={styles.statLabel}>Siguiendo</Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        {/* Aquí puedes añadir más secciones, como publicaciones, galerías, etc. */}
        <Text style={styles.sectionTitle}>Mis Publicaciones</Text>
        {/* Ejemplo de una sección de publicaciones (puedes usar FlatList para listas reales) */}
        <View style={styles.postPlaceholder}>
          <Text style={styles.postText}>¡Tu contenido de publicaciones va aquí!</Text>
        </View>

        <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
          <Ionicons name="settings-outline" size={24} color="#555" />
          <Text style={styles.settingsButtonText}>Configuración</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5', // Un gris claro para el fondo
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#007bff', // Un azul vibrante para el borde
    marginBottom: 10,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  username: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bio: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
  },
  body: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  postPlaceholder: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    marginBottom: 20,
  },
  postText: {
    fontSize: 16,
    color: '#777',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingsButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#555',
  },
});