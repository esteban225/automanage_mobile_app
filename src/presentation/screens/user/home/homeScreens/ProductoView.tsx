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
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '@/src/presentation/theme/ThemeContext'; // Importar el hook de tema

export default function ProductView() {
  const [search, setSearch] = useState("");
  const { theme } = useTheme(); // Usamos el tema actual

  const products = [
    {
      id: 1,
      name: "Filtro de aceite",
      price: 35000,
      image: "https://placehold.co/100x100/007B8C/FFFFFF?text=Filtro", // Placeholder con colores del tema
    },
    {
      id: 2,
      name: "Juego de pastillas de freno",
      price: 95000,
      image: "https://placehold.co/100x100/4CAF50/FFFFFF?text=Frenos", // Placeholder con colores del tema
    },
    {
      id: 3,
      name: "Aceite sintético 5W-30",
      price: 120000,
      image: "https://placehold.co/100x100/007B8C/FFFFFF?text=Aceite", // Placeholder con colores del tema
    },
    {
      id: 4,
      name: "Limpiador de inyectores",
      price: 28000,
      image: "https://placehold.co/100x100/4CAF50/FFFFFF?text=Limpiador", // Placeholder con colores del tema
    },
  ];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Definir los estilos dentro del componente para acceder al objeto 'theme'
  const dynamicStyles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.background, // Usa el color de fondo del tema
      flexGrow: 1,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.text, // Usa el color de texto principal del tema
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.card, // Usa el color de tarjeta para el fondo del buscador
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginBottom: 16,
      shadowColor: "#000", // Sombras fijas para consistencia
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    searchInput: {
      marginLeft: 10,
      flex: 1,
      fontSize: 16,
      color: theme.text, // Color del texto de entrada
    },
    filterRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
      flexWrap: "wrap",
    },
    filterButton: {
      backgroundColor: theme.border, // Usa el color de borde para los botones de filtro
      padding: 8,
      borderRadius: 8,
      marginRight: 8,
      marginBottom: 10,
    },
    filterText: {
      fontSize: 14,
      color: theme.text, // Color del texto de los filtros
    },
    card: {
      backgroundColor: theme.card, // Usa el color de tarjeta para el fondo de la tarjeta de producto
      borderRadius: 12,
      marginBottom: 20,
      elevation: 3,
      flexDirection: "row",
      overflow: "hidden",
      shadowColor: "#000", // Sombras fijas para consistencia
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    image: {
      width: 100,
      height: 100,
      backgroundColor: theme.background, // Fondo de la imagen con el color de fondo del tema
    },
    cardBody: {
      padding: 12,
      flex: 1,
      justifyContent: "space-between",
    },
    productName: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.text, // Nombre del producto con color de texto principal
      marginBottom: 6,
    },
    price: {
      fontSize: 14,
      color: theme.primary, // Precio con color primario del tema
      marginBottom: 10,
    },
    buyButton: {
      backgroundColor: theme.secondary, // Botón de compra con color secundario del tema
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 6,
      alignSelf: "flex-start",
    },
    buyButtonText: {
      color: theme.buttonText, // Texto del botón de compra con color de texto de botón
      fontSize: 14,
      fontWeight: "500",
    },
    noResults: {
      textAlign: "center",
      fontSize: 16,
      color: theme.icon, // Texto de "sin resultados" con color de icono
      marginTop: 30,
    },
  });

  return (
    <ScrollView contentContainerStyle={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>🛒 Productos Disponibles</Text>

      {/* Buscador */}
      <View style={dynamicStyles.searchContainer}>
        <Ionicons name="search" size={20} color={theme.icon} /> {/* Icono de búsqueda con color de icono */}
        <TextInput
          style={dynamicStyles.searchInput}
          placeholder="Buscar producto..."
          placeholderTextColor={theme.icon} // Color del placeholder con color de icono
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filtros básicos */}
      <View style={dynamicStyles.filterRow}>
        <TouchableOpacity style={dynamicStyles.filterButton}>
          <Text style={dynamicStyles.filterText}>🔧 Repuestos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={dynamicStyles.filterButton}>
          <Text style={dynamicStyles.filterText}>🛠️ Herramientas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={dynamicStyles.filterButton}>
          <Text style={dynamicStyles.filterText}>🧴 Lubricantes</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de productos */}
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <View key={product.id} style={dynamicStyles.card}>
            <Image source={{ uri: product.image }} style={dynamicStyles.image} />
            <View style={dynamicStyles.cardBody}>
              <Text style={dynamicStyles.productName}>{product.name}</Text>
              <Text style={dynamicStyles.price}>${product.price.toLocaleString()}</Text>
              <TouchableOpacity style={dynamicStyles.buyButton}>
                <Text style={dynamicStyles.buyButtonText}>Agregar al carrito</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={dynamicStyles.noResults}>No se encontraron productos.</Text>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
