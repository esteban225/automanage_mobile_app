import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return <FontAwesome5 size={20} style={{ marginBottom: -4 }} solid {...props} />;
}

export default function UserLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="car/index"
        options={{
          title: "Vehículo",
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
        }}
      />
      <Tabs.Screen
        name="emergency/index"
        options={{
          title: "Emergencia",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ambulance" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications/index"
        options={{
          title: "Notificaciones",
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: "Ajustes",
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
