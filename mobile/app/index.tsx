import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import ResultChart from "@/components/result-chart";
import ScientificSection from "@/components/scientific-section";
import UploadArea from "@/components/upload-section";
import useGetStatus from "@/hooks/use-get-status";
import { useProcess } from "@/hooks/use-process";
import { JobStatus } from "@/types/jobs-interface";
import { DocumentPickerAsset } from "expo-document-picker";
import { useRef, useState } from "react";
import { ScrollView, useColorScheme } from "react-native";

export default function Index() {
  const [file, setFile] = useState<DocumentPickerAsset | null>(null);
  const colorScheme = useColorScheme();
  const analyzeSectionRef = useRef(null);
  const resultSectionRef = useRef(null);

  const { jobId, processMutation, uploadStep, setJobId, setUploadStep } =
    useProcess();
  const { statusData, statusError } = useGetStatus({ jobId, uploadStep });

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#020618" : "#f0f0f0",
      }}
      showsVerticalScrollIndicator={false}
    >
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
    </ScrollView>
  );
}
