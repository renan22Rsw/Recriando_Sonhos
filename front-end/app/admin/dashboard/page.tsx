import { getSession } from "@/lib/api/get-session";

import { DashboardPageContainer } from "./_components/dashboard-page-container";
import { DashboardPageSection1 } from "./_components/dashboard-page-section-1";
import { DashboardPageSection2 } from "./_components/dashboard-page-section-2";
import { DashBoardPageHeader } from "./_components/dashboard-page.header";
import { redirect } from "next/navigation";

const AdminDashboardPage = async () => {
  const session = await getSession();

  if (session?.user.role !== "admin") {
    redirect("/");
  }

  return (
    <DashboardPageContainer>
      <DashBoardPageHeader />
      <DashboardPageSection1 />
      <DashboardPageSection2 status="pendente" />
    </DashboardPageContainer>
  );
};

export default AdminDashboardPage;
