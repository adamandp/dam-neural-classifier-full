import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
  Cell,
  RenderableText,
} from "recharts";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { useMemo, type RefObject } from "react";
import type { JobsStatusRes } from "@/types/jobs-interface";
import { Button } from "./ui/button";
import type { UploadStepType } from "@/types/upload-step-interface";

interface ResultChartProps {
  statusData: JobsStatusRes | undefined;
  setFile: (file: File | null) => void;
  setJobId: (jobId: string | null) => void;
  setUploadStep: (step: UploadStepType) => void;
  ref: RefObject<HTMLDivElement | null>;
}

const DIAGNOSIS_THEMES = {
  Alzheimer: {
    bg: "bg-red-600 dark:bg-red-700",
    lightBg: "bg-red-500/20 dark:bg-red-500/30",
    textColor: "text-red-100",
    icon: <AlertCircle className="w-c-10 h-c-10 xl:w-c-20 xl:h-c-20" />,
    label: "Alzheimer",
    description: "High probability of cognitive decline detected.",
  },
  MCI: {
    bg: "bg-amber-500 dark:bg-amber-600",
    lightBg: "bg-amber-400/20 dark:bg-amber-400/30",
    textColor: "text-amber-500",
    icon: <Info className="w-c-10 h-c-10 xl:w-c-20 xl:h-c-20" />,
    label: "MCI",
    description: "Mild cognitive impairment patterns observed.",
  },
  Normal: {
    bg: "bg-emerald-600 dark:bg-emerald-700",
    lightBg: "bg-emerald-500/20 dark:bg-emerald-500/30",
    textColor: "text-emerald-100",
    icon: <CheckCircle2 className="w-c-10 h-c-10 xl:w-c-20 xl:h-c-20" />,
    label: "Normal",
    description: "Cognitive patterns appear within healthy range.",
  },
};

export function ResultChart({
  statusData,
  ref,
  setFile,
  setJobId,
  setUploadStep,
}: ResultChartProps) {
  const chartData = useMemo(() => {
    if (!statusData?.result) return [];
    const probs = statusData.result.probabilities;
    return [
      {
        label: "Alzheimer",
        value: Math.round(probs.Alzheimer * 100),
        fill: "var(--chart-1, #ef4444)",
      },
      {
        label: "MCI",
        value: Math.round(probs.MCI * 100),
        fill: "var(--chart-2, #f59e0b)",
      },
      {
        label: "Normal",
        value: Math.round(probs.Normal * 100),
        fill: "var(--chart-3, #10b981)",
      },
    ].sort((a, b) => b.value - a.value);
  }, [statusData]);

  const predictionResult = statusData?.result?.prediction;

  const currentTheme =
    DIAGNOSIS_THEMES[predictionResult as keyof typeof DIAGNOSIS_THEMES] ||
    DIAGNOSIS_THEMES.Normal;

  const confidenceValue =
    chartData.find((d) => d.label === predictionResult)?.value || 0;

  return (
    <div
      className="flex flex-col xl:grid xl:grid-cols-6 gap-8 mt-12 animate-in fade-in zoom-in duration-700"
      ref={ref}
    >
      <div className="xl:col-span-4 bg-white dark:bg-slate-900 rounded-4xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Machine Learning Analysis
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Probability Distribution across Classifiers
            </p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
            <Activity className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        <div className="p-8 h-80 w-full grow">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 20, right: 40, top: 10, bottom: 10 }}
            >
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                dataKey="label"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 14, fontWeight: 700, fill: "currentColor" }}
                className="text-slate-500 dark:text-slate-400"
              />
              <Bar dataKey="value" radius={[0, 16, 16, 0]} barSize={48}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={(v: RenderableText) => `${v}%`}
                  className="font-bold fill-slate-700 dark:fill-slate-300"
                  style={{ fontSize: "16px" }}
                  offset={15}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-8 bg-slate-50 dark:bg-slate-900/50 mt-auto flex items-center gap-6">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
            Leveraging 43 high-dimensional EEG features, the model reached this
            conclusion with {confidenceValue}% confidence.
          </p>
        </div>
      </div>

      <div
        className={`${currentTheme.bg} rounded-[2.5rem] p-10 text-white flex flex-col items-center justify-center relative overflow-hidden transition-all duration-1000 shadow-2xl shadow-blue-500/10 xl:col-span-2`}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div
          className={`${currentTheme.lightBg} p-6 rounded-full mb-8 backdrop-blur-xl animate-bounce shadow-inner`}
        >
          {currentTheme.icon}
        </div>
        <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-70 mb-2">
          Final Conclusion
        </span>
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-6 text-center">
          {currentTheme.label}
        </h2>
        <div className="w-full h-0.5 bg-white/20 mb-8" />
        <div className="bg-black/15 rounded-3xl p-6 backdrop-blur-md border border-white/10 w-full text-center">
          <span className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">
            AI Confidence
          </span>
          <span className="text-3xl font-black">{confidenceValue}%</span>
        </div>
        <p className="mt-8 text-xs text-white/80 text-center leading-relaxed font-medium">
          {currentTheme.description}
        </p>
      </div>
      <div className="col-span-6 flex justify-end">
        <Button
          onClick={() => {
            setFile(null);
            setJobId(null);
            setUploadStep("idle");
          }}
        >
          Process Another Case
        </Button>
      </div>
    </div>
  );
}
