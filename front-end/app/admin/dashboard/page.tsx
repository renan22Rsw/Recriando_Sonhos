import { getSession } from "@/lib/api/get-session";

import { DashboardPageContainer } from "./_components/dashboard-page-container";
import { DashboardPageSection1 } from "./_components/dashboard-page-section-1";
import { DashboardPageSection2 } from "./_components/dashboard-page-section-2";
import { DashBoardPageHeader } from "./_components/dashboard-page.header";
import { redirect } from "next/navigation";
import { getAdminAppointments } from "@/lib/api/get-admin-appointments";

const AdminDashboardPage = async () => {
  const session = await getSession();
  const adminAppointments = await getAdminAppointments();

  if (session?.user.role !== "admin") {
    redirect("/");
  }

  return (
    <DashboardPageContainer>
      <DashBoardPageHeader />
      <DashboardPageSection1 appointment={adminAppointments} />
      <DashboardPageSection2 appointment={adminAppointments} />
    </DashboardPageContainer>
  );
};

export default AdminDashboardPage;
