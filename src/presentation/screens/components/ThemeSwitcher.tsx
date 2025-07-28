// src/presentation/components/ThemeSwitcher.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/src/presentation/theme/ThemeContext";
import { themes } from "@/src/presentation/theme/themes";

export const ThemeSwitcher = () => {
  const { setThemeByName, theme } = useTheme();
  const themeNames = Object.keys(themes) as (keyof typeof themes)[];

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <Text style={[styles.title, { color: theme.text }]}>Cambiar Tema</Text>
      <View style={styles.buttonsContainer}>
        {themeNames.map((t) => (
          <TouchableOpacity
            key={t}
            style={[
              styles.button,
              {
                backgroundColor:
                  theme.name === t ? themes[t].secondary : themes[t].primary,
              },
            ]}
            onPress={() => setThemeByName(t)}
          >
            <Text style={[styles.buttonText, { color: themes[t].buttonText }]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    margin: 4,
  },
  buttonText: {
    fontSize: 14,
    textTransform: "capitalize",
  },
});
