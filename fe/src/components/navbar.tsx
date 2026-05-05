import { SquareActivity } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <nav className="backdrop-blur-lg sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto py-6 px-6 xl:px-12">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/30">
            <SquareActivity className="text-white w-6 h-6" />
          </div>
          <span className="text-lg font-bold tracking-tight dark:text-white">
            Dam Neural Classifier
          </span>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}
