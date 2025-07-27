import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Platform } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  interpolate,
} from "react-native-reanimated";

import { FontAwesome5, MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  onPress: (index: number) => void;
}

// --- Ajuste clave aquí: Aumento de la distancia de los círculos ---
const finalPositions = [
  { x: 0, y: -130 }, // Arriba
  { x: 190, y: 0 }, // Derecha
  { x: 0, y: 130 }, // Abajo
  { x: -190, y: 0 }, // Izquierda
];

// Íconos por cada botón (puedes cambiar los nombres o librerías si deseas)
const icons = [
  <FontAwesome5 name="car" size={34} color="#001D1A" />,
  <MaterialIcons name="build" size={38} color="#001D1A" />,
  <Ionicons name="construct" size={36} color="#001D1A" />,
  <Entypo name="water" size={36} color="#001D1A" />,
];

// Colores neón distintos para cada botón
const neonColors = ["#00FFC6", "#FF00C8", "#00BFFF", "#FFD700"];

// --- Variables para consistencia en el tamaño ---
const CIRCLE_SIZE = 70; // Tamaño ligeramente reducido
const BORDER_RADIUS = CIRCLE_SIZE / 2; // Para que sea un círculo perfecto

export default function ActionCircle({ visible, onPress }: Props) {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withSpring(visible ? 1 : 0, {
      damping: 10,
      stiffness: 100,
      mass: 0.5,
    });
  }, [visible]);

  return (
    <>
      {finalPositions.map((pos, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const translateX = interpolate(animatedValue.value, [0, 1], [0, pos.x]);
          const translateY = interpolate(animatedValue.value, [0, 1], [0, pos.y]);
          const rotate = interpolate(animatedValue.value, [0, 1], [0, 360]); // Rotación al aparecer
          const opacity = withTiming(visible ? 1 : 0, {
            duration: 300,
            easing: Easing.out(Easing.exp),
          });

          return {
            opacity,
            transform: [
              { translateX },
              { translateY },
              { rotate: `${rotate}deg` },
            ],
          };
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.circleWrapper,
              animatedStyle,
              // Ajuste de margen para centrar basado en el nuevo CIRCLE_SIZE
              {
                marginLeft: -CIRCLE_SIZE / 2,
                marginTop: -CIRCLE_SIZE / 2,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.circle,
                {
                  backgroundColor: neonColors[index],
                  shadowColor: neonColors[index],
                },
              ]}
              onPress={() => onPress(index)}
            >
              {icons[index]}
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  circleWrapper: {
    position: "absolute",
    zIndex: 1,
    left: "50%",
    top: "50%",
    // marginLeft y marginTop se calculan dinámicamente en el componente para centrado
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center",

    // Sombras tipo neón mejoradas
    shadowOffset: {
      width: 0, // Las sombras neón suelen ir sin offset para un brillo uniforme
      height: 0,
    },
    shadowOpacity: 0.8, // Mayor opacidad para un brillo más fuerte
    shadowRadius: 15, // Radio de sombra para un brillo difuso
    elevation: Platform.OS === "android" ? 10 : 0, // Menor elevación en Android para un efecto más sutil
  },
});