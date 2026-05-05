"use client";

import axios from "axios";
import axiosInstance from "@/utils/axios-instance";
import type { UploadStepType } from "@/types/upload-step-interface";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export function useProcess() {
  const [jobId, setJobId] = useState<string | null>(null);
  const [uploadStep, setUploadStep] = useState<UploadStepType>("idle");

  const processMutation = useMutation({
    mutationFn: async (selectedFile: File) => {
      setUploadStep("uploading");

      const { data: urlData } = await axiosInstance.post("/jobs/upload-url", {
        filename: selectedFile.name,
      });
      const { url, job_file_name } = urlData.data;

      await axios.put(url, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type || "application/octet-stream",
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
