import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert, // Using Alert as per the original code
    Platform, // Import Platform for OS-specific adjustments
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'; // Date and time picker component
import moment from 'moment'; // For formatting dates
import { useFocusEffect } from '@react-navigation/native'; // For resetting states when screen is focused

export default function AppointmentForm() {
    // State variables for form inputs
    const [selectedType, setSelectedType] = useState('');
    const [name, setName] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [comments, setComments] = useState('');
    const [date, setDate] = useState(new Date()); // State to store the selected date and time
    const [showDatePicker, setShowDatePicker] = useState(false); // State to control DateTimePicker visibility
    const [mode, setMode] = useState<'date' | 'time'>('date');


    // Reset form fields when the screen comes into focus
    // useCallback ensures the function isn't recreated on every render
    useFocusEffect(
        useCallback(() => {
            setSelectedType('');
            setName('');
            setVehicle('');
            setComments('');
            setDate(new Date()); // Reset date to current date
            setShowDatePicker(false);
        }, []) // Empty dependencies array means it runs once on mount and when screen is focused
    );

    /**
     * Handles the appointment scheduling logic.
     * Displays an alert with the appointment details.
     */
    const handleAppointment = () => {
        // Basic validation to ensure required fields are filled
        if (!name || !vehicle || !selectedType || !date) {
            Alert.alert('Error', 'Por favor, completa todos los campos obligatorios para agendar tu cita.');
            return;
        }

        // Format the date to display in the alert
        const formattedDate = moment(date).format('dddd D [de] MMMM [a las] h:mm A');

        // Use Alert to show appointment confirmation.
        // NOTE: In a production environment, consider using a custom modal instead of Alert
        // for a better user experience and customization.
        Alert.alert(
            'Cita agendada',
            `¡Ya agendaste tu cita para ${selectedType}!\nTe esperamos el ${formattedDate}.`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        // Optionally, reset the form fields after successful submission
                        setSelectedType('');
                        setName('');
                        setVehicle('');
                        setComments('');
                        setDate(new Date());
                        setShowDatePicker(false);
                    },
                },
            ]
        );
    };

    /**
     * Renders additional form fields based on the selected appointment type.
     */
    const renderFormByType = () => {
        switch (selectedType) {
            case 'mantenimiento':
                return (
                    <>
                        <TextInput
                            placeholder="Kilometraje actual"
                            style={styles.input}
                            placeholderTextColor="#135D66"
                            keyboardType="numeric" // Suggest numeric keyboard
                        />
                        <TextInput
                            placeholder="Último servicio"
                            style={styles.input}
                            placeholderTextColor="#135D66"
                        />
                    </>
                );
            case 'revision':
                return (
                    <>
                        <TextInput
                            placeholder="Fecha de última revisión"
                            style={styles.input}
                            placeholderTextColor="#135D66"
                        />
                        <TextInput
                            placeholder="¿Algún problema actual?"
                            style={styles.input}
                            placeholderTextColor="#135D66"
                            multiline
                            numberOfLines={2}
                        />
                    </>
                );
            case 'aceite':
                return (
                    <>
                        <TextInput
                            placeholder="Tipo de aceite usado"
                            style={styles.input}
                            placeholderTextColor="#135D66"
                        />
                        <TextInput
                            placeholder="Último cambio de aceite"
                            style={styles.input}
                            placeholderTextColor="#135D66"
                        />
                    </>
                );
            case 'rines':
                return (
                    <>
                        <TextInput
                            placeholder="Estado actual de los rines"
                            style={styles.input}
                            placeholderTextColor="#135D66"
                        />
                        <TextInput
                            placeholder="¿Pintar, pulir o reemplazar?"
                            style={styles.input}
                            placeholderTextColor="#135D66"
                        />
                    </>
                );
            case 'pintura':
                return (
                    <>
                        <TextInput
                            placeholder="Zona a pintar (puerta, capó, etc.)"
                            style={styles.input}
                            placeholderTextColor="#135D66"
                        />
                        <TextInput
                            placeholder="¿Color original o personalizado?"
                            style={styles.input}
                            placeholderTextColor="#135D66"
                        />
                    </>
                );
            case 'llantas':
                return (
                    <>
                        <TextInput
                            placeholder="Estado actual de las llantas"
                            style={styles.input}
                            placeholderTextColor="#135D66"
                        />
                        <TextInput
                            placeholder="¿Revisión, alineación o cambio?"
                            style={styles.input}
                            placeholderTextColor="#135D66"
                        />
                    </>
                );
            case 'tapiceria':
                return (
                    <>
                        <TextInput
                            placeholder="Parte a intervenir (asientos, techo...)"
                            style={styles.input}
                            placeholderTextColor="#135D66"
                        />
                        <TextInput
                            placeholder="¿Deseas limpieza, reparación o cambio?"
                            style={styles.input}
                            placeholderTextColor="#135D66"
                        />
                    </>
                );
            case 'otro':
                return (
                    <TextInput
                        placeholder="Describe tu necesidad"
                        multiline
                        numberOfLines={3}
                        style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                        placeholderTextColor="#135D66"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Formulario de Citas de Vehículos</Text>

            {/* Owner Name Input */}
            <TextInput
                placeholder="Nombre del propietario"
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholderTextColor="#135D66"
            />

            {/* Vehicle/Plate Input */}
            <TextInput
                placeholder="Vehículo o placa"
                value={vehicle}
                onChangeText={setVehicle}
                style={styles.input}
                placeholderTextColor="#135D66"
            />

            {/* Appointment Type Picker */}
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Tipo de cita</Text>
                <Picker
                    selectedValue={selectedType}
                    onValueChange={(itemValue) => setSelectedType(itemValue)}
                    style={styles.picker}
                    // Platform-specific styling for Picker text (e.g., iOS requires height adjustment)
                    itemStyle={Platform.OS === 'ios' ? { height: 120 } : {}}
                >
                    <Picker.Item label="Selecciona un tipo" value="" />
                    <Picker.Item label="Mantenimiento general" value="mantenimiento" />
                    <Picker.Item label="Revisión técnica" value="revision" />
                    <Picker.Item label="Cambio de aceite" value="aceite" />
                    <Picker.Item label="Selecciona un tipo" value="" />
                    <Picker.Item label="Mantenimiento general" value="mantenimiento" />
                    <Picker.Item label="Revisión técnica" value="revision" />
                    <Picker.Item label="Cambio de aceite" value="aceite" />
                    <Picker.Item label="Rines" value="rines" />
                    <Picker.Item label="Pintura" value="pintura" />
                    <Picker.Item label="Llantas" value="llantas" />
                    <Picker.Item label="Tapicería" value="tapiceria" />
                    <Picker.Item label="Otro" value="otro" />
                </Picker>
            </View>

            {/* Render additional fields based on selected appointment type */}
            {renderFormByType()}

            {/* Additional Comments Input */}
            <TextInput
                placeholder="Comentarios adicionales"
                value={comments}
                onChangeText={setComments}
                multiline
                numberOfLines={4}
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                placeholderTextColor="#135D66"
            />

            {/* Button to open the date and time picker */}
            <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => {
                    setShowDatePicker(true);
                    setMode('date'); // primero seleccionamos la fecha
                }}
            >
                <Text style={styles.datePickerText}>
                    Selecciona fecha y hora: {moment(date).format('DD/MM/YYYY h:mm A')}
                </Text>
            </TouchableOpacity>

            {/* DateTimePicker component: only shown when showDatePicker is true.
          - value: The currently selected date and time.
          - mode: "datetime" ensures both date and time selectors appear.
                  Use "date" for date only, "time" for time only.
          - display: "default" uses the native OS interface.
          - onChange: Fired when the user selects a date/time.
      */}
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode={mode}
                    display="default"
                    onChange={(event, selectedDate) => {
                        if (event.type === 'dismissed') {
                            setShowDatePicker(false);
                            return;
                        }

                        if (mode === 'date') {
                            const currentDate = selectedDate || date;
                            setDate(currentDate);
                            setMode('time'); // luego pedimos la hora
                            setShowDatePicker(true);
                        } else if (mode === 'time') {
                            const currentTime = selectedDate || date;
                            const combinedDateTime = new Date(date);
                            combinedDateTime.setHours(currentTime.getHours());
                            combinedDateTime.setMinutes(currentTime.getMinutes());
                            setDate(combinedDateTime);
                            setShowDatePicker(false); // cerrar después de la hora
                        }
                    }}
                />
            )}


            {/* Schedule Appointment Button */}
            <TouchableOpacity style={styles.secondaryButton} onPress={handleAppointment}>
                <Text style={styles.secondaryButtonText}>Agendar cita</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#E3FEF7',
        flexGrow: 1, // Allows the ScrollView to grow and cover available space
        justifyContent: 'center', // Centers content vertically if there's extra space
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#003C43',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderColor: '#135D66',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        color: '#003C43',
    },
    secondaryButton: { // This is the final "Agendar cita" button
        backgroundColor: '#77B0AA',
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    secondaryButtonText: {
        color: '#003C43',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        borderColor: '#135D66',
        borderWidth: 1,
        padding: 10,
    },
    picker: {
        color: '#003C43',
    },
    label: {
        color: '#135D66',
        fontWeight: '600',
        marginBottom: 5,
    },
    datePickerButton: {
        backgroundColor: '#fff',
        borderColor: '#135D66',
        borderWidth: 1,
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    datePickerText: {
        color: '#003C43',
        fontSize: 16,
        textAlign: 'center',
    },
});
