import { getSession } from "@/lib/api/get-session";
import { DashboardPageContainer } from "../dashboard/_components/dashboard-page-container";
import { AdminProductsPageHeader } from "./_components/admin-products-page-header";
import { AdminProductsPageMain } from "./_components/admin-products-page-main";
import { redirect } from "next/navigation";

const AdminProductsPage = async () => {
  const session = await getSession();

  if (session?.user.role !== "admin") {
    redirect("/");
  }

  return (
    <DashboardPageContainer>
      <AdminProductsPageHeader />
      <AdminProductsPageMain />
    </DashboardPageContainer>
  );
};

export default AdminProductsPage;
