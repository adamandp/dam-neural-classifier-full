import { Brain, ChevronRight, ShieldCheck, Zap } from "lucide-react-native";
import type { RefObject } from "react";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";

import LiveMonitor from "./live-monitor";

export default function HeroSection({ ref }: { ref: RefObject<any> }) {
  const isDark = useColorScheme() === "dark";

  return (
    <View
      style={{
        paddingVertical: 40,
        gap: 50,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          gap: 24,
          alignItems: "center",
        }}
      >
        {/* Badge */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: isDark ? "#172554" : "#EFF6FF",
            borderRadius: 999,
            borderWidth: 1,
            borderColor: isDark ? "#1E3A8A" : "#DBEAFE",
          }}
        >
          <Zap size={12} color="#2563EB" />

          <Text
            style={{
              color: "#2563EB",
              fontSize: 11,
              fontWeight: "800",
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            ML-Powered Diagnostics
          </Text>
        </View>

        {/* Title */}
        <Text
          style={{
            fontSize: 46,
            lineHeight: 52,
            fontWeight: "900",
            textAlign: "center",
            color: isDark ? "#fff" : "#0F172A",
          }}
        >
          Analyze Brain {"\n"}
          <Text style={{ color: "#2563EB" }}>Signal</Text>
        </Text>

        {/* Description */}
        <Text
          style={{
            fontSize: 16,
            lineHeight: 28,
            textAlign: "center",
            color: isDark ? "#94A3B8" : "#64748B",
            maxWidth: 500,
          }}
        >
          Analyze raw EEG signals using advanced signal processing and machine
          learning to support early detection of neurological conditions such as
          Normal, Mild Cognitive Impairment (MCI) or Alzheimer’s.
        </Text>

        {/* Button */}
        <TouchableOpacity
          onPress={() => {
            ref.current?.scrollTo?.({
              y: 0,
              animated: true,
            });
          }}
          activeOpacity={0.8}
          style={{
            backgroundColor: "#2563EB",
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderRadius: 18,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Analyze Now
          </Text>

          <ChevronRight size={18} color="#fff" />
        </TouchableOpacity>

        {/* Features */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 24,
            opacity: 0.6,
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Brain size={18} color={isDark ? "#fff" : "#0F172A"} />

            <Text
              style={{
                fontWeight: "700",
                color: isDark ? "#fff" : "#0F172A",
              }}
            >
              Advance Analysis
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <ShieldCheck size={18} color={isDark ? "#fff" : "#0F172A"} />

            <Text
              style={{
                fontWeight: "700",
                color: isDark ? "#fff" : "#0F172A",
              }}
            >
              Secure Data
            </Text>
          </View>
        </View>
      </View>

      {/* RIGHT */}
      <View
        style={{
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Glow */}
        <View
          style={{
            position: "absolute",
            inset: -20,
            // backgroundColor: "#3B82F6",
            opacity: 0.15,
            borderRadius: 40,
          }}
        />

        <View
          style={{
            width: "100%",
            maxWidth: 500,
            position: "relative",
          }}
        >
          <LiveMonitor />
        </View>
      </View>
    </View>
  );
}
