import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/presentation/theme/ThemeContext";

export default function ProductView() {
  const [search, setSearch] = useState("");
  const { theme } = useTheme();

  const products = [
    {
      id: 1,
      name: "Filtro de aceite",
      price: 35000,
      image: require("../../../../../../assets/images/products/1.jpg"),
    },
    {
      id: 2,
      name: "Juego de pastillas de freno",
      price: 95000,
      image: require("../../../../../../assets/images/products/2.jpg"),
    },
    {
      id: 3,
      name: "Aceite sintético 5W-30",
      price: 120000,
      image: require("../../../../../../assets/images/products/3.jpg"),
    },
    {
      id: 4,
      name: "Limpiador de inyectores",
      price: 28000,
      image: require("../../../../../../assets/images/products/4.jpg"),
    },
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const dynamicStyles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingTop: 20,
      backgroundColor: theme.background,
      flexGrow: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.text,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.card,
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 12,
      marginBottom: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },
    searchInput: {
      marginLeft: 12,
      flex: 1,
      fontSize: 16,
      color: theme.text,
      fontWeight: "400",
    },
    filterRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 24,
    },
    filterButton: {
      backgroundColor: theme.border,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
      marginRight: 10,
      marginBottom: 10,
    },
    filterText: {
      fontSize: 14,
      color: theme.text,
      fontWeight: "500",
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 16,
      marginBottom: 16,
      elevation: 5,
      flexDirection: "row",
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 12,
      margin: 12,
    },
    cardBody: {
      flex: 1,
      paddingVertical: 12,
      paddingRight: 12,
      justifyContent: "center",
    },
    productName: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.text,
      marginBottom: 4,
    },
    price: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.primary,
      marginBottom: 12,
    },
    buyButton: {
      backgroundColor: theme.secondary,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
    },
    buyButtonText: {
      color: theme.buttonText,
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 6,
    },
    noResults: {
      textAlign: "center",
      fontSize: 16,
      color: theme.icon,
      marginTop: 30,
      fontWeight: "500",
    },
  });

  return (
    <ScrollView contentContainerStyle={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.title}>Productos</Text>
        <Ionicons name="cart-outline" size={28} color={theme.text} />
      </View>

      <View style={dynamicStyles.searchContainer}>
        <Ionicons name="search" size={20} color={theme.icon} />
        <TextInput
          style={dynamicStyles.searchInput}
          placeholder="Buscar producto..."
          placeholderTextColor={theme.icon}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={dynamicStyles.card}
            activeOpacity={0.8}
            onPress={() =>
              Linking.openURL("https://ecommerce-automanage.vercel.app/home/")
            }
          >
            <Image source={product.image} style={dynamicStyles.image} />
            <View style={dynamicStyles.cardBody}>
              <Text style={dynamicStyles.productName}>{product.name}</Text>
              <Text style={dynamicStyles.price}>
                ${product.price.toLocaleString()}
              </Text>
              <TouchableOpacity
                style={dynamicStyles.buyButton}
                onPress={() =>
                  Linking.openURL("https://ecommerce-automanage.vercel.app/home/")
                }
              >
                <Ionicons name="add-circle" size={18} color={theme.buttonText} />
                <Text style={dynamicStyles.buyButtonText}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={dynamicStyles.noResults}>No se encontraron productos.</Text>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
