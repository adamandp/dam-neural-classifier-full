import { Brain, Cpu, Database, Microscope } from "lucide-react";

const scientificList = [
  {
    icon: <Microscope className="text-blue-500" />,
    title: "Signal Processing",
    desc: "Preprocessing and transformation techniques to extract meaningful patterns from input signals.",
  },
  {
    icon: <Cpu className="text-purple-500" />,
    title: "Machine Learning",
    desc: "Model-based approach to analyze extracted features and generate predictions.",
  },
  {
    icon: <Database className="text-emerald-500" />,
    title: "Data Pipeline",
    desc: "Structured pipeline including data loading, preprocessing, segmentation, and inference.",
  },
  {
    icon: <Brain className="text-rose-500" />,
    title: "Feature Engineering",
    desc: "Extraction of key features to improve model interpretability and performance.",
  },
];

export default function ScientificSection() {
  return (
    <div className="py-24">
      <div className="text-center mb-16">
        <h2 className="text-13 lg:text-19 font-bold text-slate-900 dark:text-white mb-6">
          Scientific Methodology
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Built on decades of clinical research and validated against standard
          neuropsychological assessments.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {scientificList.map((item, idx) => (
          <div
            key={idx}
            className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-transparent dark:border-slate-800 hover:border-blue-500/30 transition-all duration-300 group"
          >
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl w-fit mb-6 shadow-sm group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
