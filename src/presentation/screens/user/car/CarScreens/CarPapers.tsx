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
import { useTheme } from '@/src/presentation/theme/ThemeContext'; // Importar el hook de tema

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Document = {
    name: string;
    date: string;
    isPending: boolean;
};

export default function CarPapers() {
    const { theme } = useTheme(); // Usamos el tema actual

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

    // Define styles within the component to access the 'theme' object
    const dynamicStyles = StyleSheet.create({
        container: {
            padding: 20,
            backgroundColor: theme.background, // Use theme background color
            flexGrow: 1,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            color: theme.text, // Use theme text color
            marginBottom: 20,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 10,
            color: theme.primary, // Use theme primary color
        },
        accordionBox: {
            backgroundColor: theme.card, // Use theme card color
            borderRadius: 10,
            marginBottom: 12,
            overflow: "hidden",
            elevation: 2,
            shadowColor: "#000", // Consistent shadows
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        accordionHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: theme.secondary, // Use theme secondary color
            padding: 12,
        },
        accordionTitle: {
            fontSize: 16,
            color: theme.buttonText, // Use theme text color
            fontWeight: "600",
        },
        chevron: {
            fontSize: 18,
            color: theme.text, // Use theme text color
        },
        accordionContent: {
            padding: 12,
            backgroundColor: theme.background, // Use theme background color for content
        },
        input: {
            backgroundColor: theme.card, // Use theme card color
            borderColor: theme.border, // Use theme border color
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginBottom: 10,
            fontSize: 14,
            color: theme.text, // Use theme text color
        },
        payButton: {
            backgroundColor: theme.primary, // Use theme primary color
            paddingVertical: 10,
            borderRadius: 8,
            alignItems: "center",
        },
        payButtonText: {
            color: theme.buttonText, // Use theme button text color
            fontWeight: "600",
            fontSize: 15,
        },
        card: {
            backgroundColor: theme.card, // Use theme card color
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
            color: theme.text, // Use theme text color
        },
        note: {
            marginTop: 24,
            padding: 16,
            backgroundColor: theme.secondary, // Use theme secondary color for the note
            borderRadius: 10,
        },
        noteText: {
            fontSize: 14,
            color: theme.buttonText, // Use theme text color
            lineHeight: 20,
        },
    });

    return (
        <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            contentContainerStyle={[dynamicStyles.container, { minHeight: "100%" }]}
        >
            <Text style={dynamicStyles.title}>¿Tienes pagos pendientes?</Text>

            <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 500 }}>
                <Text style={dynamicStyles.sectionTitle}>Papeles pendientes</Text>

                {pendingDocs.map((doc) => {
                    const realIndex = carDocuments.findIndex(d => d.name === doc.name);

                    return (
                        <View key={realIndex} style={dynamicStyles.accordionBox}>
                            <TouchableOpacity onPress={() => toggleExpand(realIndex)} style={dynamicStyles.accordionHeader}>
                                <Text style={dynamicStyles.accordionTitle}>
                                    {doc.name} - Vence el {doc.date}
                                </Text>
                                <Text style={dynamicStyles.chevron}>{expandedIndex === realIndex ? "▲" : "▼"}</Text>
                            </TouchableOpacity>

                            {expandedIndex === realIndex && (
                                <View style={dynamicStyles.accordionContent}>
                                    <TextInput
                                        placeholder="Número de placa (Ej: ABC123)"
                                        style={dynamicStyles.input}
                                        placeholderTextColor={theme.icon} // Use theme icon color for placeholder
                                        value={formData[realIndex]?.placa || ""}
                                        onChangeText={text => handleInputChange(realIndex, "placa", text)}
                                    />
                                    <TextInput
                                        placeholder="Documento del propietario"
                                        style={dynamicStyles.input}
                                        placeholderTextColor={theme.icon} // Use theme icon color for placeholder
                                        value={formData[realIndex]?.documento || ""}
                                        onChangeText={text => handleInputChange(realIndex, "documento", text)}
                                    />
                                    <TextInput
                                        placeholder="Número de póliza (opcional)"
                                        style={dynamicStyles.input}
                                        placeholderTextColor={theme.icon} // Use theme icon color for placeholder
                                        value={formData[realIndex]?.poliza || ""}
                                        onChangeText={text => handleInputChange(realIndex, "poliza", text)}
                                    />
                                    <TouchableOpacity style={dynamicStyles.payButton} onPress={() => handlePagar(realIndex)}>
                                        <Text style={dynamicStyles.payButtonText}>Pagar</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    );
                })}
            </MotiView>

            <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 200, duration: 500 }} style={dynamicStyles.card}>
                <Text style={dynamicStyles.sectionTitle}>Papeles al día</Text>
                {upToDateDocs.map((doc, index) => (
                    <Text key={index} style={dynamicStyles.documentItem}>
                        {doc.name} - Vigente hasta {doc.date}
                    </Text>
                ))}
            </MotiView>

            <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 500, duration: 400 }} style={dynamicStyles.note}>
                <Text style={dynamicStyles.noteText}>
                    Se generará una factura con los papeles pendientes, el total a pagar y una ubicación cercana para hacerlo.
                    Además, se te notificará cuándo puedes realizar la técnico mecánica.
                </Text>
            </MotiView>

            {pagosSeleccionados.length > 0 && (
                <TouchableOpacity style={[dynamicStyles.payButton, { marginTop: 20 }]} onPress={handleCrearFactura}>
                    <Text style={dynamicStyles.payButtonText}>Crear Factura</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}
