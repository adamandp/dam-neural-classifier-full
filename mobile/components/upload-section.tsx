import { Activity } from "lucide-react-native";
import type { RefObject } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

import { UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { DocumentPickerAsset } from "expo-document-picker";
import type { JobsStatusRes } from "../types/jobs-interface";
import UploadFile from "./upload-file-section";

type UploadStep = "idle" | "uploading" | "processing";

interface UploadAreaProps {
  file: DocumentPickerAsset | null;
  setFile: (file: DocumentPickerAsset | null) => void;
  uploadStep: UploadStep;
  statusData: JobsStatusRes | undefined;
  statusError: AxiosError | null;
  processMutation: UseMutationResult<string, Error, DocumentPickerAsset>;
  ref?: RefObject<View | null>;
}

export default function UploadArea({
  file,
  setFile,
  uploadStep,
  statusData,
  statusError,
  processMutation,
  ref,
}: UploadAreaProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={styles.container} testID="upload-area" ref={ref}>
      <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <Activity size={24} color="#ffffff" />
          </View>

          <Text
            style={[
              styles.title,
              isDark ? styles.textWhite : styles.textSlate900,
            ]}
          >
            Start New Analysis
          </Text>

          <Text
            style={[
              styles.subtitle,
              isDark ? styles.textSlate400 : styles.textSlate500,
            ]}
          >
            Securely upload your EEG data for instant classification.
          </Text>
        </View>

        <UploadFile
          file={file}
          setFile={setFile}
          uploadStep={uploadStep}
          statusData={statusData}
          statusError={statusError}
          processMutation={processMutation}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 96,
    width: "100%",
  },
  card: {
    alignSelf: "center",
    width: "90%",
    paddingHorizontal: 16,
    paddingVertical: 40,
    borderRadius: 24,
    borderWidth: 1,
  },
  cardLight: {
    backgroundColor: "rgba(248, 250, 252, 0.5)",
    borderColor: "#f1f5f9",
  },
  cardDark: {
    backgroundColor: "rgba(15, 23, 42, 0.3)",
    borderColor: "#0f172a",
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  iconWrapper: {
    backgroundColor: "#2563eb",
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  textWhite: { color: "#ffffff" },
  textSlate900: { color: "#0f172a" },
  textSlate400: { color: "#94a3b8" },
  textSlate500: { color: "#64748b" },
});
