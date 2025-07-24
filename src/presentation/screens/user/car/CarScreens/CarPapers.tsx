import React, { useState, useRef, useCallback } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    TextInput,
    Alert
} from "react-native";
import { MotiView } from "moti";
import { useFocusEffect, useRouter } from "expo-router";

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Document = {
    name: string;
    date: string;
    isPending: boolean;
};

export default function CarPapers() {
    const carDocuments: Document[] = [
        { name: "SOAT", date: "22/08/2025", isPending: true },
        { name: "Revisión técnico-mecánica", date: "05/09/2025", isPending: true },
        { name: "Impuesto vehicular", date: "15/10/2025", isPending: true },
        { name: "Tarjeta de propiedad", date: "31/12/2025", isPending: false },
        { name: "Licencia de conducción", date: "20/11/2026", isPending: false },
    ];

    const router = useRouter();
    const scrollRef = useRef<ScrollView>(null);

    const pendingDocs = carDocuments.filter(doc => doc.isPending);
    const upToDateDocs = carDocuments.filter(doc => !doc.isPending);

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState<Record<number, any>>({});
    const [pagosSeleccionados, setPagosSeleccionados] = useState<any[]>([]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setFormData({});
                setPagosSeleccionados([]);
                setExpandedIndex(null);
            };
        }, [])
    );

    const toggleExpand = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    const handleInputChange = (index: number, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [index]: {
                ...prev[index],
                [field]: value,
            },
        }));
    };

    const handlePagar = (index: number) => {
        const data = formData[index];
        if (!data?.placa || !data?.documento) {
            Alert.alert(
                "🚫 Campos obligatorios",
                "Por favor, completa los siguientes campos:\n\n• Número de placa\n• Documento del propietario",
            );
            return;
        }

        const doc = carDocuments[index];

        Alert.alert(
            "✅ ¡Pago agregado!",
            `📄 Has agregado el pago del *${doc.name}*.\n\n¿Deseas pagar otro documento ahora?`,
            [
                {
                    text: "🧾 Sí, agregar otro",
                    onPress: () => {
                        setPagosSeleccionados(prev => [...prev, { ...doc, ...data }]);
                    },
                },
                {
                    text: "🧮 No, continuar",
                    onPress: () => {
                        setPagosSeleccionados(prev => {
                            const actualizados = [...prev, { ...doc, ...data }];
                            setTimeout(() => {
                                scrollRef.current?.scrollToEnd({ animated: true });
                            }, 300);
                            return actualizados;
                        });
                    },
                    style: "cancel",
                },
            ]
        );
    };


    const handleCrearFactura = () => {
        router.push({
            pathname: "/(user)/car/(screens)/CarScreens/Invoice",
            params: { pagos: JSON.stringify(pagosSeleccionados) },
        });
    };

    return (
        <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            contentContainerStyle={[styles.container, { minHeight: "100%" }]}
        >
            <Text style={styles.title}>¿Tienes pagos pendientes?</Text>

            <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 500 }}>
                <Text style={styles.sectionTitle}>Papeles pendientes</Text>

                {pendingDocs.map((doc) => {
                    const realIndex = carDocuments.findIndex(d => d.name === doc.name);

                    return (
                        <View key={realIndex} style={styles.accordionBox}>
                            <TouchableOpacity onPress={() => toggleExpand(realIndex)} style={styles.accordionHeader}>
                                <Text style={styles.accordionTitle}>
                                    {doc.name} - Vence el {doc.date}
                                </Text>
                                <Text style={styles.chevron}>{expandedIndex === realIndex ? "▲" : "▼"}</Text>
                            </TouchableOpacity>

                            {expandedIndex === realIndex && (
                                <View style={styles.accordionContent}>
                                    <TextInput
                                        placeholder="Número de placa (Ej: ABC123)"
                                        style={styles.input}
                                        value={formData[realIndex]?.placa || ""}
                                        onChangeText={text => handleInputChange(realIndex, "placa", text)}
                                    />
                                    <TextInput
                                        placeholder="Documento del propietario"
                                        style={styles.input}
                                        value={formData[realIndex]?.documento || ""}
                                        onChangeText={text => handleInputChange(realIndex, "documento", text)}
                                    />
                                    <TextInput
                                        placeholder="Número de póliza (opcional)"
                                        style={styles.input}
                                        value={formData[realIndex]?.poliza || ""}
                                        onChangeText={text => handleInputChange(realIndex, "poliza", text)}
                                    />
                                    <TouchableOpacity style={styles.payButton} onPress={() => handlePagar(realIndex)}>
                                        <Text style={styles.payButtonText}>Pagar</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    );
                })}
            </MotiView>

            <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 200, duration: 500 }} style={styles.card}>
                <Text style={styles.sectionTitle}>Papeles al día</Text>
                {upToDateDocs.map((doc, index) => (
                    <Text key={index} style={[styles.documentItem, { color: "#135D66" }]}>
                        {doc.name} - Vigente hasta {doc.date}
                    </Text>
                ))}
            </MotiView>

            <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 500, duration: 400 }} style={styles.note}>
                <Text style={styles.noteText}>
                    Se generará una factura con los papeles pendientes, el total a pagar y una ubicación cercana para hacerlo.
                    Además, se te notificará cuándo puedes realizar la técnico mecánica.
                </Text>
            </MotiView>

            {pagosSeleccionados.length > 0 && (
                <TouchableOpacity style={[styles.payButton, { marginTop: 20 }]} onPress={handleCrearFactura}>
                    <Text style={styles.payButtonText}>Crear Factura</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#E3FEF7",
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#003C43",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        color: "#135D66",
    },
    accordionBox: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        marginBottom: 12,
        overflow: "hidden",
        elevation: 2,
    },
    accordionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#77B0AA",
        padding: 12,
    },
    accordionTitle: {
        fontSize: 16,
        color: "#003C43",
        fontWeight: "600",
    },
    chevron: {
        fontSize: 18,
        color: "#003C43",
    },
    accordionContent: {
        padding: 12,
        backgroundColor: "#F0FFFF",
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderColor: "#77B0AA",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 10,
        fontSize: 14,
    },
    payButton: {
        backgroundColor: "#135D66",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    payButtonText: {
        color: "#E3FEF7",
        fontWeight: "600",
        fontSize: 15,
    },
    card: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 10,
        marginTop: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    documentItem: {
        fontSize: 16,
        marginBottom: 6,
    },
    note: {
        marginTop: 24,
        padding: 16,
        backgroundColor: "#C7F7EE",
        borderRadius: 10,
    },
    noteText: {
        fontSize: 14,
        color: "#003C43",
        lineHeight: 20,
    },
});
