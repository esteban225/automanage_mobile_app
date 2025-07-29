import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useTheme } from '@/src/presentation/theme/ThemeContext';

export default function Profile() {
  const { theme } = useTheme();

  const [profilePicture, setProfilePicture] = useState('https://placehold.co/150x150/007B8C/FFFFFF?text=Perfil');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Nombre del Usuario');
  const [username, setUsername] = useState('@usuarioejemplo');
  const [bio, setBio] = useState('¡Hola! Soy un desarrollador de React Native apasionado por crear experiencias de usuario increíbles.');

  const userStats = {
    followers: 1234,
    following: 567,
    posts: 42,
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería para cambiar la foto de perfil');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSettings = () => {
    router.push('/(user)/settings');
  };

  const dynamicStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
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
    profileImageContainer: {
      position: 'relative',
      marginBottom: 10,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: theme.primary,
    },
    editIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: theme.primary,
      padding: 6,
      borderRadius: 20,
    },
    userName: { fontSize: 26, fontWeight: 'bold', color: theme.text, marginBottom: 5 },
    username: { fontSize: 18, color: theme.icon, marginBottom: 15 },
    input: {
      borderBottomWidth: 1,
      borderColor: theme.border,
      color: theme.text,
      fontSize: 16,
      marginBottom: 10,
      width: '80%',
      textAlign: 'center',
    },
    bio: { fontSize: 16, color: theme.text, textAlign: 'center', paddingHorizontal: 20, marginBottom: 20 },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingHorizontal: 20,
    },
    statItem: { alignItems: 'center' },
    statNumber: { fontSize: 20, fontWeight: 'bold', color: theme.text },
    statLabel: { fontSize: 14, color: theme.icon },
    body: { padding: 20 },
    sectionTitle: { fontSize: 22, fontWeight: 'bold', color: theme.text, marginBottom: 15, marginTop: 10 },
    postPlaceholder: {
      backgroundColor: theme.border,
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      height: 150,
      marginBottom: 20,
    },
    postText: { fontSize: 16, color: theme.icon },
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
    settingsButtonText: { marginLeft: 10, fontSize: 18, color: theme.icon },
    editToggle: {
      position: 'absolute',
      top: 15,
      right: 15,
      padding: 6,
      backgroundColor: theme.primary,
      borderRadius: 20,
    },
  });

  return (
    <ScrollView style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <TouchableOpacity style={dynamicStyles.editToggle} onPress={toggleEdit}>
          <Ionicons name={isEditing ? 'checkmark-outline' : 'pencil-outline'} size={20} color={theme.buttonText} />
        </TouchableOpacity>

        <TouchableOpacity style={dynamicStyles.profileImageContainer} onPress={pickImage}>
          <Image source={{ uri: profilePicture }} style={dynamicStyles.profileImage} />
          <View style={dynamicStyles.editIcon}>
            <Ionicons name="camera" size={16} color={theme.buttonText} />
          </View>
        </TouchableOpacity>

        {isEditing ? (
          <>
            <TextInput value={name} onChangeText={setName} style={dynamicStyles.input} />
            <TextInput value={username} onChangeText={setUsername} style={dynamicStyles.input} />
          </>
        ) : (
          <>
            <Text style={dynamicStyles.userName}>{name}</Text>
            <Text style={dynamicStyles.username}>{username}</Text>
          </>
        )}

        <Text style={dynamicStyles.bio}>
          {isEditing ? (
            <TextInput
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={3}
              style={[dynamicStyles.input, { textAlign: 'center' }]}
            />
          ) : (
            bio
          )}
        </Text>

        <View style={dynamicStyles.statsContainer}>
          <View style={dynamicStyles.statItem}>
            <Text style={dynamicStyles.statNumber}>{userStats.posts}</Text>
            <Text style={dynamicStyles.statLabel}>Publicaciones</Text>
          </View>
          <View style={dynamicStyles.statItem}>
            <Text style={dynamicStyles.statNumber}>{userStats.followers}</Text>
            <Text style={dynamicStyles.statLabel}>Seguidores</Text>
          </View>
          <View style={dynamicStyles.statItem}>
            <Text style={dynamicStyles.statNumber}>{userStats.following}</Text>
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
