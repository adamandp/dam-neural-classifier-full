"use client";

import { Waves } from "lucide-react";
import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

const generateWaveData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    value: Math.sin(i * 0.5) * 10 + Math.random() * 5,
    value2: Math.cos(i * 0.3) * 8 + Math.random() * 4,
  }));
};

export default function LiveMonitor() {
  const [data, setData] = useState(generateWaveData());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)];
        const lastTime = prev[prev.length - 1].time;
        newData.push({
          time: lastTime + 1,
          value: Math.sin((lastTime + 1) * 0.5) * 10 + Math.random() * 5,
          value2: Math.cos((lastTime + 1) * 0.3) * 8 + Math.random() * 4,
        });
        return newData;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl overflow-hidden relative group w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">
            Live EEG Stream
          </span>
        </div>
        <Waves className="w-4 h-4 text-slate-600" />
      </div>

      {/* FIXED CONTAINER: Added min-h-[128px] and only rendering chart when mounted */}
      <div className="h-32 w-full min-h-[128px] opacity-50 group-hover:opacity-80 transition-opacity">
        {isMounted ? (
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            minHeight={0}
          >
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="value2"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          /* This matches the chart height so the layout doesn't "jump" when it loads */
          <div className="w-full h-full bg-slate-800/20 animate-pulse rounded-lg" />
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {["Channel 1", "Channel 2", "Channel 3"].map((wave) => (
          <div
            key={wave}
            className="bg-slate-800/50 rounded-lg p-2 text-center"
          >
            <div className="text-[10px] text-slate-500 uppercase">{wave}</div>
            <div className="text-xs font-bold text-slate-300">
              {/* If not mounted, show a placeholder to avoid hydration mismatch */}
              {isMounted ? (Math.random() * 20 + 10).toFixed(1) : "--.-"}Hz
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
