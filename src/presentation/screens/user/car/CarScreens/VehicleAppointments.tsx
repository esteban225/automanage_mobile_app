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
import { useTheme } from '@/src/presentation/theme/ThemeContext'; // Importar el hook de tema

export default function AppointmentForm() {
    // State variables for form inputs
    const [selectedType, setSelectedType] = useState('');
    const [name, setName] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [comments, setComments] = useState('');
    const [date, setDate] = useState(new Date()); // State to store the selected date and time
    const [showDatePicker, setShowDatePicker] = useState(false); // State to control DateTimePicker visibility
    const [mode, setMode] = useState<'date' | 'time'>('date');

    const { theme } = useTheme(); // Usamos el tema actual

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
        // Define dynamic styles for inputs within this function to use 'theme'
        const inputThemedStyle = {
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text,
        };
        const placeholderThemedColor = theme.icon; // Using icon color for placeholders

        switch (selectedType) {
            case 'mantenimiento':
                return (
                    <>
                        <TextInput
                            placeholder="Kilometraje actual"
                            style={[dynamicStyles.input, inputThemedStyle]}
                            placeholderTextColor={placeholderThemedColor}
                            keyboardType="numeric" // Suggest numeric keyboard
                        />
                        <TextInput
                            placeholder="Último servicio"
                            style={[dynamicStyles.input, inputThemedStyle]}
                            placeholderTextColor={placeholderThemedColor}
                        />
                    </>
                );
            case 'revision':
                return (
                    <>
                        <TextInput
                            placeholder="Fecha de última revisión"
                            style={[dynamicStyles.input, inputThemedStyle]}
                            placeholderTextColor={placeholderThemedColor}
                        />
                        <TextInput
                            placeholder="¿Algún problema actual?"
                            style={[dynamicStyles.input, inputThemedStyle]}
                            placeholderTextColor={placeholderThemedColor}
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
                            style={[dynamicStyles.input, inputThemedStyle]}
                            placeholderTextColor={placeholderThemedColor}
                        />
                        <TextInput
                            placeholder="Último cambio de aceite"
                            style={[dynamicStyles.input, inputThemedStyle]}
                            placeholderTextColor={placeholderThemedColor}
                        />
                    </>
                );
            case 'rines':
                return (
                    <>
                        <TextInput
                            placeholder="Estado actual de los rines"
                            style={[dynamicStyles.input, inputThemedStyle]}
                            placeholderTextColor={placeholderThemedColor}
                        />
                        <TextInput
                            placeholder="¿Pintar, pulir o reemplazar?"
                            style={[dynamicStyles.input, inputThemedStyle]}
                            placeholderTextColor={placeholderThemedColor}
                        />
                    </>
                );
            case 'pintura':
                return (
                    <>
                        <TextInput
                            placeholder="Zona a pintar (puerta, capó, etc.)"
                            style={[dynamicStyles.input, inputThemedStyle]}
                            placeholderTextColor={placeholderThemedColor}
                        />
                        <TextInput
                            placeholder="¿Color original o personalizado?"
                            style={[dynamicStyles.input, inputThemedStyle]}
                            placeholderTextColor={placeholderThemedColor}
                        />
                    </>
                );
            case 'llantas':
                return (
                    <>
                        <TextInput
                            placeholder="Estado actual de las llantas"
                            style={[dynamicStyles.input, inputThemedStyle]}
                            placeholderTextColor={placeholderThemedColor}
                        />
                        <TextInput
                            placeholder="¿Revisión, alineación o cambio?"
                            style={[dynamicStyles.input, inputThemedStyle]}
                            placeholderTextColor={placeholderThemedColor}
                        />
                    </>
                );
            case 'tapiceria':
                return (
                    <>
                        <TextInput
                            placeholder="Parte a intervenir (asientos, techo...)"
                            style={[dynamicStyles.input, inputThemedStyle]}
                            placeholderTextColor={placeholderThemedColor}
                        />
                        <TextInput
                            placeholder="¿Deseas limpieza, reparación o cambio?"
                            style={[dynamicStyles.input, inputThemedStyle]}
                            placeholderTextColor={placeholderThemedColor}
                        />
                    </>
                );
            case 'otro':
                return (
                    <TextInput
                        placeholder="Describe tu necesidad"
                        multiline
                        numberOfLines={3}
                        style={[dynamicStyles.input, inputThemedStyle, { height: 80, textAlignVertical: 'top' }]}
                        placeholderTextColor={placeholderThemedColor}
                    />
                );
            default:
                return null;
        }
    };

    // Define styles within the component to access the 'theme' object
    const dynamicStyles = StyleSheet.create({
        container: {
            padding: 20,
            backgroundColor: theme.background, // Use theme background color
            flexGrow: 1, // Allows the ScrollView to grow and cover available space
            justifyContent: 'center', // Centers content vertically if there's extra space
        },
        title: {
            fontSize: 26,
            fontWeight: 'bold',
            color: theme.text, // Use theme text color
            textAlign: 'center',
            marginBottom: 20,
        },
        input: {
            backgroundColor: theme.card, // Use theme card color
            borderColor: theme.border, // Use theme border color
            borderWidth: 1,
            borderRadius: 10,
            padding: 12,
            marginBottom: 15,
            fontSize: 16,
            color: theme.text, // Use theme text color
        },
        secondaryButton: { // This is the final "Agendar cita" button
            backgroundColor: theme.primary, // Use theme primary color
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
            color: theme.buttonText, // Use theme button text color
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        pickerContainer: {
            backgroundColor: theme.card, // Use theme card color
            borderRadius: 10,
            marginBottom: 15,
            borderColor: theme.border, // Use theme border color
            borderWidth: 1,
            padding: 10,
        },
        picker: {
            color: theme.text, // Use theme text color for picker
        },
        label: {
            color: theme.text, // Use theme text color for label
            fontWeight: '600',
            marginBottom: 5,
        },
        datePickerButton: {
            backgroundColor: theme.card, // Use theme card color
            borderColor: theme.border, // Use theme border color
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
            color: theme.text, // Use theme text color
            fontSize: 16,
            textAlign: 'center',
        },
    });

    return (
        <ScrollView contentContainerStyle={dynamicStyles.container}>
            <Text style={dynamicStyles.title}>Formulario de Citas de Vehículos</Text>

            {/* Owner Name Input */}
            <TextInput
                placeholder="Nombre del propietario"
                value={name}
                onChangeText={setName}
                style={dynamicStyles.input}
                placeholderTextColor={theme.icon} // Use theme icon color for placeholder
            />

            {/* Vehicle/Plate Input */}
            <TextInput
                placeholder="Vehículo o placa"
                value={vehicle}
                onChangeText={setVehicle}
                style={dynamicStyles.input}
                placeholderTextColor={theme.icon} // Use theme icon color for placeholder
            />

            {/* Appointment Type Picker */}
            <View style={dynamicStyles.pickerContainer}>
                <Text style={dynamicStyles.label}>Tipo de cita</Text>
                <Picker
                    selectedValue={selectedType}
                    onValueChange={(itemValue) => setSelectedType(itemValue)}
                    style={dynamicStyles.picker}
                    // Platform-specific styling for Picker text (e.g., iOS requires height adjustment)
                    itemStyle={Platform.OS === 'ios' ? { height: 120, color: theme.text } : {}} // Apply theme color to Picker items
                >
                    <Picker.Item label="Selecciona un tipo" value="" color={theme.icon} /> {/* Use theme icon color for placeholder item */}
                    <Picker.Item label="Mantenimiento general" value="mantenimiento" color={theme.text} />
                    <Picker.Item label="Revisión técnica" value="revision" color={theme.text} />
                    <Picker.Item label="Cambio de aceite" value="aceite" color={theme.text} />
                    <Picker.Item label="Rines" value="rines" color={theme.text} />
                    <Picker.Item label="Pintura" value="pintura" color={theme.text} />
                    <Picker.Item label="Llantas" value="llantas" color={theme.text} />
                    <Picker.Item label="Tapicería" value="tapiceria" color={theme.text} />
                    <Picker.Item label="Otro" value="otro" color={theme.text} />
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
                style={[dynamicStyles.input, { height: 100, textAlignVertical: 'top' }]}
                placeholderTextColor={theme.icon} // Use theme icon color for placeholder
            />

            {/* Button to open the date and time picker */}
            <TouchableOpacity
                style={dynamicStyles.datePickerButton}
                onPress={() => {
                    setShowDatePicker(true);
                    setMode('date'); // primero seleccionamos la fecha
                }}
            >
                <Text style={dynamicStyles.datePickerText}>
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
                    // Ensure the text color of the DateTimePicker adapts to the theme
                    textColor={theme.text} // This might not work on all platforms/versions
                />
            )}


            {/* Schedule Appointment Button */}
            <TouchableOpacity style={dynamicStyles.secondaryButton} onPress={handleAppointment}>
                <Text style={dynamicStyles.secondaryButtonText}>Agendar cita</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
