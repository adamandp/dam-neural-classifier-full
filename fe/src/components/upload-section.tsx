import UploadFile from "./upload-file-section";
import type { JobsStatusRes } from "@/types/jobs-interface";
import type { AxiosError } from "axios";
import { Activity } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { RefObject } from "react";

type UploadStep = "idle" | "uploading" | "processing";

interface UploadAreaProps {
  file: File | null;
  setFile: (file: File | null) => void;
  uploadStep: UploadStep;
  statusData: JobsStatusRes | undefined;
  statusError: AxiosError | null;
  processMutation: UseMutationResult<string, Error, File>;
  ref: RefObject<HTMLDivElement | null>;
}

export default function UploadArea(uploadFileProps: UploadAreaProps) {
  const {
    file,
    setFile,
    uploadStep,
    statusData,
    statusError,
    processMutation,
    ref,
  } = uploadFileProps;

  return (
    <div className="scroll-mt-24" id="upload-area" ref={ref}>
      <div className="mx-auto bg-slate-50/50 dark:bg-slate-900/30 px-4 py-10 lg:p-12 rounded-3xl border border-slate-100 dark:border-slate-900">
        <div className="text-center mb-12">
          <div className="bg-blue-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Start New Analysis
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Securely upload your EEG data for instant classification.
          </p>
        </div>
        <UploadFile
          file={file}
          setFile={setFile}
          uploadStep={uploadStep}
          statusData={statusData}
          statusError={statusError}
          processMutation={processMutation}
        />
      </div>
    </div>
  );
}
