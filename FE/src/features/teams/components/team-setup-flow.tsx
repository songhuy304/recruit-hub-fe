"use client";

import PageSkeleton from "@/components/page-skeleton";
import { Card } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CreateTeamForm } from "../forms/create-team-form";
import { JoinTeamForm } from "../forms/join-team-form";
import { useCreateTeam, useGetTeams, useJoinTeam } from "../hooks";
import type {
  CreateTeamFormValues,
  JoinTeamFormValues,
} from "../schemas/team.schema";
import { ITeam } from "../types";
import { TeamMainPanel } from "./team-main-panel";
import { TeamSidebar } from "./team-sidebar";
import { useClearFilters } from "@/hooks/use-params";

type TeamSetupView = "overview" | "create" | "join";

function TeamSetupFlow() {
  const { user } = useUser();
  const { data: teams = [], isLoading, isPending } = useGetTeams();
  const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null);
  const { handleCreateTeam, isPending: isCreatePending } = useCreateTeam();
  const { handleJoinTeam, isPending: isJoinPending } = useJoinTeam();
  const [view, setView] = useState<TeamSetupView>("overview");
  const clearParams = useClearFilters();

  useEffect(() => {
    setSelectedTeam(
      teams.find((team) => team.id === user?.currentTeamId) ?? null
    );
  }, [teams, user?.currentTeamId]);

  const onCreateTeam = async (values: CreateTeamFormValues, form: any) => {
    handleCreateTeam(values, form);
  };

  const onJoinTeam = async (values: JoinTeamFormValues, form: any) => {
    handleJoinTeam(values, form);
  };

  const viewConfig: Record<TeamSetupView, React.ReactNode> = {
    create: (
      <CreateTeamForm
        onCancel={() => setView("overview")}
        onSubmit={onCreateTeam}
        isPending={isCreatePending}
      />
    ),
    join: (
      <JoinTeamForm
        onCancel={() => setView("overview")}
        onSubmit={onJoinTeam}
        isPending={isJoinPending}
      />
    ),
    overview: <TeamMainPanel user={user} selectedTeam={selectedTeam} />,
  };

  const mainContent = viewConfig[view];

  const loading = isLoading || isPending;

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <Card className="gap-0 py-0 md:min-h-175">
      <div className="flex flex-col divide-y lg:flex-row lg:divide-x lg:divide-y-0 h-full">
        <TeamSidebar
          onSelectView={setView}
          selectedTeam={selectedTeam}
          setSelectedTeam={(value) => {
            void clearParams();
            setSelectedTeam(value);
            setView("overview");
          }}
          user={user}
          teams={teams}
          isLoading={loading}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex min-w-0 flex-1 flex-col p-6 overflow-y-auto"
          >
            {mainContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
}

export { TeamSetupFlow };
