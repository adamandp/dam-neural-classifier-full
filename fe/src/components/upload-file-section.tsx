import {
  Upload,
  FileText,
  CheckCircle2,
  Loader2,
  AlertCircle,
  RefreshCw,
  Trash,
} from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { JobStatus, type JobsStatusRes } from "@/types/jobs-interface";
import type { AxiosError } from "axios";
import type { UseMutationResult } from "@tanstack/react-query";
import { useEffect } from "react";

type UploadStep = "idle" | "uploading" | "processing";

interface UploadFileProps {
  file: File | null;
  setFile: (file: File | null) => void;
  uploadStep: UploadStep;
  statusData: JobsStatusRes | undefined;
  statusError: AxiosError | null;
  processMutation: UseMutationResult<string, Error, File>;
}

export default function UploadFile(uploadFileProps: UploadFileProps) {
  const {
    file,
    setFile,
    uploadStep,
    statusData,
    statusError,
    processMutation,
  } = uploadFileProps;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        const canSubmit =
          file && uploadStep !== "uploading" && uploadStep !== "processing";
        if (canSubmit) {
          processMutation.mutate(file);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [file, uploadStep, processMutation]);

  const isProcessing =
    uploadStep === "uploading" || uploadStep === "processing";
  const showButton = !isProcessing || !!statusError;
  const buttonLabel = statusError
    ? "Retry Analysis"
    : "Generate Diagnostic Report";

  return (
    <div className="relative">
      <div className={`relative w-full ${file ? "h-32" : "h-64"}`}>
        <div
          className={`flex w-full h-full gap-4 border-2 border-dashed rounded-3xl transition-all duration-300 ${
            file
              ? "border-blue-200 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-950/10"
              : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 hover:border-blue-400 dark:hover:border-blue-500 flex-col items-center justify-center"
          }`}
        >
          {file ? (
            <div className="flex justify-center items-center gap-4 px-8 w-full">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis
                </p>
              </div>
              {showButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="text-red-500 hover:text-red-600 animate-in fade-in"
                >
                  <Trash className="w-4 h-4" /> Remove
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm mb-4">
                <Upload className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Drag & drop or click to select file
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                Supports .set, .edf, or .fif (Max 50MB)
              </p>
            </div>
          )}
        </div>
        <input
          type="file"
          accept=".set,.edf,.fif"
          className={`absolute inset-0 w-full h-full cursor-pointer opacity-0 z-0 ${file ? "hidden" : "block"}`}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          disabled={uploadStep === "uploading" || uploadStep === "processing"}
        />
      </div>

      {uploadStep !== "idle" && (
        <div className="space-y-4 mt-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-3">
              {statusData?.status === JobStatus.FINISHED ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
              )}
              {uploadStep === "uploading"
                ? "Uploading to secure server..."
                : `System Status: ${statusData?.status || "Computing..."}`}
            </span>
            <span className="tabular-nums font-bold">
              {uploadStep === "uploading"
                ? "25%"
                : `${statusData?.progress || 0}%`}
            </span>
          </div>
          <Progress
            value={uploadStep === "uploading" ? 10 : statusData?.progress || 0}
            className="h-3"
          />
        </div>
      )}

      {statusError && (
        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-400 mt-6">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">
            Network interruption. Retrying connection...
          </p>
        </div>
      )}

      {showButton && (
        <Button
          className={`w-full mt-8 py-6 text-base shadow-xl transition-all duration-300 ${statusError ? "bg-amber-600 hover:bg-amber-700" : ""}`}
          disabled={!file}
          onClick={() => {
            if (!file) return;
            processMutation.mutate(file);
          }}
        >
          {statusError ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Retry Analysis
            </span>
          ) : (
            buttonLabel
          )}
        </Button>
      )}
    </div>
  );
}
