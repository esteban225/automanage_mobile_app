import React, { useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring, // Agregado para el efecto de resorte
  Easing,
  interpolate, // Agregado para la interpolación de valores
} from "react-native-reanimated";

interface Props {
  visible: boolean;
  onPress: (index: number) => void;
}

// Define las posiciones FINALES de los círculos alrededor del centro de la imagen.
// Estos valores son cruciales y DEBES AJUSTARLOS para que no se superpongan
// con la imagen ni con los botones de navegación de abajo.
// Las coordenadas (x, y) son relativas al centro del 'imageWrapper' en UserCarHome.
const finalPositions = [
  { x: 0, y: -100 },   // Círculo Superior: Mover hacia arriba (Y negativo)
  { x: 100, y: 0 },    // Círculo Derecho: Mover hacia la derecha (X positivo)
  { x: 0, y: 100 },    // Círculo Inferior: Mover hacia abajo (Y positivo)
  { x: -100, y: 0 },   // Círculo Izquierdo: Mover hacia la izquierda (X negativo)
];

const emojis = ["📄", "🔧", "📅", "💅"];

export default function ActionCircle({ visible, onPress }: Props) {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withSpring(visible ? 1 : 0, {
      damping: 10,
      stiffness: 100,
      mass: 0.5,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    });
  }, [visible]);

  return (
    <>
      {finalPositions.map((pos, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const translateX = interpolate(
            animatedValue.value,
            [0, 1],
            [0, pos.x]
          );
          const translateY = interpolate(
            animatedValue.value,
            [0, 1],
            [0, pos.y]
          );

          // La rotación inicial y de retorno
          const rotate = interpolate(
            animatedValue.value,
            [0, 1],
            [0, 360] // Gira 360 grados al aparecer, y vuelve al ocultarse
          );

          // La opacidad para aparecer/desaparecer
          const opacity = withTiming(visible ? 1 : 0, {
            duration: 300,
            easing: Easing.out(Easing.exp),
          });

          return {
            opacity,
            transform: [
              { translateX: translateX },
              { translateY: translateY },
              { rotate: `${rotate}deg` },
            ],
          };
        });

        return (
          <Animated.View
            key={index}
            style={[styles.circleWrapper, animatedStyle]}
          >
            <TouchableOpacity
              style={styles.circle}
              onPress={() => onPress(index)}
            >
              <Text style={styles.emoji}>{emojis[index]}</Text>
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
    zIndex: 10,
    // Estos valores centran el 'wrapper' de cada círculo en el centro del 'imageWrapper'
    // La animación de traslación se construye a partir de este punto.
    left: '50%',
    top: '50%',
    marginLeft: -30, // La mitad del ancho del círculo (60/2) para centrarlo
    marginTop: -30,  // La mitad de la altura del círculo (60/2) para centrarlo
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#77B0AA",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  emoji: {
    fontSize: 24,
  },
});