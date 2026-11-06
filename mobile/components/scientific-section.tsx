import { Brain, Cpu, Database, Microscope } from "lucide-react-native";

import { Text, useColorScheme, View } from "react-native";

const scientificList = [
  {
    icon: Microscope,
    color: "#3B82F6",
    title: "Signal Processing",
    desc: "Preprocessing and transformation techniques to extract meaningful patterns from input signals.",
  },
  {
    icon: Cpu,
    color: "#8B5CF6",
    title: "Machine Learning",
    desc: "Model-based approach to analyze extracted features and generate predictions.",
  },
  {
    icon: Database,
    color: "#10B981",
    title: "Data Pipeline",
    desc: "Structured pipeline including data loading, preprocessing, segmentation, and inference.",
  },
  {
    icon: Brain,
    color: "#F43F5E",
    title: "Feature Engineering",
    desc: "Extraction of key features to improve model interpretability and performance.",
  },
];

export default function ScientificSection() {
  const isDark = useColorScheme() === "dark";

  return (
    <View
      style={{
        paddingVertical: 80,
        paddingHorizontal: 20,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          alignItems: "center",
          marginBottom: 50,
        }}
      >
        <Text
          style={{
            fontSize: 38,
            fontWeight: "900",
            textAlign: "center",
            marginBottom: 18,
            color: isDark ? "#fff" : "#0F172A",
          }}
        >
          Scientific Methodology
        </Text>

        <Text
          style={{
            fontSize: 16,
            lineHeight: 28,
            textAlign: "center",
            maxWidth: 650,
            color: isDark ? "#94A3B8" : "#64748B",
          }}
        >
          Built on decades of clinical research and validated against standard
          neuropsychological assessments.
        </Text>
      </View>

      {/* CARDS */}
      <View
        style={{
          gap: 20,
        }}
      >
        {scientificList.map((item, idx) => {
          const Icon = item.icon;

          return (
            <View
              key={idx}
              style={{
                padding: 28,
                borderRadius: 28,
                backgroundColor: isDark ? "rgba(15,23,42,0.6)" : "#F8FAFC",

                borderWidth: 1,
                borderColor: isDark ? "#1E293B" : "transparent",
              }}
            >
              {/* ICON */}
              <View
                style={{
                  padding: 16,
                  borderRadius: 20,
                  backgroundColor: isDark ? "#1E293B" : "#fff",

                  alignSelf: "flex-start",
                  marginBottom: 22,

                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.08,
                  shadowRadius: 10,

                  elevation: 4,
                }}
              >
                <Icon size={28} color={item.color} />
              </View>

              {/* TITLE */}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
                  marginBottom: 12,
                  color: isDark ? "#fff" : "#0F172A",
                }}
              >
                {item.title}
              </Text>

              {/* DESC */}
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 24,
                  color: isDark ? "#94A3B8" : "#475569",
                }}
              >
                {item.desc}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
