import { Waves } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { Dimensions, Text, useColorScheme, View } from "react-native";

import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const generateWaveData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    value: Math.sin(i * 0.5) * 10 + Math.random() * 5,
    value2: Math.cos(i * 0.3) * 8 + Math.random() * 4,
  }));
};

export default function LiveMonitor() {
  const isDark = useColorScheme() === "dark";

  const [data, setData] = useState(generateWaveData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)];

        const lastTime = prev[prev.length - 1].time;

        newData.push({
          time: lastTime + 1,
          value: Math.sin((lastTime + 1) * 0.5) * 10 + Math.random() * 5,

          value2: Math.cos((lastTime + 1) * 0.3) * 8 + Math.random() * 4,
        });

        return newData;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const chartData = useMemo(() => {
    return {
      labels: data.map(() => ""),
      datasets: [
        {
          data: data.map((d) => d.value),
          color: () => "#3B82F6",
          strokeWidth: 2,
        },
        {
          data: data.map((d) => d.value2),
          color: () => "#8B5CF6",
          strokeWidth: 2,
        },
      ],
    };
  }, [data]);

  return (
    <View
      style={{
        backgroundColor: "#0F172A",
        borderRadius: 28,
        padding: 24,
        borderWidth: 1,
        borderColor: "#1E293B",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              backgroundColor: "#10B981",
            }}
          />

          <Text
            style={{
              fontSize: 11,
              fontWeight: "700",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "#10B981",
            }}
          >
            Live EEG Stream
          </Text>
        </View>

        <Waves size={18} color="#475569" />
      </View>

      {/* CHART */}
      <View
        style={{
          height: 140,
          opacity: 0.8,
          marginLeft: -60,
        }}
      >
        <LineChart
          data={chartData}
          width={screenWidth - 40}
          height={140}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          withShadow={false}
          withVerticalLabels={false}
          withHorizontalLabels={false}
          bezier
          transparent
          chartConfig={{
            backgroundGradientFrom: "#0F172A",
            backgroundGradientTo: "#0F172A",
            decimalPlaces: 1,

            color: () => "#3B82F6",

            labelColor: () => "#64748B",

            propsForBackgroundLines: {
              strokeWidth: 0,
            },
          }}
          style={{
            borderRadius: 16,
          }}
        />
      </View>

      {/* CHANNELS */}
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          marginTop: 16,
        }}
      >
        {["Channel 1", "Channel 2", "Channel 3"].map((wave, index) => (
          <View
            key={wave}
            style={{
              flex: 1,
              backgroundColor: "rgba(30,41,59,0.7)",
              borderRadius: 14,
              paddingVertical: 12,
              paddingHorizontal: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                color: "#64748B",
                marginBottom: 4,
              }}
            >
              {wave}
            </Text>

            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: "#CBD5E1",
              }}
            >
              {(Math.random() * 20 + 10).toFixed(1)}Hz
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
