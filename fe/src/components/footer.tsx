import { SquareActivity, ShieldCheck, Globe, Mail } from "lucide-react";
import GithubIcon from "./icon/github-icon";
import { SVGProps } from "react";

const reference = [
  {
    icon: GithubIcon,
    title: "Github",
    link: "https://github.com/adamandp",
  },
  {
    icon: Mail,
    title: "Email",
    link: "adamanandaputra@gmail.com",
  },
];

export default function Footer() {
  return (
    <footer className="border-t py-16 xl:py-10 mt-20">
      <div className="flex flex-col xl:flex-row justify-between place-items-start">
        <div className="flex items-center gap-3 mb-6">
          <SquareActivity className="text-blue-600 w-8 h-8" />
          <span className="text-xl font-bold dark:text-white">
            Precision EEG
          </span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8">
          Advanced neuro-diagnostic platform leveraging state-of-the-art deep
          learning for early cognitive impairment detection.
        </p>
        <div className="flex gap-4">
          {reference.map(({ icon: Icon, title, link }, i) => (
            <a
              key={i}
              href={link}
              className="p-3 bg-white dark:bg-slate-800 rounded-xl hover:text-blue-500 transition-colors shadow-sm h-fit"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 lg:mt-0 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-400">
          © 2026 Dam Final Assignment. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Secure Data
          </span>
          <span className="flex items-center gap-1">
            <Globe className="w-3 h-3" /> Global Standard
          </span>
        </div>
      </div>
    </footer>
  );
}
