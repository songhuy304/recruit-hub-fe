import CreateJobPage from "@/features/job/components/create-job/create-job-page";
import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata("Create Job", "");

export default function Page() {
  return <CreateJobPage />;
}
