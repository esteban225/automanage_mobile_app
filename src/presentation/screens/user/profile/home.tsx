import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '@/src/presentation/theme/ThemeContext';
import * as ImagePicker from 'expo-image-picker';
import perfilIcon from '../../../../../assets/images/Icono_perfil.png'; // Imagen local

export default function Profile() {
  const { theme } = useTheme();

  const [editName, setEditName] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [editBio, setEditBio] = useState(false);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState(
    '¡Hola! Soy un desarrollador de React Native apasionado por crear experiencias de usuario increíbles.'
  );

  const defaultProfile = perfilIcon;
  const [image, setImage] = useState<string | number>(defaultProfile); // <- Estado corregido

  const user = {
    name: name || 'Nombre del Usuario',
    username: username ? `@${username}` : '@usuarioejemplo',
    bio,
    profilePicture: image,
    followers: 1234,
    following: 567,
    posts: 42,
  };

  const isEditing = editName || editUsername || editBio;

  const handleSettings = () => {
    router.push('/(user)/settings');
  };

  const handleSave = () => {
    setEditName(false);
    setEditUsername(false);
    setEditBio(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
    cameraIconContainer: {
      position: 'absolute',
      bottom: 5,
      right: 5,
      backgroundColor: theme.primary,
      borderRadius: 20,
      padding: 5,
      borderWidth: 2,
      borderColor: theme.background,
    },
    rowEditable: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    input: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.text,
      borderBottomWidth: 1,
      borderColor: theme.primary,
      marginRight: 5,
      textAlign: 'center',
      paddingVertical: 4,
    },
    inputSmall: {
      fontSize: 18,
      color: theme.text,
      borderBottomWidth: 1,
      borderColor: theme.primary,
      textAlign: 'center',
      paddingVertical: 4,
    },
    editIcon: {
      marginLeft: 8,
    },
    bio: {
      color: '#aaa',
      fontSize: 14,
      textAlign: 'center',
      maxWidth: '90%',
    },
    bioInput: {
      color: '#aaa',
      fontSize: 14,
      textAlign: 'center',
      maxWidth: '90%',
      paddingHorizontal: 20,
    },
    bioContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
      paddingHorizontal: 20,
      position: 'relative',
    },
    editBioButton: {
      position: 'absolute',
      top: 0,
      right: 0,
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
    saveButton: {
      marginTop: 10,
      backgroundColor: theme.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <ScrollView style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        {/* Imagen editable con ícono de cámara */}
        <View style={{ position: 'relative' }}>
          <Image
            source={
              typeof image === 'string'
                ? { uri: image }
                : image
            }
            style={dynamicStyles.profileImage}
          />
          <TouchableOpacity onPress={pickImage} style={dynamicStyles.cameraIconContainer}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Nombre editable */}
        <View style={dynamicStyles.rowEditable}>
          {editName ? (
            <TextInput
              style={dynamicStyles.input}
              placeholder="Nombre del Usuario"
              placeholderTextColor={theme.icon}
              value={name}
              onChangeText={setName}
              autoFocus
            />
          ) : (
            <>
              <Text style={dynamicStyles.input}>{user.name}</Text>
              <TouchableOpacity onPress={() => setEditName(true)}>
                <Ionicons name="pencil" size={20} color={theme.icon} style={dynamicStyles.editIcon} />
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Username editable */}
        <View style={dynamicStyles.rowEditable}>
          {editUsername ? (
            <TextInput
              style={dynamicStyles.inputSmall}
              placeholder="@usuarioejemplo"
              placeholderTextColor={theme.icon}
              value={username}
              onChangeText={setUsername}
              autoFocus
            />
          ) : (
            <>
              <Text style={dynamicStyles.inputSmall}>{user.username}</Text>
              <TouchableOpacity onPress={() => setEditUsername(true)}>
                <Ionicons name="pencil" size={18} color={theme.icon} style={dynamicStyles.editIcon} />
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={{ height: 10 }} />

        {/* Bio editable */}
        {editBio ? (
          <TextInput
            style={dynamicStyles.bioInput}
            placeholder="Tu biografía"
            placeholderTextColor={theme.icon}
            value={bio}
            onChangeText={setBio}
            multiline
            autoFocus
          />
        ) : (
          <View style={dynamicStyles.bioContainer}>
            <Text style={dynamicStyles.bio}>{user.bio}</Text>
            <TouchableOpacity onPress={() => setEditBio(true)} style={dynamicStyles.editBioButton}>
              <Ionicons name="pencil" size={16} color={theme.icon} />
            </TouchableOpacity>
          </View>
        )}

        {/* Botón de guardar cambios */}
        {isEditing && (
          <TouchableOpacity onPress={handleSave} style={dynamicStyles.saveButton}>
            <Text style={dynamicStyles.saveButtonText}>Guardar cambios</Text>
          </TouchableOpacity>
        )}

        {/* Estadísticas */}
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

      {/* Publicaciones + Configuración */}
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
