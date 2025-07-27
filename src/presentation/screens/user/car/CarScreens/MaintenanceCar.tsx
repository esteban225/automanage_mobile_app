import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MotiView, AnimatePresence } from "moti";
import ImageCar from "../components/ImageCar";
import ConfettiCannon from "react-native-confetti-cannon";
import { Audio } from "expo-av";
import { Picker } from "@react-native-picker/picker";

export default function MaintenanceCar() {
  const [showReadyBox, setShowReadyBox] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [scale, setScale] = useState(1);
  const [showCounter, setShowCounter] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  // --- Estado para el ID del mantenimiento seleccionado (numérico) ---
  const [maintenanceDescriptionsId, setMaintenanceDescriptionsId] = useState<
    number | undefined
  >(undefined);

  // --- Estado para el ID del mecánico seleccionado (numérico) ---
  const [selectedMechanicId, setSelectedMechanicId] = useState<
    number | undefined
  >(undefined);

  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState("#ff0000"); // rojo inicial

  // --- Datos extendidos para Descripciones de Mantenimiento ---
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

  // Map para búsquedas eficientes de descripciones de mantenimiento
  const maintenanceDescriptionsMap = maintenanceDescriptions.reduce(
    (acc, item) => {
      acc[item.id] = item;
      return acc;
    },
    {} as { [key: number]: typeof maintenanceDescriptions[0] }
  );

  // Valor por defecto para el Picker de mantenimiento
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
      photo: { uri: "https://via.placeholder.com/100/A7D397/000000?text=CL" },
    },
    {
      id: 2,
      nombre: "Laura Martínez",
      detalle:
        "Experta en **refrigeración**, sistemas de **aceite de motor** y gestión térmica del vehículo. Siempre asegura que tu motor funcione a la temperatura perfecta.",
      photo: { uri: "https://via.placeholder.com/100/F5C9A9/000000?text=LM" },
    },
    {
      id: 3,
      nombre: "Pedro Ramírez",
      detalle:
        "Maestro en **cambios de bujes**, reparaciones de **suspensión** y servicios de **ruedas**. Su trabajo garantiza un viaje suave y seguro en cualquier terreno.",
      photo: { uri: "https://via.placeholder.com/100/D0B8A8/000000?text=PR" },
    },
    {
      id: 4,
      nombre: "Sofía González",
      detalle:
        "Maneja el **mantenimiento general** y **diagnósticos** complejos. Su ojo experto encuentra problemas antes de que se conviertan en grandes dolores de cabeza.",
      photo: { uri: "https://via.placeholder.com/100/B6D8F2/000000?text=SG" },
    },
    {
      id: 5,
      nombre: "Andrés Pérez",
      detalle:
        "Un verdadero especialista en **sistemas eléctricos** del automóvil. Desde problemas con las luces hasta fallos en la computadora del vehículo, Andrés tiene la solución.",
      photo: { uri: "https://via.placeholder.com/100/EAD8CE/000000?text=AP" },
    },
    {
      id: 6,
      nombre: "Diana Rodríguez",
      detalle:
        "Su área es el **cambio de correas** (distribución, accesorios) y la **revisión profunda del motor**. Con Diana, tu motor estará siempre en su punto.",
      photo: { uri: "https://via.placeholder.com/100/ADD8E6/000000?text=DR" },
    },
  ];

  // Map para búsquedas eficientes de mecánicos
  const mechanicsMap = mechanicsList.reduce(
    (acc, item) => {
      acc[item.id] = item;
      return acc;
    },
    {} as { [key: number]: typeof mechanicsList[0] }
  );

  // Valor por defecto para el Picker de mecánicos
  const defaultMechanic = {
    id: undefined,
    nombre: "-- Selecciona un Mecánico --",
    detalle: "Elige un mecánico para ver su especialidad.",
    photo: { uri: "https://via.placeholder.com/100/EEEEEE/000000?text=?" },
  };

  const selectedMechanic =
    mechanicsMap[selectedMechanicId as number] || defaultMechanic;

  const maintenanceData = {
    // La descripción del mantenimiento es seleccionada por el usuario
    timeLeft: "1 hora y 30 minutos", // Esto es fijo, pero podría ser dinámico
    cost: "$120.000", // Esto es fijo, pero podría ser dinámico
    technician: {
      name: selectedMechanic.nombre, // ¡Ahora dinámico!
      photo: selectedMechanic.photo, // ¡Ahora dinámico!
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
      setProgress(current * 10); // % de progreso

      if (current <= 3) setColor("#ff0000"); // rojo
      else if (current <= 6) setColor("#f7b500"); // amarillo
      else setColor("#059212"); // verde

      if (current >= 10) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/wav/mixkit-cartoon-toy-whistle-616.wav")
    );
    soundRef.current = sound;
    await sound.playAsync();
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
          clearInterval(intervalRef.current!);
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

  // --- Nueva lógica para obtener la descripción seleccionada ---
  const selectedMaintenance =
    maintenanceDescriptionsMap[maintenanceDescriptionsId as number] ||
    defaultMaintenanceDescription;
  // ------------------------------------------------------------

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
        style={styles.card}
      >
        <ImageCar />

        {/* Sección de Descripción del Mantenimiento */}
        <View style={styles.section}>
          <Text style={styles.title}>Descripción del mantenimiento</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.picker}
              selectedValue={maintenanceDescriptionsId}
              onValueChange={(itemValue: number | undefined) =>
                setMaintenanceDescriptionsId(itemValue)
              }
            >
              <Picker.Item
                label={defaultMaintenanceDescription.tipo}
                value={defaultMaintenanceDescription.id}
                style={styles.pickerItem}
              />
              {maintenanceDescriptions.map((mant) => (
                <Picker.Item
                  key={mant.id}
                  label={mant.tipo}
                  value={mant.id}
                  style={styles.pickerItem}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>{selectedMaintenance.detalle}</Text>
          </View>
        </View>

        {/* Sección de Tiempo restante (sin cambios) */}
        <View style={styles.section}>
          <Text style={styles.title}>Tiempo restante para que esté listo</Text>
          <View style={styles.box}>
            <Text style={styles.text}>{maintenanceData.timeLeft}</Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${progress}%`, backgroundColor: color },
              ]}
            />
          </View>
          <View style={styles.timeLabels}>
            <Text style={styles.timeText}>0s</Text>
            <Text style={styles.timeText}>3s</Text>
            <Text style={styles.timeText}>6s</Text>
            <Text style={styles.timeText}>9s</Text>
            <Text style={styles.timeText}>10s</Text>
          </View>
        </View>

        {/* Cuadro verde animado (sin cambios) */}
        <AnimatePresence>
          {showReadyBox && !showFinalMessage && (
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale }}
              transition={{ type: "timing", duration: 500 }}
              style={[styles.box, styles.readyBox]}
            >
              <Text style={styles.name}>Daniela</Text>
              <Text style={styles.readyText}>
                Tu auto ya está listo. Puedes ir a recogerlo.
              </Text>
              <Text style={styles.costText}>Costo: {maintenanceData.cost}</Text>
              <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Voy por él</Text>
              </TouchableOpacity>
            </MotiView>
          )}
        </AnimatePresence>

        {/* Mensaje final y contador (sin cambios) */}
        <AnimatePresence>
          {showFinalMessage && (
            <MotiView
              from={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 600 }}
              style={[styles.box, styles.finalBox]}
            >
              <Text style={styles.finalText}>¡Gracias, Daniela! 🤗</Text>
              <Text style={styles.finalText}>
                Fue un gusto arreglar tu auto. Esperamos verte pronto.
              </Text>

              {showCounter && (
                <MotiView
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 300 }}
                  style={styles.counterBox}
                >
                  <Text style={styles.counterText}>
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

        {/* Sección de Selección y Detalles del Técnico */}
        <View style={styles.section}>
          <Text style={styles.title}>
            Persona que está realizando el mantenimiento
          </Text>
          {/* Picker para seleccionar el mecánico */}
          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.picker}
              selectedValue={selectedMechanicId}
              onValueChange={(itemValue: number | undefined) =>
                setSelectedMechanicId(itemValue)
              }
            >
              <Picker.Item
                label={defaultMechanic.nombre}
                value={defaultMechanic.id}
                style={styles.pickerItem}
              />
              {mechanicsList.map((mechanic) => (
                <Picker.Item
                  key={mechanic.id}
                  label={mechanic.nombre}
                  value={mechanic.id}
                  style={styles.pickerItem}
                />
              ))}
            </Picker>
          </View>

          {/* Detalles del técnico seleccionado */}
          <View style={[styles.box, styles.techBox]}>
            <Image source={selectedMechanic.photo} style={styles.techImage} />
            <View style={styles.techDetails}>
              <Text style={styles.text_name}>{selectedMechanic.nombre}</Text>
              <Text style={styles.text_detail}>{selectedMechanic.detalle}</Text>
            </View>
          </View>
        </View>
      </MotiView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#E3FEF7",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
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
    color: "#003C43",
    marginBottom: 8,
  },
  box: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#77B0AA",
  },
  text: {
    fontSize: 16,
    color: "#135D66",
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
    flex: 1, // Para que el texto ocupe el espacio restante
  },
  text_name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#135D66",
  },
  text_detail: {
    fontSize: 14,
    color: "#555",
  },
  readyBox: {
    backgroundColor: "#059212",
    marginTop: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E3FEF7",
    marginBottom: 6,
  },
  readyText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 6,
  },
  costText: {
    fontSize: 16,
    color: "#E3FEF7",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#003C43",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#E3FEF7",
    fontWeight: "bold",
    fontSize: 16,
  },
  finalBox: {
    backgroundColor: "#135D66",
    marginTop: 20,
  },
  finalText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 6,
  },
  counterBox: {
    marginTop: 10,
    backgroundColor: "#E3FEF7",
    padding: 10,
    borderRadius: 10,
  },
  counterText: {
    fontSize: 16,
    color: "#003C43",
  },
  progressContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#ddd",
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
    color: "#003C43",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#77B0AA",
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#135D66",
  },
  pickerItem: {
    fontSize: 16,
  },
});