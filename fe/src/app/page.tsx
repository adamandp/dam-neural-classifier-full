"use client";

import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import Logo from "@/components/icon/logo";
import Navbar from "@/components/navbar";
import { ResultChart } from "@/components/result-chart";
import ScientificSection from "@/components/scientific-section";
import UploadArea from "@/components/upload-section";
import useGetStatus from "@/hooks/use-get-status";
import { useProcess } from "@/hooks/use-process";
import { JobStatus } from "@/types/jobs-interface";
import { useRef, useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const analyzeSectionRef = useRef<HTMLDivElement | null>(null);
  const resultSectionRef = useRef<HTMLDivElement | null>(null);

  const { jobId, processMutation, uploadStep, setJobId, setUploadStep } =
    useProcess();
  const { statusData, statusError } = useGetStatus({ jobId, uploadStep });

  return (
    <main className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      {/* <Logo /> */}
      <div className="max-w-7xl px-c-6 xl:px-c-12 mx-auto">
        <HeroSection ref={analyzeSectionRef} />
        <ScientificSection />
        <UploadArea
          file={file}
          setFile={setFile}
          uploadStep={uploadStep}
          statusData={statusData}
          statusError={statusError}
          processMutation={processMutation}
          ref={analyzeSectionRef}
        />
        {statusData?.status === JobStatus.FINISHED && (
          <ResultChart
            statusData={statusData}
            setFile={setFile}
            setJobId={setJobId}
            setUploadStep={setUploadStep}
            ref={resultSectionRef}
          />
        )}
        <Footer />
      </div>
    </main>
  );
}
