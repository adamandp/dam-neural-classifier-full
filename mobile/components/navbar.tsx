import { Text, View } from "react-native";

export default function Navbar() {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: "#0b212d",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Dam Neural Classifier
      </Text>
    </View>
  );
}
