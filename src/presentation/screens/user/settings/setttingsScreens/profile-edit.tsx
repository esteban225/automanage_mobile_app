import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/src/presentation/theme/ThemeContext';

// ✅ Importar imagen local por defecto
import defaultProfileImage from '../../../../../../assets/images/Icono_perfil.png'; // Usa ../../../ si no tienes alias

export default function ProfileScreen() {
  const { theme } = useTheme();

  const [editingField, setEditingField] = useState<string | null>(null);

  // ✅ Iniciar con imagen local por defecto
  const [profileImage, setProfileImage] = useState<any>(defaultProfileImage);

  const [fields, setFields] = useState({
    fullName: 'Nombre y Apellido',
    contact: 'Correo o número',
    location: 'Ciudad, País',
  });

  const handleEdit = (key: keyof typeof fields) => {
    setEditingField(key);
  };

  const handleChange = (key: keyof typeof fields, value: string) => {
    setFields({ ...fields, [key]: value });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // ✅ Guardar URI nueva
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
        <Image
          source={typeof profileImage === 'string' ? { uri: profileImage } : profileImage}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setEditingField('fullName')}
        style={styles.editIcon}
      >
        <MaterialIcons name="edit" size={22} color={theme.primary} />
      </TouchableOpacity>

      {(['fullName', 'contact', 'location'] as const).map((key) => (
        <View key={key} style={styles.inputContainer}>
          {editingField === key ? (
            <TextInput
              style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
              value={fields[key]}
              onChangeText={(text) => handleChange(key, text)}
              onBlur={() => setEditingField(null)}
              autoFocus
            />
          ) : (
            <TouchableOpacity onPress={() => handleEdit(key)}>
              <Text style={[styles.inputText, { color: theme.text }]}>
                {fields[key]}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={[styles.button, { borderColor: theme.primary }]}>
        <Text style={[styles.buttonText, { color: theme.primary }]}>Cambiar de cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { borderColor: theme.primary }]}>
        <Text style={[styles.buttonText, { color: theme.primary }]}>
          Cambiar información del vehículo
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    alignItems: 'center',
  },
  imageWrapper: {
    borderRadius: 80,
    overflow: 'hidden',
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#ccc',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  editIcon: {
    position: 'absolute',
    top: 100,
    right: 60,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
  },
  inputText: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
  },
  input: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  button: {
    marginTop: 16,
    padding: 14,
    borderWidth: 1.5,
    borderRadius: 18,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});
