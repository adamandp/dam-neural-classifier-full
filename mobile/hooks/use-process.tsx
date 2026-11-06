import axiosInstance from "@/utils/axios-instance";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { DocumentPickerAsset } from "expo-document-picker";
import { useState } from "react";
import type { UploadStepType } from "../types/upload-step-interface";

export function useProcess() {
  const [jobId, setJobId] = useState<string | null>(null);
  const [uploadStep, setUploadStep] = useState<UploadStepType>("idle");

  const processMutation = useMutation({
    mutationFn: async (selectedFile: DocumentPickerAsset) => {
      setUploadStep("uploading");

      console.log("Requesting upload URL for file:", selectedFile.name);

      const { data: urlData } = await axiosInstance.post("/jobs/upload-url", {
        filename: selectedFile.name,
      });

      console.log("Received upload URL:", urlData.data.url);

      const { url, job_file_name } = urlData.data;

      const response = await fetch(selectedFile.uri);
      const arrayBuffer = await response.arrayBuffer();

      await axios.put(url, arrayBuffer, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      const { data: processData } = await axiosInstance.post("/jobs/process", {
        job_file_name: job_file_name,
      });

      return processData.data.job_id;
    },

    onMutate: () => {
      setUploadStep("uploading");
    },

    onSuccess: (id) => {
      setJobId(id);
      setUploadStep("processing");
    },

    onError: (err) => {
      console.error("Analysis Pipeline Failed:", err);
      setUploadStep("idle");
    },
  });

  return {
    processMutation,
    jobId,
    setJobId,
    uploadStep,
    setUploadStep,
  };
}
