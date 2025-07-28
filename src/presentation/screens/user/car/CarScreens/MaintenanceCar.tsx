import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform, // Import Platform for OS-specific adjustments
} from "react-native";
import { MotiView, AnimatePresence } from "moti";
import ImageCar from "../components/ImageCar"; // Assuming this component does not need internal theme changes
import ConfettiCannon from "react-native-confetti-cannon"; // Assuming this component does not need internal theme changes
import { Audio } from "expo-av";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from '@/src/presentation/theme/ThemeContext'; // Import the theme hook

export default function MaintenanceCar() {
  const [showReadyBox, setShowReadyBox] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [scale, setScale] = useState(1);
  const [showCounter, setShowCounter] = useState(false); // Changed to boolean for consistency
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  // --- State for the selected maintenance ID (numeric) ---
  const [maintenanceDescriptionsId, setMaintenanceDescriptionsId] = useState(undefined);

  // --- State for the selected mechanic ID (numeric) ---
  const [selectedMechanicId, setSelectedMechanicId] = useState(undefined);

  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState("#ff0000"); // initial red, will be overridden by theme

  const { theme } = useTheme(); // Use the current theme

  // --- Extended Data for Maintenance Descriptions ---
  const maintenanceDescriptions = [
    {
      id: 1,
      tipo: "Cambio de aceite y revisión de frenos",
      detalle:
        "Se realizó un cambio de aceite completo con filtro nuevo y se inspeccionaron los frenos, ajustando pastillas y revisando discos para un rendimiento óptimo en las calles de Duitama.",
    },
    {
      id: 2,
      tipo: "Cambio de correa de distribución",
      detalle:
        "La correa de distribución fue reemplazada por una nueva de alta calidad, previniendo fallos críticos del motor y asegurando una mayor vida útil de tu vehículo.",
    },
    {
      id: 3,
      tipo: "Cambio de refrigerante",
      detalle:
        "Se drenó el sistema de refrigeración, se limpió y se recargó con refrigerante nuevo. Se realizó una inspección exhaustiva para detectar y reparar posibles fugas, manteniendo la temperatura ideal de tu motor.",
    },
    {
      id: 4,
      tipo: "Aceite de transmisión",
      detalle:
        "Se cambió el aceite de la transmisión y se ajustó el nivel, mejorando la suavidad de los cambios de marcha y prolongando la vida de la caja de velocidades.",
    },
    {
      id: 5,
      tipo: "Cambio de bujes de suspensión",
      detalle:
        "Se escuchaban ruidos al pasar por baches. Se identificaron y reemplazaron los bujes desgastados en la suspensión delantera, restaurando la estabilidad y el confort de la marcha.",
    },
    {
      id: 6,
      tipo: "Revisión de tubos y mangueras",
      detalle:
        "Se inspeccionaron todas las mangueras y tubos del motor. Se encontraron y reemplazaron dos mangueras agrietadas que podrían haber causado fugas y problemas de rendimiento.",
    },
    {
      id: 7,
      tipo: "Diagnóstico electrónico avanzado",
      detalle:
        "Uso de equipo de diagnóstico de última generación para identificar fallos en el sistema electrónico del vehículo, desde el motor hasta los sensores.",
    },
    {
      id: 8,
      tipo: "Alineación y balanceo",
      detalle:
        "Ajuste preciso de la geometría de las ruedas y balanceo de los neumáticos para asegurar un desgaste uniforme y una conducción suave y segura.",
    },
  ];

  // Map for efficient maintenance description lookups
  const maintenanceDescriptionsMap = maintenanceDescriptions.reduce(
    (acc: { [key: number]: typeof maintenanceDescriptions[0] }, item) => {
      acc[item.id] = item;
      return acc;
    },
    {} as { [key: number]: typeof maintenanceDescriptions[0] }
  );

  // Default value for the maintenance Picker
  const defaultMaintenanceDescription = {
    id: undefined,
    tipo: "-- Selecciona un Mantenimiento --",
    detalle: "Elige un tipo de servicio para ver su descripción detallada.",
  };


  const mechanicsList = [
    {
      id: 1,
      nombre: "Carlos López",
      detalle:
        "Especializado en sistemas de **frenos** y **transmisiones** automáticas y manuales. Con 10 años de experiencia, es el indicado para cualquier problema de potencia.",
      photo: { uri: "https://placehold.co/100x100/007B8C/FFFFFF?text=CL" }, // Themed placeholder
    },
    {
      id: 2,
      nombre: "Laura Martínez",
      detalle:
        "Experta en **refrigeración**, sistemas de **aceite de motor** y gestión térmica del vehículo. Siempre asegura que tu motor funcione a la temperatura perfecta.",
      photo: { uri: "https://placehold.co/100x100/4CAF50/FFFFFF?text=LM" }, // Themed placeholder
    },
    {
      id: 3,
      nombre: "Pedro Ramírez",
      detalle:
        "Maestro en **cambios de bujes**, reparaciones de **suspensión** y servicios de **ruedas**. Su trabajo garantiza un viaje suave y seguro en cualquier terreno.",
      photo: { uri: "https://placehold.co/100x100/007B8C/FFFFFF?text=PR" }, // Themed placeholder
    },
    {
      id: 4,
      nombre: "Sofía González",
      detalle:
        "Maneja el **mantenimiento general** y **diagnósticos** complejos. Su ojo experto encuentra problemas antes de que se conviertan en grandes dolores de cabeza.",
      photo: { uri: "https://placehold.co/100x100/4CAF50/FFFFFF?text=SG" }, // Themed placeholder
    },
    {
      id: 5,
      nombre: "Andrés Pérez",
      detalle:
        "Un verdadero especialista en **sistemas eléctricos** del automóvil. Desde problemas con las luces hasta fallos en la computadora del vehículo, Andrés tiene la solución.",
      photo: { uri: "https://placehold.co/100x100/007B8C/FFFFFF?text=AP" }, // Themed placeholder
    },
    {
      id: 6,
      nombre: "Diana Rodríguez",
      detalle:
        "Su área es el **cambio de correas** (distribución, accesorios) y la **revisión profunda del motor**. Con Diana, tu motor estará siempre en su punto.",
      photo: { uri: "https://placehold.co/100x100/4CAF50/FFFFFF?text=DR" }, // Themed placeholder
    },
  ];

  // Map for efficient mechanic lookups
  const mechanicsMap = mechanicsList.reduce(
    (acc: { [key: number]: typeof mechanicsList[0] }, item) => {
      acc[item.id] = item;
      return acc;
    },
    {} as { [key: number]: typeof mechanicsList[0] }
  );

  // Default value for the mechanic Picker
  const defaultMechanic = {
    id: undefined,
    nombre: "-- Selecciona un Mecánico --",
    detalle: "Elige un mecánico para ver su especialidad.",
    photo: { uri: "https://placehold.co/100x100/EEEEEE/000000?text=?" }, // Themed placeholder
  };

  const selectedMechanic =
    selectedMechanicId !== undefined
      ? mechanicsMap[selectedMechanicId]
      : defaultMechanic;

  const maintenanceData = {
    // Maintenance description is selected by the user
    timeLeft: "1 hora y 30 minutos", // This is fixed, but could be dynamic
    cost: "$120.000", // This is fixed, but could be dynamic
    technician: {
      name: selectedMechanic.nombre, // Now dynamic!
      photo: selectedMechanic.photo, // Now dynamic!
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReadyBox(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setScale(1.1);
      setTimeout(() => setScale(1), 400);
    }, 7000);
    return () => clearInterval(pulseInterval);
  }, []);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current * 10); // % of progress

      if (current <= 3) setColor(theme.danger); // red
      else if (current <= 6) setColor(theme.secondary); // yellow (using secondary for a warmer mid-progress color)
      else setColor(theme.primary); // green (using primary for completion)

      if (current >= 10) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [theme]); // Added theme to dependency array to re-run if theme changes

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/wav/mixkit-cartoon-toy-whistle-616.wav")
      );
      soundRef.current = sound;
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const startCounter = () => {
    setTimeout(() => {
      setShowCounter(true);
      const start = Date.now();
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const diff = now - start;
        const seconds = Math.floor(diff / 1000);
        if (seconds <= 86400) {
          setElapsedTime(seconds);
        } else {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
          }
        }
      }, 1000);
    }, 3000);
  };

  const handlePress = async () => {
    setShowFinalMessage(true);
    setShowReadyBox(false);
    await playSound();
    startCounter();
  };

  const formatElapsedTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs > 0 ? `${hrs}h ` : ""}${mins > 0 ? `${mins}m ` : ""}${secs}s`;
  };

  // --- New logic to get the selected description ---
  const selectedMaintenance =
    maintenanceDescriptionsId !== undefined
      ? maintenanceDescriptionsMap[maintenanceDescriptionsId]
      : defaultMaintenanceDescription;
  // ------------------------------------------------------------

  // Define styles within the component to access the 'theme' object
  const dynamicStyles = StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
      backgroundColor: theme.background, // Use theme background color
      padding: 20,
    },
    card: {
      backgroundColor: theme.card, // Use theme card color
      borderRadius: 16,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 4,
    },
    section: {
      marginTop: 20,
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme.text, // Use theme text color
      marginBottom: 8,
    },
    box: {
      backgroundColor: theme.card, // Use theme card color
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border, // Use theme border color
    },
    text: {
      fontSize: 16,
      color: theme.text, // Use theme text color
    },
    techBox: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    techImage: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    techDetails: {
      flex: 1, // To make the text occupy the remaining space
    },
    text_name: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.text, // Use theme text color
    },
    text_detail: {
      fontSize: 14,
      color: theme.icon, // Use theme icon color for softer text
    },
    readyBox: {
      backgroundColor: theme.primary, // Use theme primary color for the ready box
      marginTop: 20,
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.buttonText, // Use theme button text color
      marginBottom: 6,
    },
    readyText: {
      fontSize: 16,
      color: theme.buttonText, // Use theme button text color
      marginBottom: 6,
    },
    costText: {
      fontSize: 16,
      color: theme.buttonText, // Use theme button text color
      marginBottom: 12,
    },
    button: {
      backgroundColor: theme.secondary, // Use theme secondary color for the button
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      alignSelf: "flex-start",
    },
    buttonText: {
      color: theme.buttonText, // Use theme button text color
      fontWeight: "bold",
      fontSize: 16,
    },
    finalBox: {
      backgroundColor: theme.primary, // Use theme primary color for the final box
      marginTop: 20,
    },
    finalText: {
      fontSize: 16,
      color: theme.buttonText, // Use theme button text color
      marginBottom: 6,
    },
    counterBox: {
      marginTop: 10,
      backgroundColor: theme.background, // Use theme background color for counter box
      padding: 10,
      borderRadius: 10,
    },
    counterText: {
      fontSize: 16,
      color: theme.text, // Use theme text color
    },
    progressContainer: {
      width: "100%",
      height: 10,
      backgroundColor: theme.border, // Use theme border color for the progress bar background
      borderRadius: 8,
      overflow: "hidden",
    },
    progressBar: {
      height: "100%",
      borderRadius: 8,
    },
    timeLabels: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 4,
      paddingHorizontal: 2,
    },
    timeText: {
      fontSize: 12,
      color: theme.text, // Use theme text color
    },
    pickerWrapper: {
      borderWidth: 1,
      borderColor: theme.border, // Use theme border color
      borderRadius: 12,
      marginBottom: 10,
      backgroundColor: theme.card, // Use theme card color
      overflow: "hidden",
    },
    picker: {
      height: 50,
      width: "100%",
      color: theme.text, // Use theme text color for the picker
    },
    pickerItem: {
      fontSize: 16,
      // On iOS, you might need to adjust height for picker items
      ...Platform.select({
        ios: {
          height: 120, // Adjust as needed for iOS
        },
      }),
    },
  });

  return (
    <ScrollView contentContainerStyle={dynamicStyles.scrollContent}>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
        style={dynamicStyles.card}
      >
        <ImageCar />

        {/* Maintenance Description Section */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.title}>Descripción del mantenimiento</Text>
          <View style={dynamicStyles.pickerWrapper}>
            <Picker
              style={dynamicStyles.picker}
              selectedValue={maintenanceDescriptionsId}
              onValueChange={(itemValue) =>
                setMaintenanceDescriptionsId(itemValue)
              }
            >
              <Picker.Item
                label={defaultMaintenanceDescription.tipo}
                value={defaultMaintenanceDescription.id}
                style={dynamicStyles.pickerItem}
                color={theme.icon} // Apply theme color to default picker item
              />
              {maintenanceDescriptions.map((mant) => (
                <Picker.Item
                  key={mant.id}
                  label={mant.tipo}
                  value={mant.id}
                  style={dynamicStyles.pickerItem}
                  color={theme.text} // Apply theme color to picker items
                />
              ))}
            </Picker>
          </View>
          <View style={dynamicStyles.box}>
            <Text style={dynamicStyles.text}>{selectedMaintenance.detalle}</Text>
          </View>
        </View>

        {/* Remaining Time Section */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.title}>Tiempo restante para que esté listo</Text>
          <View style={dynamicStyles.box}>
            <Text style={dynamicStyles.text}>{maintenanceData.timeLeft}</Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={dynamicStyles.progressContainer}>
            <View
              style={[
                dynamicStyles.progressBar,
                { width: `${progress}%`, backgroundColor: color },
              ]}
            />
          </View>
          <View style={dynamicStyles.timeLabels}>
            <Text style={dynamicStyles.timeText}>0s</Text>
            <Text style={dynamicStyles.timeText}>3s</Text>
            <Text style={dynamicStyles.timeText}>6s</Text>
            <Text style={dynamicStyles.timeText}>9s</Text>
            <Text style={dynamicStyles.timeText}>10s</Text>
          </View>
        </View>

        {/* Animated Green Box */}
        <AnimatePresence>
          {showReadyBox && !showFinalMessage && (
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale }}
              transition={{ type: "timing", duration: 500 }}
              style={[dynamicStyles.box, dynamicStyles.readyBox]}
            >
              <Text style={dynamicStyles.name}>Daniela</Text>
              <Text style={dynamicStyles.readyText}>
                Tu auto ya está listo. Puedes ir a recogerlo.
              </Text>
              <Text style={dynamicStyles.costText}>Costo: {maintenanceData.cost}</Text>
              <TouchableOpacity style={dynamicStyles.button} onPress={handlePress}>
                <Text style={dynamicStyles.buttonText}>Voy por él</Text>
              </TouchableOpacity>
            </MotiView>
          )}
        </AnimatePresence>

        {/* Final Message and Counter */}
        <AnimatePresence>
          {showFinalMessage && (
            <MotiView
              from={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 600 }}
              style={[dynamicStyles.box, dynamicStyles.finalBox]}
            >
              <Text style={dynamicStyles.finalText}>¡Gracias, Daniela! 🤗</Text>
              <Text style={dynamicStyles.finalText}>
                Fue un gusto arreglar tu auto. Esperamos verte pronto.
              </Text>

              {showCounter && (
                <MotiView
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 300 }}
                  style={dynamicStyles.counterBox}
                >
                  <Text style={dynamicStyles.counterText}>
                    Tu auto estuvo listo hace {formatElapsedTime(elapsedTime)}
                  </Text>
                </MotiView>
              )}
              <ConfettiCannon
                count={70}
                origin={{ x: 180, y: -10 }}
                fadeOut
                autoStart
              />
            </MotiView>
          )}
        </AnimatePresence>

        {/* Technician Selection and Details Section */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.title}>
            Persona que está realizando el mantenimiento
          </Text>
          {/* Picker to select the mechanic */}
          <View style={dynamicStyles.pickerWrapper}>
            <Picker
              style={dynamicStyles.picker}
              selectedValue={selectedMechanicId}
              onValueChange={(itemValue) =>
                setSelectedMechanicId(itemValue)
              }
            >
              <Picker.Item
                label={defaultMechanic.nombre}
                value={defaultMechanic.id}
                style={dynamicStyles.pickerItem}
                color={theme.icon} // Apply theme color to default picker item
              />
              {mechanicsList.map((mechanic) => (
                <Picker.Item
                  key={mechanic.id}
                  label={mechanic.nombre}
                  value={mechanic.id}
                  style={dynamicStyles.pickerItem}
                  color={theme.text} // Apply theme color to picker items
                />
              ))}
            </Picker>
          </View>

          {/* Details of the selected technician */}
          <View style={[dynamicStyles.box, dynamicStyles.techBox]}>
            <Image source={selectedMechanic.photo} style={dynamicStyles.techImage} />
            <View style={dynamicStyles.techDetails}>
              <Text style={dynamicStyles.text_name}>{selectedMechanic.nombre}</Text>
              <Text style={dynamicStyles.text_detail}>{selectedMechanic.detalle}</Text>
            </View>
          </View>
        </View>
      </MotiView>
    </ScrollView>
  );
}
        