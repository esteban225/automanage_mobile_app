import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

export default function Appointments() {
  const { pagos } = useLocalSearchParams();

  // ✅ Asegura que el JSON venga bien y sea un array
  const parsedPagos = (() => {
    try {
      const parsed = JSON.parse(pagos as string);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error parsing pagos:", error);
      return [];
    }
  })();

  const [pagosList, setPagosList] = useState(parsedPagos);
  const [tiempoMinutos, setTiempoMinutos] = useState<number>(0);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tu factura</Text>

      {pagosList.map((item: any, index: number) => (
        <View key={index} style={styles.card}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>Placa: {item.placa}</Text>
              <Text style={styles.detail}>Propietario: {item.documento}</Text>
              {item.poliza && (
                <Text style={styles.detail}>Póliza: {item.poliza}</Text>
              )}
              <Text style={styles.detail}>Vence: {item.date}</Text>
            </View>
            <View style={{ alignItems: "flex-end", justifyContent: "space-between" }}>
              <TouchableOpacity onPress={() => mostrarBotonPagarLuego(index)}>
                <Text style={styles.pagarLuego}>‼️</Text>
              </TouchableOpacity>
              <Text style={styles.costo}>Costo: ${getCosto(item.name)}</Text>
            </View>
          </View>

          {pagoPendienteIndex === index && (
            <TouchableOpacity
              onPress={() => confirmarPagarLuego(index)}
              style={styles.botonConfirmar}
            >
              <Text style={styles.botonConfirmarTexto}>Pagar luego</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {pagosList.length > 0 && (
        <View style={styles.mapaBox}>
          <Text style={styles.mapaTitulo}>Puedes pagar tu factura aquí:</Text>
          <View style={styles.mapa}> {/* This is the main container for the map graphic */}
            {mapLayout.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.mapaGridRow}>
                {row.map((cell, cellIndex) => {
                  if (cell === 'block') {
                    return <View key={cellIndex} style={styles.cuadro} />;
                  } else if (cell === 'person') {
                    return <Text key={cellIndex} style={styles.persona}>🚶</Text>;
                  } else if (cell === 'point') {
                    return <Text key={cellIndex} style={styles.puntoPago}>📍</Text>;
                  } else if (cell === 'path_h') {
                    return <View key={cellIndex} style={styles.lineaHorizontal} />;
                  } else if (cell === 'path_v') {
                    return <View key={cellIndex} style={styles.lineaVertical} />;
                  }
                  return <View key={cellIndex} style={styles.mapaCellEmpty} />; // Render an empty cell
                })}
              </View>
            ))}
          </View>
          <Text style={styles.tiempoTexto}>El punto está a {tiempoMinutos} minutos</Text>
        </View>
      )}
    </ScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3FEF7",
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#003C43",
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
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
    color: "#135D66",
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    marginBottom: 4,
    color: "#003C43",
  },
  costo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003C43",
    marginTop: 12,
  },
  pagarLuego: {
    fontSize: 18,
    color: "#888",
  },
  botonConfirmar: {
    marginTop: 12,
    backgroundColor: "#135D66",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  botonConfirmarTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  mapaBox: {
    backgroundColor: "#C7F7EE",
    padding: 16,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
  },
  mapaTitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003C43",
    marginBottom: 12,
  },
  mapa: {
    backgroundColor: "#E3FEF7",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    // The grid itself will handle internal alignment, so remove alignItems here
    // alignItems: "center",
  },
  mapaGridRow: {
    flexDirection: 'row',
    justifyContent: 'center', // Center cells within the row
    // Removed gap and marginBottom here to allow lines to be drawn between blocks
  },
  cuadro: {
    width: 40,
    height: 25,
    backgroundColor: "#77B0AA",
    borderRadius: 4,
    marginHorizontal: 2.5, // Half of the desired line width
    marginVertical: 2.5,   // Half of the desired line width
  },
  mapaCellEmpty: {
    width: 40,
    height: 25,
    // backgroundColor: 'transparent', // Default transparent
    marginHorizontal: 2.5,
    marginVertical: 2.5,
  },
  persona: {
    fontSize: 18,
    width: 40,
    height: 25,
    textAlign: 'center',
    lineHeight: 25, // Vertically center text
    backgroundColor: "#77B0AA", // Make it look like part of the path/block
    borderRadius: 4,
    marginHorizontal: 2.5,
    marginVertical: 2.5,
  },
  puntoPago: {
    fontSize: 20,
    width: 40,
    height: 25,
    textAlign: 'center',
    lineHeight: 25, // Vertically center text
    backgroundColor: "#77B0AA", // Make it look like part of the path/block
    borderRadius: 4,
    marginHorizontal: 2.5,
    marginVertical: 2.5,
  },
  lineaHorizontal: {
    width: 40, // Match cuadro width
    height: 5, // Thin black line
    backgroundColor: 'black', // Black line
    alignSelf: 'center', // Center the line vertically within its row space
    marginHorizontal: 2.5, // Half of the desired line width
    marginVertical: 10, // Adjust to center the line between blocks
  },
  lineaVertical: {
    width: 5, // Thin black line
    height: 25, // Match cuadro height
    backgroundColor: 'black', // Black line
    alignSelf: 'center', // Center the line horizontally within its column space
    marginHorizontal: 17.5, // Adjust to center the line between blocks
    marginVertical: 2.5, // Half of the desired line width
  },
  tiempoTexto: {
    marginTop: 10,
    fontSize: 14,
    color: "#135D66",
  },
});
