import PageContainer from "@/components/layout/page-container";
import { TeamSetupFlow } from "./components/team-setup-flow";
import { teamInfoContent } from "@/config/infoconfig";

function TeamViewPage() {
  return (
    <PageContainer
      pageTitle="Manage Teams"
      pageDescription="Manage your teams and team settings."
      infoContent={teamInfoContent}
    >
      <TeamSetupFlow />
    </PageContainer>
  );
}

export { TeamViewPage };
