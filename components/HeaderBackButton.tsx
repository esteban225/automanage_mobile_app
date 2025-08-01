import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { useTheme } from '@/src/presentation/theme/ThemeContext';
import { TouchableOpacity } from "react-native";

export default function HeaderBackButton() {
 
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{ paddingLeft: 36 }}
    >
      <Ionicons name="arrow-back" size={24} color={theme.text} />
    </TouchableOpacity>
  );
}
