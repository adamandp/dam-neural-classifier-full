export const JobStatus = {
  PENDING: "pending",
  DOWNLOADING: "downloading",
  LOADING: "loading",
  PROCESSING: "processing",
  SEGMENTING: "segmenting",
  EXTRACTING_FEATURES: "extracting_features",
  EXTRACTING_FEATURES_CONNECTIVITY: "extracting_features_connectivity",
  PREDICTING: "predicting",
  FINISHED: "finished",
  FAILED: "failed",
} as const;

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];

export interface PredictionProbabilities {
  MCI: number;
  Normal: number;
  Alzheimer: number;
}

export interface PredictionDetail {
  prediction: string;
  probabilities: PredictionProbabilities;
}

/** * Request Payloads
 */

export interface JobsUploadUrlReq {
  filename: string;
}

export interface JobsProcessReq {
  job_file_name: string;
}

/** * Response Payloads
 */

export interface JobsUploadUrlRes {
  url: string;
  job_file_name: string;
}

export interface JobsProcessRes {
  job_id: string; // UUID is represented as string in TS
}

export interface JobsStatusRes {
  job_id: string;
  status: JobStatus;
  progress: number;
  result: PredictionDetail | null;
}
