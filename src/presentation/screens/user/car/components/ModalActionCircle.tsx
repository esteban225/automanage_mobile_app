import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

// Tipado de props
interface MaintenancePopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const MaintenancePopup: React.FC<MaintenancePopupProps> = ({ isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.4}
      // useNativeDriver is not strictly needed without MotiView, but can be kept for Modal performance
      useNativeDriver
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.section}>
            <Text style={styles.text}>Nombre</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.text}>Último cambio que se hizo</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.text}>Próxima fecha de cambio</Text>
          </View>

          <View style={styles.statusSection}>
            <View style={styles.statusItem}>
              <View style={styles.circle} />
              <Text>Al día</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={styles.circle} />
              <Text>Deberías revisarlo</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={styles.circle} />
              <Text>Cambio urgente</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MaintenancePopup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdd9b5',
    borderRadius: 16,
    padding: 24,
  },
  box: {
    width: '100%',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  statusSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 8,
  },
  statusItem: {
    alignItems: 'center',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 4,
  },
});