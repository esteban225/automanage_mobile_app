import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from '@/src/presentation/theme/ThemeContext'; // Importar el hook de tema

export default function Appointments() {
  const { pagos } = useLocalSearchParams();
  const { theme } = useTheme(); // Usamos el tema actual

  // ✅ Asegura que el JSON venga bien y sea un array
  const parsedPagos = (() => {
    try {
      const pagosStr = Array.isArray(pagos) ? pagos[0] : pagos;
      const parsed = JSON.parse(pagosStr); // Ensure pagos is a string before parsing
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error parsing pagos:", error);
      return [];
    }
  })();

  const [pagosList, setPagosList] = useState(parsedPagos);
  const [tiempoMinutos, setTiempoMinutos] = useState(0);
  const [pagoPendienteIndex, setPagoPendienteIndex] = useState<number | null>(null);

  const tiempos = [5, 15, 20, 40];

  useEffect(() => {
    // Set a random time for the payment point location
    const random = tiempos[Math.floor(Math.random() * tiempos.length)];
    setTiempoMinutos(random);
  }, []);

  /**
   * Calculates the cost based on the type of service.
   * @param {string} tipo - The type of service (e.g., "soat", "impuesto vehicular").
   * @returns {number} The cost of the service.
   */
  const getCosto = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case "soat":
        return 100;
      case "impuesto vehicular":
        return 200;
      case "revisión técnico-mecánica":
        return 180;
      default:
        return 150;
    }
  };

  /**
   * Toggles the visibility of the "Pagar luego" button for a specific payment.
   * @param {number} index - The index of the payment in the list.
   */
  const mostrarBotonPagarLuego = (index: number) => {
    setPagoPendienteIndex(index === pagoPendienteIndex ? null : index);
  };

  /**
   * Confirms "Pagar luego" action, removing the payment from the list.
   * @param {number} index - The index of the payment to be removed.
   */
  const confirmarPagarLuego = (index: number) => {
    if (!Array.isArray(pagosList)) return;

    const nuevosPagos = pagosList.filter((_, i) => i !== index);
    setPagosList(nuevosPagos);
    setPagoPendienteIndex(null); // Hide the button after confirming
  };

  // Define the layout of the map grid
  // 'block': A solid square block
  // 'person': The person emoji (start point)
  // 'point': The payment point emoji (destination)
  // 'path_h': Horizontal path segment
  // 'path_v': Vertical path segment
  // 'empty': An empty cell for spacing/alignment
  const mapLayout = [
    ['block', 'block', 'block', 'block', 'block'],
    ['block', 'person', 'path_h', 'path_h', 'block'],
    ['block', 'block', 'block', 'path_v', 'block'],
    ['block', 'block', 'block', 'path_h', 'point'],
    ['block', 'block', 'block', 'block', 'block'],
  ];

  // Define styles within the component to access the 'theme' object
  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: theme.background, // Use theme background color
      padding: 20,
      flexGrow: 1,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme.text, // Use theme text color
      alignSelf: "center",
    },
    card: {
      backgroundColor: theme.card, // Use theme card color
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    name: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.primary, // Use theme primary color
      marginBottom: 8,
    },
    detail: {
      fontSize: 14,
      marginBottom: 4,
      color: theme.text, // Use theme text color
    },
    costo: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.text, // Use theme text color
      marginTop: 12,
    },
    pagarLuego: {
      fontSize: 18,
      color: theme.icon, // Use theme icon color for a softer grey
    },
    botonConfirmar: {
      marginTop: 12,
      backgroundColor: theme.primary, // Use theme primary color
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      alignSelf: "flex-start",
    },
    botonConfirmarTexto: {
      color: theme.buttonText, // Use theme button text color
      fontWeight: "bold",
      fontSize: 14,
    },
    mapaBox: {
      backgroundColor: theme.card, // Use theme card color for the map box
      padding: 16,
      borderRadius: 12,
      marginTop: 30,
      alignItems: "center",
      shadowColor: "#000", // Consistent shadows
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    mapaTitulo: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.text, // Use theme text color
      marginBottom: 12,
    },
    mapa: {
      backgroundColor: theme.background, // Use theme background for the inner map area
      padding: 10,
      borderRadius: 8,
      width: "100%",
    },
    mapaGridRow: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    cuadro: {
      width: 40,
      height: 25,
      backgroundColor: theme.secondary, // Use theme secondary color for blocks
      borderRadius: 4,
      marginHorizontal: 2.5,
      marginVertical: 2.5,
    },
    mapaCellEmpty: {
      width: 40,
      height: 25,
      marginHorizontal: 2.5,
      marginVertical: 2.5,
    },
    persona: {
      fontSize: 18,
      width: 40,
      height: 25,
      textAlign: 'center',
      lineHeight: 25,
      backgroundColor: theme.secondary, // Use theme secondary color for path elements
      borderRadius: 4,
      marginHorizontal: 2.5,
      marginVertical: 2.5,
    },
    puntoPago: {
      fontSize: 20,
      width: 40,
      height: 25,
      textAlign: 'center',
      lineHeight: 25,
      backgroundColor: theme.secondary, // Use theme secondary color for path elements
      borderRadius: 4,
      marginHorizontal: 2.5,
      marginVertical: 2.5,
    },
    lineaHorizontal: {
      width: 40,
      height: 5,
      backgroundColor: theme.text, // Use theme text color for lines for contrast
      alignSelf: 'center',
      marginHorizontal: 2.5,
      marginVertical: 10,
    },
    lineaVertical: {
      width: 5,
      height: 25,
      backgroundColor: theme.text, // Use theme text color for lines for contrast
      alignSelf: 'center',
      marginHorizontal: 17.5,
      marginVertical: 2.5,
    },
    tiempoTexto: {
      marginTop: 10,
      fontSize: 14,
      color: theme.text, // Use theme text color
    },
  });

  return (
    <ScrollView contentContainerStyle={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>Tu factura</Text>

      {pagosList.map((item, index) => (
        <View key={index} style={dynamicStyles.card}>
          <View style={dynamicStyles.row}>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.name}>{item.name}</Text>
              <Text style={dynamicStyles.detail}>Placa: {item.placa}</Text>
              <Text style={dynamicStyles.detail}>Propietario: {item.documento}</Text>
              {item.poliza && (
                <Text style={dynamicStyles.detail}>Póliza: {item.poliza}</Text>
              )}
              <Text style={dynamicStyles.detail}>Vence: {item.date}</Text>
            </View>
            <View style={{ alignItems: "flex-end", justifyContent: "space-between" }}>
              <TouchableOpacity onPress={() => mostrarBotonPagarLuego(index)}>
                <Text style={dynamicStyles.pagarLuego}>‼️</Text>
              </TouchableOpacity>
              <Text style={dynamicStyles.costo}>Costo: ${getCosto(item.name)}</Text>
            </View>
          </View>

          {pagoPendienteIndex === index && (
            <TouchableOpacity
              onPress={() => confirmarPagarLuego(index)}
              style={dynamicStyles.botonConfirmar}
            >
              <Text style={dynamicStyles.botonConfirmarTexto}>Pagar luego</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {pagosList.length > 0 && (
        <View style={dynamicStyles.mapaBox}>
          <Text style={dynamicStyles.mapaTitulo}>Puedes pagar tu factura aquí:</Text>
          <View style={dynamicStyles.mapa}>
            {mapLayout.map((row, rowIndex) => (
              <View key={rowIndex} style={dynamicStyles.mapaGridRow}>
                {row.map((cell, cellIndex) => {
                  if (cell === 'block') {
                    return <View key={cellIndex} style={dynamicStyles.cuadro} />;
                  } else if (cell === 'person') {
                    return <Text key={cellIndex} style={dynamicStyles.persona}>🚶</Text>;
                  } else if (cell === 'point') {
                    return <Text key={cellIndex} style={dynamicStyles.puntoPago}>📍</Text>;
                  } else if (cell === 'path_h') {
                    return <View key={cellIndex} style={dynamicStyles.lineaHorizontal} />;
                  } else if (cell === 'path_v') {
                    return <View key={cellIndex} style={dynamicStyles.lineaVertical} />;
                  }
                  return <View key={cellIndex} style={dynamicStyles.mapaCellEmpty} />;
                })}
              </View>
            ))}
          </View>
          <Text style={dynamicStyles.tiempoTexto}>El punto está a {tiempoMinutos} minutos</Text>
        </View>
      )}
    </ScrollView>
  );
}
