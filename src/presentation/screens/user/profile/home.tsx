import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '@/src/presentation/theme/ThemeContext';

export default function Profile() {
  const { theme } = useTheme();

  const user = {
    name: 'Nombre del Usuario',
    username: '@usuarioejemplo',
    bio: '¡Hola! Soy un desarrollador de React Native apasionado por crear experiencias de usuario increíbles.',
    profilePicture: 'https://placehold.co/150x150/007B8C/FFFFFF?text=Perfil',
    followers: 1234,
    following: 567,
    posts: 42,
  };

  const handleEditProfile = () => {
     router.push('/(user)/settings/(screens)/profile-edit');
  };

  const handleSettings = () => {
    router.push('/(user)/settings');
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      alignItems: 'center',
      paddingVertical: 20,
      backgroundColor: theme.card,
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
      borderColor: theme.primary,
      marginBottom: 10,
    },
    userName: {
      fontSize: 26,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 5,
    },
    username: {
      fontSize: 18,
      color: theme.icon,
      marginBottom: 15,
    },
    editButton: {
      backgroundColor: theme.primary,
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
      marginBottom: 15,
    },
    editButtonText: {
      color: theme.buttonText,
      fontSize: 16,
      fontWeight: '600',
    },
    bio: {
      fontSize: 16,
      color: theme.text,
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
      color: theme.text,
    },
    statLabel: {
      fontSize: 14,
      color: theme.icon,
    },
    body: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 15,
      marginTop: 10,
    },
    postPlaceholder: {
      backgroundColor: theme.border,
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      height: 150,
      marginBottom: 20,
    },
    postText: {
      fontSize: 16,
      color: theme.icon,
    },
    settingsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.card,
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
      color: theme.icon,
    },
  });

  return (
    <ScrollView style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <Image source={{ uri: user.profilePicture }} style={dynamicStyles.profileImage} />
        <Text style={dynamicStyles.userName}>{user.name}</Text>
        <Text style={dynamicStyles.username}>{user.username}</Text>

        <TouchableOpacity style={dynamicStyles.editButton} onPress={handleEditProfile}>
          <Text style={dynamicStyles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <Text style={dynamicStyles.bio}>{user.bio}</Text>

        <View style={dynamicStyles.statsContainer}>
          <View style={dynamicStyles.statItem}>
            <Text style={dynamicStyles.statNumber}>{user.posts}</Text>
            <Text style={dynamicStyles.statLabel}>Publicaciones</Text>
          </View>
          <View style={dynamicStyles.statItem}>
            <Text style={dynamicStyles.statNumber}>{user.followers}</Text>
            <Text style={dynamicStyles.statLabel}>Seguidores</Text>
          </View>
          <View style={dynamicStyles.statItem}>
            <Text style={dynamicStyles.statNumber}>{user.following}</Text>
            <Text style={dynamicStyles.statLabel}>Siguiendo</Text>
          </View>
        </View>
      </View>

      <View style={dynamicStyles.body}>
        <Text style={dynamicStyles.sectionTitle}>Mis Publicaciones</Text>
        <View style={dynamicStyles.postPlaceholder}>
          <Text style={dynamicStyles.postText}>¡Tu contenido de publicaciones va aquí!</Text>
        </View>

        <TouchableOpacity style={dynamicStyles.settingsButton} onPress={handleSettings}>
          <Ionicons name="settings-outline" size={24} color={theme.icon} />
          <Text style={dynamicStyles.settingsButtonText}>Configuración</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}