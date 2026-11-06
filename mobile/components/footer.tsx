import { Globe, Mail, ShieldCheck, SquareActivity } from "lucide-react-native";

import {
  Linking,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import GithubIcon from "./icon/github-icon";

const reference = [
  {
    icon: GithubIcon,
    title: "Github",
    link: "https://github.com/adamandp",
  },
  {
    icon: Mail,
    title: "Email",
    link: "mailto:adamanandaputra@gmail.com",
  },
];

export default function Footer() {
  const isDark = useColorScheme() === "dark";

  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: isDark ? "#1E293B" : "#E2E8F0",
        paddingTop: 50,
        paddingBottom: 30,
        marginTop: 80,
        paddingHorizontal: 20,
      }}
    >
      {/* TOP */}
      <View
        style={{
          gap: 28,
        }}
      >
        {/* BRAND */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <SquareActivity size={30} color="#2563EB" />

          <Text
            style={{
              fontSize: 24,
              fontWeight: "800",
              color: isDark ? "#fff" : "#0F172A",
            }}
          >
            Precision EEG
          </Text>
        </View>

        {/* DESCRIPTION */}
        <Text
          style={{
            maxWidth: 360,
            fontSize: 15,
            lineHeight: 28,
            color: isDark ? "#94A3B8" : "#64748B",
          }}
        >
          Advanced neuro-diagnostic platform leveraging state-of-the-art deep
          learning for early cognitive impairment detection.
        </Text>

        {/* SOCIAL */}
        <View
          style={{
            flexDirection: "row",
            gap: 14,
          }}
        >
          {reference.map(({ icon: Icon, title, link }, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.8}
              onPress={() => Linking.openURL(link)}
              style={{
                padding: 14,
                borderRadius: 16,
                backgroundColor: isDark ? "#1E293B" : "#fff",

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
              <Icon
                width={20}
                height={20}
                color={isDark ? "#fff" : "#0F172A"}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* BOTTOM */}
      <View
        style={{
          marginTop: 50,
          paddingTop: 24,
          borderTopWidth: 1,
          borderTopColor: isDark ? "#1E293B" : "#E2E8F0",

          gap: 18,
        }}
      >
        {/* COPYRIGHT */}
        <Text
          style={{
            fontSize: 12,
            color: "#94A3B8",
          }}
        >
          © 2026 Dam Final Assignment. All rights reserved.
        </Text>

        {/* FEATURES */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <ShieldCheck size={14} color="#94A3B8" />

            <Text
              style={{
                fontSize: 12,
                color: "#94A3B8",
              }}
            >
              Secure Data
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Globe size={14} color="#94A3B8" />

            <Text
              style={{
                fontSize: 12,
                color: "#94A3B8",
              }}
            >
              Global Standard
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
