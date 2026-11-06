import { JobsStatusRes, JobStatus } from "@/types/jobs-interface";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DocumentPickerAsset, getDocumentAsync } from "expo-document-picker";

import {
  AlertCircle,
  CheckCircle2,
  FileText,
  RefreshCw,
  Trash,
  Upload,
} from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

type UploadStep = "idle" | "uploading" | "processing";

interface UploadFileProps {
  file: DocumentPickerAsset | null;
  setFile: (file: DocumentPickerAsset | null) => void;
  uploadStep: UploadStep;
  statusData: JobsStatusRes | undefined;
  statusError: AxiosError | null;
  processMutation: UseMutationResult<string, Error, DocumentPickerAsset>;
}

export default function UploadFile({
  file,
  setFile,
  uploadStep,
  statusData,
  statusError,
  processMutation,
}: UploadFileProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const isProcessing =
    uploadStep === "uploading" || uploadStep === "processing";

  const showButton = !isProcessing || !!statusError;

  const buttonLabel = statusError
    ? "Retry Analysis"
    : "Generate Diagnostic Report";

  // Handle mobile file picking
  const handlePickFile = async () => {
    if (isProcessing) return;
    try {
      const result = await getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const pickedFile = result.assets[0];
        setFile(pickedFile);
      }
    } catch (err) {
      console.log("Error picking file:", err);
    }
  };

  const currentProgress =
    uploadStep === "uploading" ? 10 : statusData?.progress || 0;

  return (
    <View style={styles.container}>
      {/* Upload/Dropzone Area */}
      <TouchableOpacity
        style={[
          styles.dropzone,
          file
            ? isDark
              ? styles.dropzoneActiveDark
              : styles.dropzoneActiveLight
            : isDark
              ? styles.dropzoneIdleDark
              : styles.dropzoneIdleLight,
          { height: file ? 128 : 256 },
        ]}
        onPress={handlePickFile}
        disabled={isProcessing}
        activeOpacity={0.7}
      >
        {file ? (
          <View style={styles.fileActiveContainer}>
            <View style={styles.fileIconWrapper}>
              <FileText size={32} color="#3b82f6" />
            </View>
            <View style={styles.fileTextContainer}>
              <Text
                style={[
                  styles.fileName,
                  isDark ? styles.textSlate200 : styles.textSlate700,
                ]}
                numberOfLines={1}
              >
                {file.name}
              </Text>
              <Text
                style={[
                  styles.fileSubtext,
                  isDark ? styles.textSlate400 : styles.textSlate500,
                ]}
              >
                {file.size ? (file.size / 1024 / 1024).toFixed(2) : "Unknown"}{" "}
                MB • Ready for analysis
              </Text>
            </View>
            {showButton && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => setFile(null)}
              >
                <Trash size={16} color="#ef4444" />
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.idleContainer}>
            <View
              style={[
                styles.uploadIconWrapper,
                isDark ? styles.bgSlate800 : styles.bgWhite,
              ]}
            >
              <Upload size={32} color="#3b82f6" />
            </View>
            <Text
              style={[
                styles.promptText,
                isDark ? styles.textSlate300 : styles.textSlate700,
              ]}
            >
              Tap to select file
            </Text>
            <Text
              style={[
                styles.subPromptText,
                isDark ? styles.textSlate500 : styles.textSlate500,
              ]}
            >
              Supports .set, .edf, or .fif (Max 50MB)
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Progress Section */}
      {uploadStep !== "idle" && (
        <View
          style={[
            styles.statusContainer,
            isDark ? styles.statusDark : styles.statusLight,
          ]}
        >
          <View style={styles.statusHeader}>
            <View style={styles.statusTextRow}>
              {statusData?.status === JobStatus.FINISHED ? (
                <CheckCircle2 size={20} color="#10b981" />
              ) : (
                <ActivityIndicator size="small" color="#3b82f6" />
              )}
              <Text
                style={[
                  styles.statusText,
                  isDark ? styles.textSlate300 : styles.textSlate700,
                ]}
              >
                {uploadStep === "uploading"
                  ? "Uploading to secure server..."
                  : `System Status: ${statusData?.status || "Computing..."}`}
              </Text>
            </View>
            <Text
              style={[
                styles.progressPercentage,
                isDark ? styles.textSlate300 : styles.textSlate700,
              ]}
            >
              {uploadStep === "uploading"
                ? "25%"
                : `${statusData?.progress || 0}%`}
            </Text>
          </View>

          {/* Custom Progress Bar */}
          <View
            style={[
              styles.progressBarBg,
              isDark ? styles.bgSlate800 : styles.bgSlate200,
            ]}
          >
            <View
              style={[styles.progressBarFill, { width: `${currentProgress}%` }]}
            />
          </View>
        </View>
      )}

      {/* Error Section */}
      {statusError && (
        <View
          style={[
            styles.errorContainer,
            isDark ? styles.errorDark : styles.errorLight,
          ]}
        >
          <AlertCircle size={20} color={isDark ? "#f87171" : "#b91c1c"} />
          <Text
            style={[
              styles.errorText,
              isDark ? styles.textRed400 : styles.textRed700,
            ]}
          >
            Network interruption. Retrying connection...
          </Text>
        </View>
      )}

      {/* Main Action Button */}
      {showButton && (
        <TouchableOpacity
          style={[
            styles.actionButton,
            statusError ? styles.buttonWarning : styles.buttonPrimary,
            !file && styles.buttonDisabled,
          ]}
          disabled={!file}
          onPress={() => {
            if (!file) return;
            processMutation.mutate(file);
          }}
        >
          {statusError ? (
            <View style={styles.buttonContent}>
              <RefreshCw size={20} color="#fff" />
              <Text style={styles.buttonText}>Retry Analysis</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dropzone: {
    width: "100%",
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  dropzoneIdleLight: {
    borderColor: "#e2e8f0",
    backgroundColor: "rgba(248, 250, 252, 0.5)",
  },
  dropzoneIdleDark: {
    borderColor: "#1e293b",
    backgroundColor: "rgba(15, 23, 42, 0.2)",
  },
  dropzoneActiveLight: {
    borderColor: "#bfdbfe",
    backgroundColor: "rgba(239, 246, 255, 0.3)",
  },
  dropzoneActiveDark: {
    borderColor: "rgba(30, 58, 138, 0.5)",
    backgroundColor: "rgba(23, 37, 84, 0.1)",
  },
  idleContainer: {
    alignItems: "center",
  },
  uploadIconWrapper: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bgWhite: { backgroundColor: "#ffffff" },
  bgSlate800: { backgroundColor: "#1e293b" },
  promptText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subPromptText: {
    fontSize: 12,
    marginTop: 4,
  },
  fileActiveContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    width: "100%",
  },
  fileIconWrapper: {
    padding: 12,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 12,
    marginRight: 16,
  },
  fileTextContainer: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  fileSubtext: {
    fontSize: 12,
    marginTop: 2,
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  removeText: {
    color: "#ef4444",
    fontSize: 14,
    marginLeft: 4,
  },
  statusContainer: {
    marginTop: 32,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  statusLight: {
    backgroundColor: "#f8fafc",
    borderColor: "#f1f5f9",
  },
  statusDark: {
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    borderColor: "#1e293b",
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: "bold",
  },
  progressBarBg: {
    height: 12,
    borderRadius: 6,
    width: "100%",
    overflow: "hidden",
  },
  bgSlate200: { backgroundColor: "#e2e8f0" },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 6,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  errorLight: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
  },
  errorDark: {
    backgroundColor: "rgba(69, 10, 10, 0.3)",
    borderColor: "rgba(127, 29, 29, 0.5)",
  },
  errorText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 12,
  },
  actionButton: {
    marginTop: 32,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimary: {
    backgroundColor: "#0f172a", // Slate 900
  },
  buttonWarning: {
    backgroundColor: "#d97706", // Amber 600
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  // Text Colors
  textSlate700: { color: "#334155" },
  textSlate500: { color: "#64748b" },
  textSlate400: { color: "#94a3b8" },
  textSlate300: { color: "#cbd5e1" },
  textSlate200: { color: "#e2e8f0" },
  textRed700: { color: "#b91c1c" },
  textRed400: { color: "#f87171" },
});
