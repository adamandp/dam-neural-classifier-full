"use client";

import { JobStatus, type JobsStatusRes } from "@/types/jobs-interface";
import type { UploadStepType } from "@/types/upload-step-interface";
import axiosInstance from "@/utils/axios-instance";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface UseGetStatusProps {
  jobId: string | null;
  uploadStep: UploadStepType;
}

export default function useGetStatus({ jobId, uploadStep }: UseGetStatusProps) {
  const { data: statusData, error: statusError } = useQuery<
    JobsStatusRes,
    AxiosError
  >({
    queryKey: ["jobStatus", jobId],
    queryFn: async () => {
      const response = await axiosInstance.get<{ data: JobsStatusRes }>(
        `/jobs/status/${jobId}`,
      );
      return response.data.data;
    },
    enabled: !!jobId && uploadStep === "processing",

    refetchInterval: (query) => {
      const status = query.state.data?.status;

      if (
        !status ||
        (status !== JobStatus.FINISHED && status !== JobStatus.FAILED)
      )
        return 2000;

      return false;
    },
    refetchOnWindowFocus: false,
  });

  return { statusData, statusError };
}
