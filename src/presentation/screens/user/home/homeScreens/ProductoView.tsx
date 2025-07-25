import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tenerlo instalado

export default function ProductView() {
  const [search, setSearch] = useState("");

  const products = [
    {
      id: 1,
      name: "Filtro de aceite",
      price: 35000,
      image: "https://i.imgur.com/6MbA9Ae.png",
    },
    {
      id: 2,
      name: "Juego de pastillas de freno",
      price: 95000,
      image: "https://i.imgur.com/jxf0L8T.png",
    },
    {
      id: 3,
      name: "Aceite sintético 5W-30",
      price: 120000,
      image: "https://i.imgur.com/BbZBzSR.png",
    },
    {
      id: 4,
      name: "Limpiador de inyectores",
      price: 28000,
      image: "https://i.imgur.com/4ZYdkvd.png",
    },
  ];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🛒 Productos Disponibles</Text>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar producto..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filtros básicos */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>🔧 Repuestos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>🛠️ Herramientas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>🧴 Lubricantes</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de productos */}
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <View key={product.id} style={styles.card}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.cardBody}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.price}>${product.price.toLocaleString()}</Text>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Agregar al carrito</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noResults}>No se encontraron productos.</Text>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e1e4e8",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  filterButton: {
    backgroundColor: "#dfe6e9",
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 10,
  },
  filterText: {
    fontSize: 14,
    color: "#2d3436",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    flexDirection: "row",
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: "#ccc",
  },
  cardBody: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    color: "#27ae60",
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: "#2980b9",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 30,
  },
});
