import React, { useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { Image } from "react-native";

interface Props {
  visible: boolean;
  onPress: (index: number) => void;
}

const icons: React.ReactNode[] = [
  <Image
    key="motor"
    source={require("@/assets/images/motor-electrico.png")}
    style={{ width: 28, height: 28 }}
    resizeMode="contain"
  />,
  <Image
    key="llantas"
    source={require("@/assets/images/llantas.png")}
    style={{ width: 28, height: 28 }}
    resizeMode="contain"
  />,
  <Image
    key="aspiradora"
    source={require("@/assets/images/aspiradora.png")}
    style={{ width: 28, height: 28 }}
    resizeMode="contain"
  />,
  <Image
    key="instrumentos"
    source={require("@/assets/images/instrumentos.png")}
    style={{ width: 28, height: 28 }}
    resizeMode="contain"
  />,
];

const neonColors = ["#ffffffff", "#ffffffff", "#ffffffff", "#ffffffff"];
const CIRCLE_SIZE = 60;
const BORDER_RADIUS = CIRCLE_SIZE / 2;

export default function ActionCircle({ visible, onPress }: Props) {
  const animatedValue = useSharedValue(0);
  const { width, height } = useWindowDimensions();

  // Posiciones relativas al tamaño de la pantalla
  const finalPositions = [
    { x: 0, y: -height * 0.14 }, // Arriba
    { x: width * 0.37, y: 0 },    // Derecha
    { x: 0, y: height * 0.13 },  // Abajo
    { x: -width * 0.37, y: 0 },   // Izquierda
  ];

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
          const rotate = interpolate(animatedValue.value, [0, 1], [0, 360]);
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
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: Platform.OS === "android" ? 10 : 0,
  },
});
