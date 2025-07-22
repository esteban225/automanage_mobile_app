// EmergencyButton.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmergencyButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Ionicons name="alert-circle" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -30 }],
    zIndex: 1000,
  },
  button: {
    backgroundColor: 'red',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    padding: 10,
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default EmergencyButton;
