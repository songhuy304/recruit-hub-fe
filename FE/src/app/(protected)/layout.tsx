import AppBootstrap from "@/components/layout/app-bootstrap";
import KBar from "@/components/kbar";
import AppSidebar from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";
import { InfoSidebar } from "@/components/layout/info-sidebar";
import { InfobarProvider } from "@/components/ui/infobar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("", "", {
  robots: {
    index: false,
    follow: false,
  },
});

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <AppBootstrap>
      <KBar>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <SidebarInset>
            <Header />
            <InfobarProvider defaultOpen={false}>
              {children}
              <InfoSidebar side="right" />
            </InfobarProvider>
          </SidebarInset>
        </SidebarProvider>
      </KBar>
    </AppBootstrap>
  );
}
