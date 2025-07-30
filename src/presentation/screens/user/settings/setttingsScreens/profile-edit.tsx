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
import { Image as RNImage } from 'react-native';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import { Picker } from '@react-native-picker/picker';

export default function ProfileScreen() {
  const { theme } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<CountryCode>('CO');
  const [country, setCountry] = useState<Country | null>(null);
  const [city, setCity] = useState('Bogotá');

  const [fields, setFields] = useState({
    fullName: 'Nombre y Apellido',
    contact: 'Correo o número',
  });

  const handleChange = (key: keyof typeof fields, value: string) => {
    setFields({ ...fields, [key]: value });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (
      result.assets &&
      result.assets.length > 0 &&
      typeof result.assets[0].uri === 'string'
    ) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const colombiaCities = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'];
  const usaCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];
  const mexicoCities = ['CDMX', 'Guadalajara', 'Monterrey', 'Puebla', 'Cancún'];

  const getCities = () => {
    switch (countryCode) {
      case 'US':
        return usaCities;
      case 'MX':
        return mexicoCities;
      case 'CO':
      default:
        return colombiaCities;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
        <Image
          source={
            typeof profileImage === 'string' && profileImage.trim() !== ''
              ? { uri: profileImage }
              : require("../../../../../../assets/images/Icono_perfil.png")
          }
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {!isEditing && (
        <TouchableOpacity
          onPress={() => setIsEditing(true)}
          style={styles.editIcon}
        >
          <MaterialIcons name="edit" size={22} color={theme.primary} />
        </TouchableOpacity>
      )}

      {(['fullName', 'contact'] as const).map((key) => (
        <View key={key} style={styles.inputContainer}>
          {isEditing ? (
            <TextInput
              style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
              value={fields[key]}
              onChangeText={(text) => handleChange(key, text)}
            />
          ) : (
            <Text style={[styles.inputText, { color: theme.text }]}>
              {fields[key]}
            </Text>
          )}
        </View>
      ))}

      <View style={styles.inputContainer}>
        {isEditing ? (
          <>
            <Text style={{ color: theme.text, marginBottom: 8 }}>País:</Text>
            <CountryPicker
              countryCode={countryCode}
              withFilter
              withFlag
              withCountryNameButton
              onSelect={(country) => {
                setCountryCode(country.cca2);
                setCountry(country);
              }}
              theme={{ backgroundColor: theme.background }}
            />

            <Text style={{ color: theme.text, marginTop: 12 }}>Ciudad:</Text>
            <View style={[styles.input, { padding: 0 }]}>
              <Picker
                selectedValue={city}
                onValueChange={(itemValue) => setCity(itemValue)}
                style={{ color: theme.text }}
              >
                {getCities().map((c) => (
                  <Picker.Item label={c} value={c} key={c} />
                ))}
              </Picker>
            </View>
          </>
        ) : (
          <>
            <Text style={[styles.inputText, { color: theme.text }]}>
              {/* {country ? country.name : 'País no seleccionado'} */}
            </Text>
            <Text style={[styles.inputText, { color: theme.text }]}>
              Ciudad: {city}
            </Text>
          </>
        )}
      </View>

      {isEditing && (
        <TouchableOpacity
          style={[styles.button, { borderColor: theme.primary }]}
          onPress={() => setIsEditing(false)}
        >
          <Text style={[styles.buttonText, { color: theme.primary }]}>Guardar cambios</Text>
        </TouchableOpacity>
      )}

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
    zIndex: 10,
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
