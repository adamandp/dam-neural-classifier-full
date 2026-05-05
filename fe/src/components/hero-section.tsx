import {
  Brain,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import LiveMonitor from "./live-monitor";
import type { RefObject } from "react";

export default function HeroSection({
  ref,
}: {
  ref: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-16 py-10 items-center">
      <div className="space-y-8 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100 dark:border-blue-800">
          <Zap className="w-3 h-3" /> ML-Powered Diagnostics
        </div>
        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
          Analyze Brain <br />
          <span className="text-blue-600">Signal</span>
        </h1>
        <p className="text-8 lg:text-5 text-slate-500 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
          Analyze raw EEG signals using advanced signal processing and machine
          learning to support early detection of neurological conditions such as
          Normal, Mild Cognitive Impairment (MCI) Or Alzheimer’s.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Button
            onClick={() => {
              ref.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            Analyze Now <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-center justify-center lg:justify-start gap-8 pt-4 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 font-bold">
            <Brain className="w-5 h-5" /> Advance Analysis
          </div>
          <div className="flex items-center gap-2 font-bold">
            <ShieldCheck className="w-5 h-5" /> Secure Data
          </div>
        </div>
      </div>
      <div className="relative flex justify-center">
        <div className="absolute -inset-4 bg-linear-to-r from-blue-500 to-purple-500 rounded-[3rem] blur-2xl opacity-20 animate-pulse" />
        <div className="relative z-10 flex justify-center max-w-300 w-full">
          <LiveMonitor />
          <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 bg-white dark:bg-slate-800 p-3 lg:p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 hidden md:block">
            <div className="flex items-center gap-2 lg:gap-2">
              <div className="p-3 bg-emerald-500/10 rounded-2xl">
                <CheckCircle2 className="w-3 h-3 lg:w-6 lg:h-6 text-emerald-500" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  Accuracy
                </div>
                <div className="text-xs lg:text-xl font-black dark:text-white">
                  76.2%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
