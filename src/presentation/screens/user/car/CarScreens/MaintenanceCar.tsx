import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MotiView, AnimatePresence } from "moti";
import ImageCar from "../components/ImageCar";
import ConfettiCannon from "react-native-confetti-cannon";
import { Audio } from "expo-av";


export default function MaintenanceCar() {
    const [showReadyBox, setShowReadyBox] = useState(false);
    const [showFinalMessage, setShowFinalMessage] = useState(false);
    const [scale, setScale] = useState(1);
    const [showCounter, setShowCounter] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalRef = useRef<number | null>(null);
    const soundRef = useRef<Audio.Sound | null>(null);

    const [progress, setProgress] = useState(0);
    const [color, setColor] = useState('#ff0000'); // rojo inicial

    const maintenanceData = {
        description: "Cambio de aceite y revisión de frenos",
        timeLeft: "1 hora y 30 minutos",
        cost: "$120.000",
        technician: {
            name: "Carlos Gómez",
            photo: { uri: "https://via.placeholder.com/100" },
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

            if (current <= 3) setColor('#ff0000'); // rojo
            else if (current <= 6) setColor('#f7b500'); // amarillo
            else setColor('#059212'); // verde

            if (current >= 10) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require("../../../../../../assets/wav/mixkit-cartoon-toy-whistle-616.wav")
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

    const maintenanceDescriptions = [
        {
            tipo: "Cambio de aceite y revisión de frenos",
            detalle: "Ya estaba por cambio de aceite y se requería revisar los frenos",
        },
        {
            tipo: "Cambio de correa de distribución",
            detalle: "La correa estaba desgastada, se cambió preventivamente",
        },
        {
            tipo: "Cambio de refrigerante",
            detalle: "Nivel bajo, se recargó y se revisaron fugas",
        },
        {
            tipo: "Aceite de transmisión",
            detalle: "Se cambió aceite y se ajustó nivel",
        },
        {
            tipo: "Cambio de bujes",
            detalle: "Se escuchaban ruidos, se cambiaron bujes delanteros",
        },
        {
            tipo: "Revisión de tubos y mangueras",
            detalle: "Se cambiaron dos mangueras agrietadas",
        },
    ];

    const mechanicsList = [
        {
            nombre: "Carlos López",
            detalle: "Especializado en frenos y transmisión",
        },
        {
            nombre: "Laura Martínez",
            detalle: "Experta en refrigeración y aceite de motor",
        },
        {
            nombre: "Pedro Ramírez",
            detalle: "Cambios de bujes, suspensión y ruedas",
        },
        {
            nombre: "Sofía González",
            detalle: "Mantenimiento general y diagnósticos",
        },
        {
            nombre: "Andrés Pérez",
            detalle: "Especialista en sistemas eléctricos",
        },
        {
            nombre: "Diana Rodríguez",
            detalle: "Cambio de correas y revisión de motor",
        },
    ];


    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", duration: 500 }}
                style={styles.card}
            >
                <ImageCar />

                {/* Descripción */}
                <View style={styles.section}>
                    <Text style={styles.title}>Descripción del mantenimiento</Text>
                    <View style={styles.box}>
                        <Text style={styles.text}>{maintenanceData.description}</Text>
                    </View>
                </View>

                {/* Tiempo restante */}
                <View style={styles.section}>
                    <Text style={styles.title}>Tiempo restante para que esté listo</Text>
                    <View style={styles.box}>
                        <Text style={styles.text}>{maintenanceData.timeLeft}</Text>
                    </View>

                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: `${progress}%`, backgroundColor: color }]} />
                    </View>
                    <View style={styles.timeLabels}>
                        <Text style={styles.timeText}>0s</Text>
                        <Text style={styles.timeText}>3s</Text>
                        <Text style={styles.timeText}>6s</Text>
                        <Text style={styles.timeText}>9s</Text>
                        <Text style={styles.timeText}>10s</Text>
                    </View>
                </View>
                {/* Cuadro verde animado */}
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

                {/* Mensaje final y contador */}
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
                            <ConfettiCannon count={70} origin={{ x: 180, y: -10 }} fadeOut autoStart />
                        </MotiView>
                    )}
                </AnimatePresence>

                {/* Técnico */}
                <View style={styles.section}>
                    <Text style={styles.title}>Persona que está realizando el mantenimiento</Text>
                    <View style={[styles.box, styles.techBox]}>
                        <Image source={maintenanceData.technician.photo} style={styles.techImage} />
                        <Text style={styles.text}>{maintenanceData.technician.name}</Text>
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
        width: '100%',
        height: 10,
        backgroundColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 8,
    },
    timeLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
        paddingHorizontal: 2,
    },
    timeText: {
        fontSize: 12,
        color: '#003C43',
    },

});
