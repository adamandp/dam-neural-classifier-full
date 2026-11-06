import { useAppState } from "@/hooks/use-app-state";
import { useOnlineManager } from "@/hooks/use-online-manager";
import { Ionicons } from "@expo/vector-icons";
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Stack } from "expo-router";
import {
  Appearance,
  AppStateStatus,
  Platform,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function RootLayout() {
  useOnlineManager();

  useAppState(onAppStateChange);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const toggleDarkMode = () => {
    Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerTitleAlign: "left",

          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 7,
                paddingRight: Platform.OS === "ios" ? 120 : 0,
              }}
            >
              <View
                style={{
                  backgroundColor: "#2563EB",
                  padding: 6,
                  borderRadius: 10,

                  // iOS
                  shadowColor: "#3B82F6",
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 10,

                  // Android
                  elevation: 8,
                }}
              >
                <Ionicons name="pulse-outline" size={18} color="#fff" />
              </View>
              <Text
                style={{
                  color: isDark ? "#fff" : "#0f172a",
                  fontSize: 14,
                  fontWeight: "700",
                  letterSpacing: 0.85,
                }}
              >
                Dam Neural Classifier
              </Text>
            </View>
          ),

          headerRight: () => (
            <TouchableOpacity onPress={toggleDarkMode} style={{ padding: 7 }}>
              <Ionicons
                name={isDark ? "sunny" : "moon"}
                size={22}
                color={isDark ? "#f59e0b" : "#475569"}
              />
            </TouchableOpacity>
          ),

          headerStyle: {
            backgroundColor: isDark ? "#0F172B" : "#fff",
          },

          headerShadowVisible: false,
        }}
      />
    </QueryClientProvider>
  );
}
