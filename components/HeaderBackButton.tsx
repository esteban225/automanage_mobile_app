import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from '@/src/presentation/theme/ThemeContext';
import { TouchableOpacity } from "react-native";

export default function HeaderBackButton() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ paddingLeft: 16 }}
    >
      <Ionicons name="arrow-back" size={24} color={theme.text} />
    </TouchableOpacity>
  );
}
