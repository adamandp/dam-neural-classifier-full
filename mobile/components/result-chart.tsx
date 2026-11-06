import { RefObject, useMemo } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { JobsStatusRes } from "@/types/jobs-interface";
import { UploadStepType } from "@/types/upload-step-interface";
import { DocumentPickerAsset } from "expo-document-picker/build/types";
import { Activity, ShieldCheck } from "lucide-react-native";

interface ResultChartProps {
  statusData: JobsStatusRes | undefined;
  setFile: (file: DocumentPickerAsset | null) => void;
  setJobId: (jobId: string | null) => void;
  setUploadStep: (step: UploadStepType) => void;
  ref: RefObject<null>;
}

function ProbabilityBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const isDark = useColorScheme() === "dark";

  return (
    <View style={styles.probBarContainer}>
      <View style={styles.probBarHeader}>
        <Text
          style={[
            styles.probBarLabel,
            isDark ? styles.textSlate300 : styles.textSlate700,
          ]}
        >
          {label}
        </Text>
        <Text
          style={[
            styles.probBarValue,
            isDark ? styles.textWhite : styles.textBlack,
          ]}
        >
          {value}%
        </Text>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${value}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

export default function ResultChart({
  statusData,
  setFile,
  setJobId,
  setUploadStep,
}: ResultChartProps) {
  const isDark = useColorScheme() === "dark";

  const chartData = useMemo(() => {
    if (!statusData?.result) return [];

    const probs = statusData.result.probabilities;

    return [
      {
        label: "Alzheimer",
        value: Math.round(probs.Alzheimer * 100),
        color: "#ef4444",
      },
      {
        label: "MCI",
        value: Math.round(probs.MCI * 100),
        color: "#f59e0b",
      },
      {
        label: "Normal",
        value: Math.round(probs.Normal * 100),
        color: "#10b981",
      },
    ].sort((a, b) => b.value - a.value);
  }, [statusData]);

  const prediction = statusData?.result?.prediction;
  const predictionResult = statusData?.result?.prediction;
  const confidenceValue =
    chartData.find((d) => d.label === predictionResult)?.value || 0;
  const confidence =
    chartData.find((item) => item.label === prediction)?.value || 0;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.chartCard,
          isDark ? styles.bgSlate900 : styles.bgWhite,
          isDark ? styles.borderSlate800 : styles.borderSlate200,
        ]}
      >
        <View
          style={[
            styles.cardHeader,
            isDark ? styles.borderSlate800 : styles.borderSlate200,
          ]}
        >
          <View>
            <Text
              style={[
                styles.cardTitle,
                isDark ? styles.textWhite : styles.textBlack,
              ]}
            >
              Machine Learning Analysis
            </Text>
            <Text style={styles.cardSubtitle}>Probability Distribution</Text>
          </View>
          <Activity size={24} color="#3b82f6" />
        </View>

        <View style={styles.cardBody}>
          {chartData.map((item) => (
            <ProbabilityBar key={item.label} {...item} />
          ))}
        </View>

        <View
          style={[
            styles.cardFooter,
            isDark ? styles.bgSlate800 : styles.bgSlate50,
          ]}
        >
          <ShieldCheck size={28} color="#10b981" />
          <Text
            style={[
              styles.footerText,
              isDark ? styles.textSlate300 : styles.textSlate600,
            ]}
          >
            Leveraging 43 high-dimensional EEG features, the model reached this
            conclusion with {confidence}% confidence.
          </Text>
        </View>
      </View>

      <View style={styles.diagnosisCard}>
        <Text style={styles.diagnosisLabel}>Final Conclusion</Text>
        <Text style={styles.diagnosisValue}>{prediction}</Text>
        <View style={styles.divider} />
        <View style={styles.confidenceBadge}>
          <Text style={styles.confidenceLabel}>AI Confidence</Text>
          <Text style={styles.confidenceValue}>{confidenceValue}%</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => {
          setFile(null);
          setJobId(null);
          setUploadStep("idle");
        }}
      >
        <Text style={styles.actionButtonText}>Process Another Case</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    gap: 24,
    marginHorizontal: 20,
  },
  probBarContainer: {
    marginBottom: 24,
  },
  probBarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  probBarLabel: {
    fontWeight: "bold",
  },
  probBarValue: {
    fontWeight: "bold",
  },
  track: {
    height: 20,
    borderRadius: 9999,
    backgroundColor: "#e2e8f0",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 9999,
  },
  chartCard: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardHeader: {
    padding: 24,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#64748b",
    marginTop: 4,
  },
  cardBody: {
    padding: 24,
  },
  cardFooter: {
    padding: 24,
    flexDirection: "row",
  },
  footerText: {
    marginLeft: 16,
    flex: 1,
  },
  diagnosisCard: {
    borderRadius: 24,
    backgroundColor: "#2563eb",
    padding: 32,
    alignItems: "center",
  },
  diagnosisLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    textTransform: "uppercase",
    fontSize: 12,
  },
  diagnosisValue: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "900",
    marginTop: 8,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 24,
  },
  confidenceBadge: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 20,
    width: "100%",
    alignItems: "center",
  },
  confidenceLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    textTransform: "uppercase",
  },
  confidenceValue: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "900",
  },
  actionButton: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  bgWhite: {
    backgroundColor: "#ffffff",
  },
  bgSlate50: {
    backgroundColor: "#f8fafc",
  },
  bgSlate800: {
    backgroundColor: "#1e293b",
  },
  bgSlate900: {
    backgroundColor: "#0f172a",
  },
  borderSlate200: {
    borderColor: "#e2e8f0",
  },
  borderSlate800: {
    borderColor: "#1e293b",
  },
  textBlack: {
    color: "#000000",
  },
  textWhite: {
    color: "#ffffff",
  },
  textSlate300: {
    color: "#cbd5e1",
  },
  textSlate600: {
    color: "#475569",
  },
  textSlate700: {
    color: "#334155",
  },
});
